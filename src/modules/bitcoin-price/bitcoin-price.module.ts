import { Module } from '@nestjs/common';
import { BitcoinPriceController } from './bitcoin-price.controller';
import { BitcoinPriceService } from './bitcoin-price.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [BitcoinPriceController],
  providers: [BitcoinPriceService],
})
export class BitcoinPriceModule {}
