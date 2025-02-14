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
  getActivityAttributes(): Promise<ActivityAttribute[]> {
    return this.attributeService.getActivityAttributes();
  }

  @Post()
  @Version('1')
  createActivity(@Body() body: ActivityAttributeDTO): Promise<ActivityAttribute> {
    return this.attributeService.createActivityAttribute(body);
  }

  @Patch()
  @Version('1')
  updateActivityCategory(@Body() body: ActivityAttributeDTO): Promise<ActivityAttribute | null> {
    return this.attributeService.updateActivityAttribute(body);
  }

  @Delete(':slug')
  @Version('1')
  deleteActivityCategory(@Param('slug') slug: string): Promise<ActivityAttribute> {
    return this.attributeService.deleteActivityAttribute(slug);
  }
}
