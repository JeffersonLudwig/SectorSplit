import { Controller, Get } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  /** GET /api/sessions/next — the next upcoming session globally */
  @Get('next')
  findNext() {
    return this.sessionsService.findNext();
  }
}
