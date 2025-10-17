// app_fixed.js

function completeQuiz() {
    console.log('🏁 Завершаем викторину...');
    
    if (!currentQuiz || quizAnswers.length === 0) {
        console.error('❌ Нет данных о викторине для завершения');
        alert('Ошибка: нет данных о викторине');
        return;
    }
    
    // Подсчитываем результаты
    const correctCount = quizAnswers.filter(answer => answer.isCorrect).length;
    const totalQuestions = quizAnswers.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const totalPoints = quizAnswers.reduce((sum, answer) => sum + answer.points, 0);
    
    console.log(`📊 Результаты викторины:`);
    console.log(`   Правильных ответов: ${correctCount}/${totalQuestions} (${percentage}%)`);
    console.log(`   Набрано очков: ${totalPoints}`);
    console.log(`   Предмет: ${currentQuiz.name}`);
    
    // Обновляем общую статистику
    userData.quizzesTaken++;
    
    // Проверяем достижения
    checkAchievements();
    
    // Сохраняем данные
    saveUserData();
    
    // ПОКАЗЫВАЕМ РЕЗУЛЬТАТЫ ПОЛЬЗОВАТЕЛЮ
    showQuizResults(correctCount, totalQuestions, percentage, totalPoints, currentQuiz.name);
    
    // Очищаем состояние викторины
    currentQuiz = null;
    currentQuestionIndex = 0;
    quizAnswers = [];
    
    console.log('✅ Викторина успешно завершена');
}

function showQuizResults(correctCount, totalQuestions, percentage, totalPoints, subjectName) {
    console.log('📊 Показываем результаты викторины');
    
    let grade = '';
    let message = '';
    let emoji = '';
    
    if (percentage >= 90) {
        grade = 'Отлично!';
        message = 'Превосходный результат! 🎉';
        emoji = '🌟';
    } else if (percentage >= 75) {
        grade = 'Хорошо!';
        message = 'Отличная работа! 👏';
        emoji = '✨';
    } else if (percentage >= 60) {
        grade = 'Удовлетворительно';
        message = 'Неплохо, но есть куда расти! 💪';
        emoji = '📚';
    } else {
        grade = 'Нужно подтянуть знания';
        message = 'Не расстраивайся, попробуй ещё раз! 🎯';
        emoji = '📖';
    }
    
    const resultsHTML = `
        <div id="quiz-results-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        ">
            <div style="
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(240, 240, 255, 0.9) 100%);
                border-radius: 24px;
                padding: 40px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                text-align: center;
                animation: slideUp 0.4s ease-out;
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">
                    ${emoji}
                </div>
                <h2 style="
                    color: #2c3e50;
                    font-size: 2rem;
                    margin-bottom: 10px;
                    font-weight: bold;
                ">
                    ${grade}
                </h2>
                <p style="
                    color: #34495e;
                    font-size: 1.1rem;
                    margin-bottom: 30px;
                ">
                    ${message}
                </p>
                <p style="
                    color: #7f8c8d;
                    font-size: 0.9rem;
                    margin-bottom: 30px;
                ">
                    Предмет: <strong>${subjectName}</strong>
                </p>
                <div style="
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 16px;
                    padding: 20px;
                    margin-bottom: 30px;
                ">
                    <div style="
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 20px;
                    ">
                        <div style="flex: 1;">
                            <div style="
                                color: #27ae60;
                                font-size: 2.5rem;
                                font-weight: bold;
                                margin-bottom: 5px;
                            ">
                                ${correctCount}
                            </div>
                            <div style="color: #27ae60; font-size: 0.9rem;">
                                ✓ Правильно
                            </div>
                        </div>
                        <div style="flex: 1;">
                            <div style="
                                color: #e74c3c;
                                font-size: 2.5rem;
                                font-weight: bold;
                                margin-bottom: 5px;
                            ">
                                ${totalQuestions - correctCount}
                            </div>
                            <div style="color: #e74c3c; font-size: 0.9rem;">
                                ✗ Неправильно
                            </div>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <div style="
                            font-size: 3rem;
                            font-weight: bold;
                            color: #3498db;
                            margin-bottom: 5px;
                        ">
                            ${percentage}%
                        </div>
                        <div style="color: #7f8c8d; font-size: 0.9rem;">
                            Точность ответов
                        </div>
                    </div>
                    <div style="
                        width: 100%;
                        height: 12px;
                        background: rgba(0, 0, 0, 0.1);
                        border-radius: 6px;
                        overflow: hidden;
                        margin-bottom: 20px;
                    ">
                        <div style="
                            width: ${percentage}%;
                            height: 100%;
                            background: linear-gradient(90deg, #3498db, #2ecc71);
                            border-radius: 6px;
                            transition: width 1s ease-out;
                        "></div>
                    </div>
                    <div style="
                        background: linear-gradient(135deg, #f39c12, #e67e22);
                        color: white;
                        padding: 15px;
                        border-radius: 12px;
                        font-size: 1.2rem;
                        font-weight: bold;
                    ">
                        🏆 Получено очков: ${totalPoints} XP
                    </div>
                </div>
                <div style="
                    display: flex;
                    gap: 10px;
                    justify-content: center;
                ">
                    <button onclick="closeResultsModal()" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 12px;
                        font-size: 1rem;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#2980b9'"  onmouseout="this.style.background='#3498db'">
                        На главную
                    </button>
                    <button onclick="retryQuiz()" style="
                        background: #2ecc71;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 12px;
                        font-size: 1rem;
                        cursor: pointer;
                        font-weight: bold;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='#27ae60'"  onmouseout="this.style.background='#2ecc71'">
                        Попробовать снова
                    </button>
                </div>
            </div>
        </div>
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        </style>
    `;
    document.body.insertAdjacentHTML('beforeend', resultsHTML);
    console.log('✅ Результаты отображены');
}

function closeResultsModal() {
    const modal = document.getElementById('quiz-results-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => { modal.remove(); if (typeof showPage === 'function') showPage('home'); }, 300);
    }
}

function retryQuiz() {
    const modal = document.getElementById('quiz-results-modal');
    if (modal) modal.remove();
    if (currentQuiz && currentQuiz.name) startQuiz(currentQuiz.name);
    else if (typeof showPage === 'function') showPage('subjects');
}
"