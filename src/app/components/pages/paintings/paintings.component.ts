import { Component, OnInit } from '@angular/core';
import { PaintingsService } from 'src/app/_services/paintings.service';

@Component({
  selector: 'app-paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {

  constructor(paintingsService: PaintingsService) { }

  ngOnInit(): void {
  }

}
