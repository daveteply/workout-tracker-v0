import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { ActivityAttribute } from '@prisma/client';
import { AttributeService } from 'src/activity/services/attribute/attribute.service';
import { ActivityAttributeDTO } from '@repo/dto/src/activity-attribute';

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
  async createActivity(@Body() body: ActivityAttributeDTO): Promise<ActivityAttribute> {
    const activityAttribute: ActivityAttributeDTO = {
      title: body.title,
      description: body.description,
      attributeType: body.attributeType,
    };
    return await this.attributeService.createActivityAttribute(activityAttribute);
  }

  @Patch()
  @Version('1')
  async updateActivityCategory(
    @Body() body: ActivityAttributeDTO,
  ): Promise<ActivityAttribute | null> {
    const activityAttribute: ActivityAttributeDTO = {
      slug: body.slug,
      title: body.title,
      description: body.description,
      attributeType: body.attributeType,
    };
    return await this.attributeService.updateActivityAttribute(activityAttribute);
  }

  @Delete(':s')
  @Version('1')
  async deleteActivityCategory(@Param('s') slug: string): Promise<ActivityAttribute> {
    return await this.attributeService.deleteActivityAttribute(slug);
  }
}
