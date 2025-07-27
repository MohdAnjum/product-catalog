import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interface representing structure of product filter object
export interface ProductFilters {
  categories: string[];
  brands: string[];
  attributes: Record<string, string[]>; // e.g., { Color: ['Red', 'Blue'] }
  minPrice?: number;
  maxPrice?: number;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true, // Standalone component (no need to declare in a module)
  imports: [CommonModule, FormsModule], // Required modules for template
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css'
})
export class FilterSidebarComponent {

  // Emits the filters whenever user changes any filter option
  @Output() filtersChanged = new EventEmitter<ProductFilters>();

  // Allows the parent component to pass in previously selected filters
  @Input() selectedFilters?: ProductFilters;

  // Predefined static options for categories, brands, and colors
  categories = ["Apparel", "Books", "Electronics", "Fitness", "Home", "Kitchen"];
  brands = ["Adidas", "Apple", "HP", "LG", "Nike", "Samsung", "Sony"];
  colors = ["black", "cyan", "grey", "magenta", "mint green", "purple", "red", "salmon", "silver", "tan", "violet"];

  // Internal state for user-selected filter options (using Set for toggle logic)
  selectedCategories = new Set<string>();
  selectedBrands = new Set<string>();
  selectedColors = new Set<string>();

  // Optional price filters
  minPrice?: number;
  maxPrice?: number;

  /**
   * Emits the consolidated filter object as output to parent
   * Includes categories, brands, colors (under attributes), and price range
   */
  private emitFilters(): void {
    this.filtersChanged.emit({
      categories: [...this.selectedCategories],
      brands: [...this.selectedBrands],
      attributes: { Color: [...this.selectedColors] },
      minPrice: this.minPrice,
      maxPrice: this.maxPrice
    });
  }

  // Category selection toggle handler
  toggleCategory(category: string): void {
    if (this.selectedCategories.has(category)) {
      this.selectedCategories.delete(category);
    } else {
      this.selectedCategories.add(category);
    }
    this.emitFilters();
  }

  // Brand selection toggle handler
  toggleBrand(brand: string): void {
    if (this.selectedBrands.has(brand)) {
      this.selectedBrands.delete(brand);
    } else {
      this.selectedBrands.add(brand);
    }
    this.emitFilters();
  }

  // Color selection toggle handler
  toggleColor(color: string): void {
    if (this.selectedColors.has(color)) {
      this.selectedColors.delete(color);
    } else {
      this.selectedColors.add(color);
    }
    this.emitFilters();
  }

  // Handles input change for minimum price
  onMinPriceChange(value: string): void {
    this.minPrice = value ? Number(value) : undefined;
    this.emitFilters();
  }

  // Handles input change for maximum price
  onMaxPriceChange(value: string): void {
    this.maxPrice = value ? Number(value) : undefined;
    this.emitFilters();
  }

  // Utility function to capitalize first letter (used in UI display of color names)
  capitalizeFirstLetter(color: string): string {
    if (!color) return '';
    return color.charAt(0).toUpperCase() + color.slice(1);
  }

  // Resets all filter selections and emits empty/default filters
  clearFilters(): void {
    this.selectedCategories.clear();
    this.selectedBrands.clear();
    this.selectedColors.clear();
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.emitFilters();
  }
}
