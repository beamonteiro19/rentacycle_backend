import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aluguel } from '../entities/aluguel.entity';

@Injectable()
export class AluguelService {
  constructor(
    @InjectRepository(Aluguel)
    private aluguelRepository: Repository<Aluguel>,
  ) {}

  async findAll(): Promise<Aluguel[]> {
    return await this.aluguelRepository.find({
      relations: ['cliente', 'itens', 'itens.equipamento'],
    });
  }

  async findById(id: number): Promise<Aluguel> {
    const aluguel = await this.aluguelRepository.findOne({
      where: { id },
      relations: ['cliente', 'itens', 'itens.equipamento'],
    });

    if (!aluguel) {
      throw new HttpException('Aluguel não encontrado!', HttpStatus.NOT_FOUND);
    }
    return aluguel;
  }

  async create(aluguel: Aluguel): Promise<Aluguel> {
    // aqui depois eu calculo o valor_total no fechamento da notinha
    return await this.aluguelRepository.save(aluguel);
  }

  async update(aluguel: Aluguel): Promise<Aluguel> {
    await this.findById(aluguel.id);
    return await this.aluguelRepository.save(aluguel);
  }

  async delete(id: number): Promise<void> {
    const aluguel = await this.findById(id);
    if (!aluguel) {
      throw new HttpException('Aluguel não encontrado!', HttpStatus.NOT_FOUND);
    }
    await this.aluguelRepository.delete(id);
  }
}