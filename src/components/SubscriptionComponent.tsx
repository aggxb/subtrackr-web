import { CircleAlert, Pencil, Trash } from 'lucide-react';
import { normalizeLabelAndValue } from '../utils/normalizeLabelAndValue';
import { formatCurrency } from '../utils/formatCurrency';
import type { ModalInfo, Subscription, SubscriptionPut } from '../types/types';
import { Button, Card, CardHeader, Switch, toast } from '@heroui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionService } from '../services/subscription';
import { motion } from 'motion/react';

type SubscriptionProps = Subscription &
  Pick<ModalInfo, 'setIsModalOpen'> & {
    setActiveItem: React.Dispatch<React.SetStateAction<SubscriptionPut | null>>;
    index: number;
  };

const variants = {
  hidden: { opacity: 0, x: -20 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: (i + 1) * 0.1 },
  }),
  exit: { opacity: 0, scale: 0.9 },
};

const SubscriptionComponent = ({
  id,
  name,
  dueDate,
  price,
  cycle,
  status,
  setIsModalOpen,
  setActiveItem,
  index,
}: SubscriptionProps) => {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: subscriptionService.deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });

  const patchStatusMutation = useMutation({
    mutationFn: subscriptionService.patchSubscriptionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
    },
  });

  const handleEdit = (subscription: SubscriptionPut) => {
    setIsModalOpen(true);
    setActiveItem(subscription);
  };

  return (
    <motion.li
      key={id}
      custom={index}
      initial="hidden"
      animate="show"
      exit="exit"
      variants={variants}
      layout
    >
      <Card
        className={`group flex flex-row gap-3 items-center justify-between bg-neutral-900 border border-neutral-800 hover:border-blue-700 hover:shadow-sm hover:shadow-blue-600 transition transition-discrete duration-500 ${
          status !== 'ACTIVE' ? 'grayscale-75 brightness-70' : ''
        }`}
      >
        <div className="flex gap-4 items-start">
          <div className="size-14 p-4 flex items-center justify-center rounded-2xl text-lg font-semibold bg-neutral-800 max-sm:size-12 max-sm:text-sm max-[444px]:hidden">
            {name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <CardHeader className="grid">
            <Card.Title className="font-medium max-sm:text-sm">
              {normalizeLabelAndValue(name)}
            </Card.Title>
            <Card.Description className="text-sm text-neutral-500 max-sm:text-xs">
              Vence dia {dueDate}
            </Card.Description>
            <span
              className={`mt-2 py-1 px-2.5 w-fit rounded-3xl font-medium text-xs transition transition-discrete duration-500 ${
                status !== 'ACTIVE'
                  ? 'bg-orange-950 text-orange-400'
                  : 'bg-emerald-950 text-emerald-400'
              }`}
            >
              {status === 'ACTIVE' ? 'Ativo' : 'Cancelado'}
            </span>
          </CardHeader>
        </div>

        <div className="flex items-center gap-5 max-sm:gap-2">
          <div className="flex gap-4">
            <div>
              <p className="font-medium max-sm:text-sm">
                {formatCurrency(price)}
              </p>
              <p className="text-xs text-end text-neutral-500">
                {cycle === 'MONTHLY' ? 'Mensal' : 'Anual'}
              </p>
            </div>
            <Button
              aria-label="Editar assinatura"
              className="group/button p-3 invisible opacity-0 bg-transparent transition transition-discrete duration-500 group-hover:visible group-hover:opacity-100 hover:bg-yellow-700/20 rounded-full cursor-pointer max-sm:visible max-sm:opacity-100"
              onClick={() =>
                handleEdit({
                  id,
                  name: normalizeLabelAndValue(name),
                  price,
                  cycle,
                  dueDate,
                  status,
                })
              }
            >
              <Pencil
                size={16}
                className="text-neutral-500 group-hover:text-neutral-500 group-hover/button:text-yellow-500"
              />
            </Button>
          </div>

          <Switch
            isSelected={status === 'ACTIVE'}
            onChange={() => {
              patchStatusMutation.mutate({ id });
            }}
            aria-label="Alternar status da assinatura"
            className="group flex h-5 cursor-pointer p-1"
          >
            <Switch.Control>
              <Switch.Thumb className="pointer-events-none inline-block rounded-full bg-white shadow-lg ring-0" />
            </Switch.Control>
          </Switch>
          <Button
            aria-label="Excluir assinatura"
            className="group/button invisible opacity-0 p-3 bg-transparent transition transition-discrete duration-500 group-hover:visible group-hover:opacity-100 hover:bg-red-700/20 rounded-full cursor-pointer max-sm:visible max-sm:opacity-100"
            onPress={() => {
              deleteMutation.mutate(id);
              toast.danger('Assinatura excluída com sucesso', {
                actionProps: {
                  onPress: () => toast.clear(),
                  variant: 'danger',
                },
                indicator: <CircleAlert />
              });
            }}
          >
            <Trash
              size={16}
              className="text-neutral-500 group-hover:text-neutral-500 group-hover/button:text-red-500"
            />
          </Button>
        </div>
      </Card>
    </motion.li>
  );
};

export default SubscriptionComponent;
