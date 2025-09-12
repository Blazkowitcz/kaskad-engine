import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Query,
    Res,
    Req,
    Param,
} from '@nestjs/common';
import {AnnouncerService} from './announcer.service';

@Controller('announce')
export class AnnouncerController {
    constructor(private readonly announceService: AnnouncerService) {
    }

    @Get(':passkey')
    async announce(@Req() request, @Param('passkey') passkey: string) {
        //return await this.announceService.announce(request, passkey);
    }
}
