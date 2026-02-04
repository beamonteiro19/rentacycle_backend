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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_equipamentos' })
export class Equipamentos {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100 })
  @IsNotEmpty()
  @ApiProperty()
  nome_equipamento: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  @ApiProperty()
  descricao: string;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @ApiProperty()
  quantidade_estoque: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  valor_base: number;

  @Column({ type: 'int' })
  @IsNotEmpty()
  @ApiProperty()
  disponiveis: number;

  @ManyToOne(() => Categorias, (categoria) => categoria.equipamentos, {
    eager: true,
  })
  @ApiProperty({type: () => Categorias})
  categoria: Categorias;

  @OneToMany(() => AluguelItem, (item) => item.equipamento)
  @ApiProperty({type: () => [AluguelItem]})
  itens: AluguelItem[];
}
