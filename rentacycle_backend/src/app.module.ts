import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './clientes/clientes.module';
import { TelefoneModule } from './telefones/telefones.module';
import { Telefones } from './telefones/entities/telefones.entity';
import { Clientes } from './clientes/entities/clientes.entity';
import { EnderecoModule, Enderecos } from './enderecos/enderecos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_rentacycle',
      entities: [Clientes, Telefones, Enderecos],
      synchronize: true,
      logging: true,
    }),
    ClienteModule,
    TelefoneModule,
    EnderecoModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
