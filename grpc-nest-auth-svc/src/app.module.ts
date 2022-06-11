import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        database: 'micro_auth',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
    }), AuthModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
