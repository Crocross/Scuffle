let scuffleWord;
let scuffleWordLength;
let incorrectLetters = [];

var Scuffle = (function () {
    Initialize();
})();

function Initialize() {
    $('#startScuffle').on('click', function(e) {
        e.preventDefault(); // cancel the actual submit
        StartScuffle();
    });
    
    $('#guessScuffle').on('click', function(e) {
        e.preventDefault(); // cancel the actual submit
        ScuffleGuess();
    });
    
    $('#newScuffle').on('click', function(e) {
        e.preventDefault();
        NewGame();
    });
    
    ShowHideWord();
}

function StartScuffle() {
        scuffleWord = $('#ScuffleWord').val();
        scuffleWordLength = scuffleWord.length;

        if(scuffleWordLength > 0 && scuffleWordLength < 11) {
            $('#ChoosingWord').toggleClass('d-none');
            $('#GuessingWord').toggleClass('d-none');
            $('#GuessingWord').addClass('flex-fill scuffleForm');
            
            scuffleSolution = "";
            for (let i = 0; i < scuffleWord.length; i++) {
                scuffleSolution += "_ ";
            }
            scuffleSolution.trim();
            $('#gameText').text(scuffleSolution);
        }
}

function ScuffleGuess() {
    let scuffleGuess = $('#ScuffleGuess').val();
    let scuffleGuessLength = scuffleGuess.length;
    
    if(scuffleGuessLength == scuffleWordLength) {
        $('#ScuffleGuess').val("");
        $('#GuessedWords').prepend('<li>' + scuffleGuess.toUpperCase() + '</li>');
        oldSolution = $('#gameText').text();
        oldSolution = oldSolution.replace(/\s+/g, "");
        scuffleSolution = "";
        for (let i = 0; i < scuffleWord.length; i++) {
            if(!scuffleGuess[i].localeCompare(scuffleWord[i])) {
                scuffleSolution += scuffleGuess[i] + " ";
            }
            else {
                if(oldSolution[i] == "_") {
                    scuffleSolution += "_ ";
                }
                else {
                    scuffleSolution += oldSolution[i] + " ";
                }
                if(!scuffleWord.includes(scuffleGuess[i]) && !incorrectLetters.includes(scuffleGuess[i].toUpperCase())){
                    incorrectLetters.push(scuffleGuess[i].toUpperCase());
                }
            }
        }
        incorrectLetters.sort();
        incorrectLettersString = "";
        for(let i = 0; i < incorrectLetters.length; i++) {
            if((i + 1) % 5 == 0) {
                incorrectLettersString += incorrectLetters[i] + "<br>";
            }
            else {
                incorrectLettersString += incorrectLetters[i] + " ";
            }
        }
        incorrectLettersString.trim();
        $('#IncorrectLetters').html(incorrectLettersString);
        scuffleSolution.trim();
        $('#gameText').text(scuffleSolution.toUpperCase());
    }
}

function NewGame() {
    $('#ChoosingWord').toggleClass('d-none');
    $('#GuessingWord').toggleClass('d-none');
    $('#ScuffleWord').val("");
    $('#ScuffleGuess').val("");
    $('#IncorrectLetters').text("");
    $('#GuessedWords').empty();
    incorrectLetters = [];
}

function ShowHideWord() {
    $('[data-bs-toggle="password"]').each(function () {
        var input = $(this);
        var eye_btn = $(this).parent().find('.input-group-text');
        eye_btn.css('cursor', 'pointer').addClass('input-password-hide');
        eye_btn.on('click', function () {
            if (eye_btn.hasClass('input-password-hide')) {
                eye_btn.removeClass('input-password-hide').addClass('input-password-show');
                eye_btn.find('.bi').removeClass('bi-eye').addClass('bi-eye-slash')
                input.attr('type', 'text');
            } else {
                eye_btn.removeClass('input-password-show').addClass('input-password-hide');
                eye_btn.find('.bi').removeClass('bi-eye-slash').addClass('bi-eye')
                input.attr('type', 'password');
            }
        });
    });
}
