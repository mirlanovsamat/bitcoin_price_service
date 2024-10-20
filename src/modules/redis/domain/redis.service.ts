import { Injectable, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { getRedisConfig } from '../../../configs/redis.config';

const redisConfig = getRedisConfig();

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
    });

    this.client.on('error', (err) => {
      this.logger.error('Redis connection error:', err);
    });

    this.client.on('ready', () => {
      this.logger.log('Connected to Redis');
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async get(key: string): Promise<string | null> {
    try {
      const value = await this.client.get(key);
      return value;
    } catch (error) {
      this.logger.error(`Error getting key "${key}":`, error);
      return null;
    }
  }

  async set(key: string, value: string, ttlInSeconds?: number): Promise<void> {
    try {
      if (ttlInSeconds) {
        await this.client.set(key, value, 'EX', ttlInSeconds);
      } else {
        await this.client.set(key, value);
      }
      this.logger.log(`Key "${key}" set successfully`);
    } catch (error) {
      this.logger.error(`Error setting key "${key}":`, error);
    }
  }
}
