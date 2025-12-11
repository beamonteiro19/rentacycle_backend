import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Categorias } from '../entities/categorias.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categorias)
    private categoriaRepository: Repository<Categorias>,
  ) {}

  async findAll(): Promise<Categorias[]> {
    return await this.categoriaRepository.find({ relations: ['equipamentos'] });
  }

  async findById(id: number): Promise<Categorias> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['equipamentos'],
    });

    if (!categoria) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async findByCategory(nome_categoria: string): Promise<Categorias[]> {
    const categorias = await this.categoriaRepository.find({
      where: { nome_categoria: ILike(`%${nome_categoria}%`) },
      relations: ['equipamentos'],
    });

    if (!categorias || categorias.length === 0) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }
    return categorias;
  }

  async create(categoria: Categorias): Promise<Categorias> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categorias): Promise<Categorias> {
    await this.findById(categoria.id);
    return await this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const categoria = await this.findById(id);
    if (!categoria) {
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
    }
    await this.categoriaRepository.delete(id);
  }
}