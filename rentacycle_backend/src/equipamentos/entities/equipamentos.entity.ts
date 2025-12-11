import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categorias } from '../../categorias/entities/categorias.entity';
import { AluguelItem } from '../../aluguel_item/entities/alguel_item.entity';

@Entity({ name: 'tb_equipamentos' })
export class Equipamentos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  nome_equipamento: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  descricao: string;

  @Column({ type: 'int' })
  @IsNotEmpty()
  quantidade_estoque: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_base: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  disponiveis: number;

  @ManyToOne(() => Categorias, (categoria) => categoria.equipamentos, {
    eager: true,
  })
  categoria: Categorias;

  @OneToMany(() => AluguelItem, (item) => item.equipamento)
  itens: AluguelItem[];
}
