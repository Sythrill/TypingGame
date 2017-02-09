var time;
var number;
var points = 0;
var delay = 3000;

$(function () {
    $('body').fadeIn(1200);
});

$(document).ready(function () {
    $('#start').click(function () {
        generateLetter();
    });
});

function changeTime() {
    if (delay > 500) {
        delay -= 500;
    } else {
        delay === 500;
    }
};

setInterval(changeTime, 60000);

function generateLetter() {
    var number = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
    var chracter = String.fromCharCode(number);
    var top = Math.floor(Math.random() * 200);
    var left = Math.floor(Math.random() * 700);
    $(document).ready(function () {
        $('.game_container').append('<span class="bubble bubble' + number + '"><h4>' + chracter + '</h4></span>');
        $('.bubble').css('top', +top).css('left', +left);
        addPoints(number);
        takeLife(number);
    });

    time = setTimeout(generateLetter, delay);
};

function addPoints(number) {
    $(document).keydown(function (event) {
        var keycode = event.keyCode;
        if (keycode === number) {
            $('.bubble' + number).css('background', '#A2AB58').hide('slow', function () {
                points += 20;
                $('#score').html(points);
                $(this).remove();
            });
        }
    });
};

function takeLife(number) {
    $(document).keydown(function (event) {
        var keycode = event.keyCode;
        if (keycode !== number) {
            $('.bubble' + number).css('background', '#E44424').hide('slow', function () {
                $(this).remove();
                $('#lifes > .game_lifes:first').hide('slow', function () {
                    var elements = $('#lifes > .game_lifes').length;
                    elements--;
                    $(this).remove();
                    gameOver(elements);
                });
            });
        }
    });
};

function gameOver(elements) {
    if (elements === 0) {
        alert('Game Over. You have: ' + points + ' points.');
        clearTimeout(time);
        location.reload();
    }
};

$(document).ready(function () {
    var carouselList = $('#img_list');
    var btnList = $('#btn_list');
    setInterval(changeSlide, 5000);
    function changeSlide() {
        var firstBtn = btnList.find('li:first');
        $('.item').first().addClass('active');
        firstBtn.addClass('selected');
        var currentImage = $('.item.active');
        var nextImage = currentImage.next();
        if (nextImage.length === 0) {
            nextImage = $('.item').first();
        }
        currentImage.removeClass('active');
        nextImage.addClass('active');
        var currentImgNo = $('.item.active').data('slide-number');
        var id = currentImgNo + 1;
        $('[id^=carousel-selector-]').removeClass('selected');
        $('[id=carousel-selector-' + id + ']').addClass('selected');
        if (id === 5) {
            firstBtn.addClass('selected');
        };
        carouselList.animate({ 'marginLeft': -800 }, 500, moveFirstSlide);
    };

    function moveFirstSlide() {
        var firstItem = carouselList.find('li:first');
        var lastItem = carouselList.find('li:last');
        lastItem.after(firstItem);
        carouselList.css({ marginLeft: 0 });
    };

    $('[id^=carousel-selector-]').click(function () {
        var selectedBtn = $(this).attr("id");
        var id = selectedBtn.substr(selectedBtn.length - 1);
        console.log('button ', +id);
        var currentImgNo = $('.item.active').data('slide-number');
        console.log('obrazek ', +currentImgNo);
        var pxCurImg = currentImgNo * 800;
        var pxTarImg = id * 800;
        console.log('tu ', +pxCurImg);
        console.log('do ', +pxTarImg);
        if (selectedBtn > id) {
            var move = pxTarImg - pxCurImg;
            $('#img_list').animate({ 'left': move + 'px' });
            $('[id^=img-num-]').removeClass('active');
            $('[id=img-num-' + id + ']').addClass('active');
        } else {
            var move = pxCurImg - pxTarImg;
            $('#img_list').animate({ 'left': move + 'px' });
            $('[id^=img-num-]').removeClass('active');
            $('[id=img-num-' + id + ']').addClass('active');
        }
        console.log(move);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });
    $('#right_arrow').click(function () {
        $('#img_list').animate({ 'left': 0 }, 500, function () {
            $('#img_list li:first').before($('#img_list li:last'));
        });
        return false;
    });

    $('#left_arrow').click(function () {
        $('#img_list').animate({ 'left': 0 }, 500, function () {
            $('#img_list li:last').after($('#img_list li:first'));
        });
        return false;
    });
});
















/*$('[id^=carousel-selector-]').click( function(){
  var id_selector = $(this).attr("id");
  var id = id_selector.substr(id_selector.length -1);
  id = parseInt(id);
  $('#carousel').carousel(id);
  $('[id^=carousel-selector-]').removeClass('active');
  $(this).addClass('active');
});

// when the carousel slides, auto update
$('#img_list').on('slide', function (e) {
  var id = $('.carousel_buttons.active').data('slide-number');
  id = parseInt(id);
  $('[id^=carousel-selector-]').removeClass('active');
  $('[id=carousel-selector-'+id+']').addClass('active');
});*/