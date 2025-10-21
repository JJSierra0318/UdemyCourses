import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { delay, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private http = inject(HttpClient);

  private productsCache = new Map<string, ProductsResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options): Observable<ProductsResponse> {

    const { limit = 10, offset = 0, gender = '' } = options;
    const key = `${limit}-${offset}-${gender}`
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key)!)
    }

    return this.http
      .get<ProductsResponse>(`${baseUrl}/products`, {
        params: {
          limit,
          offset,
          gender,
        }
      })
      .pipe(
        tap((res) => console.log(res)),
        tap((res) => this.productsCache.set(key, res)),
      );
  }

  getProductByIdSlug(idSlug: string): Observable<Product> {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug)!);
    }

    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(
        delay(500),
        tap((product) => this.productCache.set(idSlug, product)),
      );
  }

  updateProduct(id: string, productLike: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${baseUrl}/products/${id}`, productLike).pipe(
      tap(product => this.updateProductCache(product))
    )
  }

  updateProductCache(product: Product) {
    const id = product.id;

    this.productCache.set(id, product);

    this.productsCache.forEach(productResponse => {
      productResponse.products = productResponse.products.map((currentProduct) => {
        return currentProduct.id === id ? product : currentProduct
      })
    })
  }
}