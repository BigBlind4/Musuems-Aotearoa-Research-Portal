import { Component, ElementRef, ViewChild } from '@angular/core';
import { SESSION_KEYS } from '../shared/constants';
import { UploadService } from './upload.service';
import { UserDataService } from '../shared/userdata.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../shared/storage.service';
import { FileModel, UploadModel } from '../models/upload.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  protected pageTitle: string = '';
  protected editMode: boolean = false;
  protected sourceUrl: string = '';
  protected selectedCat: any = [];
  protected fileError: boolean = false;
  protected uploadError: boolean = false;
  protected btnSave: string = '';

  private fileResult: any;
  protected showUploadButton: boolean = false;
  protected fileMessage: string = '';
  protected uploadMessage: string = '';
  protected fileid: string;
  protected uploadid: string;
  protected userid: string;
  protected tnc: string = '';
  protected displayFileName: string = '';
  protected uploadstatus: string = '';
  protected comment: string = '';

  uploadForm: FormGroup;
  uploadedFile: FileModel;

  @ViewChild('selectedFile') selectedFile: ElementRef;
  @ViewChild('progressBar') progressBar: ElementRef;

  constructor(private uploadService: UploadService, private userDataService: UserDataService,
    private formBuilder: FormBuilder, private storageService: StorageService, private activatedRoute: ActivatedRoute,
    private router: Router) {
    }
  
  ngOnInit() {
    this.tnc = 'The Agreement contains the entire understanding and agreement between the Licensor and Licensee relating to its subject matter. This Agreement is governed by, and is to be construed in accordance with, New Zealand law.';
    this.uploadedFile = new FileModel();

    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: [''],
      description: [''],
      tc: ['', Validators.required]
    });
    
    this.pageTitle = 'New Upload';
    this.btnSave = 'Save';

    this.reset();
    this.activatedRoute.params.subscribe(params => {
     // this.pageTitle = 'Edit Upload';
      this.uploadid = params.uploadid;
      this.storageService.setStoredData(SESSION_KEYS.UPLOAD_ID, this.uploadid);
      this.fileid = params.fileid;
      this.storageService.setStoredData(SESSION_KEYS.FILE_ID, this.fileid);
      this.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
      if (this.uploadid !== undefined && this.uploadid !== '') {
        this.pageTitle = 'Edit Upload';
        this.btnSave = 'Update';
        this.getFileDetails(this.userid, this.uploadid);
        this.editMode = true;
      } 
    });

   }
  getFileDetails(userid: string, uploadid: string) {
    let request = '?userid=' + userid + '&uploadid=' + uploadid;
    this.userDataService.getFileById(request).subscribe(data => {
        this.uploadForm.controls['title'].setValue(data.title);
        this.uploadForm.controls['author'].setValue(data.author);
        this.uploadForm.controls['description'].setValue(data.description);
        this.displayFileName = data.fileid;
        this.sourceUrl = data.resource;
        this.uploadstatus = data.uploadstatus;
        this.comment = data.comment;
    },
    error => {
      console.log(error._body);
    });
    
  }

  fileChanged(evt: any) {
    const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
    const progressBar: HTMLDivElement = this.progressBar.nativeElement;
    progressBar.style.width = 0 + '%';

    if (fileInput.files.length > 0) {
      this.fileError = false;
      this.fileMessage = '';
      this.showUploadButton = true;
      this.uploadedFile = new FileModel();
      let file = fileInput.files[0];
      this.uploadedFile.filename = file.name;
      this.uploadedFile.filetype = file.type;
      this.uploadedFile.size = String(file.size);

      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onloadend = (e) => {
        this.fileResult = e.target['result'];
        this.uploadedFile.content = this.fileResult;
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
      }
  }
}

  uploadFile() {
    if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
      this.uploadedFile.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
    }
    if (this.editMode) {
      this.uploadedFile.uploadid = this.uploadid;
    }
    this.userDataService.uploadFile(this.uploadedFile).subscribe( data => {
      this.fileMessage = data.message;
      if (String(data.status) === '1') {
        this.fileError = false;
        this.storageService.setStoredData(SESSION_KEYS.FILE_ID, data.fileid);
        this.fileid = data.fileid;
        if (!this.editMode) {
          this.storageService.setStoredData(SESSION_KEYS.UPLOAD_ID, data.uploadid);
          this.uploadid = data.uploadid;
        }
      } else {
        this.fileError = true;
      }
    },
    error => {
      this.fileError = true;
      this.fileMessage = error._body;
    });
  }

  removeFile() {
    const progressBar: HTMLDivElement = this.progressBar.nativeElement;
    progressBar.style.width = 0 + '%';

    const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
    fileInput.value = '';
    this.showUploadButton = false;
  }

  removeFileCompletely() {
    let file = new FileModel();
    file.userid = this.userid;
    file.fileid  = this.fileid;
    this.userDataService.removeFileById(file).subscribe( data => {
      this.fileMessage = data.message;
      if (String(data.status) === '1') {
        this.uploadError = false;
        this.displayFileName = '';
        this.storageService.removeStoredData(SESSION_KEYS.FILE_ID);
      } else {
        this.uploadError = true;
      }
    });

  }


  save(uploadstatus: string) {
    let material: UploadModel = new UploadModel();
    if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
      material.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
    }
    let title = this.uploadForm.controls['title'].value;
    let tcchecked = this.uploadForm.controls['tc'].value;
    if (title !== undefined && title.trim() !== '' && tcchecked !== '' && tcchecked) {
      // const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
      // if (fileInput.value === '') {
      //   this.fileError = true;
      //   this.fileMessage = 'Please select file to upload';
      //   return;
      // }

      material.title = title;
      material.author = this.uploadForm.controls['author'].value;
      material.description = this.uploadForm.controls['description'].value;
      material.uploadstatus = uploadstatus;

      if (this.editMode) {
          material.fileid = this.fileid;
          material.uploadid = this.uploadid;
          this.userDataService.updateUpload(material).subscribe( data => {
            this.uploadMessage = data.message;
            if (String(data.status) === '1') {
              this.uploadError = false;
              this.storageService.removeStoredData(SESSION_KEYS.FILE_ID);
              this.storageService.removeStoredData(SESSION_KEYS.UPLOAD_ID);
            //  this.router.navigate(['/uploadlist']);
            } else {
              this.uploadError = true;
            }
          });
      } else {
        if (this.storageService.getStoredData(SESSION_KEYS.FILE_ID) != null) {
          material.fileid = String(this.storageService.getStoredData(SESSION_KEYS.FILE_ID) );
        }
        if(this.storageService.getStoredData(SESSION_KEYS.UPLOAD_ID) != null) {
          material.uploadid = String(this.storageService.getStoredData(SESSION_KEYS.UPLOAD_ID) );
        }
          this.userDataService.upload(material).subscribe( data => {
            this.uploadMessage = data.message;
            if (String(data.status) === '1') {
              this.uploadError = false;
              this.storageService.removeStoredData(SESSION_KEYS.FILE_ID);
              this.storageService.removeStoredData(SESSION_KEYS.UPLOAD_ID);
            // this.reset();
            location.reload();
            } else {
              this.uploadError = true;
            }
          },
          error => {
            this.uploadError = true;
            this.uploadMessage = error._body;
          });
        }
    
    }
  }

  // submitForReview() {
  //   let material: UploadModel = new UploadModel();
  //   if (this.storageService.getStoredData(SESSION_KEYS.USER_ID) != null) {
  //     material.userid = String(this.storageService.getStoredData(SESSION_KEYS.USER_ID));
  //   }
  //   let title = this.uploadForm.controls['title'].value;
  //   let tcchecked = this.uploadForm.controls['tc'].value;
  //   if (title !== undefined && title.trim() !== '' && tcchecked !== '' && tcchecked) {
  //     const fileInput: HTMLInputElement = this.selectedFile.nativeElement;
  //     if (fileInput.value === '') {
  //       this.fileError = true;
  //       this.fileMessage = 'Please select file to upload';
  //       return;
  //     }

  //     material.title = title;
  //     material.author = this.uploadForm.controls['author'].value;
  //     material.description = this.uploadForm.controls['description'].value;

  //     if (this.storageService.getStoredData(SESSION_KEYS.FILE_ID) != null) {
  //       material.fileid = String(this.storageService.getStoredData(SESSION_KEYS.FILE_ID) );
  //     }
  //     if(this.storageService.getStoredData(SESSION_KEYS.UPLOAD_ID) != null) {
  //       material.uploadid = String(this.storageService.getStoredData(SESSION_KEYS.UPLOAD_ID) );
  //     }
  //     material.uploadstatus = 'In review';
  //     this.userDataService.upload(material).subscribe( data => {
  //       this.uploadMessage = data.message;
  //       if (String(data.status) === '1') {
  //         this.uploadError = false;
  //         this.storageService.removeStoredData(SESSION_KEYS.FILE_ID);
  //         this.storageService.removeStoredData(SESSION_KEYS.UPLOAD_ID);
  //       // this.reset();
  //       location.reload();
  //       } else {
  //         this.uploadError = true;
  //       }
  //     },
  //     error => {
  //       this.uploadError = true;
  //       this.uploadMessage = error._body;
  //     });
  //   }
  // }

  removeUpload () {
    if (this.editMode) {
      let removeReq = new UploadModel();
      removeReq.userid = this.storageService.getStoredData(SESSION_KEYS.USER_ID);
      removeReq.uploadid = this.uploadid;
  
      this.userDataService.removeUpload(removeReq).subscribe(data => {
        if (data != null ) {
          this.uploadMessage = data.message;
          if (String(data.status) === '1') {
            this.uploadError = false;
            this.router.navigate(['/uploadlist']);
          } else {
            this.uploadError = true;
          }
        }
      },
      error => {
        this.uploadError = true;
        this.uploadMessage = error._body;
      });
    }
  }

  reset() {
    this.fileError = false;
    this.uploadError = false;
    this.showUploadButton = false;
    this.fileMessage = '';
    this.uploadMessage = '';
    this.editMode = false;
    // const progressBar: HTMLDivElement = this.progressBar.nativeElement;
    // progressBar.style.width = 0 + '%';
  }
}
