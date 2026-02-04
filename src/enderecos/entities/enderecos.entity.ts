import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Clientes } from '../../clientes/entities/clientes.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name:'tb_enderecos'})
export class Enderecos {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 250 })
  @IsNotEmpty()
  @ApiProperty()
  rua: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  @ApiProperty()
  bairro: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty()
  cep: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  @ApiProperty()
  cidade: string;

  @Column({ length: 100 })
  @IsNotEmpty()
  @ApiProperty()
  estado: string;

  @Column()
  @IsNotEmpty()
  @ApiProperty()
  numero: string;

  @OneToOne(() => Clientes, (cliente) => cliente.endereco)
  @ApiProperty({type: () => [Clientes]})
  cliente: Clientes;
}
