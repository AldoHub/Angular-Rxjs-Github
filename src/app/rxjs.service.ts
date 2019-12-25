import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import {
  map,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {
 
  searchResult$: Observable<any>;

  constructor(private httpClient: HttpClient) { }
  GITHUB_URL = 'https://api.github.com/search/repositories';

  onTextChange(query: string) {
     this.searchResult$ = this.fetchRepositories(query);

  }

 

  fetchRepositories(query: string): Observable<any> {
    const params = { q: query };

    return this.httpClient
        .get<any>(this.GITHUB_URL, { params })
        .pipe(
            map((response: any) => {
             console.log(response.items);
             return response.items
             
            })
           
        );
  }

  fetchUserOrganizations(url: string): Observable<any[]> {
    return this.httpClient.get<any[]>(url);
}


}
