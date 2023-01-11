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
paintingsOnFocusPt1: Array<Painting> = [];
paintingsOnFocusPt2: Array<Painting> = [];
apiUrl = environment.apiUrl;

  constructor(private paintingsService: PaintingsService) { }

  ngOnInit(): void {
    this.getPaintingsOnFocus();
  }

  getPaintingsOnFocus(){
    return this.paintingsService.getOnFocusPaintings().subscribe(paintings=>{
      paintings.forEach((val,index)=> 
      paintings[index].imageUrl = this.apiUrl+ paintings[index].imageUrl);
      this.paintingsOnFocusPt1 = paintings.slice(0,3)
      this.paintingsOnFocusPt2 = paintings.slice(3,6)
  })
  }
  onMakeinquiryClick(data){

  }
  
}
