import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Painting } from 'src/app/_models/painting.model';
import { AuthService } from 'src/app/_services/auth.service';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
}
