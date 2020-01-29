import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'user-list', pathMatch: 'full' },
  {
    path: 'user-list',
    loadChildren: () =>
      import('./user-list/user-list.module').then(m => m.UserListPageModule)
  },
  {
    path: 'user-detail',
    loadChildren: () =>
      import('./user-detail/user-detail.module').then(
        m => m.UserDetailPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
