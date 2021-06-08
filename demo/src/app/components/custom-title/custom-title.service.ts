import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from './customTitle';

@Injectable({
  providedIn: 'root',
})
export class CustomTitleService {
  // URL = 'http://localhost:4050/api';
  constructor(private http: HttpClient) {}

  getAllCustomTitle(): Observable<any> {
    return this.http.get<Title[]>(`/getAllCustomTitles`);
  }

  AddNewTitle(newTitle): Observable<any> {
    return this.http.post<Title>(`/addCustomTitles`, newTitle);
  }

  updateTitle(id, data): Observable<any> {
    return this.http.put<Title>(`/updateCustomTitle/${id}`, data);
  }

  deleteTitle(id: string): Observable<any> {
    return this.http.delete<Title>(`/deleteCustomTitle/${id}`);
  }

  searchTitle(item): Observable<any> {
    return this.http.post<Title>(`/searchTitle`, item);
  }

  pagination(page, limit, title): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit)
      .set('title', title);
    if (!title) {
      params.delete('title', '');
    }
    return this.http.get<Title>(`/pagination`, { params });
  }
}
