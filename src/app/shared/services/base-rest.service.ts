import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BaseRestService {

  private readonly baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUrl(serviceUrl: string): string {
    return this.baseUrl + serviceUrl;
  }

  getter<T>(serviceUrl: string, options?: any | null): Observable<T> {
    return this.http.get(this.getUrl(serviceUrl), options).pipe(map((res: any) => res));
  }

  delete<T>(serviceUrl: string): Observable<any> {
    return this.http.delete(this.getUrl(serviceUrl));
  }

  post<T>(serviceUrl: string, objeto: any, options?: any | null): Observable<T> {
    return this.http.post(this.getUrl(serviceUrl), objeto, options).pipe(map((res: any) => res));
  }

  put<T>(serviceUrl: string, objeto: any, options?: any | null): Observable<T> {
    return this.http.put(this.getUrl(serviceUrl), objeto, options).pipe(map((res: any) => res));
  }

  parseObjectToHttpParams(object: any): HttpParams {
    const params = new HttpParams();
    // Filtra as property que tem value e depois da append no HttpParams
    Object.keys(object)
      .filter(key => object[key])
      .map(key => params.append(key, object[key]));
    return params;
  }

}
