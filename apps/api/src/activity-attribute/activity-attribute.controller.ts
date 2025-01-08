import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { PrismaClientService } from 'src/services/prisma-client/prisma-client.service';
import { UtilsService } from 'src/services/utils/utils.service';

enum AttributeTypes {
  LENGTH,
  MASS,
  TIME,
  NUMBER,
  STRING,
}

@Controller('activity-attribute')
export class ActivityAttributeController {
  constructor(
    private clientService: PrismaClientService,
    private utilsService: UtilsService,
  ) {}

  @Get('types')
  @Version('1')
  getActivityAttributeTypes() {
    return Object.values(AttributeTypes).filter((value) => typeof value === 'string');
  }

  @Get()
  @Version('1')
  async getActivityAttributes() {
    return await this.clientService.client.activityAttribute.findMany();
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: any): Promise<void> {
    await this.clientService.client.activityAttribute.create({
      data: {
        title: body.attributeTitle,
        description: body.attributeDescription,
        attributeType: body.attributeType,
      },
    });
  }

  @Patch()
  @Version('1')
  async updateActivityCategory(@Body() body: any): Promise<void> {
    console.log('1111 body', body);
    const id = this.utilsService.getId(body.slug);
    await this.clientService.client.activityAttribute.update({
      where: { id: id },
      data: {
        title: body.attributeTitle,
        description: body.attributeDescription,
        attributeType: body.attributeType,
      },
    });
  }

  @Delete(':id')
  @Version('1')
  async deleteActivityCategory(@Param('id') id: number): Promise<void> {
    await this.clientService.client.activityAttribute.delete({
      where: { id: id },
    });
  }
}
