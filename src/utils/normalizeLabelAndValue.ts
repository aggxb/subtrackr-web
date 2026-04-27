export const normalizeLabelAndValue = (value: string) => {
  let words = value.split(' ');

  words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return `${words.join(' ')}` || 'Assinatura';
};
