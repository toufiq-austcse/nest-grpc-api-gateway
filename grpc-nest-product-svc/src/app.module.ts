import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductModule} from './product/product.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'micro_product',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
    }), ProductModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
