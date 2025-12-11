import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Clientes } from '../../clientes/entities/clientes.entity';

@Entity({name:'tb_enderecos'})
export class Enderecos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 })
  @IsNotEmpty()
  rua: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  bairro: string;

  @Column()
  @IsNotEmpty()
  cep: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  cidade: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  estado: string;

  @Column()
  @IsNotEmpty()
  numero: string;

  @OneToOne(() => Clientes, (cliente) => cliente.endereco)
  cliente: Clientes;
}
