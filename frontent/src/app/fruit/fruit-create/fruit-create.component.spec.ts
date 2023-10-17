import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitCreateComponent } from './fruit-create.component';

describe('FruitCreateComponent', () => {
  let component: FruitCreateComponent;
  let fixture: ComponentFixture<FruitCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitCreateComponent]
    });
    fixture = TestBed.createComponent(FruitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
