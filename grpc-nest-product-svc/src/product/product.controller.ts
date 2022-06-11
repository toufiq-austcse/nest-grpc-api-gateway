import {Body, Controller} from '@nestjs/common';
import {ProductService} from "./product.service";
import {GrpcMethod} from "@nestjs/microservices";
import {PRODUCT_SERVICE_NAME} from "./product.pb";
import {CreateProductRequestDto, FindOneRequestDto} from "./product.dto";

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {
    }

    @GrpcMethod(PRODUCT_SERVICE_NAME, 'createProduct')
    create(@Body() body: CreateProductRequestDto) {
        return this.productService.createProduct(body)
    }

    @GrpcMethod(PRODUCT_SERVICE_NAME, 'findOne')
    findOne(@Body() body: FindOneRequestDto) {
        return this.productService.findOne(body)
    }

}
