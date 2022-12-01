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
        description:['',Validators.required],
        price:['', Validators.required],
        size: ['', Validators.required],
        available:['yes'],
        imageUpload:['', Validators.required]
      })
     }

  ngOnInit(): void {
  }

createPainting(){
  console.log(this.createPaintingForm.value)
  this.submitted = true;
  
  if(this.createPaintingForm.invalid){
    this.toasterService.error("Please fill in required fields")
    setTimeout(() => {
      this.submitted = false;
      this.wrongFileFormat = false;
    }, 3000);
    return
  }
this.paintingsService
.createPainting(this.createPaintingForm.value)
.subscribe((res:any)=>{
  if(res.succeeded){
    this.toasterService.success("Paiting has been added successfully!")
  }
  else{
    this.toasterService.error(res.errors[0].description)
    this.errorMessage = res.errors[0].description
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
        
get f(){
  return this.createPaintingForm.controls;
}

}

