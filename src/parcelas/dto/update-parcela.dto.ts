import { PartialType } from '@nestjs/mapped-types';
import { ParcelaDto } from './create-parcela.dto';
import { EstadoParcelaI } from '../interfaces/estado-parcela.interface';

export class UpdateParcelaDto extends PartialType(ParcelaDto) {

    estado?: boolean;

}
