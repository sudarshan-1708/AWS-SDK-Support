import { Body, Controller,Get } from '@nestjs/common';
import { DynamoDbService } from './dynamo-db.service';
import { GetItemDto } from './dto/get-Item.dto';

@Controller('home')
export class DynamoDbController {

    constructor(private dynamodbService : DynamoDbService) {}

    @Get()
    getItem(@Body() getItemDto : GetItemDto ){
        return(this.dynamodbService.getItem(getItemDto));
    }
    

}