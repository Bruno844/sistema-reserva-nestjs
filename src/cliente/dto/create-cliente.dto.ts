import { IsString, MinLength } from "class-validator";

export class ClienteDto {

    @IsString()
    @MinLength(4)
    nombre:string;


    @IsString()
    @MinLength(4)
    apellido:string;
}
