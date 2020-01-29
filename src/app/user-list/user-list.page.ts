import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonVirtualScroll } from '@ionic/angular';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserInfo } from '../iuser';
import { UserService } from '../user.service';
import { assignUserToCheckDetails } from '../../store/user/user.action';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss']
})
export class UserListPage implements OnInit {
  userInfo: UserInfo[] = [];
  private currentPagination = 0;

  @ViewChild(IonInfiniteScroll, { static: false })
  infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll, { static: false })
  virtualScroll: IonVirtualScroll;

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<{ user: UserInfo }>
  ) {}

  ngOnInit(): void {
    this.getMoreUsers();
    this.userService
      .getUserPicModificationNotifier()
      .subscribe(modification => {
        this.userInfo[modification.index].picture.large = this.userInfo[
          modification.index
        ].picture.medium = modification.base64image;
      });
  }

  ionViewDidEnter() {
    if (this.virtualScroll) {
      this.virtualScroll.checkEnd();
    }
  }

  getMoreUsers(callback?: () => void): void {
    this.currentPagination++;
    this.userService.getUser(this.currentPagination).subscribe(users => {
      this.userInfo.push(...users);
      if (callback) {
        callback();
      }
    });
  }

  loadMoreUsersByScroll(event) {
    this.getMoreUsers(() => {
      event.target.complete();
      this.virtualScroll.checkEnd();
    });
  }

  goToUserDetail(user: UserInfo, index: number) {
    user.index = index;
    this.store.dispatch(assignUserToCheckDetails(user));
    this.router.navigate(['/user-detail']);
  }
}
