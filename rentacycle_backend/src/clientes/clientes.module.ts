import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteService } from './services/clientes.service';
import { ClienteController } from './controller/clientes.controller';
import { TelefoneModule } from '../telefones/telefones.module';
import { Clientes } from './entities/clientes.entity';
import { EnderecoModule } from '../enderecos/enderecos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Clientes]), TelefoneModule, EnderecoModule],
  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [],
})
export class ClienteModule {}