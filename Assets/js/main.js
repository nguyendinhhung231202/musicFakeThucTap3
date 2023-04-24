// dùng chung lấy ra 1 hoặc full

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// --------------------------- phần bài hát -------------------------------

/**
 * 1. Render songs
 * 2.Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / preat when ended
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Action song
 * 9. Scroll action song info view
 * 10. Play song when click
 */
const PLAYYER_STDRAGE_KEY = 'F8_PLAYER';

const playList = $(".playlist__list");
const playMusic = $(".playMusicJs");
const nextMusic = $(".btn-nextJs");
const prevMusic = $(".btn-prevJs");
const randomMusic = $(".btn-randomJs");
const repeatMusic = $(".btn-repeatJs");
const playBtn = $(".btn-playJs");
const progress = $(".progress");
const cdImg = $(".player__container-img");
const onPlayIcon = $(".playlist__song-action");

const name = $(".container__info-title");
const singer = $(".container__info-link");
const image = $(".player__container-img");
const audio = $("#audio");

document.onscroll = function () {
  console.log(window.scrollY);
};


const app = {
  curentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PLAYYER_STDRAGE_KEY)) || {},
  setConfig: function(key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYYER_STDRAGE_KEY, JSON.stringify(this.config))
  },
  songs: [
    {
      name: "TÒNG PHU",
      singer: "B.Thức",
      path: "./Assets/audio/TÒNG PHU .mp3",
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
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
          <div class="playlist__list-song ${index === this.curentIndex ? "active" : ""}" data-index="${index}">
             <div class="playlist__song-info">
                 <div  class="playlist__song-action" onclick="info();">
                     <img class="playlist__action-img" src="${
                       song.image
                     }" alt="">
                     <i class="playlist__action-icon playlist-play fas fa-play"></i>
                     <i class="playlist__action-icon playlist-pause fas fa-pause"></i>
                 </div>
                 <div class="playlist__song-body">
                     <samp class="playlist__body-title">${song.name} </samp>
                     <p class="playlist__song-author">${song.singer}</p>
                 </div>
             </div>
             <span class="playlist__song-time">18:02</span>
             <div class="playlist__song-option">
                 <div class="playlist__song-btn">
                     <i class="playlist__song-icon  fas fa-microphone"></i>
                 </div>
                 <div class="playlist__song-btn ">
                     <i class=" playlist__song-icon heart-red  fas fa-heart purple-primary"></i>
                 </div>
                 <div class="playlist__song-btn">
                     <i class="playlist__song-icon fas fa-ellipsis-h"></i>
                 </div>
             </div>
         </div>
          `;
    });
    playList.innerHTML = htmls.join("\n");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.curentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    // xử lý cd quay / dừng
    const cdAnimate = cdImg.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });
    cdAnimate.pause();

    document.onscroll = function () {
      console.log(window.scrollY);
    };
    // xử lý khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      // khi song dc play
      audio.onplay = function () {
        const pauseIcon = $('.playlist__action-icon.playlist-pause')
        
        if($('.playlist__list-song.active')) {
          pauseIcon.classList.remove("none");
        }
        _this.isPlaying = true;
        playBtn.classList.add("active");
        onPlayIcon.classList.add("active");
        cdAnimate.play();
      };
      // khi song dc pause
      audio.onpause = function () {
        const pauseIcon = $('.playlist__action-icon.playlist-pause')
        if($('.playlist__list-song.active')) {
          pauseIcon.classList.add("none");
        }
        _this.isPlaying = false;
        playBtn.classList.remove("active");
        onPlayIcon.classList.remove("active");
        cdAnimate.pause();
   
      };
      // khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function () {
        const tracktime = $(".tracktime");
        const durationtime = $(".durationtime");
        tracktime.textContent = Math.floor(audio.currentTime);
        durationtime.textContent = Math.floor(audio.duration);

        const progress = $(".progress");
        // tính phần trăm song = số giây song / tổng tg song * 100
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        if (audio.duration) {
          progress.value = progressPercent;
        }
      };
      // xử lý khi tua song
      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
        audio.play();
      };
      // khi next song
      nextMusic.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
        } else {
          _this.nextSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      };
      // khi prev song
      prevMusic.onclick = function () {
        if (_this.isRandom) {
          _this.randomSong();
        } else {
          _this.prevSong();
        }
        audio.play();
        _this.render();
        _this.scrollToActiveSong();
      };
      // khi random song
      randomMusic.onclick = function () {
        if (_this.isRandom) {
          _this.isRandom = false;
          randomMusic.classList.remove("action");
        } else {
          _this.isRandom = true;
          randomMusic.classList.add("action");
        }
        _this.setConfig('isRandom', _this.isRandom);
      };
      // khi repeat song
      repeatMusic.onclick = function () {
        if (_this.isRepeat) {
          _this.isRepeat = false;
          repeatMusic.classList.remove("action");
        } else {
          _this.isRepeat = true;
          repeatMusic.classList.add("action");
        }
        _this.setConfig('isRepeat', _this.isRepeat);
      };
      // xử lý next song khi audio endend
      audio.onended = function () {
        if (_this.isRandom || _this.isRepeat) {
          if (_this.isRepeat) {
            audio.play();
          } else if (_this.isRandom) {
            _this.randomSong();
          }
        } else {
          _this.nextSong();
        }
      };
      // lẵng nghe hành vi click vào playList 
      playList.onclick = function(e) {
        const songNode = e.target.closest('.playlist__list-song:not(.active)');
        if( songNode || e.target.closest('.playlist__song-btn')){
          if(songNode && !e.target.closest('.playlist__song-btn')) {
            // kích vào song
            _this.curentIndex = Number(songNode.dataset.index) ;
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          }
          else if(e.target.closest('.playlist__song-btn')) {
            // kích vào icon
            console.log('icon');
            
            
            var hearts = document.querySelectorAll(".playlist__song-icon");

            hearts.forEach((likes) => {
              likes.onclick = function () {
                this.classList.toggle("heart-red");
              };
            });
            
            var hearts2 = document.querySelectorAll(".btn-icon");
            
            hearts2.forEach((likes) => {
              likes.onclick = function () {
                this.classList.toggle("heart-red");
              };
            }); 
          }
        }
      }
 
    };
  },
  scrollToActiveSong: function() {
    setTimeout(() => {
      $(".playlist__list-song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    name.textContent = this.currentSong.name;
    singer.textContent = this.currentSong.singer;
    image.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.curentIndex++;
    if (this.curentIndex >= this.songs.length) {
      this.curentIndex = 0;
    }
    this.loadCurrentSong();
    audio.play();
  },
  prevSong: function () {
    this.curentIndex--;
    if (this.curentIndex < 0) {
      this.curentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.curentIndex);
    this.curentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Gán cấu hình từ config vào ứng dụng
    this.loadConfig();
    // Định nghĩa các thuộc tính
    this.defineProperties();
    // Định nghĩa các thuộc tính
    this.handleEvents();
    //  tải thông tin bài hát đầu tiên vào UI khi chạy
    this.loadCurrentSong();
    // render playList
    this.render();
    // hiển thị trạng thái ban đầu của btn repeat and ramdon
    randomMusic.classList.toggle("action", this.isRandom);
    repeatMusic.classList.toggle("action", this.isRepeat);

  },
};

// chay opject app
app.start();









// ------------------------- cách chức năng cơ bản ---------------
const home_menus = $$(".menu__js");
const container__tabs = $$(".container__tab");

home_menus.forEach((home_menu, index) => {
  const container__tab = container__tabs[index];

  home_menu.onclick = function () {
    $(".menu__js.active").classList.remove("active");
    $(".container__tab.active").classList.remove("active");

    this.classList.add("active");
    container__tab.classList.add("active");
  };
});

// top phóng to thu nhỏ sidebar trên table
const sidebar__expand = $(".sidebar__expand-container");
const app__sidebar = $(".app__sidebar");
const sidebar__record = $(".sidebar__record-container");

sidebar__expand.onclick = function () {
  app__sidebar.classList.add("expand");
};

sidebar__record.onclick = function () {
  app__sidebar.classList.remove("expand");
};
// end phóng to thu nhỏ sidebar trên table

// đóng mở menu extra phụ
const menuItem = $(".menu__item-js");
const menuChild = $(".content__sub-list");
const itemChild = $$(".content__sub-item");
const coating = $(".coating");

function openMenu() {
  menuChild.classList.toggle("open");
}
function opencoating() {
  coating.classList.add("open");
}
menuItem.addEventListener("click", openMenu);
menuItem.addEventListener("click", opencoating);

function removeMenu() {
  menuChild.classList.remove("open");
}
function removeCoating() {
  coating.classList.remove("open");
}

coating.addEventListener("click", removeMenu);
coating.addEventListener("click", removeCoating);

// đóng mở log in

/////////////////////// player__popup  trang nhạc phụ ///////////////////////

const playerPopup = $(".player__popup");
const playerContainer = $(".player__container");
const player_item_remove = $(".player__popup-action-item-remove-js");
const appSidebar = $(".app__sidebar");
const appContainer = $(".app__container");

// playerContainer.onclick = function () {
//     playerPopup.classList.add('action');
//     appSidebar.classList.add('none');
//     appContainer.classList.add('none');
// }

player_item_remove.onclick = function () {
  playerPopup.classList.remove("action");
  appSidebar.classList.remove("none");
  appContainer.classList.remove("none");
};

/////////////////// đóng mở logout

const logout_list = $(".app__header-options");
const logout = $(".option__log-out");

logout_list.onclick = function () {
  logout.classList.toggle("open");
};

/* start toast */

// toast function

function toast({ title = "", message = "", type = "info", duration = 1000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");
    const autoRemoveId = setTimeout(function () {
      //đóng song khoảng thời gian duration cộng với 1000 animation fadeOut
      main.removeChild(toast);
    }, duration + 1000);

    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-triangle",
      error: "fas fa-times",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2); // chánh số thập phân dung toFixed(2) "lấy ra hai số thập phân thôi"
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInleft ease 0.3s, fadeOut linear 1s  ${delay}s forwards`;
    toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
    main.appendChild(toast); //mở
  }
}

function showSuccessToast() {
  toast({
    title: "Success",
    message: "chúc mừng bạn đã nâng cấp VIP thành công 😊",
    type: "success", // kiểu quết định "class"
    duration: 4000, // khoảng thời gian ẩn duration: 1000  mi li s = 1s
  });
}

function showErrorToast() {
  toast({
    title: "Error",
    message: "Có lỗi sảy ra! Đăng xuất thất bại 🤔🤷‍♂️",
    type: "error",
    duration: 4000,
  });
}

function warning() {
  toast({
    title: "Thông báo",
    message: "Chức năng chưa hoàn thiện😪",
    type: "warning",
    duration: 4000,
  });
}
function info() {
  toast({
    title: "Thông báo",
    message: "Bạn muốn nghe nhạc ?, vui lòng đăng ký tài khoản của bạn",
    type: "info",
    duration: 4000,
  });
}

// top loại bỏ hành vi mặc định của search

var search_a = document.querySelector(".header__search-list");

search_a.onmousedown = function (e) {
  e.preventDefault();
};

// end

// top loại bỏ hành vi mặc định của search

var menu_a = document.querySelectorAll(".player__popup-header-link");

for (var i = 0; i < menu_a.length; ++i) {
  menu_a[i].onclick = function (e) {
    e.preventDefault();
  };
}
// var hearts = document.querySelectorAll(".playlist__song-icon");

// hearts.forEach((likes) => {
//   likes.onclick = function () {
//     this.classList.toggle("heart-red");
//   };
// });

// var hearts2 = document.querySelectorAll(".btn-icon");

// hearts2.forEach((likes) => {
//   likes.onclick = function () {
//     this.classList.toggle("heart-red");
//   };
// });

// end



