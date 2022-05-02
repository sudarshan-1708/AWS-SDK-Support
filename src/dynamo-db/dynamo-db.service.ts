import { Injectable } from '@nestjs/common';
import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, PutItemCommand, PutItemCommandInput, } from '@aws-sdk/client-dynamodb';
import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { GetItemDto } from './dto/get-Item.dto';
import { DeleteItem } from './dto/delete-item.dto';

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
                if(data.Item != undefined) { return data.Item ;}
                else{return 'Item does not exist';}
            }catch(err){
                console.log({err});
                return err;
            }
        }

        async putItem(){
            const param : PutItemCommandInput = {
                TableName : "Music",
                Item : {
                    "Artist" : {S:"a"},
                    "SongTitle" : {S:"b"},
                    "MovieIn" : {S:"Album"}
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
                TableName : getParam.TableName,
                Key : {
                        Artist : {S:getParam.PrimaryKey},
                        SongTitle : {S:getParam.ShortKey}
                }
            }

            try{
                const data = await client.send(new DeleteItemCommand(param));
                console.log(data.$metadata);
                return data.$metadata;
            }catch(err){console.log(err);}
        }

}