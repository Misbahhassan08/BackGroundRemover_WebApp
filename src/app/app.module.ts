import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {HttpClientModule} from  '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent  
  ],
  imports: [
    LottieModule.forRoot({ player: playerFactory }),
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    NgxUiLoaderModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
