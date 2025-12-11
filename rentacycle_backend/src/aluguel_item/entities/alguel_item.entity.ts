import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aluguel } from '../../alugueis/entities/aluguel.entity';
import { Equipamentos } from '../../equipamentos/entities/equipamentos.entity';

@Entity({ name: 'tb_aluguel_item' })
export class AluguelItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_unitario: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_total: number;

  @ManyToOne(() => Aluguel, (aluguel) => aluguel.itens, { onDelete: 'CASCADE' })
  aluguel: Aluguel;

  @ManyToOne(() => Equipamentos, (equipamento) => equipamento.itens, {
    eager: true,
  })
  equipamento: Equipamentos;
}
