import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home';
import

describe('HomeService', () => {
  let service: Home;
  let httpMock: HttpTestingController;
  const mockHomes: Home[] = [
    {}

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Home);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
