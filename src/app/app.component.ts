import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sidebarVisible = true; // Sidebar siempre visible
  sidebarExpanded = true;
  title = 'recuperatorio';
  constructor(private renderer: Renderer2, private el: ElementRef) {
    // Escucha los clics en el documento
    this.renderer.listen('document', 'click', this.handleOutsideClick.bind(this));
  }

  // Minimiza el sidebar si se hace clic fuera de él
  handleOutsideClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.sidebarExpanded = false; // Minimiza el sidebar
    }
    
}

toggleSidebar() {
  this.sidebarVisible = !this.sidebarVisible;
}

}
