import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as SubscriptionActions from '../../../stores/subscription/subscription.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {}
  subscriptionForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{3,}\\.[a-zA-Z]{2,}$')])
  });

  get email() {
    return this.subscriptionForm.get('email');
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      console.log(this.subscriptionForm.controls.email.value)
      this.store.dispatch(SubscriptionActions.subscribe({ email: this.subscriptionForm.controls.email.value}));
    }
  }

}
