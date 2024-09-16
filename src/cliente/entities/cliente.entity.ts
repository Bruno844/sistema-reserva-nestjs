import { Departamento } from "src/departamentos/entities/departamento.entity";
import { Parcela } from "src/parcelas/entities/parcela.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('clientes')
export class Cliente {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 100
    })
    nombre: string;


    @Column({
        type: 'varchar',
        nullable: false,
        length: 100
    })
    apellido: string;


    //un cliente puede tener muchos departamentos
    @OneToMany(
        () => Departamento,
        (departamento) => departamento.cliente
    )
    departamento: Departamento;


    //un cliente puede tener muchas parcelas
    @OneToMany(
        () => Parcela,
        (parcela) => parcela.cliente
    )
    parcela: Parcela

}
