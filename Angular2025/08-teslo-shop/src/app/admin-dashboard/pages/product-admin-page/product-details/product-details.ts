import { Component, input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "@products/product-carousel/product-carousel.component";

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent],
  templateUrl: './product-details.html',
})
export class ProductDetails {
  product = input.required<Product>();

  sizes = ['XS','S','M','L','XL','XXL'];
}
