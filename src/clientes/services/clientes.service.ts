import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from '../entities/clientes.entity';
import { TelefoneService } from '../../telefones/services/telefones.service';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Clientes)
    private clienteRepository: Repository<Clientes>,
    private telefoneService: TelefoneService,
  ) {}

  async findAll(): Promise<Clientes[]> {
    return await this.clienteRepository.find({
      relations: {
        telefones: true,
      },
    });
  }

  async findById(id: number): Promise<Clientes> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: { telefones: true },
    });
    if (!cliente) {
      throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);
    }
    return cliente;
  }

  async findByClientName(nome_completo: string): Promise<Clientes[]> {
    return await this.clienteRepository.find({
      where: {
        nome_completo: ILike(`%${nome_completo}`),
      },
    });
  }

  async findByCpf(cpf: string): Promise<Clientes[]> {
    return await this.clienteRepository.find({
      where: {
        cpf: ILike(`%${cpf}`),
      },
    });
  }

  async findByRg(rg: string): Promise<Clientes[]> {
    return await this.clienteRepository.find({
      where: {
        rg: ILike(`%${rg}`),
      },
    });
  }

  async create(cliente: Clientes): Promise<Clientes> {
    return await this.clienteRepository.save(cliente);
  }

  async update(cliente: Clientes): Promise<Clientes> {
    await this.findById(cliente.id);

    return await this.clienteRepository.save(cliente);
  }

  async delete(id: number): Promise<DeleteResult> {
    let findClient = await this.findById(id);
    if (!findClient)
      throw new HttpException('Cliente não encontrado!', HttpStatus.NOT_FOUND);

    return await this.clienteRepository.delete(id);
  }
}
