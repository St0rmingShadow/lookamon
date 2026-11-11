import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatureCard } from './creature-card';

describe('CreatureCard', () => {
  let component: CreatureCard;
  let fixture: ComponentFixture<CreatureCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatureCard],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatureCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
