import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './batool/home/home.component';
import { NavBarComponent } from './batool/nav-bar/nav-bar.component';
import { GetAllComponent } from './batool/get-all/get-all.component';
import { RouterModule } from '@angular/router';
import { GetByIdComponent } from './batool/get-by-id/get-by-id.component';
import { AddAnimalComponent } from './batool/add-animal/add-animal.component';
import { UpdateInfoComponent } from './batool/update-info/update-info.component';
import { AnimalsComponent } from './Adoptioh/animals/animals.component';
import { AnimalsDetailsComponent } from './Adoptioh/animals-details/animals-details.component';
import { AnimalFormComponent } from './Adoptioh/animal-form/animal-form.component';

import { FooterComponent } from './batool/footer/footer.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { AdminAdoptionComponent } from './Admin/admin-adoption/admin-adoption.component';
import { LoginComponent } from './Batoul/login/login.component';
import { RegisterComponent } from './Batoul/register/register.component';
import { AddpostComponent } from './mustafa/addpost/addpost.component';
import { UserProfileComponent } from './Batoul/user-profile/user-profile.component';
import { UserResetPasswordComponent } from './Batoul/user-reset-password/user-reset-password.component';
import { AllPostsComponent } from './mustafa/all-posts/all-posts.component';
import { PostCommentsComponent } from './mustafa/post-comments/post-comments.component';
import { AddAdminAdoptionComponent } from './Admin/add-admin-adoption/add-admin-adoption.component';
import { EditAnimalComponent } from './Admin/edit-animal/edit-animal.component';
import { PostsAdminComponent } from './Admin/posts-admin/posts-admin.component';
import { NotAcceptpostsComponent } from './Admin/not-acceptposts/not-acceptposts.component';
import { ContactUsComponent } from './Batoul/contact-us/contact-us.component';
import { SheltersComponent } from './Adoptioh/shelters/shelters.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    GetAllComponent,
    GetByIdComponent,
    AddAnimalComponent,
    UpdateInfoComponent,
    AnimalsComponent,
    AnimalsDetailsComponent,
    AnimalFormComponent,

    FooterComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AddpostComponent,
    DashboardComponent,
    UserProfileComponent,
    UserResetPasswordComponent,
    UserProfileComponent,
    AllPostsComponent,
    PostCommentsComponent,
    AddAdminAdoptionComponent,
    AdminAdoptionComponent,
    PostCommentsComponent,
    EditAnimalComponent,
    PostsAdminComponent,
    NotAcceptpostsComponent,
    ContactUsComponent,
    SheltersComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "getAllUsers", component: GetAllComponent },
      { path: "getbyId/:id11", component: GetByIdComponent },
      { path: "addAnimal", component: AddAnimalComponent },
      { path: "UpdateAnimal/:id", component: UpdateInfoComponent },
      { path: "animal-details/:id", component: AnimalsDetailsComponent },
      { path: "animals-form/:animalId", component: AnimalFormComponent },
      { path: 'animals', component: AnimalsComponent },
      { path: 'animals', component: AnimalsComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "userprofile", component: UserProfileComponent },
      { path: "userpassword", component: UserResetPasswordComponent },
      { path: "contactus", component: ContactUsComponent },


      { path: 'animals', component: AnimalsComponent },
      { path: 'addpost', component: AddpostComponent },
      { path: 'animals', component: AnimalsComponent },

      
      { path: 'allposts', component: AllPostsComponent },
      { path: 'postcomments/:id', component: PostCommentsComponent },

      { path: 'dashboard',
      component: DashboardComponent,
      children: [
      
        { path: 'allpostadmin', component: PostsAdminComponent },
        { path: 'notacceptpostadmin', component: NotAcceptpostsComponent },
        
         { path: 'AddAdminAdoption', component: AddAdminAdoptionComponent },
        {  path: 'AdminAdoption', component: AdminAdoptionComponent },
        { path: '', redirectTo: 'user', pathMatch: 'full' } ,// Redirect to 'stats' as default child
      ]
  },
      
      
      {
        path: 'Shelters', component: SheltersComponent, children: [

          { path: 'AdminAdoption', component: AdminAdoptionComponent },
          { path: '', redirectTo: 'user', pathMatch: 'full' },
        ]
      }

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
