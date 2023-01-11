import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Painting } from 'src/app/_models/painting.model';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-painting',
  templateUrl: './edit-painting.component.html',
  styleUrls: ['./edit-painting.component.scss']
})
export class EditPaintingComponent implements OnInit {
editPaintingForm: FormGroup;
paintingId: string;
painting: Painting;
wrongFileFormat = true;
imageURL: string;
submitted = false;
response: {dbPath: ''};


  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private paintingsService: PaintingsService) 
    {
      this.editPaintingForm = this.fb.group({
      id: new FormControl(''),
      name: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      price:new FormControl(''),
      dimensions: new FormControl('', Validators.required),
      isAvailableToSell: new FormControl(true),
      imageURL: new FormControl(''),
      year: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$") ]),
      shortDescription: new FormControl('',Validators.required),
      technique: new FormControl('', Validators.required),
      onFocus: new FormControl(false)
    })
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.paintingId = params['id'];
      this.paintingsService.getDetails(this.paintingId).subscribe(res=>{
        this.painting = res;
        this.imageURL = environment.apiUrl+ this.painting.imageUrl
        this.paintingsService.sendPaintingPathForEdit(this.imageURL);
        this.editPaintingForm = this.fb.group({
          'id':[this.painting.id],
          'name':[this.painting.name],
          'description':[this.painting.description],
          'price':[this.painting.price],
          'dimensions':[this.painting.dimensions],
          'isAvailableToSell':[this.painting.isAvailableToSell],
          'imageUrl':[this.painting.imageUrl],
          'year':[this.painting.year],
          'shortDescription':[this.painting.shortDescription],
          'technique':[this.painting.technique],
          'onFocus':[this.painting.onFocus]
        })
      })
    })
  }

  editPainting(){
    if(this.editPaintingForm.invalid){
      this.submitted = true;
      popoverMessage().fire({
        icon: 'error',
      title: 'All fields are required'
      })
      setTimeout(() => {
        this.submitted = false;
        this.wrongFileFormat = false;
      }, 2000);
      return
    }
    this.submitted = true;
    this.paintingsService.editPainting(this.editPaintingForm.value).subscribe(res=>{
      this.router.navigate(['paintings']);
      setTimeout(() => {
        
        popoverMessage().fire({
          icon: 'success',
        title: 'Updated successfully',
        }) 
        },2000);
    })
    this.submitted = false;
  }

  
onImageChangeFromFile($event:any)
{
    if ($event.target.files && $event.target.files[0]) {
      let file = $event.target.files[0];
        if(file.type == "image/jpeg") {
          const file = (event.target as HTMLInputElement).files[0];
          this.wrongFileFormat = false;
  this.editPaintingForm.patchValue({
    avatar: file
  });

  this.editPaintingForm.get('imageUpload').updateValueAndValidity();

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

          this.editPaintingForm.controls["imageUpload"].setValidators([Validators.required]);
          this.editPaintingForm.get('imageUpload').updateValueAndValidity();
        }
    }
}

uploadFinished = (event) => { 
  this.response = event; 
}
      
get f(){
return this.editPaintingForm.controls;
}
}