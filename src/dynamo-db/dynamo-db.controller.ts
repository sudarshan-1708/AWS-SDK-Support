import { Body, Controller,Delete,Get, Put } from '@nestjs/common';
import { DynamoDbService } from './dynamo-db.service';
import { GetItemDto } from './dto/get-Item.dto';
import { DeleteItem } from './dto/delete-item.dto';

@Controller('home')
export class DynamoDbController {

    constructor(private dynamodbService : DynamoDbService) {}

    @Get()
    getItemData(@Body() getItemDto : GetItemDto ){
        return(this.dynamodbService.getItem(getItemDto));
    }

    @Put()
    putItemData(){
        return(this.dynamodbService.putItem());   
    }
    
    @Delete()
    deleteItemData(@Body() deleteItem : DeleteItem){
        return(this.dynamodbService.deleteItem(deleteItem))
    }

}