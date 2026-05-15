import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { CountriesComponent } from './countries.component';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesComponent, HttpClientTestingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter countries by search term', () => {
    component.paises = [
      { name: { common: 'Mexico', official: 'United Mexican States' }, region: 'Americas' } as any,
      { name: { common: 'Germany', official: 'Federal Republic of Germany' }, region: 'Europe' } as any
    ];
    component.busqueda = 'Mexico';
    expect(component.paisesFiltrados.length).toBe(1);
  });
});
