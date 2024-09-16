import { PartialType } from '@nestjs/mapped-types';
import { ClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(ClienteDto) {
    
}
