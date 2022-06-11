import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OrderModule} from './order/order.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'micro_order',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
    }), OrderModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
