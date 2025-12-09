import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clientes } from '../../clientes/entities/clientes.entity';
@Entity({ name: 'tb_telefones' })
export class Telefones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  numero: string;

  @ManyToOne(() => Clientes, (cliente) => cliente.telefones)
  cliente: Clientes;
}
