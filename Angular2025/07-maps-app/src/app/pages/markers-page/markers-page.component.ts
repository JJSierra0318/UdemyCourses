import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import maplibregl, { LngLatLike } from 'maplibre-gl'
import { v4 as uuid } from 'uuid'

interface Marker {
  id: string;
  mapMarker: maplibregl.Marker
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<maplibregl.Map | null>(null);
  markers = signal<Marker[]>([])

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

    /* const marker = new maplibregl.Marker({
      draggable: false,
      color: 'purple'
    })
      .setLngLat([-122.41, 37.8])
      .addTo(map);

    marker.on('dragend', (event) => {

    }) */

    this.mapListeners(map);
  }

  mapListeners(map: maplibregl.Map) {

    map.on('click', (event) => { this.mapClick(event) });

    this.map.set(map);
  }

  mapClick(event: maplibregl.MapMouseEvent) {

    if (!this.map()) return;
    const map = this.map()!;
    const coords = event.lngLat;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const mapMarker = new maplibregl.Marker({
      draggable: false,
      color
    })
    .setLngLat(coords)
    .addTo(map);

    const newMarker: Marker = {
      id: uuid(),
      mapMarker
    };

    this.markers.update((markers) => [...markers, newMarker]);
  }

  flyToMarker(lngLat: LngLatLike) {
    if (!this.map()) return;

    this.map()?.flyTo({
      center: lngLat
    });
  }
}
