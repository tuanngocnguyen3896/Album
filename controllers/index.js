import {Album} from '../models/album.js';
import {DanhSachAlbum} from '../models/albumList.js';
let list = new DanhSachAlbum();
list.layAlbum();

// UI fix
document.querySelector('#btnCapNhatAlbum').disabled = true;

// Bắt sự kiện cho button thêm album, lấy dữ liệu người dùng
document.querySelector('#btnThemAlbum').onclick = () => {
    let album = new Album();
    let arrInput = document.querySelectorAll('input,select');
    for (let input of arrInput) {
        let {value,id} = input;
        album[id] = value;
    };
    
    // Kiểm tra tên duy nhất
    let name = list.danhSachAlbum.find((name)=> name.tenAlbum === album.tenAlbum)
    if(name){
      alert('Tên Album Đã Tồn Tại');
    } else{
      list.themAlbum(album);
      list.luuAlbum();
      renderAlbum(list.danhSachAlbum); 
    }
};

// Render dữ liệu từ danh sách album ra màn hình
const renderAlbum = (arrResult) => {
  const contentAlbum = arrResult.reduce((content,item,index) => {
    return content += `
                  <div class="col-md-4">
                    <div class="card mb-4 box-shadow" >
                      <img style="cursor:pointer; width:100%;height:200px;" src="${item.linkAnh}" ">
                    </div>
                      <div class="card-body">
                        <h3>${item.tenAlbum}</h3>
                        <p class="card-text">${item.moTa}</p>
                        <p class="card-text">Thể loại: ${item.theLoai}</p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                            <button onclick="editAlbum('${item.tenAlbum}')" type="button" class="btn btn-success text-white btn-sm btn-outline-secondary mr-2">Chỉnh sửa</button>
                            <button onclick="xoaAlbum('${item.tenAlbum}')" type="button" class="btn btn-danger text-white btn-sm btn-outline-secondary">Xóa</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
    `
  },'');
    document.querySelector('#renderContentAlbum').innerHTML = contentAlbum;
};
renderAlbum(list.danhSachAlbum);

// Xóa album
window.xoaAlbum = (tenAlbum) => {
  let cfm = confirm('Bạn có chắc chắn xóa ?')
  if(cfm){
      list.xoaAlbum(tenAlbum);
      list.luuAlbum();
      renderAlbum(list.danhSachAlbum);
    }
    document.querySelector('#btnThemAlbum').disabled = false;
    document.querySelector('#btnCapNhatAlbum').disabled = false;
    document.querySelector('#tenAlbum').disabled = false;

};
// Chỉnh sửa album
window.editAlbum = (tenAlbum = 0) => {
  let index = list.danhSachAlbum.findIndex((alb) => alb.tenAlbum === tenAlbum);
  let editAlbum = list.danhSachAlbum[index]; 

  document.querySelector('#linkAnh').value = editAlbum.linkAnh;
  document.querySelector('#moTa').value = editAlbum.moTa;
  document.querySelector('#theLoai').value = editAlbum.theLoai;
  document.querySelector('#tenAlbum').value = editAlbum.tenAlbum;
 
  document.querySelector('#btnCapNhatAlbum').disabled = false;
  document.querySelector('#tenAlbum').disabled = true;
  document.querySelector('#btnThemAlbum').disabled = true;

};
// Cập nhật album
document.querySelector('#btnCapNhatAlbum').onclick = () => {
  let updateAlbum = new Album();
  let arrInput = document.querySelectorAll('input,select');
    for (let input of arrInput) {
        let {value,id} = input;
        updateAlbum[id] = value;
    };
    let index = list.danhSachAlbum.findIndex((alb) => alb.tenAlbum === updateAlbum.tenAlbum);
    console.log(index);
    list.danhSachAlbum[index] = updateAlbum;
    list.luuAlbum();
    renderAlbum(list.danhSachAlbum);
    alert('Cập Nhật Thành Công');
    
  
  document.querySelector('#tenAlbum').disabled = false;
  document.querySelector('#btnThemAlbum').disabled = false;
  document.querySelector('#tenAlbum').disabled = false;
  document.querySelector('#btnCapNhatAlbum').disabled = true;
};

  
       
      
