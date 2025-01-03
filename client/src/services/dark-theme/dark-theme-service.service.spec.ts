import { TestBed } from '@angular/core/testing';

import { DarkThemeSelectorService } from './dark-theme-service.service';

describe('DarkThemeServiceService', () => {
  let service: DarkThemeSelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DarkThemeSelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
