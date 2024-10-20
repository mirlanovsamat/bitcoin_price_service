import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { Interval } from '@nestjs/schedule';
import { RedisService } from '../redis/domain/redis.service';
import { getBitcoinConfig } from 'src/configs/bitcoin.config';
import { IBitcoinPrice } from './interfaces/bitcoin-price.interface';

const bitcoinConfig = getBitcoinConfig();

@Injectable()
export class BitcoinPriceService {
  private readonly logger = new Logger(BitcoinPriceService.name);

  constructor(private readonly redisService: RedisService) {}

  @Interval(bitcoinConfig.updateFrequency)
  async handleInterval() {
    this.logger.log('Bitcoin price fetching...');
    await this.fetchBitcoinPrice();
  }

  async fetchBitcoinPrice(): Promise<IBitcoinPrice> {
    try {
      const response = await axios.get(bitcoinConfig.bitcoinApi);
      const { bidPrice, askPrice } = response.data;
      const commission = bitcoinConfig.commission || 0.01;

      const bidWithCommission = (
        parseFloat(bidPrice) *
        (1 + commission / 100)
      ).toFixed(2);
      const askWithCommission = (
        parseFloat(askPrice) *
        (1 - commission / 100)
      ).toFixed(2);
      const midPrice = (
        (parseFloat(bidWithCommission) + parseFloat(askWithCommission)) /
        2
      ).toFixed(2);

      const priceData: IBitcoinPrice = {
        bid: bidWithCommission,
        ask: askWithCommission,
        mid: midPrice,
      };

      await this.redisService.set('bitcoinPrice', JSON.stringify(priceData));

      return priceData;
    } catch (error) {
      this.logger.error('Ошибка при получении цены с Binance API:', error);
      throw new InternalServerErrorException(
        'Failed to fetch Bitcoin price from Binance API',
      );
    }
  }

  async getCurrentPrice(): Promise<IBitcoinPrice> {
    try {
      const priceDataString = await this.redisService.get('bitcoinPrice');

      if (!priceDataString) {
        this.logger.warn(
          'Bitcoin price data not found in Redis, fetching price from binance api...',
        );
        const priceData = await this.fetchBitcoinPrice();

        return priceData;
      }

      return JSON.parse(priceDataString);
    } catch (error) {
      this.logger.error('Error when getting Bitcoin price:', error);
      throw new InternalServerErrorException(
        'Error while getting Bitcoin price',
      );
    }
  }
}
