import { Injectable } from '@nestjs/common';
import { UtilsService } from 'src/services/utils/utils.service';
import { PrismaClientActivityService } from '../prisma-client-activity/prisma-client-activity.service';
import { Member } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(
    private prismaClientActivityService: PrismaClientActivityService,
    private utilsService: UtilsService,
  ) {}

  async getMembers(): Promise<Member[]> {
    return await this.prismaClientActivityService.client.member.findMany();
  }
}
