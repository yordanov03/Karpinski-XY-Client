import Swal from "sweetalert2"

export function popoverMessage(){
return Swal.mixin({
    toast: true,
position: 'top-end',
showConfirmButton: false,
timer: 3000,
didOpen: (toast) => {
toast.addEventListener('mouseenter', Swal.stopTimer)
toast.addEventListener('mouseleave', Swal.resumeTimer)
}
  })
}