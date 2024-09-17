import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { ParcelaStatusList } from "../enum/parcelas-enum";
import { ParcelaStatus } from "../entities/parcela.entity";

export class ParcelaDto {

    @IsNumber()
    @IsUUID(4)
    @IsOptional()
    codigoUnico: number;


    @IsString()
    @IsNotEmpty({
        message: 'coloca un nombre'
    })
    nombreParcela: string;

    @IsEnum(
        ParcelaStatusList,{
            message: `posible estados como ${ParcelaStatusList}`
        }
    )
    @IsOptional()
    estado: ParcelaStatus = ParcelaStatus.PENDIENTE;


}
