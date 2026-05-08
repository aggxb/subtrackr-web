export const formatCurrency = (value: string | number) => {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const parseCurrencyToNumber = (value: string): number => {
  const cleanValue = value.replace(/\D/g, '');
  return Number(cleanValue) / 100;
};

export const formatToBRL = (value: unknown) => {
  if (value === null || value === undefined || isNaN(Number(value))) return '';

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
};
