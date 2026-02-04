import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Equipamentos } from '../../equipamentos/entities/equipamentos.entity';

@Entity({ name: 'tb_categorias' })
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nome_categoria: string;

  //acho que a descrição so deve ficar em categoria, pois equipamento herda isso dela
  @Column({ nullable: true })
  descricao_categoria: string;

  @OneToMany(() => Equipamentos, (equipamento) => equipamento.categoria)
  equipamentos: Equipamentos[];
}