import { Component, OnInit } from '@angular/core';
import { Painting } from 'src/app/_models/painting.model';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
homePagePaitingsUrl = environment.homePagePaitings;
paintingsOnFocus: Array<Painting>;
  constructor(private paintingsService: PaintingsService) { }

  ngOnInit(): void {
    this.getPaintingsOnFocus();
  }

  getPaintingsOnFocus(){
    return this.paintingsService.getAvailablePaintings().subscribe(paintings=>{
      this.paintingsOnFocus = paintings;
  })
  }
}
