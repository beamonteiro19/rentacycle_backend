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
import { EquipamentoService } from '../services/equipamentos.service';
import { Equipamentos } from '../entities/equipamentos.entity';

@Controller('/equipamentos')
export class EquipamentoController {
  constructor(private readonly equipamentoService: EquipamentoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Equipamentos[]> {
    return this.equipamentoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Equipamentos> {
    return this.equipamentoService.findById(id);
  }

  @Get('/nome/:nome')
  findByName(@Param('nome') nome: string): Promise<Equipamentos[]> {
    return this.equipamentoService.findByName(nome);
  }

  @Get('/disponiveis')
  findAvailable(): Promise<Equipamentos[]> {
    return this.equipamentoService.findAvailable();
  }

  @Get('/indisponiveis')
  findUnavailable(): Promise<Equipamentos[]> {
    return this.equipamentoService.findUnavailable();
  }

  @Get('/estoque')
  findByStock(): Promise<number> {
    return this.equipamentoService.findByStock();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() equipamento: Equipamentos): Promise<Equipamentos> {
    return this.equipamentoService.create(equipamento);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() equipamento: Equipamentos): Promise<Equipamentos> {
    return this.equipamentoService.update(equipamento);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.equipamentoService.delete(id);
  }
}
