import { Module } from '@nestjs/common';
import { ParcelasService } from './parcelas.service';
import { ParcelasController } from './parcelas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcela } from './entities/parcela.entity';
import { ClienteModule } from 'src/cliente/cliente.module';

@Module({
  controllers: [ParcelasController],
  providers: [ParcelasService],
  imports:[
    TypeOrmModule.forFeature([Parcela]),
    ClienteModule
  ],
  exports:[
    ParcelasService,
    TypeOrmModule
  ]
})
export class ParcelasModule {}
