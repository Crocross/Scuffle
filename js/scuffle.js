let scuffleWord;
let scuffleWordLength;
let incorrectLetters = [];
let guessedWords = [];
let solved;

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
        e.preventDefault(); // cancel the actual submit
        NewGame();
    });
    
    $('#copyForDiscord').on('click', function(e) {
        e.preventDefault(); // cancel the actual submit
        CopyForDiscord();
    });
    
    ShowHideWord();
}

function StartScuffle() {
        scuffleWord = $('#ScuffleWord').val().toUpperCase();
        scuffleWordLength = scuffleWord.length;

        if(scuffleWordLength > 0) {
            $('#ChoosingWord').toggleClass('d-none');
            $('#GuessingWord').toggleClass('d-none');
            $('#GuessingWord').addClass('flex-fill scuffleForm');
            
            scuffleSolution = "";
            for (let i = 0; i < scuffleWord.length; i++) {
                scuffleSolution += "_ ";
            }
            scuffleSolution.trim();
            $('#gameText').text(scuffleSolution);
            ResizeGameText();
        }
}

function ScuffleGuess() {
    let scuffleGuess = $('#ScuffleGuess').val().toUpperCase().trim();
    let scuffleGuessLength = scuffleGuess.length;
    if(scuffleGuessLength == scuffleWordLength) {
        solved = true;
        let guess = scuffleGuess.toUpperCase().trim();
        $('#ScuffleGuess').val("");
        $('#GuessedWords').prepend('<li>' + guess + '</li>');
        guessedWords.push(guess);
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
                solved = false;
            }
        }
        incorrectLetters.sort();
        $('#IncorrectLetters').html(IncorrectLettersToString("<br>"));
        scuffleSolution.trim();
        $('#gameText').text(scuffleSolution.toUpperCase());
        if(solved) {
            $('#newScuffle').html("New Game");
        }
        ResizeGameText();
    }
}

function NewGame() {
    if(solved) {
        $('#ChoosingWord').toggleClass('d-none');
        $('#GuessingWord').toggleClass('d-none');
        $('#ScuffleWord').val("");
        $('#ScuffleGuess').val("");
        $('#IncorrectLetters').text("");
        $('#GuessedWords').empty();
        guessedWords = [];
        incorrectLetters = [];
        $('#newScuffle').html("Reveal Word");
        solved = false;
    }
    else {
        $('#gameText').text(scuffleWord.split("").join(" "));
        $('#newScuffle').html("New Game");
        solved = true;
        ResizeGameText();
    }
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

function IncorrectLettersToString(separator) {
    let incorrectLettersString = "";
    for(let i = 0; i < incorrectLetters.length; i++) {
        if((i + 1) % 5 == 0) {
            incorrectLettersString += incorrectLetters[i] + separator;
        }
        else {
            incorrectLettersString += incorrectLetters[i] + " ";
        }
    }
    return incorrectLettersString.trim();
}

function CopyForDiscord() {
    let discordCopy = "```Scuffle... but not really!\n";
    discordCopy += $('#gameText').text() + "\n";
    discordCopy += "\nGuesses:\n";
    for(let i = guessedWords.length; i > 0; i--) {
        discordCopy += i + ". " + guessedWords[i-1] + "\n";
    }
    discordCopy += "\nIncorrect Letters:\n";
    discordCopy += IncorrectLettersToString("\n");
    discordCopy += "```";
    navigator.clipboard.writeText(discordCopy);
}

function ResizeGameText() {
    var fontsize = $('#gameText').css('font-size');

    if($('#gameText').height() > "300") {
        $('#gameText').css('fontSize', parseFloat(fontsize) - 1);
        ResizeGameText();
    }
}
