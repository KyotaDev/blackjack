/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

const myModule = (() => {
    'use strict';
    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
          specials = ['J', 'Q', 'K', 'A'];  

    let scorePlayers = [];

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');   

    const scoreDisplay = document.querySelectorAll('small');    

    const divCardsPlayers = document.querySelectorAll('.divCartas');

    const initGame = ( numPlayers = 2 ) => {
        deck = createDeck();
        scorePlayers = [];
        for(let i = 0; i < numPlayers; i++){
            scorePlayers.push(0);
        }

        scoreDisplay.forEach( elem => elem.innerText = 0 );
        divCardsPlayers.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const createDeck = () => {

        deck = [];

        for( let i = 2; i <= 10; i++ ) {
            for( let type of types ) {
                deck.push( i + type );
            }
        }
        for ( let type of types ) {
            for (let special of specials) {
                deck.push( special + type );
            }
        }

        return _.shuffle( deck );
    }   

    //Esta función me permite tomar una carta
    const drawCard = () => {    

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();   
    }   

    const cardValue = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
    }

    const acumulateScore = (card, turn) => {
        scorePlayers[turn] = scorePlayers[turn] + cardValue(card);
        scoreDisplay[turn].innerText = scorePlayers[turn];  
        return scorePlayers[turn];
    };

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`
        imgCard.classList.add('carta'); 
        divCardsPlayers[turn].append(imgCard);   
    }

    const determineWinner = () => {

        const [ minScore, scoreComputer ] = scorePlayers;

        setTimeout( () => {
            if(scoreComputer === minScore){
                alert('Empate');
            }
            else if ( minScore > 21 ) {
                alert('Computadora gana');
            }
            else if ( scoreComputer > 21 ){
                alert('Jugador gana');
            }
            else {
                alert('Computadora gana');
            }
        }, 100);
    };

    const computerTurn = ( minScore ) => {
        let scoreComputer = 0;

        do {
            const card = drawCard();
            scoreComputer = acumulateScore(card, scorePlayers.length - 1); 

            createCard(card, scorePlayers.length - 1);

        }while( (scoreComputer < minScore) && (minScore <= 21) ); 

        determineWinner();
    }   

    btnPedir.addEventListener('click', () => {
        const card = drawCard();
        
        const scorePlayer = acumulateScore(card, 0);
        createCard(card, 0);

        if(scorePlayer > 21) {
            console.warn('Perdiste');
            btnPedir.disabled = true;
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            computerTurn(scorePlayer);
        }
        else if (scorePlayer === 21){
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            computerTurn(scorePlayer);
        }
    })  

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        computerTurn(scorePlayers[0]);
    }); 

    btnNuevo.addEventListener('click', () => {
        initGame();
    }); 

    return {
        newGame: initGame
    };

})();
