import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Response } from 'express';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}


  @Post('/new')
  async register(
    @Body() cliente: ClienteDto, @Res() response: Response
  ){
    const result = await this.clienteService.registerCliente(cliente);
    response.status(HttpStatus.CREATED).json({result,msg: 'creado con exito'})
  }

}
