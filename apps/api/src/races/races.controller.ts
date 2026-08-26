import { Controller, Get, Param } from '@nestjs/common';
import { RacesService } from './races.service';

@Controller('races')
export class RacesController {
  constructor(private readonly racesService: RacesService) {}

  /** GET /api/races — all races for the current season */
  @Get()
  findAll() {
    return this.racesService.findAll();
  }

  /** GET /api/races/:slug — race detail with circuit + sessions */
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.racesService.findBySlug(slug);
  }
}
