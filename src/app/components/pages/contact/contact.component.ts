import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ContactActions from '../../../stores/contact/contact.actions';
import * as fromSelectors from '../../../stores/contact/contact.selectors';
import * as fromPaintingSelectors from '../../../stores/painting/painting.selectos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
contactForm: FormGroup;
isSubmitted$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
  private store: Store) { }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      subject:[''],
      content:['', [Validators.required, Validators.minLength(10)]]
    })

    this.isSubmitted$ = this.store.select(fromSelectors.selectIsSubmitted)
    this.store.select(fromPaintingSelectors.selectPaintingName).subscribe(selectedPaintingName => {
      if (selectedPaintingName) {
        this.contactForm.patchValue({
          subject: selectedPaintingName
        });
      }
    });
  }

  onSubmitForm(){
    if (this.contactForm.invalid) {
      return;
    }

    this.store.dispatch(ContactActions.submitContactForm( {payload: this.contactForm.value}));
    this.contactForm.reset();
  }

  get name(){
    return this.contactForm.get('name')
  }
  get email(){
    return this.contactForm.get('email')
  }
  get phoneNumber(){
    return this.contactForm.get('phoneNumber')
  }
  get subject(){
    return this.contactForm.get('subject')
  }
  get content(){
    return this.contactForm.get('content')
  }
}
