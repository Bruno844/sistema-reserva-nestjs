import { IsBoolean, IsNumber, MinLength } from "class-validator";

export class ParcelaDto {

    @IsNumber()
    codigoUnico: number;

    @IsBoolean()
    estado: boolean = true;


}
