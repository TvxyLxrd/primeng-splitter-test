import { Component, ElementRef, HostListener, ViewChild, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, SplitterModule],
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

  private readonly sidebarStartWidthPx = (10 * 96) / 2.54;

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
