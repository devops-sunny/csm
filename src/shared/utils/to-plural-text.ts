export const toPluralText = (text: string, count: number): string => {
  const pluralizedText = count === 1 ? text : `${text}s`;

  return pluralizedText;
};
