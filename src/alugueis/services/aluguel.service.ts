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
    return await this.aluguelRepository.save(aluguel);
  }

  async update(aluguel: Aluguel): Promise<Aluguel> {
    await this.findById(aluguel.id);
    return await this.aluguelRepository.save(aluguel);
  }

  async closeRent(id: number, data_fim: Date): Promise<Aluguel> {
  const aluguel = await this.aluguelRepository.findOne({
    where: { id },
    relations: ['itens', 'itens.equipamento'],
  });

  if (!aluguel) {
    throw new HttpException('Aluguel não encontrado!', HttpStatus.NOT_FOUND);
  }

  aluguel.data_fim = data_fim;

  let total = 0;
  aluguel.itens.forEach((item) => {
    item.valor_unitario = item.equipamento.valor_base;

    item.valor_total = item.valor_unitario * item.quantidade;

    total += item.valor_total;
  });

  aluguel.valor_total = total;

  return await this.aluguelRepository.save(aluguel);
}
  //endpoint que mostra o tempo real de cada aluguel 
  async calcHours(id: number): Promise<number> {
  const aluguel = await this.aluguelRepository.findOne({
    where: { id },
  });

  if (!aluguel) {
    throw new HttpException('Aluguel não encontrado!', HttpStatus.NOT_FOUND);
  }

  const inicio = new Date(aluguel.data_inicio);
  const agora = new Date();

  const diffMs = agora.getTime() - inicio.getTime();
  const diffHoras = diffMs / (1000 * 60 * 60);

  return diffHoras;
}

  async delete(id: number): Promise<void> {
    const aluguel = await this.findById(id);
    if (!aluguel) {
      throw new HttpException('Aluguel não encontrado!', HttpStatus.NOT_FOUND);
    }
    await this.aluguelRepository.delete(id);
  }
}