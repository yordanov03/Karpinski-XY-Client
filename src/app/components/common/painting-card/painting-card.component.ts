import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import Swal from 'sweetalert2';
import { Store, select } from '@ngrx/store';
import * as paintingActions from '../../../stores/paintings/painting.actions'
import * as fromPainting from '../../../stores/paintings/painting.selectos'
import { Router } from '@angular/router';
import { Painting } from 'src/app/api/models';
import { PaintingsService } from 'src/app/_services/paintings.service';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  // paintings: Array<Painting>;
  // apiUrl = environment.apiUrl
  isLoggedIn$: Observable<boolean>; 
  availablePaintings$: Observable<Painting[]>;

  constructor(private store: Store,
    private router: Router,
    private paintingsService: PaintingsService) {}


  ngOnInit(): void {
    this.store.dispatch(paintingActions.loadAvailablePaintings());
    this.availablePaintings$ = this.store.pipe(select(fromPainting.selectAvailablePaintings));
  }
  fetchAvailablePaintings(){
    // return this.paintingsService.getAvailablePaintings().subscribe(paintings=>{
    //   this.paintings = paintings;
    // }
    // )
  }

onDeleteClick(id){
  Swal.fire({
    title: 'Confirmation required',
    text: 'Are you sure you want to delete this entry',
    icon: 'question',
    confirmButtonText: 'yes',
    confirmButtonColor: 'red',
    showCancelButton: true,
    cancelButtonText: 'no',
    focusCancel: true,
    
  }).then((willDelete)=>{
    if(willDelete.isConfirmed){
      this.paintingsService.deletePainting(id).subscribe((res:any) => {
        console.log(res)
        if(res){
          popoverMessage().fire({
          icon: 'success',
          title: 'Deleted successfully'
          })
          setTimeout(() => {
            window.location.reload();
           }, 2000);
        }
        else{
          popoverMessage().fire({
            icon:"error",
            title: "Something went wrong with the backend"
          })
        }
      })
    }
  
  })
}

onEditPainting(id){
  this.router.navigate(['paintings/'+id+'/edit'])
}

onMakeinquiryClick(name){

}

}
