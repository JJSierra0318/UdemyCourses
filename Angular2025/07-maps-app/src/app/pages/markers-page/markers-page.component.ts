import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl'

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);

  ngAfterViewInit() {
    new Promise((resolve) => setTimeout(() => resolve, 80));

    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;

    const map = new maplibregl.Map({
      container: element,
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: [-122.41, 37.8],
      zoom: 14,
    })

    const marker = new maplibregl.Marker({
      draggable: false,
      color: 'purple'
    })
      .setLngLat([-122.41, 37.8])
      .addTo(map);

    marker.on('dragend', (event) => {

    })

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {

  }
}
