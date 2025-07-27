// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-product-card',
//   imports: [],
//   templateUrl: './product-card.html',
//   styleUrl: './product-card.css'
// })
// export class ProductCard {

// }

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Define your product interface or import it accordingly
export interface Product {
  name: string;
  brand: string;
  price: number;
  categories: string[];
  description: string;
  attributes: Record<string, any>;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
 templateUrl: './product-card.html',
   styleUrl: './product-card.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() brandImageUrl: string = '';

  capitalizeFirstLetter(text: string | undefined): string {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  getBrandImage(brand: string | undefined): string {
    if (!brand) return 'assets/src/default.jpg';
    const normalizedBrand = brand.toLowerCase().replace(/\s/g, '');
     console.log('normalizedBrand:', normalizedBrand);
    return `assets/src/${normalizedBrand}.jpg`;
  }
}
