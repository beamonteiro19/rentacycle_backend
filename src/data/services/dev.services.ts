import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { AluguelItem } from '../../aluguel_item/entities/alguel_item.entity';
import { Aluguel } from '../../alugueis/entities/aluguel.entity';
import { Categorias } from '../../categorias/entities/categorias.entity';
import { Clientes } from '../../clientes/entities/clientes.entity';
import { Enderecos } from '../../enderecos/enderecos.module';
import { Equipamentos } from '../../equipamentos/entities/equipamentos.entity';
import { Telefones } from '../../telefones/entities/telefones.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [
        Aluguel,
        AluguelItem,
        Categorias,
        Clientes,
        Enderecos,
        Equipamentos,
        Telefones,
      ],
      synchronize: true,
    };
  }
}
