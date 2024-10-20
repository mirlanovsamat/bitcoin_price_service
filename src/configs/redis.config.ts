import { config } from 'dotenv';

config();

export const getRedisConfig = () => {
  const host = process.env.REDIS_HOST;
  const port = parseInt(process.env.REDIS_PORT, 10);

  if (!host) {
    throw new Error('REDIS_HOST is not defined in the environment variables');
  }

  if (isNaN(port) || port <= 0) {
    throw new Error('REDIS_PORT must be a positive integer');
  }

  return {
    host,
    port,
  };
};
