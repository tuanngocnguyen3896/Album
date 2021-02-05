 export class DanhSachAlbum {
     danhSachAlbum = [];
     
     constructor(){

     }
     themAlbum(album){
         this.danhSachAlbum.push(album);
     }
     xoaAlbum(tenAlbum){
        let index = this.danhSachAlbum.findIndex((alb) => alb.tenAlbum === tenAlbum);
        if(index !== -1) 
        {
            this.danhSachAlbum.splice(index,1)
        }
    }
    luuAlbum(){
        let sAlbum = JSON.stringify(this.danhSachAlbum);
        localStorage.setItem('list',sAlbum);
    }
    layAlbum(){
        if(localStorage.getItem('list')){
            let list = JSON.parse(localStorage.getItem('list'));
            this.danhSachAlbum = list;
        } else{
            this.danhSachAlbum = [];
        }
    }
 }