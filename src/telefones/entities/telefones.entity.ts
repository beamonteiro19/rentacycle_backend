import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clientes } from '../../clientes/entities/clientes.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity({ name: 'tb_telefones' })
export class Telefones {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 20 })
  @ApiProperty()
  numero: string;

  @ManyToOne(() => Clientes, (cliente) => cliente.telefones)
  @ApiProperty({type: () => Clientes})
  cliente: Clientes;
}
