import { Body, Controller, Delete, Get, Param, Patch, Post, Version } from '@nestjs/common';
import { MemberService } from 'src/activity/services/member/member.service';

@Controller('members')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @Version('1')
  getMember() {
    return this.memberService.getMembers();
  }
}
