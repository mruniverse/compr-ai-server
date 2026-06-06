import { BadRequestException, Controller, Get, Param, Query } from '@nestjs/common';
import { CurrentUser, JwtUser } from 'src/auth/current-user.decorator';
import { PricesService } from './prices.service';
import { PriceHistoryQueryDto } from './dto/price-history-query.dto';

@Controller('prices')
export class PricesController {
  constructor(private readonly prices: PricesService) {}

  @Get('history')
  history(@CurrentUser() user: JwtUser, @Query() query: PriceHistoryQueryDto) {
    if (!query.name) throw new BadRequestException('Informe o produto');
    return this.prices.getHistoryByName(user.id, query.name, query.from, query.to);
  }

  @Get('history/:productId')
  historyByProduct(@CurrentUser() user: JwtUser, @Param('productId') productId: string) {
    return this.prices.getHistoryByProductId(user.id, productId);
  }

  @Get('summary')
  summary(@CurrentUser() user: JwtUser, @Query() query: PriceHistoryQueryDto) {
    if (!query.name) throw new BadRequestException('Informe o produto');
    return this.prices.getSummary(user.id, query.name, query.from, query.to);
  }
}
