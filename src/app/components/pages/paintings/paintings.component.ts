import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Painting } from 'src/app/_models/painting.model';
import { AuthService } from 'src/app/_services/auth.service';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {

  avaialablePaintings: Array<Painting>;
  apiUrl = environment.apiUrl
  isLoggedIn$: Observable<boolean>; 

  constructor(private paintingsService: PaintingsService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
this.fetchAvailablePaintings();
  }

  fetchAvailablePaintings(){
    return this.paintingsService.getAvailablePaintings().subscribe(paintings=>{
      this.avaialablePaintings = paintings;
    }

    )
  }


}
