import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { popoverMessage } from 'src/app/shared/popover-messages';
import { Painting } from 'src/app/_models/painting.model';
import { AuthService } from 'src/app/_services/auth.service';
import { PaintingsService } from 'src/app/_services/paintings.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-painting-card',
  templateUrl: './painting-card.component.html',
  styleUrls: ['./painting-card.component.scss']
})
export class PaintingCardComponent implements OnInit {
  paintings: Array<Painting>;
  apiUrl = environment.apiUrl
  isLoggedIn$: Observable<boolean>; 

  constructor(private paintingsService: PaintingsService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.fetchAvailablePaintings();
  }
  fetchAvailablePaintings(){
    console.log(this.paintingsService.atHome)
    if(!this.paintingsService.atHome){
      return this.paintingsService.getOnFocusPaintings().subscribe(paintings=>{
        this.paintings = paintings;
      })
    }
    return this.paintingsService.getAvailablePaintings().subscribe(paintings=>{
      this.paintings = paintings;
    }

    )
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

        if(res.succeeded){
          
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

onMakeInqueryClick(name){

}

}
