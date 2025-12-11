import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ILike, MoreThan, Repository } from 'typeorm';
import { Equipamentos } from '../entities/equipamentos.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquipamentoService {
  constructor(
    @InjectRepository(Equipamentos)
    private equipamentosRepository: Repository<Equipamentos>,
  ) {}

  async findAll(): Promise<Equipamentos[]> {
    return await this.equipamentosRepository.find();
  }

  async findById(id: number): Promise<Equipamentos> {
    const equipamento = await this.equipamentosRepository.findOne({
      where: { id },
    });
    if (!equipamento) {
      throw new HttpException(
        'Equipamento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
    return equipamento;
  }

  async findByName(nome_equipamento: string): Promise<Equipamentos[]> {
    const equipamentos = await this.equipamentosRepository.find({
      where: { nome_equipamento: ILike(`%${nome_equipamento}%`) },
    });

    if (!equipamentos || equipamentos.length === 0) {
      throw new HttpException(
        'Equipamento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
    return equipamentos;
  }

  //aqui é pra mostrar quantos equipamentos tenho disponivel em loja para alugar! é diferente do estoque
  async findAvailable(): Promise<Equipamentos[]> {
    return await this.equipamentosRepository.find({
      where: { disponiveis: MoreThan(0) },
    });
  }

  async findUnavailable(): Promise<Equipamentos[]> {
    //bom pra saber se não tenho nenhum equipamentos na lista em estoque
    return await this.equipamentosRepository.find({
      where: { disponiveis: 0 },
    });
  }

  //   async findByCategoryId(id: number): Promise<Equipamentos[]> {
  //   return await this.equipamentosRepository.find({
  //     where: { categoria: { id } },
  //     relations: { categoria: true },
  //   });
  // }

  //aqui já seria o estoque da loja. inclui todos os equipamentos
  async findByStock(): Promise<number> {
    const equipamentos = await this.equipamentosRepository.find();
    return equipamentos.reduce((total, eq) => total + eq.disponiveis, 0);
  }

  async create(equipamento: Equipamentos): Promise<Equipamentos> {
    return await this.equipamentosRepository.save(equipamento);
  }

  async update(equipamento: Equipamentos): Promise<Equipamentos> {
    await this.findById(equipamento.id);
    return await this.equipamentosRepository.save(equipamento);
  }

  async delete(id: number): Promise<void> {
    const equipamento = await this.findById(id);
    if (!equipamento) {
      throw new HttpException(
        'Equipamento não encontrado!',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.equipamentosRepository.delete(id);
  }
}
