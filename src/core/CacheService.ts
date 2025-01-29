export default class CacheService {
  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  private static instance: CacheService;

  private cache: Map<string, any>;

  private constructor() {
    this.cache = new Map<string, any>();
  }

  public set<T>(key: string, value: T): void {
    this.cache.set(key, value);
  }

  public get<T>(key: string): T | undefined {
    return this.cache.get(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }
}
