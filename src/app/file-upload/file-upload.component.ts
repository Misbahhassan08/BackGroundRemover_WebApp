
import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../file-upload.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { retry } from 'rxjs';
import { AnimationOptions } from 'ngx-lottie';
 

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

    randomKey: string | any;
    // Variable to store shortLink from api response 
    shortLink: string = "";
    loading: boolean = false; // Flag variable 
    file: any; // Variable to store file 
    Image: SafeResourceUrl;
    download_image: any | string;
    Original_Image: any;
    showResponse = false;
    base64string: string | any;
    showAnimation = false;

    // Inject service  
    constructor(
        private fileUploadService: FileUploadService,
        private ngxService: NgxUiLoaderService,
        private _sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
    }

    options: AnimationOptions = {
        path: './assets/1.json'
    };


    ///////////////////////////------Choose File------///////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////  
    onChange(event: any) {
        const fileList: FileList = event.target.files;
        if (fileList && fileList.length > 0) {
            this.file = fileList[0];
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = () => {
            // console.log(reader.result);
            this.base64string = reader.result;
        };

    }

 

    ///////////////////////////------First Api Call------///////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////// 
    onUpload() {
        // this.ngxService.start();
        this.showResponse = false;
        this.showAnimation = true;
        this.randomKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(this.randomKey)

        this.loading = !this.loading;
        console.log(this.file);

        this.fileUploadService.upload(this.base64string, this.randomKey).subscribe(
            (response: any) => {
                console.log("First API Call Res", response)
            });

        setTimeout(() => {
            this.makeSecondAPICall();
        }, 6000);



    }
   ///////////////////////////------Second Api Call------///////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////  
    makeSecondAPICall() {

        console.log("making Second API Call")


        this.fileUploadService.upload_userKey(this.randomKey).pipe(
            retry({ count: 4, delay: 5000 })
        ).subscribe(

            (response: any) => {
                this.showResponse = true;
                // this.ngxService.stop();
                this.showAnimation = false;

                const bg_img = response["image"];
                this.download_image = 'data:image/png;base64,' + bg_img;

                //show original image 
                var reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = (event: any) => {
                    this.Original_Image = event.target.result;
                }
                //show removed image
                this.Image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + bg_img);

            }


        );
    }


    ///////////////////////////------download Image fILE------///////////////////////////
    /////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////// 
    downloadImage() {
        // Assuming this.Image contains the base64 string of the image
        const base64Image = this.download_image;

        // Create a download link
        const link = document.createElement('a');
        link.href = base64Image;
        link.download = 'downloaded_bg_image.png'; // You can change the filename if needed
        document.body.appendChild(link);

        // Trigger the download
        link.click();

        // Remove the link from the DOM
        document.body.removeChild(link);
    }

} 


 