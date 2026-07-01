import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { SplitterModule } from 'primeng/splitter';

interface City {
  name: string;
  code: string;
}

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
  protected readonly cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];
  protected selectedCity?: City;

  private readonly sidebarStartWidthPx = (9 * 96) / 2.54;

  /**
   * Keeps the opened sidebar at the configured start width after viewport resize.
   */
  @HostListener('window:resize')
  protected keepSidebarFixedWidth(): void {
    if (!this.sidebarOpen()) {
      return;
    }

    const sidebarPercent = this.getSidebarStartPercent();
    this.outerPanelSizes.set([sidebarPercent, 100 - sidebarPercent]);
  }

  /**
   * Opens the sidebar to its start width or closes it back to zero width.
   */
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

  /**
   * Converts the configured sidebar start width from pixels to splitter percent.
   */
  private getSidebarStartPercent(): number {
    const splitterWidth = this.splitterArea?.nativeElement.getBoundingClientRect().width || window.innerWidth;
    const percent = (this.sidebarStartWidthPx / splitterWidth) * 100;

    return Math.min(95, Math.max(1, percent));
  }
}
