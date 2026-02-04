import { IsNotEmpty, Length, Matches } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Telefones } from '../../telefones/entities/telefones.entity';
import { Aluguel } from '../../alugueis/entities/aluguel.entity';
import { Enderecos } from '../../enderecos/entities/enderecos.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_clientes' })
export class Clientes {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150 })
  @ApiProperty()
  nome_completo: string;

  @IsNotEmpty()
  @Length(11, 14)
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' })
  @Column({ length: 14, unique: true })
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @Column({ length: 20, unique: true })
  @ApiProperty()
  rg: string;

  @OneToMany(() => Telefones, (telefone) => telefone.cliente, {
    cascade: true,
    eager: true,
  })
  @ApiProperty({ type: () => [Telefones] })
  telefones: Telefones[];

  @OneToOne(() => Enderecos, { cascade: true, eager: true })
  @JoinColumn()
  @ApiProperty({ type: () => Enderecos })
  endereco: Enderecos;

  @Column({
    type: 'enum',
    enum: ['ativo', 'banido'],
    default: 'ativo',
  })
  @ApiProperty()
  status: 'ativo' | 'banido';

  @Column({ type: 'text', nullable: true })
  @ApiProperty()
  motivo_banimento: string;

  @Column({ type: 'timestamp', nullable: true })
  @ApiProperty()
  data_banimento: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  data_cadastro: Date;

  @OneToMany(() => Aluguel, (aluguel) => aluguel.cliente)
  @ApiProperty({ type: () => [Aluguel] })
  alugueis: Aluguel[];
}

// PENSAMENTO: Cliente → Aluguel → AluguelItem → Equipamento → Categoria
