import { Component, inject, input, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarouselComponent } from "@products/product-carousel/product-carousel.component";
import { FormUtils } from '@utils/form-utils';
import { FormErrorLabel } from "@shared/components/pagination/form-error-label/form-error-label";
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [ProductCarouselComponent, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  product = input.required<Product>();
  productsService = inject(ProductsService);
  router = inject(Router);

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  fb = inject(FormBuilder);
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [['']],
    tags: [''],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
  });

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(', ') })
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes })
  }

  onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();

    if (!isValid) return;
    const formValue = this.productForm.value;

    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(tag => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      this.productsService.createProduct(productLike).subscribe(product => {
        console.log('Producto creado');
        this.router.navigate(['/admin/product', product.id])
      })
    } else {
      this.productsService.updateProduct(this.product().id, productLike).subscribe(
        product => {
          console.log('Producto actualizado');
        }
      )
    }

  }
}
