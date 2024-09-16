import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcela } from './entities/parcela.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ClienteDto } from 'src/cliente/dto/create-cliente.dto';

@Injectable()
export class ParcelasService {

  constructor(
    @InjectRepository(Cliente) private readonly cliente: Repository<Cliente>,
    @InjectRepository(Parcela) private readonly parcela: Repository<Parcela>
  ) { }

  async registerParcela(parcelaDto: ParcelaDto, id: number) {

    const cliente = await this.cliente.findOne({
      where: { id }
    });
    console.log(cliente, id);

    if (cliente) {
      const parcela = this.parcela.create(parcelaDto);
      parcela.cliente = cliente
      await this.parcela.save(parcela);
      return parcela;
    }

    throw new NotFoundException(`no encontramos cliente con id ${id}`)

  }


  async liberarParcela(id: number, parcelaUpdateDto: Partial<ParcelaDto>) {

    const { codigoUnico } = parcelaUpdateDto

    try {
      const parcelaId = await this.parcela.findOne({
        where: { id }
      })

      const codigoParcela = await this.parcela.findOne({
        where: { codigoUnico }
      })

      if (!parcelaId) {
        throw new NotFoundException(`no se encontro parcela con id ${id}`)
      }

      if (parcelaId.estado === true && parcelaId.codigoUnico === parcelaUpdateDto.codigoUnico) {
        const result = await this.parcela.update(parcelaUpdateDto, parcelaId);
        return {
          result,
          msg: 'se libero una parcela'
        };
      }else{
        throw new UnauthorizedException('no se puede liberar una parcela,registre bien sus datos')
      }

    } catch (error) {
      console.error(error);
      throw new BadRequestException('error a la hora de actualizar parcela')
    }


  }



}
