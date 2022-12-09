import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Painting } from 'src/app/_models/painting.model';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-paintings-details',
  templateUrl: './paintings-details.component.html',
  styleUrls: ['./paintings-details.component.scss']
})
export class PaintingsDetailsComponent implements OnInit {
id: string
painting: Painting
apiRoute = environment.apiUrl

  constructor(private route: ActivatedRoute,
    private paintingsService: PaintingsService) {
      this.fetchData();
     }

  ngOnInit(): void {}

  fetchData(){
    this.route.params.pipe(map(params=>{
      const id = params['id'];
      return id;
    }), mergeMap(id=>this.paintingsService.getDetails(id))).subscribe(res=>{
      this.painting = res;
    })
  }

}
