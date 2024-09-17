import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Parcela, ParcelaStatus } from './entities/parcela.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { ClienteDto } from 'src/cliente/dto/create-cliente.dto';
import { ChangeParcelaStatusDto } from './dto/parcela-status.dto';

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


    //* si existe cliente con el id buscado,que cree la parcela relacionado al id del cliente
    if (cliente) {
      const parcela = this.parcela.create(parcelaDto);
      parcela.cliente = cliente
      await this.parcela.save(parcela);
      return parcela;
    }

    throw new NotFoundException(`no encontramos cliente con id ${id}`)

  }


  // async liberarParcela(id: number, parcelaUpdateDto: Partial<ParcelaDto>) {

  //   const { codigoUnico } = parcelaUpdateDto

  //   try {
  //     const parcelaId = await this.parcela.findOne({
  //       where: { id }
  //     })

  //     const codigoParcela = await this.parcela.findOne({
  //       where: { codigoUnico }
  //     })

  //     if (!parcelaId) {
  //       throw new NotFoundException(`no se encontro parcela con id ${id}`)
  //     }

  //     //comopara si el codigo unico es el que esta almacenado en la db, con el que usa el usuario
  //     if (parcelaId.codigoUnico === parcelaUpdateDto.codigoUnico) {
  //       // this.changeStatusParcela

  //       const result = await this.parcela.update(parcelaUpdateDto, parcelaId);
  //       return {
  //         result,
  //         msg: 'se libero una parcela'
  //       };
  //     } else {
  //       throw new UnauthorizedException('no se puede liberar una parcela,registre bien sus datos, o no tiene bien registrado el codigo unico')
  //     }

  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException('error a la hora de actualizar parcela')
  //   }


  // }


  async changeStatusParcela(changeParcelaStatus: ChangeParcelaStatusDto) {
    const { id, estado, codigoUnico } = changeParcelaStatus;

    try {

      const parcela = await this.parcela.findOne({
        where: { id }
      })

      if (!codigoUnico) {
        throw new BadRequestException('no hay codigo ingresado')
      }
      //si el estado que introduzcamos es el mismo, que solo retorne el estado previo
      // if (parcela.estado === estado) {
      //   return parcela;
      // }



      if (parcela.codigoUnico !== codigoUnico) {
        throw new UnauthorizedException(`no puede autorizar ya que el codigounico es invalido`)
      } else {
        //si no que actualice el estado nuevo que utilicemos
        return this.parcela.update(parcela, {
          estado: estado,
        })
      }




    } catch (error) {
      console.error(error);
      throw new BadRequestException('error a la hora de actualizar parcela')
    }



  }



}
