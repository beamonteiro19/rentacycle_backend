import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipamentos } from '../../equipamentos/entities/equipamentos.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categorias' })
export class Categorias {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 100, unique: true })
  @ApiProperty()
  nome_categoria: string;

  //acho que a descrição so deve ficar em categoria, pois equipamento herda isso dela
  @Column({ nullable: true })
  @ApiProperty()
  descricao_categoria: string;

  @OneToMany(() => Equipamentos, (equipamento) => equipamento.categoria)
  @ApiProperty({ type: () => [Equipamentos] })
  equipamentos: Equipamentos[];
}