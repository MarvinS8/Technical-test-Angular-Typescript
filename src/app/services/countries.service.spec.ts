import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CountriesService } from './countries.service';

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CountriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllCountries and return data', () => {
    const mockCountries = [{ name: { common: 'Mexico' } }];

    service.getAllCountries().subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpMock.expectOne(req => req.url.includes('/all'));
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });
});
