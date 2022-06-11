import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {AUTH_PACKAGE_NAME} from "./auth/auth.pb";
import {HttpExceptionFilter} from "./auth/filter/http-exception.filter";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
            transport: Transport.GRPC,
            options: {
                url: '0.0.0.0:50051',
                package: AUTH_PACKAGE_NAME,
                protoPath: 'node_modules/grpc-nest-proto/proto/auth.proto'
            }
        }
    )
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));

    await app.listen();
}

bootstrap();
