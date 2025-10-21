import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductTable } from "@products/components/product-table/product-table";
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { PaginationComponent } from "@shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTable, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);

  productsPerPage = signal(10);

  productsResource = rxResource({
    request: () => ({
      page: this.paginationService.currentPage(),
      limit: this.productsPerPage(),
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        offset: (request.page - 1) * 10,
        limit: request.limit
      });
    },
  });
}
