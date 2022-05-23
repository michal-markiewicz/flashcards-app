"use strict";

const cardContainer = document.getElementById('card-container');
let currentCard = null;
const nextQuestionButton = document.getElementById('next-question');

nextQuestionButton.addEventListener('click', showCard);

window.addEventListener('click', (e) => {
    if (e.target.className === "answer")
    {
        console.log(e.target.textContent);
        if (e.target.textContent.includes(currentCard.answer))
        {
            alert('Correct!');
        }
        else 
        {
            alert('Incorrect!');
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
        return alert('No more cards!');
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
    <div class="card">
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
}

