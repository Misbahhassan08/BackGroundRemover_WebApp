import { Injectable } from '@angular/core'; 
import {HttpClient} from '@angular/common/http'; 
import {Observable} from 'rxjs'; 
@Injectable({ 
  providedIn: 'root'
}) 
export class FileUploadService { 
    
    // API url
  baseApiUrl = "https://bgremoverapi-rnt37kunua-uc.a.run.app/remove"
  uploadKeyUrl= "https://bgremoverapi-rnt37kunua-uc.a.run.app/receivekey"
   
  constructor(private http: HttpClient) { }
  // Returns an observable
  upload(img: string|any, random_key: string): Observable<any> {
    // sending data as json
    const jsonData = {
      file: img,
      text: random_key
    }
    // // Create form data
    // const formData = new FormData();
    // formData.append("file", img, img.name);
    // formData.append('text', random_key);
    return this.http.post(this.baseApiUrl, jsonData)
  }
  // second api calling from here
  upload_userKey(random_key: string): Observable<any> {
    console.log("Second API Call next Time")
    //sending data as json
    const data = {
      text: random_key
    }
    // Create form data
    // const data = new FormData();
    // data.append('text', random_key);
    // Make http post request over api
    // with formData as req
    return this.http.post(this.uploadKeyUrl, data)
  }




} 