import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ContactActions from '../../../stores/contact/contact.actions';
import * as fromSelectors from '../../../stores/contact/contact.selectors';
import * as fromPaintingSelectors from '../../../stores/paintings/paintings.selectos';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
contactForm: FormGroup;
isSubmitted$: Observable<boolean>;
formLoadTime!: number;

  constructor(private formBuilder: FormBuilder,
  private store: Store) { }

  ngOnInit(): void {
    this.formLoadTime = Date.now();

    this.contactForm = this.formBuilder.group({
      name:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      subject:[''],
      content:['', [Validators.required, Validators.minLength(10)]],
      honeypot: ['']
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
    const submissionTime = Date.now();
    const timeDifference = submissionTime - this.formLoadTime;

    if (this.contactForm.invalid || this.contactForm.value.honeypot || timeDifference < 2000) {
      console.error('Bot detected or invalid form!');
      return;
    }

    this.store.dispatch(ContactActions.submitContactForm({payload: this.contactForm.value}));
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
  get honeypot(){
    return this.contactForm.get('honeypot')
  }
}
