import { Component, ElementRef, Renderer2, ViewChildren, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @ViewChildren('imageElement') imageElements!: QueryList<ElementRef>;
  private lastScrollTop = 0;

  constructor(private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScale = 1.5;
    const minScale = 1;
    const scaleRange = maxScale - minScale;

    // Calculate the viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportTop = scrollTop;
    const viewportBottom = scrollTop + viewportHeight;

    this.imageElements.forEach(imageElement => {
      const image = imageElement.nativeElement;

      // Get image position relative to the viewport
      const imageRect = image.getBoundingClientRect();
      const imageTop = imageRect.top + scrollTop;
      const imageBottom = imageRect.bottom + scrollTop;

      // Check if the image is in the lower part of the viewport
      if (imageTop > viewportBottom || imageBottom < viewportTop) {
        // Image is outside the viewport
        return; // Skip processing for images not in the viewport
      }

      // Adjust the scale based on scroll position
      let scaleFactor = minScale + ((scrollTop - imageTop + viewportHeight / 2) / 1000) * scaleRange;

      // Ensure the scale factor stays within the desired range
      if (scaleFactor > maxScale) {
        scaleFactor = maxScale;
      } else if (scaleFactor < minScale) {
        scaleFactor = minScale;
      }

      this.renderer.setStyle(image, 'transform', `scale(${scaleFactor})`);
    });
  }
}
