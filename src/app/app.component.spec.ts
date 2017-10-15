import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { AppComponent } from './app.component';

describe('App', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]})
      .compileComponents();

      fixture = TestBed.createComponent(AppComponent);
      comp = fixture.componentInstance;
  });

  it ('should create AppComponent', () => {
    expect(comp).toBeDefined();//toBe(true, 'should create AppComponent');
  });
});
