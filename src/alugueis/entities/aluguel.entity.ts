import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { AluguelItem } from '../../aluguel_item/entities/alguel_item.entity';
import { Clientes } from '../../clientes/entities/clientes.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_alugueis' })
export class Aluguel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ type: 'timestamp' })
  @ApiProperty()
  data_inicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty()
  data_fim: Date; //pra ser preenchida so qnd a notinha fechar

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty()
  valor_total: number; // calculado no fechamento da notinha

  @ManyToOne(() => Clientes, (cliente) => cliente.alugueis, {
    eager: true,
    cascade: true,
  })
  @ApiProperty({ type: () => Clientes })
  cliente: Clientes;

  @OneToMany(() => AluguelItem, (item) => item.aluguel, { cascade: true })
  @ApiProperty({ type: () => [AluguelItem] })
  itens: AluguelItem[];
}
