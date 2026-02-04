import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AluguelItemService } from '../services/alguel_item.service';
import { AluguelItem } from '../entities/alguel_item.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alugueis itens')
@Controller('/aluguel-itens')
export class AluguelItemController {
  constructor(private readonly aluguelItemService: AluguelItemService) {}

  @Get()
  findAll(): Promise<AluguelItem[]> {
    return this.aluguelItemService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number): Promise<AluguelItem> {
    return this.aluguelItemService.findById(id);
  }

  @Post()
  create(@Body() item: AluguelItem): Promise<AluguelItem> {
    return this.aluguelItemService.create(item);
  }

  @Put()
  update(@Body() item: AluguelItem): Promise<AluguelItem> {
    return this.aluguelItemService.update(item);
  }

  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.aluguelItemService.delete(id);
  }
}
