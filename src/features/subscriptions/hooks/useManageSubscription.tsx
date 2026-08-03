import { useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionService } from '../api/subscription-service';
import { toast } from '@heroui/react';
import { CircleCheck } from 'lucide-react';

type UseManageSubscriptionProps = {
  onSuccessCallback?: () => void;
};

export const useManageSubscription = ({
  onSuccessCallback,
}: UseManageSubscriptionProps) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: subscriptionService.postSubscription,
    mutationKey: ['subscriptions'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
      toast.success('Assinatura criada com sucesso', {
        actionProps: {
          onPress: () => toast.clear(),
        },
        indicator: <CircleCheck />,
      });
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  const updateMutation = useMutation({
    mutationFn: subscriptionService.patchSubscription,
    mutationKey: ['subscriptions'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
      toast.success('Assinatura atualizada com sucesso', {
        actionProps: {
          onPress: () => toast.clear(),
        },
        indicator: <CircleCheck />,
      });
      if (onSuccessCallback) onSuccessCallback();
    },
  });

  return {
    create: createMutation.mutate,
    update: updateMutation.mutate,
    isPending: createMutation.isPending || updateMutation.isPending,
  };
};
