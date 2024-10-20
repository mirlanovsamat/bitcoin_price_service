import { Controller, Get } from '@nestjs/common';
import { BitcoinPriceService } from './bitcoin-price.service';
import { IBitcoinPrice } from './interfaces/bitcoin-price.interface';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BitcoinPriceResponse } from './responses/bitcoin-price.response';

@ApiTags('Bitcoin')
@Controller('bitcoin')
export class BitcoinPriceController {
  constructor(private readonly bitcoinPriceService: BitcoinPriceService) {}

  @Get('get-current-price')
  @ApiOkResponse({
    description: 'Текущая цена биткоина успешно получена',
    type: BitcoinPriceResponse,
  })
  async getCurrentPrice(): Promise<IBitcoinPrice> {
    return this.bitcoinPriceService.getCurrentPrice();
  }
}
