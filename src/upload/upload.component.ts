import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryList } from '../shared/constants';
import { UploadService } from './upload.service';
import { UserDataService } from '../shared/userdata.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent { 
  public CategoryList: any;
  protected uploadError: boolean = false;
  private fileResult: any;
  protected showUploadButton: boolean = false;
 

  @ViewChild('selectedFile') selectedFile: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;

  constructor(private uploadService: UploadService, private userDataService: UserDataService) {}
  
  ngOnInit() {
    this.CategoryList = CategoryList;
    this.uploadError = false;
    this.showUploadButton = false;
    const progressBar: HTMLDivElement = this.progressBar.nativeElement;
    progressBar.style.width = 0 + '%';
  }

  fileChanged(evt: any) {
    const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
    const progressBar: HTMLDivElement = this.progressBar.nativeElement;
    progressBar.style.width = 0 + '%';

    if (fileInput.files.length > 0) {
      this.showUploadButton = true;

      //let width = 1;
      
      
      //let id = setInterval(this.frame(width, id, progressBar), 10);
      

      let file = fileInput.files[0];
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        this.fileResult = e.target['result'];
        console.log(this.fileResult);
      };

      fileReader.onprogress = (e) => {
        let width = 1;
        
        let id = setInterval(function(){
          if (width >= 100) {
            clearInterval(id);
          } else {
            width++;
            progressBar.style.width = width + '%';
            this.width = width;
          }
        }, 10);

        // while (this.width < 100) {
        //   this.width++;
        //   progressBar.style.width = this.width + '%';
        // }
        console.log('calling on progress');
      }

      fileReader.onloadend = (e) => {
        console.log('calling onloadend');
      }
  }
}

  uploadFile() {
    // const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
   
    // let formData = this.uploadService.prepareUploadFile(fileInput);
    
    // if(formData !== undefined && formData != null){
    //     this.userDataService.uploadFile(formData).subscribe();
    // }
    
  }

  removeFile() {
    const progressBar: HTMLDivElement = this.progressBar.nativeElement;
    progressBar.style.width = 0 + '%';

    const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
    fileInput.value = '';
    this.showUploadButton = false;
  }

  submit() {

  }
}
