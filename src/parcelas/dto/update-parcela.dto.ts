import { PartialType } from '@nestjs/mapped-types';
import { ParcelaDto } from './create-parcela.dto';
import { ParcelaStatus } from '../entities/parcela.entity';

export class UpdateParcelaDto extends PartialType(ParcelaDto) {

    id: number;

    // estado?: ParcelaStatus;

}
