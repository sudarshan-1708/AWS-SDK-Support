import { Injectable } from '@nestjs/common';
import { DeleteItemCommand, DeleteItemCommandInput, DynamoDBClient, PutItemCommand, PutItemCommandInput, QueryCommandInput, } from '@aws-sdk/client-dynamodb';
import { GetItemCommand, GetItemCommandInput } from '@aws-sdk/client-dynamodb';
import { GetItemDto } from './dto/get-Item.dto';
import { DeleteItem } from './dto/delete-item.dto';
import { PutItemDto } from './dto/put-item.dto';
import { QueryCommand} from '@aws-sdk/client-dynamodb';

const client = new DynamoDBClient({region:'us-east-1'});


// const command = new GetItemCommand(param);

@Injectable()
export class DynamoDbService {
    

        // Get all the attributes information for given PrimaryKey value present in DynamoDb table 

        async getItem(getParams : GetItemDto){
            var currentTime : Number = Number(Math.floor(new Date().getTime() / 1000));
            const param : GetItemCommandInput = {
                TableName : 'Jobmanager',
                Key : {
                    UniqueID : {S:getParams.UniqueId}
                }
            }
        try{
            var data = await client.send(new GetItemCommand(param));
            

            var ttlTime = data.Item.exp;
            if(Number(ttlTime.N) >= currentTime){      
                return data.Item 
            }
            else{
                return "Item not present";
            }
                
            // return data.Item;   1653319032 >  1653311587
        }catch(err){
            console.log(err);
        }
    }  
        
    


        // Insert item in DynamoDb Table. 
        // Constraint: The below code is fixed for Jobmanager table with only 3 columns : UniqueId(PK), KeyValue and TTL
        // If one want to add extra columns then we have to update DTO anf below function code

        async putItem(getParam : PutItemDto){
            const param : PutItemCommandInput = {
                TableName : 'Jobmanager',       
                Item : {
                    UniqueID : {S:getParam.UniqueId},
                    KeyValue : {S:getParam.KeyValue},
                    exp : {N:getParam.expiresAt}
                }
            }
            try{
                const data = await client.send(new PutItemCommand(param));
                console.log(data.$metadata);
                return data.$metadata;
            }catch(err){console.log(err);}
        }

        // Delete the item from the DynamoDb table for respective given PrimaryKey value.

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
                return data.$metadata ;
            }catch(err){console.log(err);}
        }


        // Search for item in dynamoDb table. If item exist then return : 0, else : "Item does not exit"

        async searchItem(getParam : GetItemDto){
            const param : GetItemCommandInput = {
                TableName : 'Jobmanager',
                Key : {
                    UniqueID : {S:getParam.UniqueId}
                }
            }

            try{
                const result = await client.send(new GetItemCommand(param))
                if(result.Item != undefined){return 0;}
                else {return {"Message" : "Item does not exist"};}
            }catch(err){console.log(err);
            }
        }

}