import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AluguelItem } from '../entities/alguel_item.entity';

@Injectable()
export class AluguelItemService {
  constructor(
    @InjectRepository(AluguelItem)
    private aluguelItemRepository: Repository<AluguelItem>,
  ) {}

  async findAll(): Promise<AluguelItem[]> {
    return await this.aluguelItemRepository.find({ relations: ['aluguel', 'equipamento'] });
  }

  async findById(id: number): Promise<AluguelItem> {
    const item = await this.aluguelItemRepository.findOne({
      where: { id },
      relations: ['aluguel', 'equipamento'],
    });
    if (!item) {
      throw new HttpException('Item de aluguel não encontrado!', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async create(item: AluguelItem): Promise<AluguelItem> {
    return await this.aluguelItemRepository.save(item);
  }

  async update(item: AluguelItem): Promise<AluguelItem> {
    await this.findById(item.id);
    return await this.aluguelItemRepository.save(item);
  }

  async delete(id: number): Promise<void> {
    const item = await this.findById(id);
    if (!item) {
      throw new HttpException('Item de aluguel não encontrado!', HttpStatus.NOT_FOUND);
    }
    await this.aluguelItemRepository.delete(id);
  }
}