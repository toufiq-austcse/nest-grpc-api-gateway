import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {PRODUCT_PACKAGE_NAME} from "./product/product.pb";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:50053',
            package: PRODUCT_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/product.proto'
        }
    })
    app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
    await app.listen();
}

bootstrap();
