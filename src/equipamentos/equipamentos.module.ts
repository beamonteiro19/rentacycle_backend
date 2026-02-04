import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Equipamentos } from './entities/equipamentos.entity';
import { EquipamentoService } from './services/equipamentos.service';
import { EquipamentoController } from './controller/equipamentos.controller';
import { CategoriaModule } from '../categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Equipamentos]),CategoriaModule],
  providers: [EquipamentoService],
  controllers: [EquipamentoController],
  exports: [EquipamentoService], 
})
export class EquipamentoModule {}
