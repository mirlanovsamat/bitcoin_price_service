import { config } from 'dotenv';

config();

export const getAppConfig = () => {
  const port = parseInt(process.env.APP_PORT, 10);

  if (isNaN(port) || port <= 0) {
    throw new Error('APP_PORT must be a positive integer');
  }

  return {
    port: port || 3000,
  };
};
