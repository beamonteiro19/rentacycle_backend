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
import { Clientes } from '../entities/clientes.entity';
import { ClienteService } from '../services/clientes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('/clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Clientes[]> {
    return this.clienteService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id_Cliente): Promise<Clientes> {
    return this.clienteService.findById(id_Cliente);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findbyTitulo(@Param('nome') nome_cliente: string): Promise<Clientes[]> {
    return this.clienteService.findByClientName(nome_cliente);
  }

  @Get('/cpf/:cpf')
  @HttpCode(HttpStatus.OK)
  findByCpf(@Param('cpf') cpf: string): Promise<Clientes[]> {
    return this.clienteService.findByCpf(cpf);
  }

  @Get('/rg/:rg')
  @HttpCode(HttpStatus.OK)
  findByRg(@Param('rg') rg: string): Promise<Clientes[]> {
    return this.clienteService.findByRg(rg);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() cliente: Clientes): Promise<Clientes> {
    return this.clienteService.create(cliente);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() cliente: Clientes): Promise<Clientes> {
    return this.clienteService.update(cliente);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.delete(id);
  }
}
