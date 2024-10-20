import { ApiProperty } from '@nestjs/swagger';

export class BitcoinPriceResponse {
  @ApiProperty({ example: '50000', description: 'Цена на покупку (Bid) в USD' })
  bid: string;

  @ApiProperty({ example: '50020', description: 'Цена на продажу (Ask) в USD' })
  ask: string;

  @ApiProperty({ example: '50010', description: 'Средняя цена (Mid) в USD' })
  mid: string;
}
