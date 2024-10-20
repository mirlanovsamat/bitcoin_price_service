import { config } from 'dotenv';

config();

export const getBitcoinConfig = () => {
  const bitcoinApi = process.env.BITCOIN_API;
  const updateFrequency = parseInt(process.env.UPDATE_FREQUENCY, 10);
  const commission = parseFloat(process.env.COMMISSION);

  if (!bitcoinApi) {
    throw new Error('BITCOIN_API is not defined in the environment variables');
  }

  if (isNaN(updateFrequency) || updateFrequency <= 0) {
    throw new Error('UPDATE_FREQUENCY must be a positive integer');
  }

  if (isNaN(commission) || commission < 0) {
    throw new Error('COMMISSION must be a non-negative number');
  }

  return {
    bitcoinApi,
    updateFrequency,
    commission,
  };
};
