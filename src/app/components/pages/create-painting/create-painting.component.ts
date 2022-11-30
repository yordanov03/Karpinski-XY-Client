import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { ToastrService } from 'ngx-toastr';

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
createPaintingForm: FormGroup;
  constructor(private fb: FormBuilder,
    private paintingsService: PaintingsService,
    private toasterService: ToastrService) {

      this.createPaintingForm = this.fb.group({
        name:['',Validators.required],
        price:['', Validators.required],
        size: ['', Validators.required],
        available:['yes'],
        imageUpload:['']
      })
     }

  ngOnInit(): void {
  }

createPainting(){
  console.log(this.createPaintingForm.value)
  this.submitted = true;
  
  if(this.createPaintingForm.invalid){
    this.toasterService.error("All fields are required")
    setTimeout(() => {
      this.submitted = false;
      this.wrongFileFormat = false;
    }, 3000);
    return
  }
}

onImageChangeFromFile($event:any)
  {
      if ($event.target.files && $event.target.files[0]) {
        let file = $event.target.files[0];
          if(file.type == "image/jpeg") {
            const file = (event.target as HTMLInputElement).files[0];
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
            console.log("bla")
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
        
get f(){
  return this.createPaintingForm.controls;
}
get name(){
  return this.createPaintingForm.get('name');
}
get price(){
  return this.createPaintingForm.get('price');
}
get size(){
  return this.createPaintingForm.get('size');
}
get available(){
  return this.createPaintingForm.get('available');
}
get imageUpload(){
  return this.createPaintingForm.get('imageUpload');
}

}

