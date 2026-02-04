import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteModule } from './clientes/clientes.module';
import { TelefoneModule } from './telefones/telefones.module';
import { EnderecoModule } from './enderecos/enderecos.module';
import { EquipamentoModule } from './equipamentos/equipamentos.module';
import { CategoriaModule } from './categorias/categorias.module';
import { AluguelItemModule } from './aluguel_item/alguel_item.module';
import { AluguelModule } from './alugueis/aluguel.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),

    ClienteModule,
    TelefoneModule,
    EnderecoModule,
    EquipamentoModule,
    CategoriaModule,
    AluguelItemModule,
    AluguelModule,
  ],

  controllers: [AppController],
  providers: [],
})
export class AppModule {}
