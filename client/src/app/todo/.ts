import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EnvService } from '../env.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient,  private env: EnvService) { }

  query<T>(query: String, variables?: { [key: string]: any} ): Observable<T> {
    return this.http
      .post<{ data: T }>(this.env.graphQlApi, {
        query: query,
        variables: variables,
      })
      .pipe(map((d) => d.data));
  }

  mutate<T>(options: {
    mutation: string;
    variables?: { [key: string]: any };
  }): Observable<any> {
    return this.http
      .post<{ data: T }>(`/graphql`, {
        query: options.mutation,
        variables: options.variables,
      })
      .pipe(map((d) => d.data));
  }

}
