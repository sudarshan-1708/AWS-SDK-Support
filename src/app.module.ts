import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoDbController } from './dynamo-db/dynamo-db.controller';
import { DynamoDbService } from './dynamo-db/dynamo-db.service';

@Module({
  imports: [],
  controllers: [AppController, DynamoDbController],
  providers: [AppService, DynamoDbService],
})
export class AppModule {}
