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
import { TelefoneService } from '../services/telefones.service';
import { Telefones } from '../entities/telefones.entity';

@Controller('/telefones')
export class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Telefones[]> {
    return this.telefoneService.findAll();
  }
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Telefones> {
    return this.telefoneService.findById(id);
  }
  //   ele busca em telefones e espera o parametro telefone atraves do ':'
  @Get('/numero/:numero')
  @HttpCode(HttpStatus.OK)
  findByPhone(@Param('numero') numero: string): Promise<Telefones[]> {
    return this.telefoneService.findByPhone(numero);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() Telefones: Telefones): Promise<Telefones> {
    return this.telefoneService.create(Telefones);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() Telefones: Telefones): Promise<Telefones> {
    return this.telefoneService.update(Telefones);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.telefoneService.delete(id);
  }
}
