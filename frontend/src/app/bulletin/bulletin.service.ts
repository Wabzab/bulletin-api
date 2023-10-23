import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth-service.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {

  private bulletins: { _id: string, departments: string[], issue: string, __v: string }[] = [];
  private updatedBulletins = new Subject<{ _id: string, departments: string[], issue: string, __v: string }[]>();

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  getBulletins() {
    this.http.get<{ message: string, posts: any }>('https://localhost:3000/api/posts')
      .subscribe((response) => {
        this.bulletins = response.posts
        this.updatedBulletins.next([...this.bulletins])
      })
  }

  saveBulletin(departments: string[], issue: string) {
    this.http.post<{ message: string, post: any }>('https://localhost:3000/api/posts/create',
      { departments: departments, issue: issue })
      .subscribe((response) => {
        this.bulletins.push(response.post);
        this.updatedBulletins.next([...this.bulletins]);
      })
  }

  deleteBulletin(id: string) {
    this.http.delete('https://localhost:3000/api/posts/delete/' + id)
      .subscribe((response) => {
        const updatedBulletinsDeleted = this.bulletins.filter(bulletin => bulletin._id != id)
        this.bulletins = updatedBulletinsDeleted
        this.updatedBulletins.next([...this.bulletins])
      })
  }

  getUpdateListener() {
    return this.updatedBulletins.asObservable();
  }

}
