/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const types = ['C', 'D', 'H', 'S'];
const specials = ['J', 'Q', 'K', 'A'];

let scorePlayer = 0,
    scoreComputer = 0;

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const scoreDisplay = document.querySelectorAll('small');

const divPlayerCards = document.querySelector('#jugador-cartas');
const divComputerCards = document.querySelector('#computadora-cartas');

const createDeck = () => {
    for( i = 2; i <= 10; i++ ) {
        for( type of types ) {
            deck.push( i + type );
        }
    }
    for ( type of types ) {
        for (special of specials) {
            deck.push( special + type );
        }
    }
    deck = _.shuffle( deck );
}

//Esta función me permite tomar una carta
const drawCard = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();

    return carta;
}

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
}

const computerTurn = ( minScore ) => {
    do {
        const card = drawCard();
        scoreComputer = scoreComputer + cardValue(card);
        scoreDisplay[1].innerText = scoreComputer;

        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${card}.png`
        imgCard.classList.add('carta');

        divComputerCards.append(imgCard);

        if (minScore > 21) {
            break;
        }
    }while( (scoreComputer < scorePlayer) && (scorePlayer <= 21) );

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
}

createDeck();

btnPedir.addEventListener('click', () => {
    const card = drawCard();
    scorePlayer = scorePlayer + cardValue(card);
    scoreDisplay[0].innerText = scorePlayer;

    const imgCard = document.createElement('img');
    imgCard.src = `assets/cartas/${card}.png`;
    imgCard.classList.add('carta');

    divPlayerCards.append(imgCard);

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
    computerTurn(scorePlayer);
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    createDeck();
    scorePlayer = 0;
    scoreComputer = 0;
    scoreDisplay[0].innerText = 0;
    scoreDisplay[1].innerText = 0;
    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

const valor = cardValue( drawCard() );

