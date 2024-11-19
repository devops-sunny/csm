export const computeMaxViewportHeight = (heights: number[]) => {
  const totalHeight = heights.reduce((total, height) => total + height, 0);

  return `calc(100dvh - ${totalHeight}px)`;
};
