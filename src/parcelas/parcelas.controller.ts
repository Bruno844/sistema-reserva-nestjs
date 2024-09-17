import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { Response } from 'express';
import { ChangeParcelaStatusDto } from './dto/parcela-status.dto';

@Controller('parcelas')
export class ParcelasController {
  constructor(private readonly parcelasService: ParcelasService) {}

  @Post(':id/new-parcela')
  async createParcela(
    @Param('id', ParseIntPipe) id: number,
    @Body() parcelaDto: ParcelaDto,
  ){
    return this.parcelasService.registerParcela(parcelaDto, id)
  }


  // @Patch(':id')
  // async liberar(
  //   @Param('id') id: number,
  //   @Body() parcela: Partial<ParcelaDto>,
  //   @Res()res: Response
  // ){
  //   const result = await this.parcelasService.liberarParcela(id,parcela);
  //   res.status(HttpStatus.OK).json({result,msg: 'aprobado'})
  // }


  //* controlador que pide tanto el codigo unico como un estado en particular
  @Patch(':id/estado')
  async changeStatus(
    @Param('id') id: number,
    @Body() status: ChangeParcelaStatusDto,
    @Res() res:Response
  ){
    const result = await this.parcelasService.changeStatusParcela(status);
    res.status(HttpStatus.OK).json({msg: `se cambio es estado a ${status.estado}`})
  }

  
  
}
