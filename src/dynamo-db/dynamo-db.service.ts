import { Injectable } from '@nestjs/common';
import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, PutItemCommand, PutItemCommandInput, } from '@aws-sdk/client-dynamodb';
import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { GetItemDto } from './dto/get-Item.dto';
import { DeleteItem } from './dto/delete-item.dto';
import { PutItemDto } from './dto/put-item.dto';

const client = new DynamoDBClient({region:'us-east-1'});

// const command = new GetItemCommand(param);

@Injectable()
export class DynamoDbService {
    
        async getItem(getParams : GetItemDto) {
            const param : GetItemCommandInput= {
                TableName: 'Jobmanager',
                Key:{
                    UniqueID : {S:getParams.UniqueId}
                },
               // AttributesToGet : []
            }
            //const command = new GetItemCommand(param);
            try{
                const data = await client.send(new GetItemCommand(param));
                console.log(data.Item);
                if(data.Item != undefined) { return data.Item ;}
                else{return 'Item does not exist';}
            }catch(err){
                console.log({err});
                return err;
            }
        }

        async putItem(getParam : PutItemDto){
            const param : PutItemCommandInput = {
                TableName : 'Jobmanager',       
                Item : {
                    UniqueID : {S:getParam.UniqueId},
                    KeyValue : {S:getParam.KeyValue},
                    TTL : {N:getParam.expiresAt}
                }
            }
            try{
                const data = await client.send(new PutItemCommand(param));
                console.log(data.$metadata);
                return data.$metadata;
            }catch(err){console.log(err);}
        }

        async deleteItem(getParam : DeleteItem){

            const param : DeleteItemCommandInput = {
                TableName : 'Jobmanager',
                Key : {
                    UniqueID : {S:getParam.UniqueId}
                }
            }
            try{
                const data = await client.send(new DeleteItemCommand(param));
                console.log(data.$metadata);
                return data.$metadata , {"message" : "Item Deleted"};
            }catch(err){console.log(err);}
        }

}