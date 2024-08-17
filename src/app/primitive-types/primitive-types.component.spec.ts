import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitiveTypesComponent } from './primitive-types.component';

describe('PrimitiveTypesComponent', () => {
  let component: PrimitiveTypesComponent;
  let fixture: ComponentFixture<PrimitiveTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimitiveTypesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimitiveTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
