import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formOptions, useForm } from '@tanstack/react-form';
import { z } from 'zod';
import { Form, toast } from '@heroui/react';
import type { ModalInfo, SubscriptionPut } from '../types/types';
import InputComponent from './InputComponent';
import SelectComponent from './SelectComponent';
import CurrencyInput from './CurrencyInput';
import { subscriptionService } from '../services/subscription';
import { CircleCheck } from 'lucide-react';

const subscriptionSchema = z.object({
  name: z.string().min(3, 'O nome deve ter, pelo menos, 3 caracteres'),
  price: z.number().positive('O valor deve ser maior que zero'),
  cycle: z.enum(['MONTHLY', 'YEARLY']),
  dueDate: z
    .number()
    .min(1, 'O dia de vencimento deve estar entre 1 e 31')
    .max(31, 'O dia de vencimento deve estar entre 1 e 31'),
  status: z.enum(['ACTIVE', 'CANCELED']),
});

type SubscriptionPost = z.infer<typeof subscriptionSchema>;

type FormFieldConfig = {
  name: keyof SubscriptionPost;
  label: string;
  placeholder?: string;
  type?: string;
  prefix?: string;
  min?: number;
  max?: number;
  gridCols: number;
};

type SubscriptionFormProps = Pick<ModalInfo, 'handleCloseModal'> & {
  setActiveItem: React.Dispatch<React.SetStateAction<SubscriptionPut | null>>;
  activeItem: SubscriptionPut | null;
};

const cycleOptions = [
  { id: 1, label: 'Mensal', value: 'MONTHLY' },
  { id: 2, label: 'Anual', value: 'YEARLY' },
];

const defaultSubscription: SubscriptionPost = {
  name: '',
  price: 0.0,
  cycle: 'MONTHLY',
  dueDate: 1,
  status: 'ACTIVE',
};

const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Nome do Serviço',
    placeholder: 'Ex: Netflix, Spotify...',
    gridCols: 2,
  },
  {
    name: 'price',
    label: 'Valor (R$)',
    placeholder: '0,00',
    type: 'currency',
    prefix: 'R$',
    gridCols: 2,
  },
  {
    name: 'dueDate',
    label: 'Dia de Vencimento',
    placeholder: 'Ex: 15',
    type: 'number',
    min: 1,
    max: 31,
    gridCols: 1,
  },
  {
    name: 'cycle',
    label: 'Tipo de Ciclo',
    type: 'select',
    gridCols: 1,
  },
];

const SubscriptionForm = ({
  handleCloseModal,
  activeItem,
}: SubscriptionFormProps) => {
  const formOpts = formOptions({
    defaultValues: activeItem ? activeItem : defaultSubscription,
  });

  const queryClient = useQueryClient();
  const postMutation = useMutation({
    mutationFn: subscriptionService.postSubscription,
    mutationKey: ['subscriptions'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      });
      handleCloseModal();
      form.reset();
      toast.success('Assinatura criada com sucesso', {
        actionProps: {
          onPress: () => toast.clear(),
        },
        indicator: <CircleCheck />,
      });
    },
  });

  const putMutation = useMutation({
    mutationFn: subscriptionService.putSubscription,
    mutationKey: ['subscriptions'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
      queryClient.invalidateQueries({
        queryKey: ['summary'],
      });
      handleCloseModal();
      form.reset();
      toast.success('Assinatura atualizada com sucesso', {
        actionProps: {
          onPress: () => toast.clear(),
        },
        indicator: <CircleCheck />,
      });
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) =>
      activeItem
        ? putMutation.mutate({ ...value, id: activeItem.id })
        : postMutation.mutate(value),
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <Form id="subscription-form" onSubmit={handleSubmit} className="grid gap-3">
      {formFields.map((f) => {
        if (f.type === 'select') {
          return (
            <form.Field
              key={f.name}
              name={f.name}
              validators={{
                onBlur: subscriptionSchema.shape[f.name],
                onChange: subscriptionSchema.shape[f.name],
              }}
              children={(field) => (
                <div className="grid gap-1">
                  <SelectComponent
                    options={cycleOptions}
                    label={f.label}
                    value={field.state.value}
                    onChange={(value) => field.handleChange(value as string)}
                    className="bg-transparent"
                  />
                  <span className="text-red-500 text-xs">
                    {field.state.meta.errors[0]?.message}
                  </span>
                </div>
              )}
            />
          );
        }

        if (f.type === 'currency') {
          return (
            <div
              key={f.name}
              className={f.gridCols == 1 ? 'col-span-1' : 'col-span-2'}
            >
              <form.Field
                name={f.name}
                validators={{
                  onBlur: subscriptionSchema.shape[f.name],
                  onChange: subscriptionSchema.shape[f.name],
                }}
                children={(field) => {
                  const showError =
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0;

                  return (
                    <div className="grid gap-1">
                      <CurrencyInput
                        id={f.name}
                        label={f.label}
                        type={f.type}
                        min={f.min}
                        max={f.max}
                        prefix={f?.prefix}
                        placeholder={f.placeholder}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(value) => field.handleChange(value ?? 0)}
                        isInvalid={showError}
                        aria-label={f.label}
                      />
                      {showError && (
                        <span className="text-red-500 text-xs">
                          {field.state.meta.errors[0]?.message}
                        </span>
                      )}
                    </div>
                  );
                }}
              />
            </div>
          );
        }

        return (
          <div
            key={f.name}
            className={f.gridCols == 1 ? 'col-span-1' : 'col-span-2'}
          >
            <form.Field
              name={f.name}
              validators={{
                onBlur: subscriptionSchema.shape[f.name],
                onChange: subscriptionSchema.shape[f.name],
              }}
              children={(field) => {
                const showError =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <div className="grid gap-1">
                    <InputComponent
                      id={f.name}
                      label={f.label}
                      type={f.type || 'text'}
                      min={f.min}
                      max={f.max}
                      prefix={f?.prefix}
                      placeholder={f.placeholder}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      isInvalid={showError}
                      onChange={({ target }) => {
                        const value = target.value;

                        if (f.type !== 'number') field.handleChange(value);
                        if (f.type === 'number' && !value)
                          field.handleChange(0);
                        if (f.type === 'number' && value)
                          field.handleChange(Number(value));
                      }}
                      aria-label={f.label}
                    />
                    {showError && (
                      <span className="text-red-500 text-xs">
                        {field.state.meta.errors[0]?.message}
                      </span>
                    )}
                  </div>
                );
              }}
            />
          </div>
        );
      })}
    </Form>
  );
};

export default SubscriptionForm;
