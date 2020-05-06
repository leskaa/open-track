import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule, MatCard } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModalComponent } from './login-modal/login-modal.component';

import { LoginButtonComponent } from './login-button/login-button.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { RegisterButtonComponent } from './register-button/register-button.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialComponent } from './material/material.component';
import { RatingComponent } from './rating/rating.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { DiscoverPageComponent } from './discover-page/discover-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { SearchbarComponent } from './navigation/searchbar/searchbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    LoginButtonComponent,
    MaterialComponent,
    RatingComponent,
    AboutPageComponent,
    DiscoverPageComponent,
    FavoritesPageComponent,
    ProfilePageComponent,
    NavbarComponent,
    MenuComponent,
    SearchbarComponent,
    MaterialListComponent,
    EditProfileComponent,
    RegisterButtonComponent,
    RegisterModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    FontAwesomeModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
