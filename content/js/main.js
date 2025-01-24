/*************************************video******************************************/
let listVideo = document.querySelectorAll('.video-list .vid'); 
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .title');

/*************************************interface button******************************************/
const user = document.querySelector('.user');
const muser = document.querySelector('.container .menu-list');
const menu = document.querySelector('.menu');
const vlist = document.querySelector('.container .video-list');
/*************************************elements******************************************/
const buttonsArray = Array.from(document.querySelectorAll('.vid-btn .btn'));
const btnpretest = document.getElementById('btnpretest');
const btnposttest = document.getElementById('btnposttest');
buttonsArray.push(btnpretest,btnposttest);

let pretest = document.querySelector('.container .pretest');
let posttest = document.querySelector('.container .posttest');
let chat = document.querySelector('.container .chat');
let ovid1 = document.querySelector('.container .ovid1');
let act1 = document.querySelector('.container .act1');
let act2 = document.querySelector('.container .act2');
let act3 = document.querySelector('.container .act3');
let act4 = document.querySelector('.container .act4');
let act5 = document.querySelector('.container .act5');
let act6 = document.querySelector('.container .act5');
let act7 = document.querySelector('.container .act7');
let act8 = document.querySelector('.container .act8');


let elearray = [chat, act1, act2, act3, ovid1, act4, act5, act6, act7, act8,pretest,posttest];
/*************************************youtube******************************************/
const videoContainer = document.getElementById('video-container');
let vplay = false;

// Declare `player` in a broader scope
let player;

function addyoutube() {
  if (!videoContainer.querySelector('iframe')) {
    const iframe = document.createElement('iframe');
    iframe.id = 'youtube-video';
    iframe.width = "800";
    iframe.height = "600";
    iframe.src = 'https://www.youtube.com/embed/W1_WqZkz6_s?enablejsapi=1';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    videoContainer.appendChild(iframe);
    loadYouTubeAPI();
  }
}

function loadYouTubeAPI() {
  if (!window.YT) {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    onYouTubeIframeAPIReady();
  }
}

// `onYouTubeIframeAPIReady` must be accessible globally
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player('youtube-video');
};

/*************************************remove******************************************/
function hiddenele() {
  const iframe = videoContainer.querySelector('iframe');
  if (iframe && vplay == true) {
    iframe.remove();
    vplay = false;
  }

  for (let i = 0; i < elearray.length; i++) {
    if (elearray[i].classList.contains('show')) {
      elearray[i].classList.toggle('hidden');
      elearray[i].classList.remove('show');
    }
  }
}

/*************************************events ele******************************************/
buttonsArray.forEach((button, index) => {
  button.addEventListener('click', () => {
    buttonsArray.forEach(btn => btn.classList.remove('playing'));
    listVideo.forEach(vid => vid.classList.remove('active'));
    button.classList.add('playing');

    hiddenele();
    mainVideo.pause();
    for (let i = 0; i < elearray.length; i++) {
      
      if (index === i) {
        if (index === 4) {
          addyoutube();
          vplay = true;
        }
        elearray[i].classList.remove('hidden');
        elearray[i].classList.toggle('show');
      }
    }
  });
});

/*************************************events ico******************************************/
user.addEventListener('click', () => {
  user.classList.toggle('close');
  muser.classList.toggle('show');
});

menu.addEventListener('click', () => {
  menu.classList.toggle('close');
  vlist.classList.toggle('show');
});

/*************************************events video******************************************/
mainVideo.controls = true;
listVideo.forEach(video => {
  video.onclick = () => {
    buttonsArray.forEach(btn => btn.classList.remove('playing'));
    listVideo.forEach(vid => vid.classList.remove('active'));
    video.classList.add('active');
    if (video.classList.contains('active')) {
      let src = video.children[0].getAttribute('src');
      mainVideo.src = src;
      mainVideo.controls = true;
      mainVideo.autoplay = true;
      let text = video.children[1].innerHTML;
      title.innerHTML = text;

      hiddenele();
    }
  };
});
