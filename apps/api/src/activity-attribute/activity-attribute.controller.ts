import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
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

  @Patch()
  @Version('1')
  async updateActivityCategory(@Body() body: any): Promise<void> {
    await this.clientService.client.activity_attribute.update({
      where: { attribute_id: body.attributeId },
      data: { description: body.attributeDescription, attribute_type: body.attributeType },
    });
  }

  @Delete(':id')
  @Version('1')
  async deleteActivityCategory(@Param('id') id: string): Promise<void> {
    await this.clientService.client.activity_attribute.delete({
      where: { attribute_id: id },
    });
  }
}
