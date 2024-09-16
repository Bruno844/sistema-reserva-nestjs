import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelaDto } from './dto/create-parcela.dto';
import { UpdateParcelaDto } from './dto/update-parcela.dto';
import { Response } from 'express';

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


  @Patch(':id')
  async liberar(
    @Param('id') id: number,
    @Body() parcela: Partial<ParcelaDto>,
    @Res()res: Response
  ){
    const result = await this.parcelasService.liberarParcela(id,parcela);
    res.status(HttpStatus.OK).json({result,msg: 'aprobado'})
  }
  
}
