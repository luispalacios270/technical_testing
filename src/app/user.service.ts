import { Observable, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RandomUserResponse } from './iuser';
import { UserMidification } from './user-midification';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly url = 'https://randomuser.me/api/';
  private readonly numberOfResultPerRequest = '20';
  private readonly picModifiedSubjet: Subject<UserMidification> = new Subject();

  constructor(private http: HttpClient) {}

  getUser(pagination = 1) {
    return this.http
      .get<RandomUserResponse>(this.url, {
        params: {
          page: `${pagination}`,
          results: this.numberOfResultPerRequest
        }
      })
      .pipe(map(x => x.results));
  }

  getUserPicModificationNotifier(): Observable<UserMidification> {
    return this.picModifiedSubjet;
  }

  sendAnUserPictureModification(userMod: UserMidification) {
    if (!userMod) {
      return;
    }
    this.picModifiedSubjet.next(userMod);
  }
}
