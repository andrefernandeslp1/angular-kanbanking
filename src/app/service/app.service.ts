import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Card } from '../model/card';
import { Project } from '../model/project';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private API_URL = 'http://localhost:3000';

  private projectsSource = new BehaviorSubject<Project[]>([]);
  projects = this.projectsSource.asObservable();

  private userSource = new BehaviorSubject<User>({} as User); // Initialize with an empty User object});
  user = this.userSource.asObservable();

  private indexSource = new BehaviorSubject<number>(0);
  index = this.indexSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  ngOnInit() { }

  setIndex(index: number) {
    this.indexSource.next(index);
  }

  signup(user: User): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>(this.API_URL + "/users", user, { observe: 'response' }).pipe(
      tap(response => {
        // Assuming the token is in the response body under 'token'
        const token = response.body?.accessToken;
        if (token) {
          localStorage.setItem('authToken', token); // Store the token
        }
        if(response.body.user.id) {
          localStorage.setItem('userId', response.body.user.id);
        }
      })
    );
  }

  signin(user: User): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(this.API_URL + "/signin", user, { observe: 'response' }).pipe(
      tap(response => {
        // Assuming the token is in the response body under 'token'
        const token = response.body?.accessToken;
        if (token) {
          localStorage.setItem('authToken', token); // Store the token
        }
        if(response.body.user.id) {
          localStorage.setItem('userId', response.body.user.id);
        }

        this.getUser(response.body.user.id).subscribe(user => {
          this.userSource.next(user); // Now correctly passing a User object
          console.log(user);
          console.log(this.user);
        });

        this.getProjects(response.body.user.id).subscribe(projects => {
          this.projectsSource.next(projects);
          console.log(projects);
          console.log(this.projects);
        });
      })
    );
  }

  getUser(id:number): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('authToken'));
    return this.httpClient.get<User>(this.API_URL + '/users/' + id, { headers });
  }

  getProjects(userId: any): Observable<Project[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('authToken'));
    return this.httpClient.get<Project[]>(this.API_URL + '/projects?userId=' + userId, { headers });
  }

  recuperarProjects(): Project[] {
    return this.projectsSource.getValue();
  }
}
