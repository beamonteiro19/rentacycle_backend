import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AluguelItem } from '../../aluguel_item/entities/alguel_item.entity';
import { Clientes } from '../../clientes/entities/clientes.entity';

@Entity({ name: 'tb_alugueis' })
export class Aluguel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  data_inicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  data_fim: Date; //pra ser preenchida so qnd a notinha fechar

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  valor_total: number; // calculado no fechamento da notinha

  @ManyToOne(() => Clientes, (cliente) => cliente.alugueis, {
    eager: true,
    cascade: true,
  })
  cliente: Clientes;

  @OneToMany(() => AluguelItem, (item) => item.aluguel, { cascade: true })
  itens: AluguelItem[];
}
