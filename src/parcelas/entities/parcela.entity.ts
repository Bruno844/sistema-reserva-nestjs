import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ParcelaStatus {
    PENDIENTE = 'PENDIENTE',
    OCUPADA = 'OCUPADA',
    LIBRE = 'LIBRE'
}

@Entity('parcelas')
export class Parcela {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50
    })
    nombreParcela: string;

    @Column({
        type: 'uuid',
        nullable: false,
        unique: true,
        generated: 'uuid'
    })
    codigoUnico: number;

    @Column({
        type: 'enum',
        enum: ParcelaStatus,
        default: ParcelaStatus.PENDIENTE
    })
    estado: ParcelaStatus;


    //muchos a uno, muchas parcelas puede tener un cliente
     @ManyToOne(
        () => Cliente,
        (cliente) => cliente.parcela,
        {eager: true}
    )
    cliente: Cliente;


}
