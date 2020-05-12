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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CookieService } from 'ngx-cookie-service';

import { LoginButtonComponent } from './login-button/login-button.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { RegisterButtonComponent } from './register-button/register-button.component';
import { MaterialListComponent } from './material-list/material-list.component';
import { CardComponent } from './card/card.component';
import { RatingComponent } from './rating/rating.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { DiscoverPageComponent } from './discover-page/discover-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { TrackPageComponent } from './track-page/track-page.component';
import { SearchbarComponent } from './navigation/searchbar/searchbar.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { FooterComponent } from './footer/footer.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginModalComponent,
    LoginButtonComponent,
    CardComponent,
    RatingComponent,
    AboutPageComponent,
    DiscoverPageComponent,
    FavoritesPageComponent,
    ProfilePageComponent,
    NavbarComponent,
    SearchbarComponent,
    MaterialListComponent,
    EditProfileComponent,
    RegisterButtonComponent,
    RegisterModalComponent,
    TrackPageComponent,
    CreatePageComponent,
    FooterComponent,
    EditMaterialComponent,
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
    MatMenuModule,
    MatExpansionModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
