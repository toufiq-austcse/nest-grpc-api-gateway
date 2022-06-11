import {Body, Controller, Get, Inject, OnModuleInit, Param, ParseIntPipe, Post} from '@nestjs/common';
import {PRODUCT_SERVICE_NAME, ProductServiceClient} from "./product.pb";
import {ClientGrpc} from "@nestjs/microservices";
import {CreateProductReqDto, CreateProductResDto, FindOneResDto} from "./dto/product.dto";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";

@Controller('product')
export class ProductController implements OnModuleInit {
    private svc: ProductServiceClient;

    constructor(@Inject(PRODUCT_SERVICE_NAME) private client: ClientGrpc) {
    }

    onModuleInit(): any {
        this.svc = this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME)
    }

    @Post()
    @ApiCreatedResponse({
        type: CreateProductResDto
    })
    async createProduct(@Body() body: CreateProductReqDto) {
        return this.svc.createProduct(body);
    }

    @Get(":id")
    @ApiOkResponse({
        type: FindOneResDto
    })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.svc.findOne({id})
    }

}
