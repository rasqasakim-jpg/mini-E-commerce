// src/utils/retryHelpers.ts
export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export class ExponentialBackoff {
  private config: RetryConfig;

  constructor(config: Partial<RetryConfig> = {}) {
    this.config = {
      maxRetries: config.maxRetries || 3,
      initialDelay: config.initialDelay || 1000,
      maxDelay: config.maxDelay || 30000,
      backoffMultiplier: config.backoffMultiplier || 2,
    };
  }

  // ✅ Calculate delay dengan exponential backoff
  private calculateDelay(retryCount: number): number {
    const delay = this.config.initialDelay * Math.pow(this.config.backoffMultiplier, retryCount);
    return Math.min(delay, this.config.maxDelay);
  }

  // ✅ Execute function dengan retry logic
  async execute<T>(
    fn: () => Promise<T>,
    onRetry?: (retryCount: number, error: any) => void
  ): Promise<T> {
    let lastError: any;
    
    for (let retryCount = 0; retryCount <= this.config.maxRetries; retryCount++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error;
        
        // ✅ SOAL e: Retry hanya untuk network errors/timeouts
        const shouldRetry = this.shouldRetry(error, retryCount);
        
        if (!shouldRetry) {
          console.log(`❌ ExponentialBackoff: Not retrying -`, error);
          throw error;
        }

        if (retryCount < this.config.maxRetries) {
          const delay = this.calculateDelay(retryCount);
          console.log(`🔄 ExponentialBackoff: Retry ${retryCount + 1}/${this.config.maxRetries} after ${delay}ms`);
          
          onRetry?.(retryCount, error);
          await this.sleep(delay);
        }
      }
    }

    console.log(`💥 ExponentialBackoff: All retries failed`);
    throw lastError;
  }

  // ✅ Tentukan apakah error bisa di-retry
  private shouldRetry(error: any, retryCount: number): boolean {
    // Jangan retry jika sudah mencapai max retries
    if (retryCount >= this.config.maxRetries) {
      return false;
    }

    // Retry untuk network-related errors
    if (error.code === 'NETWORK_ERROR' || error.message?.includes('network')) {
      return true;
    }

    // Retry untuk timeouts
    if (error.code === 'TIMEOUT' || error.message?.includes('timeout')) {
      return true;
    }

    // Retry untuk 5xx server errors
    if (error.response?.status >= 500) {
      return true;
    }

    // Jangan retry untuk 4xx client errors (kecuali 429 - Too Many Requests)
    if (error.response?.status >= 400 && error.response?.status !== 429) {
      return false;
    }

    // Default: retry untuk error lainnya
    return true;
  }

  // ✅ Utility function untuk delay
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// ✅ Default instance dengan config yang reasonable
export const defaultRetry = new ExponentialBackoff({
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
});

// ✅ Helper function untuk fetch dengan retry
export const fetchWithRetry = async <T>(
  fetchFn: () => Promise<T>,
  config?: Partial<RetryConfig>
): Promise<T> => {
  const retry = config ? new ExponentialBackoff(config) : defaultRetry;
  return retry.execute(fetchFn);
};