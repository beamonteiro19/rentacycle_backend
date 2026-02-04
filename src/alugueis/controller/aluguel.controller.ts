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
import { AluguelService } from '../services/aluguel.service';
import { Aluguel } from '../entities/aluguel.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Alugueis')
@Controller('/alugueis')
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Aluguel[]> {
    return this.aluguelService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Aluguel> {
    return this.aluguelService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() aluguel: Aluguel): Promise<Aluguel> {
    return this.aluguelService.create(aluguel);
  }

  @Post('/tempo/:id')
  @HttpCode(HttpStatus.OK)
  async calcularTempo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ horas: number }> {
    const horas = await this.aluguelService.calcHours(id);
    return { horas };
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() aluguel: Aluguel): Promise<Aluguel> {
    return this.aluguelService.update(aluguel);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.aluguelService.delete(id);
  }
}
