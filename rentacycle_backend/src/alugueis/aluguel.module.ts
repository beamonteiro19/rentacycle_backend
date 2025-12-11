import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from '../categorias/categorias.module';
import { Aluguel } from './entities/aluguel.entity';
import { AluguelItem } from '../aluguel_item/entities/alguel_item.entity';
import { AluguelService } from './services/aluguel.service';
import { AluguelController } from './controller/aluguel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Aluguel, AluguelItem])],
  providers: [AluguelService],
  controllers: [AluguelController],
  exports: [AluguelService], 
})
export class AluguelModule {}
