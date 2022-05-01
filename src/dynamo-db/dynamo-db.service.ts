import { Injectable } from '@nestjs/common';
import { DynamoDBClient, } from '@aws-sdk/client-dynamodb';
import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { GetItemDto } from './dto/get-Item.dto';

const client = new DynamoDBClient({region:'us-east-1'});

// const command = new GetItemCommand(param);

@Injectable()
export class DynamoDbService {

        async getItem(getParams : GetItemDto) {
            const param : GetItemCommandInput= {
                TableName: getParams.tableName,
                Key:{
                    Artist : {S:getParams.PrimaryKey},
                    SongTitle : {S:getParams.ShortKey}
                },
               // AttributesToGet : []
            }
            //const command = new GetItemCommand(param);
            try{
                const data = await client.send(new GetItemCommand(param));
                console.log(data.Item);
                return data.Item;
            }catch(err){
                console.log({err});
                return err;
            }
        }

}