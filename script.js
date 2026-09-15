
// генерация звёзд 
const starsContainer = document.getElementById('stars');
const STAR_COUNT = 60;
for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2.5 + 1;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = (Math.random() * 2.5) + 's';
    starsContainer.appendChild(s);
}

// лёгкий параллакс звёзд при движении мыши
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    starsContainer.style.transform = `translate(${x}px, ${y}px)`;
});

// вопросы
const questions = [
    {
        question: "Робот сломался перед соревнованием. Твоя команда начинает его чинить, чем вы занимаетесь?",
        options: [
            { text: "Разбираю и чиню", type: "engineer" },
            { text: "Правлю код", type: "coder" },
            { text: "Привожу в надлежащий вид, чтобы не было стыдно презентовать", type: "creative" }
        ]
    },
    {
        question: "Какое задание нравится больше?",
        options: [
            { text: "Собрать конструкцию", type: "engineer" },
            { text: "Написать программу", type: "coder" },
            { text: "Создать дизайн", type: "creative" }
        ]
    },
    {
        question: "Нашёл(а) волшебную кнопку. Что она делает?",
        options: [
            { text: "Создаёт", type: "engineer" },
            { text: "Решает любую задачу", type: "coder" },
            { text: "Превращает идею в голове в рисунок", type: "creative" }
        ]
    }
];

const results = {
    engineer: {
        title: "Инженер-конструктор!",
        text: "Любишь собирать и чинить — тебе точно понравится робототехника."
    },
    coder: {
        title: "Программист от природы!",
        text: "Мыслишь логично — Python и ИИ это про тебя."
    },
    creative: {
        title: "Инженер-дизайнер!",
        text: "Видишь красоту в технологиях — тебе подойдёт дизайн."
    }
};

let step = 0;
const answers = [];
const app = document.getElementById('app');

function showQuestion() {
    const q = questions[step];

    let html = '<div class="card">';
    html += '<div class="question">' + (step + 1) + '. ' + q.question + '</div>';
    html += '<div class="options">';

    q.options.forEach(o => {
        html += '<button class="option" onclick="answer(\'' + o.type + '\')">' + o.text + '</button>';
    });

    html += '</div></div>';
    app.innerHTML = html;
}

function answer(type) {
    answers.push(type);
    step++;
    if (step < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const counts = {};
    answers.forEach(t => counts[t] = (counts[t] || 0) + 1);

    let winner = answers[0];
    for (const t in counts) {
        if (counts[t] > counts[winner]) winner = t;
    }
    const r = results[winner];

    app.innerHTML =
        '<div class="card">' +
        '<div class="result show">' +
        '<div class="result-title">' + r.title + '</div>' +
        '<div class="result-text">' + r.text + '</div>' +
        '<button class="restart" onclick="restart()">Пройти ещё раз</button>' +
        '</div>' +
        '</div>';
}

function restart() {
    step = 0;
    answers.length = 0;
    showQuestion();
}

showQuestion();