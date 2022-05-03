import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from '../types/apiResponse';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postProduct(data:Product) : Observable<ApiResponse<Product>>{
    return this.http.post<ApiResponse<Product>>('https://localhost:44333/product/create', data);
  }

  putProduct(data:Product) : Observable<ApiResponse<Product>>{
    return this.http.put<ApiResponse<Product>>('https://localhost:44333/product/update', data);
  }

  getProducts(): Observable<ApiResponse<Product[]>>{
    return this.http.get<ApiResponse<Product[]>>('https://localhost:44333/products');
  }
}
