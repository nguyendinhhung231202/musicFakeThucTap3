var data = [
    {
        name: "chưa chắc đã rên đâu",
        singer: "B.Thức",
        path: "./Assets/audio/ren remix2.mp3",
        image: "./Assets/img/music/listSong4/song1.jpg",
      },
      {
        name: "TÒNG PHU",
        singer: "Đ.Hung",
        path: "./Assets/audio/TÒNG PHU .mp3",
        image: "./Assets/img/music/listSong4/song2.jpg",
      },
      {
        name: "Waiting For You",
        singer: "16 Typh, 16 BrT",
        path: "./Assets/audio/MONO  Waiting For You.mp3",
        image: "./Assets/img/music/listSong4/song3.jpg",
      },
      {
        name: "Gã Giang Hồ",
        singer: "HIEUTHUHAI, MA",
        path: "./Assets/audio/Gã Giang Hồ  Lã Phong Lâm.mp3",
        image: "./Assets/img/music/listSong4/song4.jpg",
      },
      {
        name: "Không Thấy Ngày Về",
        singer: "RPT Orijinn, LOW G, RZM",
        path: "./Assets/audio/Không Thấy Ngày Về  Lã Phong Lâm .mp3",
        image: "./Assets/img/music/listSong4/song5.jpg",
      },
      {
        name: "Nắng Ấm Xa Dần",
        singer: "Young Milo",
        path: "./Assets/audio/Nắng Ấm Xa Dần  Sơn Tùng MTP.mp3",
        image: "./Assets/img/music/listSong4/song6.jpg",
      },
      {
        name: "Cơn Mưa Ngang Qua",
        singer: "16 Typh",
        path: "./Assets/audio/Cơn Mưa Ngang Qua.mp3",
        image: "./Assets/img/music/listSong4/song7.jpg",
      },
      {
        name: "Đeo Tai Nghe và Cảm Nhận",
        singer: "Dick , PC, Tofu",
        path: "./Assets/audio/Đeo Tai Nghe và Cảm Nhận.mp3",
        image: "./Assets/img/music/listSong4/song8.jpg",
      },
      {
        name: "Quay Về Đây",
        singer: "RPT MCK, Tlinh, 2pillz",
        path: "./Assets/audio/Quay Về Đây Em Cầm Tay Em Khóc Trên Đôi Vai Này.mp3",
        image: "./Assets/img/music/listSong4/song9.jpg",
      },
]

const search = () =>{
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const storeitems = document.getElementById("playlist--container2")
  const product = document.querySelectorAll(".item--playlist2")
  const pname = document.querySelectorAll(".info-name2")
  const text = $(".text")
  


  for(var i=0; i < pname.length; i++) {
      let match = product[i].querySelectorAll('.info-name2')[0];

      if(match){
      let textvalue = match.textContent || match.innerHTML
      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
          product[i].style.display = "";
          text.classList.remove("open");
      } else{
          product[i].style.display = "none";
          text.classList.toggle("open");
      }
  }
}
}


const search_input = () =>{
  const searchbox = document.getElementById("search-item").value.toUpperCase();
  const storeitems = document.querySelectorAll(".header__search-list")
  const product = document.querySelectorAll(".header__search-item")
  const pname = document.querySelectorAll(".header__search-link")
  const text = $(".header__search-result")
  


  for(var i=0; i < pname.length; i++) {
      let match = product[i].querySelectorAll('.header__search-link')[0];

      if(match){
      let textvalue = match.textContent || match.innerHTML
      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
          product[i].style.display = "";
          // text.classList.remove("block");
      } else{
          product[i].style.display = "none";
          // text.classList.add("block");
      }
  }
}
}