import { Component, OnInit } from '@angular/core';
import { Painting } from 'src/app/_models/painting.model';
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

  constructor(private paintingsService: PaintingsService) { }

  ngOnInit(): void {
this.fetchAvailablePaintings();
  }

  fetchAvailablePaintings(){
    return this.paintingsService.getAvailablePaintings().subscribe(paintings=>{
      this.avaialablePaintings = paintings;
    }

    )
  }


}
