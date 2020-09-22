/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game



Coding Challenges:
YOUR 3 CHALLENGES

Change the game to follow these rules:

1. A player loses his ENTIRE score when he rolls two 6's in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)

3. Add another dice to the game, so that there are two dices now. The player loses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)




*/







/******* First DOM Access and Manipulation ********/

var scores, roundScore, dice, activePlayer, gamePlaying;
init();


document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) { // gamePlaying === true
        // 1. Random number ( go grab dice = Math....)
        var dice = Math.floor(Math.random() * 6) + 1;


        // 2. Display the result
        var diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled nubmer was NOT a 1
        if (dice !== 1) { // Update roundScore (add it to itself)
            roundScore += dice;

            // current-0 and current-1
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else { // Rolls a 1: Switch activePlayer, current to 0, dice disappears
            // Next Player
            nextPlayer();
        }
    }
    
});

/*******  Implementing our 'Hold' function and DRY Principle ********/


document.querySelector('.btn-hold').addEventListener('click', function() {

    if(gamePlaying) { // gamePlaying === true
        // add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';

            // Hide die -> Dont want to mess with style too much in javascript (winner class)
            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;

        } else {
            // Next Player (current score to 0, making dice display none)
            // Next Player
            nextPlayer();
        }

    }

});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Hide die
    document.querySelector('.dice').style.display = 'none';

    // Set current-0 and current-1 to 0
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // Switching red dot to active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


/* NEW GAME FUNCTIONALITY */

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.getElementById('name-0').textContent = 'Player 1!';
    document.getElementById('name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}





