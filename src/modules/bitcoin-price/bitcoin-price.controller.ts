import { Controller, Get } from '@nestjs/common';
import { BitcoinPriceService } from './bitcoin-price.service';
import { IBitcoinPrice } from './interfaces/bitcoin-price.interface';

@Controller('bitcoin')
export class BitcoinPriceController {
  constructor(private readonly bitcoinPriceService: BitcoinPriceService) {}

  @Get('get-current-price')
  async getCurrentPrice(): Promise<IBitcoinPrice> {
    return this.bitcoinPriceService.getCurrentPrice();
  }
}
