import { Module } from '@nestjs/common';
import { BitcoinPriceModule } from './modules/bitcoin-price/bitcoin-price.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [BitcoinPriceModule, ScheduleModule.forRoot()],
})
export class AppModule {}
