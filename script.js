const quizData = [
    {
        question: "O que você faz quando seu filho tem febre?",
        options: [
            "Dou remédio imediatamente, mesmo se for baixa.",
            "Observo o estado geral dele antes de medicar.",
            "Entro em desespero e ligo para o médico.",
            "Dou banho gelado na mesma hora."
        ]
    },
    {
        question: "Você sabe qual temperatura é considerada febre preocupante?",
        options: [
            "A partir de 37,5°C",
            "A partir de 37,8°C",
            "A partir de 38°C ou 39°C (dependendo da idade)",
            "Não tenho certeza, sempre fico na dúvida."
        ]
    },
    {
        question: "Como está a farmacinha de emergência na sua casa?",
        options: [
            "Tenho tudo anotado e com validade em dia.",
            "Tenho alguns remédios, mas ficam bagunçados.",
            "Só compro quando ele fica doente.",
            "Nunca sei o que é realmente essencial ter."
        ]
    },
    {
        question: "Se seu filho vomitar de madrugada, qual sua 1ª atitude?",
        options: [
            "Corro para o pronto-socorro imediatamente.",
            "Dou água/soro aos poucos e observo.",
            "Dou um remédio para enjoo que sobrou.",
            "Fico acordada com muito medo de ele engasgar."
        ]
    },
    {
        question: "Sabe quais sintomas indicam ida IMEDIATA ao hospital?",
        options: [
            "Conheço todos os sinais de alerta graves.",
            "Conheço alguns, mas fico na dúvida se é grave.",
            "Acho que qualquer febre é motivo para ir.",
            "Sinceramente, tenho muito medo de errar."
        ]
    }
];

let currentStep = 0;
const totalSteps = quizData.length;

// DOM Elements
const screenStart = document.getElementById('screen-start');
const screenQuiz = document.getElementById('screen-quiz');
const screenLoading = document.getElementById('screen-loading');
const screenResult = document.getElementById('screen-result');

const btnStart = document.getElementById('btn-start');
const btnBack = document.getElementById('btn-back');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const currentStepEl = document.getElementById('current-step');

// Events
btnStart.addEventListener('click', () => {
    switchScreen(screenStart, screenQuiz);
    loadQuestion(0);
});

btnBack.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        loadQuestion(currentStep);
    } else {
        switchScreen(screenQuiz, screenStart);
    }
});

// Functions
function switchScreen(from, to) {
    from.classList.remove('active');
    from.classList.add('fade-out');
    
    setTimeout(() => {
        from.classList.remove('fade-out');
        to.classList.add('active');
    }, 400); // Matches CSS transition time
}

function loadQuestion(stepIndex) {
    currentStep = stepIndex;
    const data = quizData[stepIndex];
    
    // Update Progress
    const progress = ((stepIndex + 1) / totalSteps) * 100;
    progressBar.style.width = `${progress}%`;
    currentStepEl.textContent = stepIndex + 1;
    
    // Update Question text with animation
    questionText.style.opacity = '0';
    setTimeout(() => {
        questionText.textContent = data.question;
        questionText.style.opacity = '1';
        questionText.style.transition = 'opacity 0.3s';
    }, 200);

    // Render Options
    optionsContainer.innerHTML = '';
    
    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = opt;
        
        // Staggered animation
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(10px)';
        optionsContainer.appendChild(btn);
        
        setTimeout(() => {
            btn.style.transition = 'opacity 0.3s, transform 0.3s, background-color 0.2s, border-color 0.2s';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
        }, 100 + (index * 100));

        btn.addEventListener('click', () => handleOptionSelection(btn));
    });
}

function handleOptionSelection(selectedBtn) {
    // Disable all buttons to prevent multiple clicks
    const allBtns = optionsContainer.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.style.pointerEvents = 'none');
    
    // Highlight selected
    selectedBtn.classList.add('selected');
    
    setTimeout(() => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            loadQuestion(currentStep);
        } else {
            showLoadingScreen();
        }
    }, 400); // Short delay to show selection
}

function showLoadingScreen() {
    switchScreen(screenQuiz, screenLoading);
    
    // Simulate analyzing data
    setTimeout(() => {
        document.querySelector('.loading-text').textContent = "Identificando pontos de risco...";
    }, 1200);
    
    setTimeout(() => {
        document.querySelector('.loading-text').textContent = "Finalizando análise...";
    }, 2400);

    setTimeout(() => {
        switchScreen(screenLoading, screenResult);
    }, 3500);
}
