import { Module } from '@nestjs/common';
import { Telefones } from './entities/telefones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelefoneService } from './services/telefones.service';
import { TelefoneController } from './controller/telefones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Telefones])],
  providers: [TelefoneService],
  controllers: [TelefoneController],
  exports: [TelefoneService],
})
export class TelefoneModule {}
