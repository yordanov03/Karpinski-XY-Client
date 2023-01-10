import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { InqueryService } from 'src/app/_services/inquery.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
submitted = false;
contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
  private inqueryService: InqueryService) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      subject:[''],
      content:['', [Validators.required, Validators.minLength(10)]]
    })
  }

  onSubmitForm(){
    if(this.contactForm.invalid){
      this.submitted = true;
      console.log("nevalidna forma")
      setTimeout(() => {
        this.submitted = false;
      }, 2000);
      return;
    }

    return this.inqueryService.postInquery(this.contactForm.value).subscribe(
      res=>{
      const Toast = Swal.mixin({
        confirmButtonColor: '#3cd1ff'
      })
      Toast.fire(
        'Success',
        'You will get a confirmation about the inquery on your email',
        'success'
      )
      this.contactForm.reset();
    }

    )
  }

  get f(){
    return this.contactForm.controls;
  }

}
