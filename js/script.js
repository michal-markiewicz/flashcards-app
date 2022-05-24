"use strict";

const cardSound = new Audio('audio/single_card_deal.ogg');
const correctAnswerSound = new Audio('audio/correct-answer.mp3');
const wrongAnswerSound = new Audio ('audio/wrong-answer.mp3');

const cardContainer = document.getElementById('card-container');
let currentCard = null;
const nextQuestionButton = document.getElementById('next-question');

nextQuestionButton.addEventListener('click', showCard);

window.addEventListener('click', (e) => {
    if (e.target.className === "answer")
    {
        if (e.target.textContent.includes(currentCard.answer))
        {
            if (e.target.style.color == "rgb(39, 184, 61)")
            {
                return "do nothing";
            }
            else 
            {
                e.target.style.color = "rgb(39, 184, 61)";
                correctAnswerSound.play();
            }
        }
        else 
        {
            if (e.target.style.color == "rgb(184, 39, 39)")
            {
                return "do nothing";
            }
            else 
            {
                e.target.style.color = "rgb(184, 39, 39)";
                wrongAnswerSound.play();
            }
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

window.onload = showCard();


function showCard()
{
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
    currentCard = randomCard;
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

