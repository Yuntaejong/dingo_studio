$(document).ready(function(){

  //변수 모음
  let gnb = $('.gnb li'); //네비게이션 변수

  let t_mnu = $('.com_right a'); //탭바 변수

  let mLeft = -701; // media 좌측값 변수

  let Timer =  setInterval(moveLeft,50); //media 시간초 변수

  let p_btn = $('#p_btn'); //media 스탑버튼 변수
  //1. 모달 변수 생성하기
    const modal=`
    <div class="modal">
      <div class="inner">
        <a href="#" title="배너">
          <img src="./images/popup.jpg" alt="">
        </a>
        <p>
          <input type="checkbox" id="ch">
          <label for="ch">오늘 하루 열지 않음</label>
          <input type="button" value="닫기" id="c_btn">  
        </p>
      </div>
    </div>
  `;

  // 모달변수를 body의 맨 뒤쪽에 출력한다.
  $('body').append(modal);

  //쿠키생성하기
  let ch = $('.modal #ch');  //체크박스 변수

  //현재 브라우저에 쿠키정보가 있는지 없는지 유무를 판단하여 모달이 나오지 않게함.
  if($.cookie('popup')=='none'){
    $('.modal').hide();
  }
  //쿠키의 존재 유무를 체크하여 쿠키를 생성하거나 모달윈도 숨기기
  function closeModal(){
    if(ch.is(':checked')){ //만약에 체크박스에 체크가 된 경우라면
      //쿠키를 생성하기
      $.cookie('popup', 'none', {expires:1, path:'/'});
    }
    //체크박스에 체크 안한 경우 그냥 모달 숨기기
    $('.modal').hide();
  }

  //닫기 버튼을 클릭하면 closeModal함수 실행하여 쿠키생성하고 모달 숨기기 한다.
  $('.modal #c_btn').click(function(){
    closeModal();
  });


  // 헤더 이벤트
  $('header').hover(function(){
    $('header').addClass('act');
    $('header .gnb > li > a, header i.fa-solid').css('color','#333');
    $('header .gnb').animate({'margin':'0 -60px'},300);
  },function(){
    $('header').removeClass('act');
    $('header .gnb > li > a, header i.fa-solid').css('color','#fff');
    $('header .gnb').animate({'margin':'0'},300);
  });

  // 네비게이션
  

  gnb.click(function(){
    let i = $(this).index()+1;
    console.log(i); //2,3,4,5,6

    $('html, body').animate({scrollTop:$('main section').eq(i).offset().top-70},400, 'easeOutCubic');
    return false;
  });


  // media 슬라이드
  // 변수 선언
  

  // 자동으로 움직이는 함수
  function moveLeft(){
    $('.media_wrap ul').css('margin-left',mLeft);
    mLeft -= 2;
    //console.log(mLeft);

    if(mLeft==-703){
      $('.media_wrap ul li:first-child').insertAfter('.media_wrap ul li:last-child');
    } else if (mLeft==-1403){
      mLeft=-701;
    }
  }

  $('.media_wrap ul').hover(function(){
    clearInterval(Timer);
    $('.fa-circle-pause').removeClass('fa-circle-pause').addClass('fa-circle-play');
  },function(){
    clearInterval(Timer);
    Timer =  setInterval(moveLeft,50);
    $('.fa-circle-play').removeClass('fa-circle-play').addClass('fa-circle-pause');
  });

  // 스탑 버튼 클릭 시 멈추고 아이콘 바꾸기
  p_btn.click(function(){
    if($(this).hasClass('fa-circle-pause')==true){
      $('.fa-circle-pause').removeClass('fa-circle-pause').addClass('fa-circle-play');
      clearInterval(Timer);
    } else {
      $('.fa-circle-play').removeClass('fa-circle-play').addClass('fa-circle-pause');
      clearInterval(Timer);
      Timer =  setInterval(moveLeft,50);
    }
    
  });

// company tab바
  t_mnu.click(function(){
    t_mnu.removeClass('choice');
    $(this).addClass('choice');

    $('.com_right ul li > div').stop().hide(500);
    $(this).next().stop().show(500);
    
    return false;
  });
  
  // recruit
  $('.sup').hover(function(){
    $('.sup i').fadeOut();
    
  });


  // 배너 랜덤 반복
  img_num = Math.floor(Math.random()*3)+1;
  // console.log(img_num);
  document.getElementById('change').src="./images/banner0"+img_num+".png";

  $(window).scroll(function(){
    let sPos = $(this).scrollTop();
    // console.log(sPos);

    // 이미지
    if(sPos>=3100){
      $('#news .contents_wrap .n_contents1 img').animate({
        'opacity':'1',
      },1000);
    }

    if(sPos>=3400){
      $('#news .contents_wrap .n_contents2 img').animate({
        'opacity':'1',
      },1000);
    }

    if(sPos>=3700){
      $('#news .contents_wrap .n_contents3 img').animate({
        'opacity':'1',
      },1000);
    }
    // 텍스트
    if(sPos>=3200){
      function animateText() {
      $('#news .contents_wrap .n_contents1 .n_title').addClass('fade-in');
      }
      animateText();
    }

    if(sPos>=3500){
      function animateText() {
      $('#news .contents_wrap .n_contents2 .n_title').addClass('fade-in');
      }
      animateText();
    }

    if(sPos>=3800){
      function animateText() {
      $('#news .contents_wrap .n_contents3 .n_title').addClass('fade-in');
      }
      animateText();
    }
  });
});