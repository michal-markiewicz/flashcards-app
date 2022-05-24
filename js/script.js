"use strict";

const cardSound = new Audio('audio/single_card_deal.ogg');
const correctAnswerSound = new Audio('audio/correct-answer.mp3');
const wrongAnswerSound = new Audio ('audio/wrong-answer.mp3');

const cardContainer = document.getElementById('card-container');

const nextQuestionButton = document.getElementById('next-question');
const resetButton = document.getElementById('reset');
const resultsButton = document.getElementById('results');

nextQuestionButton.addEventListener('click', showCard);
resetButton.addEventListener('click', resetCards);
resultsButton.addEventListener('click', showResults);

const currentCard = {
    answer: null,
    answeredCorrectly: null
}

if (localStorage.getItem('correctAnswers') === null || localStorage.getItem('wrongAnswers') === null)
{
    localStorage.setItem('correctAnswers', "0");
    localStorage.setItem('wrongAnswers', "0");
}

window.addEventListener('click', (e) => {
    if (e.target.className === "answer" && currentCard.answeredCorrectly === null)
    {
        if (e.target.textContent.includes(currentCard.answer))
        {
            currentCard.answeredCorrectly = true;
            results.currentSession.correctAnswers++;
            results.currentDeck.correctAnswers++;
            results.lifetime.updateLocalStorage(1, 0);
            e.target.style.color = "rgb(39, 184, 61)";
            correctAnswerSound.play();
        }
        else 
        {
            currentCard.answeredCorrectly = false;
            results.currentSession.wrongAnswers++;
            results.currentDeck.wrongAnswers++;
            results.lifetime.updateLocalStorage(0, 1);
            e.target.style.color = "rgb(184, 39, 39)";
            wrongAnswerSound.play();
        }
    }
})

const deck = {
    1: 
    {
        question: 'What is scope?',
        answer: `Baby don't hurt me, don't hurt me, no more!`,
        hasAlreadyShown: false
    },
    2: 
    {
        question: 'What is life?',
        answer: 'Just a journey',
        hasAlreadyShown: false
    },
    3: 
    {
        question: 'Who am I?',
        answer: 'Idk',
        hasAlreadyShown: false
    },
    4: 
    {
        question: 'Wtf is this man?',
        answer: 'Not a clue',
        hasAlreadyShown: false
    },
    5: 
    {
        question: 'Can I do something about that?',
        answer: 'Nah',
        hasAlreadyShown: false
    },
}

const results = {
    lifetime: 
    {
        correctAnswers: Number(localStorage.getItem('correctAnswers')),
        wrongAnswers: Number(localStorage.getItem('wrongAnswers')),
        correctAnswersPercentage: function() 
        {
            const result = this.correctAnswers / (this.correctAnswers + this.wrongAnswers) * 100;
            return result.toFixed(2) + '%'; 
        },
        updateLocalStorage: function(correctAnswers = 0, wrongAnswers = 0)
        {
            if (correctAnswers > 0)
            {
                let lifetimeCorrectAnswers = Number(localStorage.getItem('correctAnswers'));
                lifetimeCorrectAnswers += correctAnswers;
                localStorage.setItem('correctAnswers', `${lifetimeCorrectAnswers}`);
            }
            else if (wrongAnswers > 0)
            {
                let lifetimeWrongAnswers = Number(localStorage.getItem('wrongAnswers'));
                lifetimeWrongAnswers += wrongAnswers;
                localStorage.setItem('wrongAnswers', `${lifetimeWrongAnswers}`);
            }
        }
    },
    currentSession:
    {
        correctAnswers: 0,
        wrongAnswers: 0,
        correctAnswersPercentage: function() 
        {
            const result = this.correctAnswers / (this.correctAnswers + this.wrongAnswers) * 100;
            return result.toFixed(2) + '%'; 
        }
    },
    currentDeck:
    {
        correctAnswers: 0,
        wrongAnswers: 0,
        correctAnswersPercentage: function() 
        {
            const result = this.correctAnswers / (this.correctAnswers + this.wrongAnswers) * 100;
            return result.toFixed(2) + '%'; 
        }
    }
}

window.onload = showCard();


function showCard()
{
    currentCard.answer = null;
    currentCard.answeredCorrectly = null;
    cardContainer.innerHTML = '';

    const cardElement = document.createElement('div');
    
    const validCards = [];
    const answers = [];

    // Get validCards and answers
    for (let card in deck)
    {
        if (deck[card].hasAlreadyShown === false)
        {
            validCards.push(deck[card]);
        }

        answers.push(deck[card].answer);
    }

    if (validCards.length === 0)
    {
        return "no more cards!";
    }

    const randomCard = validCards[Math.floor(Math.random() * validCards.length)];
    currentCard.answer = randomCard.answer;
    randomCard.hasAlreadyShown = true;

    const cardAnswer = randomCard.answer;
    answers.splice(answers.indexOf(cardAnswer), 1);

    const randomAnswers = [];

    // Get random answers
    for (let i = 0; i < 3; i++)
    {
        const answer = answers[Math.floor(Math.random() * answers.length)];
        randomAnswers.push(answer);
        answers.splice(answers.indexOf(answer), 1);
    }

    const possibleAnswers = randomAnswers;
    possibleAnswers.push(cardAnswer);

    const answerElements = [];

    // Randomize correct answer with incorrect answers
    for (let i = 0; i < 4; i++)
    {
        const randomAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
        possibleAnswers.splice(possibleAnswers.indexOf(randomAnswer), 1);
        answerElements.push(randomAnswer);
    }

    cardContainer.appendChild(cardElement);

    cardElement.outerHTML = `    
    <div class="card" id="current-card">
        <div class="question">
            <h2>${randomCard.question}</h2>
        </div>

        <div class="answers">
            <span class="answer">A. ${answerElements[0]}</span>
            <span class="answer">B. ${answerElements[1]}</span>
            <span class="answer">C. ${answerElements[2]}</span>
            <span class="answer">D. ${answerElements[3]}</span>
        </div>
    </div>`;

    cardSound.play().catch(() => {
        return "cannot play audio without user interaction";
    });
}

function resetCards()
{
    results.currentDeck.correctAnswers = 0;
    results.currentDeck.wrongAnswers = 0;

     for (let card in deck)
     {
         deck[card].hasAlreadyShown = false; 
     }

     showCard();
}

function showResults()
{
    alert(
`Current session success rate: ${results.currentSession.correctAnswersPercentage()}
Current deck success rate: ${results.currentDeck.correctAnswersPercentage()}
Lifetime success rate: ${results.lifetime.correctAnswersPercentage()}`
    )
}


