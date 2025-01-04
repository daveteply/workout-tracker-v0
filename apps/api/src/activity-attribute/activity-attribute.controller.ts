import { Body, Controller, Get, Post, Version } from '@nestjs/common';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';

enum AttributeTypes {
  LENGTH,
  MASS,
  TIME,
  NUMBER,
  STRING,
}

@Controller('activity-attribute')
export class ActivityAttributeController {
  constructor(private clientService: PrismaClientService) {}

  @Get('types')
  @Version('1')
  getActivityAttributeTypes() {
    return Object.values(AttributeTypes).filter((value) => typeof value === 'string');
  }

  @Get()
  @Version('1')
  async getActivityAttributes() {
    return await this.clientService.client.activity_attribute.findMany();
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: any): Promise<void> {
    await this.clientService.client.activity_attribute.create({
      data: {
        attribute_id: body.attributeId,
        description: body.attributeDescription,
        attribute_type: body.attributeType,
      },
    });
  }
}
