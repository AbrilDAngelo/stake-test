import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TabsShellComponent } from './tabs-shell.component';

describe('TabsShellComponent', () => {
  let component: TabsShellComponent;
  let fixture: ComponentFixture<TabsShellComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TabsShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
