export interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export class Cache<T> {
  private cache: Map<string, CacheEntry<T>>;
  private duration: number;

  constructor(duration: number = 1000 * 60 * 30) { // Default 30 minutes
    this.cache = new Map();
    this.duration = duration;
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > this.duration) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      timestamp: Date.now(),
      data,
    });
  }

  clear(): void {
    this.cache.clear();
  }
}