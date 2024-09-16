import { Injectable } from '@nestjs/common';
import { ClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {

    constructor(
        @InjectRepository(Cliente) private readonly cliente: Repository<ClienteDto>
    ){}


    async registerCliente(clienteDto: ClienteDto){

        try {

            const result = await this.cliente.save(clienteDto);
            return result;
            
        } catch (error) {
            console.error(error)
        }

    }
  
}
