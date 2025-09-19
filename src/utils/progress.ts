export interface ProgressAnimationOptions {
  duration?: number;
  steps?: number;
  onProgress: (progress: number) => void;
}

/**
 * Creates a smooth progress animation from 0 to 100%
 * Returns a cleanup function to stop the animation
 */
export function createProgressAnimation({
  duration = 2500,
  steps = 100,
  onProgress
}: ProgressAnimationOptions): () => void {
  let currentStep = 0;
  const stepDuration = duration / steps;

  const progressInterval = setInterval(() => {
    currentStep++;
    const progress = Math.min(100, (currentStep / steps) * 100);
    onProgress(progress);

    if (currentStep >= steps) {
      clearInterval(progressInterval);
    }
  }, stepDuration);

  return () => clearInterval(progressInterval);
}

/**
 * Delays execution for a specified duration
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}