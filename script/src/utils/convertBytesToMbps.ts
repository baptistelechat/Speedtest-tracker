export const convertBytesToMbps = (bytes: number, elapsed: number) => {
  return bytes / 125000 / (elapsed / 1000);
};
