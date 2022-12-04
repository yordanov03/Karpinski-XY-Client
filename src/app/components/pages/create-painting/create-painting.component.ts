import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';

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
    private toasterService: ToastrService) {

      this.createPaintingForm = this.fb.group({
        name:['',Validators.required],
        description:['',Validators.required],
        price:['', [Validators.required, Validators.pattern("^[0-9]*$") ]],
        dimensions: ['', Validators.required],
        available:[true]
      })
     }

  ngOnInit(): void {
  }

createPainting(){
  console.log(this.createPaintingForm.value)
  
  if(this.createPaintingForm.invalid){
    this.submitted = true;
    this.toasterService.error("Please fill in required fields")
    setTimeout(() => {
      this.submitted = false;
      this.wrongFileFormat = false;
    }, 3000);
    return
  }


const formData = new FormData();
formData.append('file', this.createPaintingForm.get('imageUpload').value);
formData.append('name', this.createPaintingForm.get('name').value);
formData.append('dimensions', this.createPaintingForm.get('dimensions').value);
formData.append('description', this.createPaintingForm.get('description').value);
formData.append('price', this.createPaintingForm.get('price').value);
formData.append('available', this.createPaintingForm.get('available').value);
console.log(formData)


this.paintingsService
.createPainting(formData)
.subscribe((res:any)=>{
if(res.succeeded){
    console.log("da")
    this.toasterService.success("Painting has been added successfully!")
  }
  else{
    console.log("nie")
    this.submitted = true;
    this.toasterService.error(res.errors[0].description)
    this.errorMessage = res.errors[0].description
    console.log(this.errorMessage)
  }
})

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
  }
        
get f(){
  return this.createPaintingForm.controls;
}

}

