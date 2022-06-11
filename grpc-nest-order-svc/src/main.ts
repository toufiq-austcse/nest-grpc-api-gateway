import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {ORDER_PACKAGE_NAME} from "./order/proto/order.pb";

async function bootstrap() {
    const app = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.GRPC,
        options: {
            url: '0.0.0.0:50052',
            package: ORDER_PACKAGE_NAME,
            protoPath: 'node_modules/grpc-nest-proto/proto/order.proto'
        },
    });
    await app.listen();
}

bootstrap();
