import { Test, TestingModule } from '@nestjs/testing';
import { DynamoDbController } from './dynamo-db.controller';

describe('DynamoDbController', () => {
  let controller: DynamoDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamoDbController],
    }).compile();

    controller = module.get<DynamoDbController>(DynamoDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
