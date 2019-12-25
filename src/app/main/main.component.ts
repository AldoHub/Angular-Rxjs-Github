import { Component, OnInit } from '@angular/core';
import { RxjsService } from "../rxjs.service";
import { Observable, Subject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged, filter,
  map,
  switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private rxjsService: RxjsService) { }
  queries$ = new Subject<string>();
  selectedRepository$ = new Subject<any | undefined>();
  organizations$: Observable<any[]>;
  repositories$: Observable<any[]>;

  searchRepos($event){
    this.queries$.next($event);
  }

  onRepositoryMouseEvent(repository: any | undefined) {
    this.selectedRepository$.next(repository);
  
  }

  
  
  ngOnInit() {
    this.repositories$ = this.queries$.pipe(
      map((query: string) => query ? query.trim() : ''),
      filter(Boolean),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query: string) => this.rxjsService.fetchRepositories(query)),
     

  );

    this.organizations$ = this.selectedRepository$.pipe(
      map((repository) => repository && repository.owner.organizations_url),
      switchMap((url: string | false) => {
          return url ? this.rxjsService.fetchUserOrganizations(url) : of(undefined);
      }),
  );
  
  }

}
