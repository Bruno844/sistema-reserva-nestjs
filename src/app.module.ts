import { Module } from '@nestjs/common';
import { ClienteModule } from './cliente/cliente.module';
import { DepartamentosModule } from './departamentos/departamentos.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from './config/db/database.config';
import { ParcelasModule } from './parcelas/parcelas.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot(db),
    ClienteModule, 
    DepartamentosModule, ParcelasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
