import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import maplibregl from 'maplibre-gl';

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
  styles: `
    div {
      width: 100%;
      height: 260px;
    }
  `
})
export class MiniMapComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);

  ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;

    const element = this.divElement()!.nativeElement;

    const map = new maplibregl.Map({
      container: element,
      style: 'https://tiles.openfreemap.org/styles/bright',
      center: this.lngLat(),
      zoom: this.zoom(),
      interactive: false,
      pitch: 30,
    })

    new maplibregl.Marker().setLngLat(this.lngLat()).addTo(map);
  }
}
