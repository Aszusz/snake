export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createInterval(
  callback: () => void,
  ms: number,
  shouldStop: () => boolean
): () => void {
  const id = setInterval(() => {
    if (shouldStop()) {
      clearInterval(id);
      return;
    }
    callback();
  }, ms);
  return () => clearInterval(id);
}
