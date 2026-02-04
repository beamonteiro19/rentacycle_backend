import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './clientes/clientes.module';
import { TelefoneModule } from './telefones/telefones.module';
import { Telefones } from './telefones/entities/telefones.entity';
import { Clientes } from './clientes/entities/clientes.entity';
import { EnderecoModule } from './enderecos/enderecos.module';
import { Enderecos } from './enderecos/enderecos.module';
import { Equipamentos } from './equipamentos/entities/equipamentos.entity';
import { EquipamentoModule } from './equipamentos/equipamentos.module';
import { CategoriaModule } from './categorias/categorias.module';
import { Categorias } from './categorias/entities/categorias.entity';
import { AluguelItemModule } from './aluguel_item/alguel_item.module';
import { AluguelItem } from './aluguel_item/entities/alguel_item.entity';
import { Aluguel } from './alugueis/entities/aluguel.entity';
import { AluguelModule } from './alugueis/aluguel.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_rentacycle',
      entities: [Clientes, Telefones, Enderecos, Equipamentos, Categorias, AluguelItem, Aluguel],
      synchronize: true,
      logging: true,
    }),
    ClienteModule,
    TelefoneModule,
    EnderecoModule,
    EquipamentoModule, 
    CategoriaModule,
    AluguelItemModule,
    AluguelModule
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
