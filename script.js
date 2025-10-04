:root {
    --bg-color: var(--tg-theme-bg-color, #ffffff);
    --text-color: var(--tg-theme-text-color, #000000);
    --hint-color: var(--tg-theme-hint-color, #aaaaaa);
    --button-color: var(--tg-theme-button-color, #2481CC);
    --button-text-color: var(--tg-theme-button-text-color, #ffffff);
    --secondary-bg-color: var(--tg-theme-secondary-bg-color, #f3f2f7);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    margin: 0;
    padding: 0;
    color: var(--text-color);
    background-color: var(--bg-color);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: color 0.2s, background-color 0.2s;
    -webkit-tap-highlight-color: transparent;
}

#app {
    padding: 20px 15px;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    box-sizing: border-box;
}

.screen {
    display: none;
    flex-direction: column;
    align-items: center;
    width: 100%;
    animation: fadeIn 0.4s ease-in-out;
}

.screen.active {
    display: flex;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
}

p {
    font-size: 16px;
    color: var(--hint-color);
    line-height: 1.5;
    margin-bottom: 30px;
}

button {
    width: 100%;
    padding: 15px;
    font-size: 16px;
    font-weight: 500;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    background-color: var(--button-color);
    color: var(--button-text-color);
    transition: opacity 0.2s;
    user-select: none;
}

button:active {
    opacity: 0.8;
}

#progress-bar-container {
    width: 100%;
    height: 4px;
    background-color: var(--secondary-bg-color);
    border-radius: 2px;
    margin-bottom: 25px;
    overflow: hidden;
}

#progress-bar {
    width: 0%;
    height: 100%;
    background-color: var(--button-color);
    border-radius: 2px;
    transition: width 0.3s ease-out;
}

#question-container {
    width: 100%;
    margin-bottom: 20px;
}

#question-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--hint-color);
    margin: 0 0 5px 0;
}

#question-text {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-color);
    margin: 0;
    line-height: 1.4;
}

#answers-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.answer-option {
    padding: 15px;
    background-color: var(--secondary-bg-color);
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
    font-size: 16px;
    transition: background-color 0.2s;
    user-select: none;
}

.answer-option:active {
    background-color: #e0e0e0;
}

#result-screen h1 {
    margin-bottom: 25px;
}

#result-tone {
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 15px;
}

#result-description {
    text-align: left;
    white-space: pre-wrap;
    line-height: 1.6;
    background-color: var(--secondary-bg-color);
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 30px;
    font-size: 15px;
}

/* Адаптация под темную тему Telegram */
body.dark {
    --bg-color: #18222d;
    --text-color: #ffffff;
    --hint-color: #7a8895;
    --button-color: #5288c1;
    --button-text-color: #ffffff;
    --secondary-bg-color: #212d3b;
}

body.dark .answer-option:active {
    background-color: #2b3a4c;
}
