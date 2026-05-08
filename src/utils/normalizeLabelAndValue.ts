export const normalizeLabelAndValue = (value: string) => {
  if (!value) return 'Nova assinatura';

  let words = value.split(' ');

  words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return `${words.join(' ')}`;
};
