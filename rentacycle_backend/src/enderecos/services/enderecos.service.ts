import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Enderecos } from '../entities/enderecos.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Enderecos)
    private enderecoRepository: Repository<Enderecos>,
  ) {}

  async findAll(): Promise<Enderecos[]> {
    return await this.enderecoRepository.find({ relations: { cliente: true } });
  }

  async findById(id: number): Promise<Enderecos> {
    const endereco = await this.enderecoRepository.findOne({
      where: { id },
      relations: { cliente: true },
    });

    if (!endereco) {
      throw new HttpException('Endereço não encontrado!', HttpStatus.NOT_FOUND);
    }
    return endereco;
  }

  async create(endereco: Enderecos): Promise<Enderecos> {
    return await this.enderecoRepository.save(endereco);
  }

  async update(endereco: Enderecos): Promise<Enderecos> {
    await this.findById(endereco.id);
    return await this.enderecoRepository.save(endereco);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.enderecoRepository.delete(id);
  }
}