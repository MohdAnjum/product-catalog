import { Component, signal, effect, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { FilterSidebarComponent, ProductFilters } from '../filter-sidebar/filter-sidebar';
import { debounceTime, Subject } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterSidebarComponent, MatPaginatorModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductListComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  // Signals to hold reactive state variables
  products = signal<Product[]>([]);         // Holds the current list of products
  loading = signal(true);                   // Indicates whether data is being loaded
  totalProducts = signal(0);                // Total number of products (for pagination)
  filters = signal<ProductFilters | {}>({}); // Current active filters
  searchTerm = signal('');                  // Current search term
  sortOption = signal('relevance');         // Current sort option
  currentPage = signal(1);                  // Current page number for pagination
  itemsPerPage = 50;                        // Default number of items per page

  private searchSubject = new Subject<string>(); // Subject to debounce search input

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Debounced search input handler (fires 300ms after last keystroke)
    this.searchSubject.pipe(debounceTime(300)).subscribe(value => {
      this.filters.update(filters => ({ ...filters, search: value }));
      this.currentPage.set(1);
      this.fetchProducts();
    });

    this.fetchProducts(); // Initial product load
  }

  /**
   * Triggered when filters change from sidebar.
   * Business rule: On any filter change, reset to page 1 and reload.
   */
  onFiltersChanged(newFilters: ProductFilters): void {
    this.filters.set(newFilters);
    this.currentPage.set(1);
    this.fetchProducts();
  }

  /**
   * Called on search input change.
   * Business logic: Only trigger search if at least 3 characters or input is cleared.
   */
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.trim();

    if (value.length >= 3 || value.length === 0) {
      this.searchSubject.next(value);
    }
  }

  /**
   * Called on sort dropdown change.
   * Currently supports 'relevance', but can be extended.
   */
  onSortChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input?.value ?? '';
    this.sortOption.set(value);
    this.fetchProducts();
  }

  /**
   * Called when page is manually changed by user.
   * Business rule: Prevent out-of-bound page numbers.
   */
  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.fetchProducts();
  }

  /**
   * Core method that fetches filtered, sorted, and paginated product data.
   */
  fetchProducts(): void {
    this.loading.set(true);

    const filters = this.filters();
    const params: Record<string, any> = {
      ...filters,
      page: this.currentPage().toString(),
      limit: this.itemsPerPage.toString(),
      sort: this.sortOption()
    };

    // Convert nested attributes to JSON string as expected by API
    if (params['attributes'] && typeof params['attributes'] === 'object') {
      params['attributes'] = JSON.stringify(params['attributes']);
    }

    // Service call to fetch products based on params
    this.productService.getProducts(params).subscribe({
      next: response => {
        this.products.set(response.products);
        this.totalProducts.set(response.total);
        this.loading.set(false);

        // Focus back on search input after data loads
        setTimeout(() => {
          if (this.searchInput?.nativeElement) {
            const inputEl = this.searchInput.nativeElement;
            inputEl.focus();
            const length = inputEl.value.length;
            inputEl.setSelectionRange(length, length); // Move cursor to end
          }
        }, 0);
      },
      error: err => {
        console.error('Error fetching products', err);
        this.loading.set(false);
      }
    });
  }

  /**
   * Computes total number of pages for pagination UI.
   */
  totalPages(): number {
    return Math.ceil(this.totalProducts() / this.itemsPerPage) || 1;
  }

  /**
   * Returns an array of page numbers for pagination rendering.
   */
  pageNumbers(): number[] {
    return Array(this.totalPages()).fill(0).map((_, i) => i + 1);
  }

  /**
   * Returns brand image path based on normalized brand name.
   * Business rule: If image not found, fallback to default.
   */
  getBrandImage(brand: string): string {
    const normalizedBrand = brand?.toLowerCase().replace(/\s/g, '');
    const defaultImage = 'assets/default.jpg';
    return normalizedBrand
      ? `assets/${normalizedBrand}.jpg`
      : defaultImage;
  }

  /**
   * Resets all filters to default and refetches product list.
   */
  resetFilters(): void {
    this.filters.set({
      categories: [],
      brands: [],
      attributes: { Color: [] },
      minPrice: undefined,
      maxPrice: undefined
    });
    this.currentPage.set(1);
    this.fetchProducts();
  }

  /**
   * Angular Material paginator event handler.
   * Syncs paginator state with component and fetches data accordingly.
   */
  onPageEvent(event: PageEvent): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage.set(event.pageIndex + 1); // MatPaginator uses 0-based index
    this.fetchProducts();
  }
}
