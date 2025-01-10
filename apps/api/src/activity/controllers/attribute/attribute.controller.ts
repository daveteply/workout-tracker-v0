import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ActivityAttribute } from '@prisma/client';
import { AttributeDO } from 'src/activity/models/attribute';
import { AttributeService } from 'src/activity/services/attribute/attribute.service';

@Controller('attributes')
export class AttributeController {
  constructor(private attributeService: AttributeService) {}

  @Get('types')
  @Version('1')
  getActivityAttributeTypes() {
    return this.attributeService.getActivityAttributeTypes();
  }

  @Get()
  @Version('1')
  async getActivityAttributes() {
    return await this.attributeService.getActivityAttributes();
  }

  @Post()
  @Version('1')
  async createActivity(@Body() body: any): Promise<ActivityAttribute> {
    const activityAttributeDO: AttributeDO = {
      title: body.attributeTitle,
      description: body.attributeDescription,
      attributeType: body.attributeType,
    };
    return await this.attributeService.createActivityAttribute(activityAttributeDO);
  }

  @Patch()
  @Version('1')
  async updateActivityCategory(@Body() body: any): Promise<ActivityAttribute | null> {
    const activityAttributeDO: AttributeDO = {
      slug: body.slug,
      title: body.attributeTitle,
      description: body.attributeDescription,
      attributeType: body.attributeType,
    };
    return await this.attributeService.updateActivityAttribute(activityAttributeDO);
  }

  @Delete(':s')
  @Version('1')
  async deleteActivityCategory(@Param('s') slug: string): Promise<ActivityAttribute> {
    return await this.attributeService.deleteActivityAttribute(slug);
  }
}
