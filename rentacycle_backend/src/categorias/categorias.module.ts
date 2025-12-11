import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './entities/categorias.entity';
import { CategoriaService } from './services/categorias.service';
import { CategoriaController } from './controller/categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
  exports: [CategoriaService],
})
export class CategoriaModule {}