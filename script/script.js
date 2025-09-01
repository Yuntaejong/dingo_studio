$(document).ready(function () {
	AOS.init({
		duration: 1000,
		once: false,
		disable: false
	});

	$('#fullpage').fullpage({
		autoScrolling:true,
		scrollHorizontally: true,
		scrollingSpeed: 500,
		fitToSection: true,
		anchors: ['intro1', 'intro2', 'intro3', 'company', 'media', 'business', 'news', 'recruit'],
		onLeave: function (index, nextIndex, direction) {
			$('.fp-section').eq(index - 1).find('[data-aos]').removeClass('aos-animate');

			if (index === 3 && direction == 'down') {
				startCountingAnimation();
			} else if (index === 5 && direction == 'up') {
				restartCountingAnimation();
			}

		},
		
		afterLoad: function(origin, destination, direction) {
			//도착한 섹션의 AOS 애니메이션 재실행
			setTimeout(function() {
				$('.fp-section.active [data-aos]').each(function() {
					var $this = $(this);
					$this.removeClass('aos-animate'); // 혹시 남은 클래스 제거
					// 브라우저가 변경사항을 인식하도록 강제 리플로우
					$this[0].offsetHeight;
					$this.addClass('aos-animate'); // 새로 추가
				});
			}, 100);
		}

	});

	//1. 모달 변수 생성하기
	const modal = `
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
	$('body').append(modal);

	// Cookie
	let ch = $('.modal #ch');
	if ($.cookie('popup') == 'none') {
		$('.modal').hide();
	}

	function closeModal() {
		if (ch.is(':checked')) {
			$.cookie('popup', 'none', { expires: 1, path: '/' });
		}
		$('.modal').hide();
	}

	$('.modal #c_btn').click(function () {
		closeModal();
	});

	// 배너 랜덤 반복
	let img_num = Math.floor(Math.random() * 3) + 1;
	document.getElementById('change').src = "./images/banner0" + img_num + ".png";

	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	// company	main_count
	function startCountingAnimation() {
		// int1
		$({ val: 1 }).stop().animate({ val: 44 }, {
			duration: 1500,
			step: function () {
				var num = numberWithCommas(Math.floor(this.val));
				$(".int1 span").text(num);
			},
			complete: function () {
				var num = numberWithCommas(Math.floor(this.val));
				$(".int1 span").text(num);
			}
		});

		// int2
		$({ val: 1 }).stop().animate({ val: 380 }, {
			duration: 1500,
			step: function () {
				var num1 = numberWithCommas(Math.floor(this.val));
				$(".int2 span").text(num1);
			},
			complete: function () {
				var num1 = numberWithCommas(Math.floor(this.val));
				$(".int2 span").text(num1);
			}
		});
	
		// int3
		$({ val: 1 }).stop().animate({ val: 188000 }, {
			duration: 1500,
			step: function () {
				var num2 = numberWithCommas(Math.floor(this.val));
				$(".int3 span").text(num2);
			},
			complete: function () {
				var num2 = numberWithCommas(Math.floor(this.val));
				$(".int3 span").text(num2);
			}
		});
	}

	function resetCounting() {
		$(".int1 span").text("0");
		$(".int2 span").text("0"); 
		$(".int3 span").text("0");
	}

	function restartCountingAnimation() {
		// 기존 애니메이션 정지
		$(".int1 span, .int2 span, .int3 span").stop();
		
		// 초기화 후 다시 시작
		resetCounting();
		
		// 약간의 지연 후 애니메이션 시작 (부드러운 효과를 위해)
		setTimeout(() => {
			startCountingAnimation();
		}, 100);
	}

	// media hover
	let s_list = $('.media_wrap ul> li >a') //media
	$(s_list).hover(function () {
		$(this).next('div').css({ 'opacity': '1' });
		$(this).next('div').addClass('on')
	}, function () {
		$(this).next('div').css('opacity', '0');
		$(this).next('div').removeClass('on')
	})


	//business slide
	var wheel = Draggable.create("#wheel", {
		type: "rotation",
		throwProps: true,
		snap: function (endValue) {
			return Math.round(endValue / 90) * 90;
		},
		onDrag: function () { },
		onThrowComplete: function () {
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

		TweenMax.staggerTo('#wheel li.active .details > *', 0.6, {
			opacity: 0,
			y: -10
		}, 0.1)

		$('#wheel li.active').removeClass('active')
		$($('#wheel li')[index]).addClass('active')

		TweenMax.staggerTo('#wheel li.active .details > *', 0.6, {
			opacity: 1,
			y: 0
		}, 0.1);
	};

	// Tween rotation
	function rotateDraggable(deg, callback) {
		var rot = wheel[0].rotation
		var tl = new TimelineMax()
		tl.to('#wheel', .5, {
			rotation: rot + deg,
			onComplete: function () {
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
		rotateDraggable(360 / $('#wheel li').length, dragActive);
	};

	function prevHandler() {
		var current = $('#wheel li.active')
		var item = current - 1
		if (item > 1) {
			item = $('#wheel li').length
		}
		rotateDraggable(-360 / $('#wheel li').length, dragActive);
	};

	$('.next').on('click', nextHandler);
	$('.prev').on('click', prevHandler);

	var square = '<svg x="0px" y="0px" width="1200px" height="600px" viewBox="0 0 1200 600"><rect x="0.002" y="0.499" width="1200" height="600"/></svg>'

	// media
	const albumItems = document.querySelectorAll('.album-item');

	albumItems.forEach(item => {
		const desc = item.querySelector('.desc');
		
		item.addEventListener('mouseenter', () => {
			desc.classList.add('on');
		});
		
		item.addEventListener('mouseleave', () => {
			desc.classList.remove('on');
		});
	});

	const swiper = new Swiper('.swiper', {
		slidesPerView: "5",
		loop:true,
		observeParents:true,
		observe:true,
		autoplay: {
			delay: 0,
			disableOnInteraction: false
		},
		speed: 7000,
	});

});

document.querySelectorAll('.company-tab-content > .item > span').forEach((tab, index) => {
	tab.addEventListener('click', function() {
		currentIndex = index; // currentIndex 업데이트 추가
		updateActiveItem();
	});
});

// Company Tab-Content
const items = document.querySelectorAll('.company-tab-content > .item');
let currentIndex = 0;

const updateActiveItem = () => {
	items.forEach((item, index) => {
	item.classList.toggle('active', index === currentIndex);
	});
};

updateActiveItem(); // Initialize the first active item


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


