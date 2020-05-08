import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DiscoverPageComponent } from './discover-page/discover-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { TrackPageComponent } from './track-page/track-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutPageComponent,
  },
  {
    path: 'discover',
    component: DiscoverPageComponent,
  },
  {
    path: 'favorites',
    component: FavoritesPageComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
  {
    path: 'track/:id',
    component: TrackPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
