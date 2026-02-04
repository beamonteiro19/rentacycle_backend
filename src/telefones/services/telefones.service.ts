import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Telefones } from '../entities/telefones.entity';

@Injectable()
export class TelefoneService {
  constructor(
    @InjectRepository(Telefones)
    private telefoneRepository: Repository<Telefones>,
  ) {}

  async findAll(): Promise<Telefones[]> {
    return await this.telefoneRepository.find({
      relations: {
        cliente: true,
      },
    });
  }

  async findById(id: number): Promise<Telefones> {
    let telefone = await this.telefoneRepository.findOne({
      where: {
        id,
      },
      relations: {
        cliente: true,
      },
    });

    if (!telefone)
      throw new HttpException('Telefone não encontrado!', HttpStatus.NOT_FOUND);
    return telefone;
  }

  // SERA SE FAZ SENTIDO TER UM FINDBYID EM TELEFONE?
  // SE FOR FAZER ALGUMA FILTRAGEM POR DATA DE CADASTRO SIM,
  // MAS MEIO INUTIL
  async findByPhone(numero: string): Promise<Telefones[]> {
    return await this.telefoneRepository.find({
      where: {
        numero: ILike(`%${numero}%`),
      },
    });
  }

  async create(telefone: Telefones): Promise<Telefones> {
    return await this.telefoneRepository.save(telefone);
  }

  async update(telefone: Telefones): Promise<Telefones> {
    let findPhone = await this.findById(telefone.id);

    if (!findPhone || !findPhone.id)
      throw new HttpException('Telefone não encontrado!', HttpStatus.NOT_FOUND);

    return await this.telefoneRepository.save(telefone);
  }

  async delete(id: number): Promise<DeleteResult> {
    let findPhone = await this.findById(id);

    if (!findPhone)
      throw new HttpException('Telefone não encontrado!', HttpStatus.NOT_FOUND);

    return await this.telefoneRepository.delete(id);
  }
}
