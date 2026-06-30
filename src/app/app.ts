import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SplitterModule } from 'primeng/splitter';

interface TreeOption {
  name: string;
}

const selectMaxTextLength = 62;

@Component({
  selector: 'app-root',
  imports: [ButtonModule, FormsModule, SelectModule, SplitterModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  @ViewChild('splitterArea')
  private splitterArea?: ElementRef<HTMLElement>;

  protected readonly sidebarOpen = signal(false);
  protected readonly outerPanelSizes = signal<number[]>([100]);
  protected readonly verticalPanelSizes = [70, 30];
  protected readonly topPanelSizes = [70, 30];
  protected readonly treeOptions: TreeOption[] = [
    { name: 'Semiconductor Global Core' },
    { name: 'Precious Metals' },
    { name: 'Global Defense & Aerospace Chain' },
    { name: 'AI Infrastructure' },
    { name: 'Semiconductor Equipment Materials and Advanced Packaging Global Chain' },
  ];
  protected selectedTree: TreeOption = this.treeOptions[0];

  private readonly sidebarStartWidthPx = (9 * 96) / 2.54;

  protected get treeSelectTextWidth(): string {
    const textLength = this.selectedTree?.name.length || 1;
    const clampedLength = Math.min(selectMaxTextLength, Math.max(textLength, 1));

    return `${clampedLength}ch`;
  }

  @HostListener('window:resize')
  protected keepSidebarFixedWidth(): void {
    if (!this.sidebarOpen()) {
      return;
    }

    const sidebarPercent = this.getSidebarStartPercent();
    this.outerPanelSizes.set([sidebarPercent, 100 - sidebarPercent]);
  }

  protected toggleSidebar(): void {
    if (this.sidebarOpen()) {
      this.sidebarOpen.set(false);
      this.outerPanelSizes.set([100]);
      return;
    }

    const sidebarPercent = this.getSidebarStartPercent();
    this.outerPanelSizes.set([sidebarPercent, 100 - sidebarPercent]);
    this.sidebarOpen.set(true);
  }

  private getSidebarStartPercent(): number {
    const splitterWidth = this.splitterArea?.nativeElement.getBoundingClientRect().width || window.innerWidth;
    const percent = (this.sidebarStartWidthPx / splitterWidth) * 100;

    return Math.min(95, Math.max(1, percent));
  }
}
