import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-painting',
  templateUrl: './create-painting.component.html',
  styleUrls: ['./create-painting.component.scss']
})
export class CreatePaintingComponent implements OnInit {
imageURL: string;
submitted = false;
wrongFileFormat = false;
errorMessage = '';
response: {dbPath: ''};

@Output() public onUploadFinished = new EventEmitter();

createPaintingForm: FormGroup;
  constructor(private fb: FormBuilder,
    private paintingsService: PaintingsService,
    private toasterService: ToastrService,
    private router: Router) {

      this.createPaintingForm = this.fb.group({
        name:['',Validators.required],
        description:['',Validators.required],
        price:['', [Validators.required, Validators.pattern("^[0-9]*$") ]],
        dimensions: ['', Validators.required],
        isAvailableToSell:[true],
        imageURL:['']
      })
     }

  ngOnInit(): void {
  }

createPainting(){
  this.createPaintingForm.get('imageURL').setValue(this.response.dbPath)
  console.log(this.createPaintingForm.value)
  
  if(this.createPaintingForm.invalid){
    this.submitted = true;
    this.toasterService.error("Please fill in all fields")
    setTimeout(() => {
      this.submitted = false;
      this.wrongFileFormat = false;
    }, 3000);
    return
  }

this.paintingsService
.createPainting(this.createPaintingForm.value)
.subscribe(
  (res:any)=>{
this.toasterService.success("Success");
setTimeout(() => {
  this.router.navigate(['/'])
}, 3000);
}

)

}

onImageChangeFromFile($event:any)
  {
      if ($event.target.files && $event.target.files[0]) {
        let file = $event.target.files[0];
          if(file.type == "image/jpeg") {
            const file = (event.target as HTMLInputElement).files[0];
            this.wrongFileFormat = false;
    this.createPaintingForm.patchValue({
      avatar: file
    });
    // this.createPaintingForm.get('imageUpload').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
          }
          else {
            //call validation
            this.wrongFileFormat = true;
            this.imageURL = '';
            // this.createPaintingForm.reset();
            this.createPaintingForm.controls["imageUpload"].setValidators([Validators.required]);
            this.createPaintingForm.get('imageUpload').updateValueAndValidity();
          }
      }
  }

   // Image Preview
   showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.createPaintingForm.patchValue({
      avatar: file
    });
    this.createPaintingForm.get('imageUpload').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  uploadFinished = (event) => { 
    this.response = event; 
    console.log(this.response.dbPath)
  }
        
get f(){
  return this.createPaintingForm.controls;
}

}

