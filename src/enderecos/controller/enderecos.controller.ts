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
import { EnderecoService } from '../services/enderecos.service';
import { Enderecos } from '../entities/enderecos.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Endereços')
@Controller('/enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Enderecos[]> {
    return this.enderecoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Enderecos> {
    return this.enderecoService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() endereco: Enderecos): Promise<Enderecos> {
    return this.enderecoService.create(endereco);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() endereco: Enderecos): Promise<Enderecos> {
    return this.enderecoService.update(endereco);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.enderecoService.delete(id);
  }
}