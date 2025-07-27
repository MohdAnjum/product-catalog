import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Product interface defines the structure of each product object returned by the backend
export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categories: string[]; // List of categories a product belongs to
  brand: string;         // Brand name of the product
  attributes: { [key: string]: any }; // Dynamic key-value attribute structure (e.g., color, size)
}

// Structure of the API response
export interface ProductApiResponse {
  products: Product[]; // List of returned products
  total: number;       // Total number of products matching the criteria
  facets?: any;        // Optional faceted data for filters (e.g., brand counts)
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Base URL for product-related API calls
  private apiUrl = 'http://localhost:3000/api/products'; // Change as per environment (dev/stage/prod)

  constructor(private http: HttpClient) {}

  /**
   * Fetches products from the backend with support for advanced filters and search.
   * 
   * @param filters - Object containing any combination of filtering, sorting, and pagination parameters.
   * 
   * Business Rules Implemented:
   * - Only non-empty filters are sent to the backend.
   * - Arrays (e.g., categories, brands) are converted to comma-separated strings.
   * - Objects (e.g., attribute filters) are serialized to JSON strings.
   * 
   * Example filter structure:
   * {
   *   search: 'iphone',
   *   categories: ['Electronics', 'Mobiles'],
   *   brands: ['Apple', 'Samsung'],
   *   minPrice: 500,
   *   maxPrice: 1500,
   *   attributes: { color: ['red', 'black'] },
   *   page: 1,
   *   limit: 12,
   *   sort: 'price_asc'
   * }
   */
  getProducts(filters: any): Observable<ProductApiResponse> {
    let params = new HttpParams();

    // Convert filters to HTTP query parameters
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          // For array-based filters like categories or brands
          params = params.set(key, value.join(','));
        } else if (typeof value === 'object') {
          // For complex objects like attributes
          params = params.set(key, JSON.stringify(value));
        } else {
          // For primitive values (string, number)
          params = params.set(key, value);
        }
      }
    });

    // Optional: Log final params string for debugging
    console.log('API Params:', params.toString());

    // Perform GET request with query parameters
    return this.http.get<ProductApiResponse>(this.apiUrl, { params });
  }
}
