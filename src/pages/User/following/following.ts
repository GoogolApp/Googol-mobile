import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../../_models/user';
import { SearchedProfilePage } from '../searched-profile/searched-profile';
import { SearchedBarPage } from "../searched-bar/searched-bar";

import { UsersTab } from "./users-tab/users-tab";
import { BarsTab } from "./bars-tab/bars-tab";

@Component({
  selector: 'page-following',
  templateUrl: 'following.html',
})
export class FollowingPage implements OnInit{

  user = new User();
  tab1 = UsersTab;
  tab2 = BarsTab;

  allUsersParam: {};
  allBarsParam: {};

  ngOnInit() {
    this.allUsersParam = {
      showPageUserCb: this.showPageUser.bind(this)
    };

    this.allBarsParam = {
      showPageBarCb: this.showPageBar.bind(this)
    };
  }
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    }

  showPageUser(id: string) {
    localStorage.setItem('searchedUser', JSON.stringify(id));
    this.navCtrl.push(SearchedProfilePage, { "parentPage": this });
  }

  showPageBar(id: string) {
    localStorage.setItem('searchedBar', JSON.stringify(id));
    this.navCtrl.parent.push(SearchedBarPage);
  }

}
