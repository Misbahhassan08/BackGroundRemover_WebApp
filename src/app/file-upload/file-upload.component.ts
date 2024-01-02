
import { Component, OnInit } from '@angular/core'; 
import { FileUploadService } from '../file-upload.service'; 
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({ 
    selector: 'app-file-upload', 
    templateUrl: './file-upload.component.html', 
    styleUrls: ['./file-upload.component.css'] 
}) 
export class FileUploadComponent implements OnInit { 
  
    // Variable to store shortLink from api response 
    shortLink: string = ""; 
    loading: boolean = false; // Flag variable 
    file: any; // Variable to store file 
    Image:any;
  
    // Inject service  
    constructor(private fileUploadService: FileUploadService, private _sanitizer: DomSanitizer) { } 
  
    ngOnInit(): void { 
    } 

    _arrayBufferToBase64( buffer:any ) {
        var binary = '';
        var bytes = new Uint8Array( buffer );
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
           binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa( binary );
      }
    
      sanitize( url:string ) {
        var prefeix = url
        return this._sanitizer.bypassSecurityTrustResourceUrl(prefeix);
      }
  
    // On file Select 
    onChange(event:any) { 
        this.file = event.target.files[0]; 
    } 
  
    // OnClick of button Upload 
    onUpload() { 
        this.loading = !this.loading; 
        console.log(this.file); 
        this.fileUploadService.upload(this.file).subscribe( 
            (response) => { 
                console.log('Server response:', response["image"]);
                let nframe = response["image"]
                this.Image = this.sanitize(nframe)
            } 
        ); 
    } 
} 