import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('parcelas')
export class Parcela {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'integer',
        nullable: false,
        unique: true
    })
    codigoUnico: number;

    @Column({
        type: 'bool',
        default: false
    })
    estado: boolean;


    //muchos a uno, muchas parcelas puede tener un cliente
     @ManyToOne(
        () => Cliente,
        (cliente) => cliente.parcela,
        {eager: true}
    )
    cliente: Cliente;


}
