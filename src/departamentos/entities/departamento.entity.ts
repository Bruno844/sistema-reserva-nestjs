import { Cliente } from "src/cliente/entities/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";




@Entity('departamentos')
export class Departamento {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'int',
        nullable: false
    })
    nroDepartamento: number;

    @Column({
        type: 'bool',
        nullable: false,
        default: false
    })
    estadoReserva: boolean;


    //muchos a uno, muchos departamentos puede tener un cliente
    @ManyToOne(
        () => Cliente,
        (cliente) => cliente.departamento,
        {eager: true}
    )
    cliente: Cliente

}
