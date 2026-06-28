import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { SplitterModule } from 'primeng/splitter';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';

interface CheckboxMenuItem {
  name: string;
  code: string;
}

@Component({
  selector: 'app-root',
  imports: [ButtonModule, FormsModule, MultiSelectModule, SplitterModule, TreeModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild('splitterFrame')
  private splitterFrame?: ElementRef<HTMLElement>;

  protected readonly sidebarOpen = signal(false);
  protected readonly outerPanelSizes = signal<number[]>([100]);
  protected readonly mainPanelSizes = [70, 30];
  protected readonly workPanelSizes = [68, 32];

  protected readonly checkboxMenuItems: CheckboxMenuItem[] = [
    { name: 'Market value', code: 'marketValue' },
    { name: 'Daily change', code: 'dailyChange' },
    { name: 'Dividend yield', code: 'dividendYield' },
    { name: 'P/E ratio', code: 'peRatio' },
    { name: 'Beta', code: 'beta' },
  ];

  protected selectedItems: CheckboxMenuItem[] = [];

  protected readonly treeNodes: TreeNode[] = [
    {
      label: 'Groups',
      expanded: true,
      children: [
        { label: 'Tree' },
        { label: 'Instruments' },
      ],
    },
  ];

  private readonly sidebarStartWidthPx = (11 * 96) / 2.54;

  protected toggleSidebar(): void {
    if (this.sidebarOpen()) {
      this.sidebarOpen.set(false);
      this.outerPanelSizes.set([100]);
      return;
    }

    const sidebarPercent = this.getSidebarStartPercent();
    this.sidebarOpen.set(true);
    this.outerPanelSizes.set([sidebarPercent, 100 - sidebarPercent]);
  }

  private getSidebarStartPercent(): number {
    const width = this.splitterFrame?.nativeElement.getBoundingClientRect().width || window.innerWidth;
    const percent = (this.sidebarStartWidthPx / width) * 100;

    return Math.min(90, Math.max(0.5, percent));
  }
}
