import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enderecos } from './entities/enderecos.entity';
import { EnderecoService } from './services/enderecos.service';
import { EnderecoController } from './controller/enderecos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Enderecos])],
  providers: [EnderecoService],
  controllers: [EnderecoController],
  exports: [EnderecoService],
})
export class EnderecoModule {}

export { Enderecos };
