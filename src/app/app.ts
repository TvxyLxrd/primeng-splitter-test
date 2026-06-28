import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitterModule } from 'primeng/splitter';

interface CheckboxMenuItem {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, MultiSelectModule, SplitterModule],
  templateUrl: './app.html',
})
export class App {
  protected readonly checkboxMenuItems: CheckboxMenuItem[] = [
    { name: 'Market value', code: 'marketValue' },
    { name: 'Daily change', code: 'dailyChange' },
    { name: 'Dividend yield', code: 'dividendYield' },
    { name: 'P/E ratio', code: 'peRatio' },
    { name: 'Beta', code: 'beta' },
  ];

  protected selectedItems: CheckboxMenuItem[] = [];
}
