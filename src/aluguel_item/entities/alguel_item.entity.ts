import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluguel } from '../../alugueis/entities/aluguel.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamentos.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_aluguel_item' })
export class AluguelItem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'int' })
  @ApiProperty()
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  valor_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  valor_total: number;

  @ManyToOne(() => Aluguel, (aluguel) => aluguel.itens, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Aluguel })
  aluguel: Aluguel;

  @ManyToOne(() => Equipamentos, (equipamento) => equipamento.itens, {
    eager: true,
  })
  @ApiProperty({ type: () => Equipamentos })
  equipamento: Equipamentos;
}



