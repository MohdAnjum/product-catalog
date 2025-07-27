
import { Component, Input } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
@Component({
    standalone: true,
     imports: [NgIf, NgFor, CurrencyPipe], // 👈 Add CurrencyPipe here
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent {
  // Input: list of products to display
  @Input() products: any[] = [];

  // Input: loading state
  @Input() loading = false;

  // Optional: custom brand image handler function
  @Input() getBrandImage: (brand: string) => string = (brand) => `assets/brands/${brand}.png`;
}
