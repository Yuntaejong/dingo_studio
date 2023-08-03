$(document).ready(function(){
  const s_list = $('.media_wrap ul> li >a')
  const desc = $('.media_wrap ul li > .desc')

  $(s_list).hover(function(){
    $(this).next('div').css('opacity','1');
  }, function(){
    $(this).next('div').css('opacity','0');
  })
});