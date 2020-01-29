import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { CameraService } from '../camera.service';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserInfo } from '../iuser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss']
})
export class UserDetailPage implements OnInit {
  userDetail$: Observable<UserInfo>;
  pictureTaken: string;

  constructor(
    private camera: CameraService,
    private store: Store<{ user: UserInfo }>,
    private userService: UserService,
    private nav: NavController
  ) {}

  ngOnInit(): void {
    this.userDetail$ = this.store.pipe(select('user'));
  }

  async takePicture(user: UserInfo) {
    this.pictureTaken = await this.camera.takePicture();
    this.userService.sendAnUserPictureModification({
      index: user.index,
      base64image: this.pictureTaken
    });
  }

  goBackToList() {
    this.nav.back();
  }
}
