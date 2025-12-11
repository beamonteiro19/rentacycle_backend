import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AluguelItem } from './entities/alguel_item.entity';
import { AluguelItemService } from './services/alguel_item.service';
import { AluguelItemController } from './controller/alguel_item.controller';
import { Aluguel } from '../alugueis/entities/aluguel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AluguelItem, Aluguel]),],
  providers: [AluguelItemService],
  controllers: [AluguelItemController],
  exports: [AluguelItemService], 
})
export class AluguelItemModule {}
