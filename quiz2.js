const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyper Transfer Markup Language", correct: false },
            { text: "Hyper Text Machine Language", correct: false }
        ]
    },
    {
        question: "Which language is used for styling web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "Python", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which language is used for web interactivity?",
        answers: [
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "HTML", correct: false },
            { text: "C++", correct: false }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");

function showQuestion() {
    resetState();

    let q = questions[currentQuestion];
    questionElement.innerText = q.question;

    q.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            if (answer.correct) {
                score++;
            }

            Array.from(answersElement.children).forEach(btn => {
                btn.disabled = true;
            });

            nextBtn.style.display = "block";
        });

        answersElement.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    answersElement.innerHTML = "";
}

nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz").classList.add("hide");
    document.getElementById("result").classList.remove("hide");
    document.getElementById("score").innerText =
        `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("quiz").classList.remove("hide");
    document.getElementById("result").classList.add("hide");

    showQuestion();
}

showQuestion();