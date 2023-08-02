$(document).ready(function(){



  // media 슬라이드
  // 변수 선언
  let mLeft = -701;

  // 자동으로 움직이는 함수
  function moveLeft(){
    $('.media_wrap ul').css('margin-left',mLeft);
    mLeft -= 2;
    console.log(mLeft);

    if(mLeft==-703){
      $('.media_wrap ul li:first-child').insertAfter('.media_wrap ul li:last-child');
    } else if (mLeft==-1403){
      mLeft=-701;
    }
  }
  let Timer =  setInterval(moveLeft,50);

  $('.media_wrap ul').hover(function(){
    clearInterval(Timer);
  },function(){
    clearInterval(Timer);
    Timer = setInterval(moveLeft,50);
  });

  // 배너 랜덤 반복
  img_num = Math.floor(Math.random()*3)+1;
  console.log(img_num);
  document.getElementById('change').src="./images/banner0"+img_num+".png";

});