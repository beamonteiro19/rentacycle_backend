import { IsNotEmpty, Length, Matches } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Telefones } from '../../telefones/entities/telefones.entity';
import { Enderecos } from '../../enderecos/enderecos.module';
@Entity({ name: 'tb_clientes' })
export class Clientes {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150 })
  nome_completo: string;

  @IsNotEmpty()
  @Length(11, 14)
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' })
  @Column({ length: 14, unique: true })
  cpf: string;

  @IsNotEmpty()
  @Column({ length: 20, unique: true })
  rg: string;

  @OneToMany(() => Telefones, (telefone) => telefone.cliente, {
    cascade: true,
    eager: true,
  })
  telefones: Telefones[];

  @OneToOne(() => Enderecos, { cascade: true, eager: true })
  @JoinColumn()
  endereco: Enderecos;

  @Column({ default: true })
  ativo: boolean;
}
