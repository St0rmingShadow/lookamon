import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultRow } from './search-result-row';

describe('SearchResultRow', () => {
  let component: SearchResultRow;
  let fixture: ComponentFixture<SearchResultRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchResultRow],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
