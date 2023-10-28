import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private http:HttpClient) { }

  addProduct(data:any){
    return this.http.post(this.url + '/product/add/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  updateProduct(data:any){
    return this.http.patch(this.url + '/product/update/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getProducts(){
    return this.http.get(this.url + '/product/get/')

  }
  updateStatus(data:any){
    return this.http.patch(this.url + '/product/updateStatus/', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  delete(id:any){
    return this.http.delete(this.url + '/product/delete/'+ id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }); 
  }

  getProductsByCategory(id:any){
    return this.http.get(this.url + '/product/getByCategory/' + id);
  }

  getById(id:any){
    return this.http.get(this.url + '/product/getById/' + id);

  }
}

