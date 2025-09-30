import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsService } from '@products/components/product-card/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsResponse } from '@products/components/product-card/interfaces/product.interface';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  productsService = inject(ProductsService);
  productsResource = rxResource({
    request: () => ({}),
    loader: ({request}) => {
      return this.productsService.getProducts({});
    }, 
  });
}
