import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { BitcoinPriceModule } from './modules/bitcoin-price/bitcoin-price.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [RedisModule, BitcoinPriceModule, ScheduleModule.forRoot()],
})
export class AppModule {}
