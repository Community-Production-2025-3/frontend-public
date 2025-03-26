export const rankUpThreshold = (rank: number): number => {
  return Math.floor(100 * Math.pow(rank, 1.5));
};
