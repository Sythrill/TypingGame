var time;
var number;
var points = 0;
var delay = 3000;

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
            $('.bubble' + number).css('background','#A2AB58').hide('slow', function () {
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
            $('.bubble' + number).css('background','#E44424').hide('slow', function () {
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
        alert('Game Over. You have: '+points+' points.');
        clearTimeout(time);
        location.reload();
    }
};


