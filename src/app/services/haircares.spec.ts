import { TestBed } from '@angular/core/testing';
import { Haircares } from './haircares';

describe('Haircares', () => {
  let service: Haircares;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Haircares);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
