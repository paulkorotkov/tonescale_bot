document.addEventListener('DOMContentLoaded', () => {
    // URL вашего бэкенда на Google Apps Script (вставите его позже)
    const BACKEND_URL = 'ВАШ_URL_БЭКЕНДА_БУДЕТ_ЗДЕСЬ'; 

    const tg = window.Telegram.WebApp;
    tg.expand(); // Расширяем приложение на весь экран

    // Настраиваем цвета под тему Telegram
    document.body.style.backgroundColor = tg.themeParams.bg_color || '#ffffff';
    document.body.style.color = tg.themeParams.text_color || '#000000';
    
    // Элементы DOM
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const progressBar = document.getElementById('progress-bar');
    const questionTitle = document.getElementById('question-title');
    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    const resultToneEl = document.getElementById('result-tone');
    const resultDescriptionEl = document.getElementById('result-description');

    let currentQuestionIndex = 0;
    let scores = {};

    // --- ДАННЫЕ КВИЗА ---
    const quizData = [
        { text: "<b>1/22: Эмоции, которые Вы чаще всего испытываете:</b>", answers: [ { text: "🚀 Рвение, энтузиазм", level: "4.0" }, { text: "😄 Веселье, сильный интерес", level: "3.5" }, { text: "🙂 Умеренный интерес, удовлетворенность", level: "3.0" }, { text: "😐 Безразличие, скука", level: "2.5" }, { text: "😠 Выраженное возмущение, антагонизм", level: "2.0" }, { text: "😡 Гнев, озлобленность", level: "1.5" }, { text: "😨 Скрытый страх, неприязнь", level: "1.0" }, { text: "😭 Горе, печаль, апатия", level: "0.5" }, { text: "😔 Глубокая апатия", level: "0.0" } ] },
        // ... (скопируйте сюда все 22 вопроса из предыдущего ответа) ...
        { text: "<b>22/22: Как Вас понимают люди:</b>", answers: [ { text: "💯 Очень хорошо", level: "4.0" }, { text: "😊 Хорошо", level: "3.5" }, { text: "🙂 Обычно понимают", level: "3.0" }, { text: "🤔 Иногда неверно понимают", level: "2.5" }, { text: "🤷‍♂️ Часто неверно понимают", level: "2.0" }, { text: "🤯 Постоянно неверно понимают", level: "1.5" }, { text: "🚫 Нет настоящего понимания", level: "1.0" }, { text: "❓ Вообще не понимают", level: "0.5" }, { text: "... Игнорируют", level: "0.0" } ] },
    ];
    const resultsData = {
        '4.0': `<b>Ваши шансы на успех и потенциал выживания невероятно высоки. Тон 4.0</b>\n\nВаша энергия и Ваши способности максимально работают на Вас...`,
        // ... (скопируйте сюда все описания результатов) ...
        '0.0': `<b>Ваши шансы на успех и потенциал выживания практически равны нулю. Тон 0.0</b>\n\nВаше состояние такое, что шансы на успех практически равны нулю...`,
    };
    // -------------------

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        scores = { '4.0': 0, '3.5': 0, '3.0': 0, '2.5': 0, '2.0': 0, '1.5': 0, '1.0': 0, '0.5': 0, '0.0': 0 };
        
        startScreen.style.display = 'none';
        resultScreen.style.display = 'none';
        quizScreen.style.display = 'flex';

        showQuestion(currentQuestionIndex);
    }

    function showQuestion(index) {
        const question = quizData[index];
        
        // Обновляем прогресс
        const progress = ((index + 1) / quizData.length) * 100;
        progressBar.style.width = `${progress}%`;

        // Обновляем текст вопроса
        questionTitle.textContent = `${index + 1}/${quizData.length}`;
        questionText.innerHTML = question.text.replace(/<b>|<\/b>/g, ''); // Убираем теги для чистого текста

        // Очищаем и создаем ответы
        answersContainer.innerHTML = '';
        question.answers.forEach(answer => {
            const answerEl = document.createElement('div');
            answerEl.classList.add('answer-option');
            answerEl.textContent = answer.text;
            answerEl.addEventListener('click', () => selectAnswer(answer.level));
            answersContainer.appendChild(answerEl);
        });
    }

    function selectAnswer(level) {
        scores[level]++;
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    }

    function showResult() {
        let dominantLevel = '0.0';
        let maxScore = 0;
        for (const level in scores) {
            if (scores[level] > maxScore) {
                maxScore = scores[level];
                dominantLevel = level;
            }
        }

        resultToneEl.textContent = `Тон ${dominantLevel}`;
        resultDescriptionEl.innerHTML = resultsData[dominantLevel];

        quizScreen.style.display = 'none';
        resultScreen.style.display = 'flex';
        
        sendDataToBackend(dominantLevel);
    }
    
    function sendDataToBackend(result) {
        // Получаем данные пользователя от Telegram
        const user = tg.initDataUnsafe?.user;
        if (!user) {
            console.error("Не удалось получить данные пользователя");
            return;
        }

        const dataToSend = {
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                username: user.username,
            },
            result: result
        };

        // Отправляем данные на бэкенд
        fetch(BACKEND_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' }, // GAS лучше работает с text/plain
            body: JSON.stringify(dataToSend),
        })
        .then(response => response.json())
        .then(data => console.log('Бэкенд ответил:', data))
        .catch(error => console.error('Ошибка отправки на бэкенд:', error));
    }
});
