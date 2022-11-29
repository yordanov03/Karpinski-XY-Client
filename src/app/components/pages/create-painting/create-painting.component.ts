import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-painting',
  templateUrl: './create-painting.component.html',
  styleUrls: ['./create-painting.component.scss']
})
export class CreatePaintingComponent implements OnInit {
  Sizes: any[];

createPaintingForm: FormGroup;
  constructor(private fb: FormBuilder,
    private paintingsService: PaintingsService,
    private toasterService: ToastrService) {

      // this.createPaintingForm = this.fb.group({
      //   name:['',Validators.required],
      //   price:[''],
      //   size: [''],
      //   available:[''],
      //   imageUpload:['', Validators.required]
      // })


     }

  ngOnInit(): void {
    this.createPaintingForm = new FormGroup({
      name: new FormControl(),
      price: new FormControl(),
      size: new FormControl(),
      available: new FormControl(),
      imageUpload: new FormControl()
    });

    of([
      { id: 1, size: 'AAA' },
      { id: 2, size: 'BBB' },
      { id: 3, size: 'CCC' },
    ])
      .pipe()
      .subscribe((options) => (this.Sizes = options));
  }
createPainting(){
  console.log(this.createPaintingForm.value)
}
get size(){
  return this.createPaintingForm.get('size')
}

}

