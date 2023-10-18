$(document).ready(function(){

  //변수 모음
  //media hover 변수
  const s_list = $('.media_wrap ul> li >a') //media
  const desc = $('.media_wrap ul li > .desc')

  //next_btn을 클릭하면 top3가 상단으로 애니메이션되면서 올라오게 한다.\
  $('#arrow').click(function(){
    //e.preventDefault();

    $('html, body').animate({scrollTop:$('#company').offset().top-70},500, 'easeOutQuint');

    return false;
  });
  // company  main_count
  function count_num(){
  
  // int1
  $({ val : 1 }).stop().animate({ val : 44 }, {
    duration: 1500,
    step: function() {
      var num = numberWithCommas(Math.floor(this.val));
      $(".int1 span").text(num);
    },
    complete: function() {
      var num = numberWithCommas(Math.floor(this.val));
      $(".int1 span").text(num);
    }
  });

  // int2
  $({ val : 1 }).stop().animate({ val : 380 }, {
    duration: 1500,
    step: function() {
      var num1 = numberWithCommas(Math.floor(this.val));
      $(".int2 span").text(num1);
    },
    complete: function() {
      var num1 = numberWithCommas(Math.floor(this.val));
      $(".int2 span").text(num1);
    }
  });
  
  // int3
  $({ val : 1 }).stop().animate({ val : 188000 }, {
    duration: 1500,
    step: function() {
      var num2 = numberWithCommas(Math.floor(this.val));
      $(".int3 span").text(num2);
    },
    complete: function() {
      var num2 = numberWithCommas(Math.floor(this.val));
      $(".int3 span").text(num2);
    }
  });
  }

  $(window).scroll(function(){
    let sPos=Math.ceil((($(this).scrollTop()/$(this).height())*100));
    console.log(sPos);

    if(sPos==300){
      // int1
      $({ val : 0 }).stop().animate({ val : 44 }, {
        duration: 1500,
        step: function() {
          var num = numberWithCommas(Math.floor(this.val));
          $(".int1 span").text(`"${num}"`);
        },
        complete: function() {
          var num = numberWithCommas(Math.floor(this.val));
          $(".int1 span").text(`"${num}"`);
        }
      });

      // int2
      $({ val : 0 }).stop().animate({ val : 380 }, {
        duration: 1500,
        step: function() {
          var num1 = numberWithCommas(Math.floor(this.val));
          $(".int2 span").text(`"${num1}"`);
        },
        complete: function() {
          var num1 = numberWithCommas(Math.floor(this.val));
          $(".int2 span").text(`"${num1}"`);
        }
      });
      
      // int3
      $({ val : 0 }).stop().animate({ val : 188000 }, {
        duration: 1500,
        step: function() {
          var num2 = numberWithCommas(Math.floor(this.val));
          $(".int3 span").text(`"${num2}"`);
        },
        complete: function() {
          var num2 = numberWithCommas(Math.floor(this.val));
          $(".int3 span").text(`"${num2}"`);
        }
      });
    }
  });



  
  // 3자리 마다 ,
  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // media hover

  $(s_list).hover(function(){
    $(this).next('div').css({'opacity':'1'});
    $(this).next('div').addClass('on')
  }, function(){
    $(this).next('div').css('opacity','0');
    $(this).next('div').removeClass('on')
  })

  //business slide

  var wheel = Draggable.create("#wheel", {
    type:"rotation",
    throwProps:true,
      snap:function(endValue) {
      return Math.round(endValue / 90) * 90;
    },   
    onDrag: function() {},
    onThrowComplete: function() {
      dragActive()
    }
  });

  TweenMax.set('#wheel li:not(.active) .details > *', {
    opacity: 0,
    y: -10
  });

 // Calculate which product is active
  function dragActive() {
    var rot = wheel[0].rotation / 360
    var decimal = rot % 1
    var sliderLength = $('#wheel li').length
    var tempIndex = Math.round(sliderLength * decimal)
    var index

    if (rot < 0) {
      index = Math.abs(tempIndex)
    } else {
      index = sliderLength - tempIndex
    }

    if (decimal === 0) {
      index = 0
    }

    TweenMax.staggerTo('#wheel li.active .details > *', 0.6,{
      opacity: 0,
      y: -10
    }, 0.1)

    $('#wheel li.active').removeClass('active')
    $($('#wheel li')[index]).addClass('active')

    TweenMax.staggerTo('#wheel li.active .details > *', 0.6, {
      opacity: 1,
      y: 0
    }, 0.1)
  };

 // Tween rotation
  function rotateDraggable(deg, callback) {
    var rot = wheel[0].rotation
    var tl = new TimelineMax()

    tl
      .to('#wheel', .5, {
        rotation: rot + deg,
        onComplete: function() {
          callback()
        }
      });
    wheel[0].rotation = rot + deg
  };

 // Handlers
  function nextHandler() {
    var current = $('#wheel li.active')
    var item = current + 1
    if (item > $('#wheel li').length) {
      item = 1
    }
    rotateDraggable(360/$('#wheel li').length, dragActive);
  };

  function prevHandler() {
    var current = $('#wheel li.active')
    var item = current - 1
    if (item > 1) {
      item = $('#wheel li').length
    }
    rotateDraggable(-360/$('#wheel li').length, dragActive);
  };

  $('.next').on('click', nextHandler);
  $('.prev').on('click', prevHandler);

  var square = '<svg x="0px" y="0px" width="1200px" height="600px" viewBox="0 0 1200 600"><rect x="0.002" y="0.499" width="1200" height="600"/></svg>'

  // business typing
  const text = document.querySelector(".typing .t_trans");

  // 글자 모음
  const letters = [
    "Music!",
    "Story!", 
    "Studio!",
    "FreeStyle!"
  ];

  // 글자 입력 속도
  const speed = 100;
  let i = 0;

  // 타이핑 효과
    const typing = async () => {  
    const letter = letters[i].split("");
    
    while (letter.length) {
      await wait(speed);
      text.innerHTML += letter.shift(); 
    }
    
    // 잠시 대기
    await wait(800);
    
    // 지우는 효과
    remove();
  }

  // 글자 지우는 효과
  const remove = async () => {
    const letter = letters[i].split("");
    
    while (letter.length) {
      await wait(speed);
      
      letter.pop();
      text.innerHTML = letter.join(""); 
    }
    
    // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
    i = !letters[i+1] ? 0 : i + 1;
    typing();
    }

    // 딜레이 기능 ( 마이크로초 )
    function wait(ms) {
      return new Promise(res => setTimeout(res, ms))
    }

    // 초기 실행
    setTimeout(typing, 1500);

});