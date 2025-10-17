// Основной JavaScript файл для PWA "Самолёт знаний" школы 1430
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые функции и обработчики здесь

// Ожидание полной загрузки DOM перед выполнением скриптов
// Это гарантирует, что все элементы HTML загружены
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация приложения при загрузке страницы
    initializeApp();
});

// Основная функция инициализации приложения
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте вызовы новых модулей здесь
function initializeApp() {
    console.log('Инициализация Самолёта знаний школы 1430...'); // Лог для отладки
    
    // Загружаем или создаём профиль пользователя
    loadUserProfile();
    
    // Обновляем отображение статистики на главной странице
    updateMainPageStats();
    
    // Проверяем достижения при загрузке (для новых пользователей)
    checkAchievements();
    
    // Показываем главную страницу по умолчанию
    showPage('home');
    
    console.log('Приложение школы 1430 успешно инициализировано!'); // Успешная инициализация
}

// Функция переключения между страницами приложения
// pageId - идентификатор страницы для отображения
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые страницы в switch
function showPage(pageId) {
    console.log(`Переключение на страницу: ${pageId}`); // Лог навигации
    
    // Скрываем все существующие страницы
    hideAllPages();
    
    // Переключаемся на нужную страницу
    switch(pageId) {
        case 'home':
            // Главная страница уже загружена в HTML
            document.getElementById('home-page').style.display = 'block';
            break;
            
        case 'subjects':
            // Загружаем страницу предметов
            loadSubjectsPage();
            break;
            
        case 'map':
            // Загружаем интерактивную карту школы 1430
            loadMapPage();
            break;
            
        case 'achievements':
            // Загружаем страницу достижений
            loadAchievementsPage();
            break;
            
        case 'calendar':
            // Загружаем календарь событий школы 1430
            loadCalendarPage();
            break;
            
        case 'profile':
            // Загружаем страницу профиля пользователя
            loadProfilePage();
            break;
            
        default:
            // Если страница не найдена, возвращаемся на главную
            console.warn(`Страница ${pageId} не найдена, переход на главную`);
            document.getElementById('home-page').style.display = 'block';
    }
    
    // Обновляем активную кнопку навигации
    updateNavigationState(pageId);
}

// Функция скрытия всех страниц
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте ID новых страниц в массив
function hideAllPages() {
    // Список всех возможных страниц приложения
    const pageIds = ['home-page', 'subjects-page', 'map-page', 'achievements-page', 'calendar-page', 'profile-page'];
    
    // Скрываем каждую страницу
    pageIds.forEach(pageId => {
        const element = document.getElementById(pageId);
        if (element) {
            element.style.display = 'none'; // Скрываем элемент
        }
    });
    
    // Очищаем контейнер динамических страниц
    const otherPages = document.getElementById('other-pages');
    if (otherPages) {
        otherPages.innerHTML = ''; // Удаляем весь HTML контент
    }
}

// Обновление состояния навигационных кнопок
// activePageId - ID активной страницы для выделения
function updateNavigationState(activePageId) {
    // Получаем все кнопки навигации
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Убираем активное состояние у всех кнопок
    navButtons.forEach(button => {
        button.classList.remove('active'); // Удаляем CSS класс active
    });
    
    // Словарь соответствия страниц и позиций кнопок (начиная с 0)
    const pageToButtonIndex = {
        'home': 0,        // Главная - первая кнопка
        'subjects': 1,    // Предметы - вторая кнопка
        'map': 2,         // Карта - третья кнопка
        'achievements': 3, // Достижения - четвёртая кнопка
        'calendar': 4,    // Календарь - пятая кнопка
        'profile': 5      // Профиль - шестая кнопка
    };
    
    // Добавляем активное состояние нужной кнопке
    const buttonIndex = pageToButtonIndex[activePageId];
    if (buttonIndex !== undefined && navButtons[buttonIndex]) {
        navButtons[buttonIndex].classList.add('active'); // Добавляем CSS класс active
    }
}

// Загрузка страницы предметов школы 1430
// ДЛЯ МАСШТАБИРОВАНИЯ: измените массив subjects для добавления/удаления предметов
function loadSubjectsPage() {
    console.log('Загрузка страницы предметов школы 1430...');
    
    // Данные о предметах школы 1430 с иконками и цветами
    // ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые предметы в этот массив
    const subjects = [
        { name: 'Математика', icon: '📐', color: '#3498db', id: 'math' },
        { name: 'Физика', icon: '⚛️', color: '#9b59b6', id: 'physics' },
        { name: 'Химия', icon: '⚗️', color: '#27ae60', id: 'chemistry' },
        { name: 'Биология', icon: '🌱', color: '#16a085', id: 'biology' },
        { name: 'История', icon: '📜', color: '#8b4513', id: 'history' },
        { name: 'География', icon: '🗺️', color: '#1abc9c', id: 'geography' },
        { name: 'Русский язык', icon: '📝', color: '#e74c3c', id: 'russian' },
        { name: 'Английский язык', icon: '🇬🇧', color: '#2980b9', id: 'english' },
        { name: 'Литература', icon: '📚', color: '#922b21', id: 'literature' },
        { name: 'Информатика', icon: '💻', color: '#7f8c8d', id: 'informatics' },
        { name: 'Музыка', icon: '🎵', color: '#ff69b4', id: 'music' },
        { name: 'ИЗО', icon: '🎨', color: '#ff8c00', id: 'art' },
        { name: 'Физкультура', icon: '⚽', color: '#32cd32', id: 'pe' },
        { name: 'ОБЖ', icon: '🚨', color: '#8b0000', id: 'safety' }
    ];
    
    // Создаём HTML для страницы предметов
    let subjectsHTML = `
        <div id="subjects-page" class="page" style="display: block;">
            <h1 style="text-align: center; margin-bottom: 32px; color: var(--text-primary);">
                📚 Предметы школы 1430
            </h1>
            <div class="subjects-grid" style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 24px;
                margin-bottom: 32px;
            ">`;
    
    // Генерируем карточки для каждого предмета
    subjects.forEach(subject => {
        // Получаем прогресс по предмету из LocalStorage
        const progress = getSubjectProgress(subject.id);
        const progressPercent = Math.min((progress / 100) * 100, 100); // Максимум 100%
        
        // HTML карточки предмета
        subjectsHTML += `
            <div class="subject-card" style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: var(--border-radius);
                box-shadow: var(--glass-shadow);
                padding: 24px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            " onclick="startQuiz('${subject.id}')" onmouseover="this.style.transform='translateY(-8px)'" onmouseout="this.style.transform='translateY(0)'">
                
                <!-- Иконка предмета -->
                <div style="font-size: 3rem; margin-bottom: 16px;">${subject.icon}</div>
                
                <!-- Название предмета -->
                <h3 style="color: ${subject.color}; margin-bottom: 12px; font-size: 1.2rem;">
                    ${subject.name}
                </h3>
                
                <!-- Прогресс-бар предмета -->
                <div style="
                    width: 100%;
                    height: 8px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 4px;
                    overflow: hidden;
                    margin-bottom: 8px;
                ">
                    <div style="
                        width: ${progressPercent}%;
                        height: 100%;
                        background: ${subject.color};
                        transition: width 0.5s ease;
                    "></div>
                </div>
                
                <!-- Текст прогресса -->
                <div style="color: var(--text-secondary); font-size: 0.9rem;">
                    Прогресс: ${progress}%
                </div>
            </div>
        `;
    });
    
    // Закрываем сетку предметов
    subjectsHTML += `
            </div>
            
            <!-- Общая статистика по предметам -->
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: var(--border-radius);
                padding: 24px;
                text-align: center;
            ">
                <h3 style="margin-bottom: 16px; color: var(--accent-color);">Общая статистика по предметам</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 16px;">
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">
                            ${getCompletedSubjectsCount()}
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Изученных предметов</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">
                            ${getTotalQuizzesCompleted()}
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Викторин пройдено</div>
                    </div>
                    <div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">
                            ${Math.round(getAverageScore())}%
                        </div>
                        <div style="color: var(--text-secondary); font-size: 0.9rem;">Средний балл</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Вставляем созданный HTML в контейнер
    document.getElementById('other-pages').innerHTML = subjectsHTML;
    
    console.log('Страница предметов школы 1430 загружена успешно!');
}

// Функция запуска викторины по предмету
// subjectId - идентификатор предмета для викторины
function startQuiz(subjectId) {
    console.log(`Запуск викторины по предмету: ${subjectId}`);
    
    // Логируем статистику запуска викторины
    logQuizStart(subjectId);
    
    // Загружаем викторину (функция в quiz.js)
    if (typeof loadQuizPage === 'function') {
        loadQuizPage(subjectId); // Вызываем функцию из quiz.js
    } else {
        // Если функция не загружена, показываем заглушку
        showNotification('Викторина загружается... Пожалуйста, подождите.');
        console.error('Функция loadQuizPage не найдена. Проверьте загрузку quiz.js');
    }
}

// Загрузка страницы календаря событий школы 1430
function loadCalendarPage() {
    console.log('Загрузка календаря событий школы 1430...');
    
    // Получаем текущую дату
    const now = new Date();
    const currentMonth = now.getMonth(); // Месяц (0-11)
    const currentYear = now.getFullYear(); // Год
    
    // Названия месяцев для отображения
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    // События школы 1430 (пример данных)
    // ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте реальные события школы в этот массив
    const schoolEvents = [
        { date: 5, title: 'День учителя школы 1430', type: 'holiday' },
        { date: 12, title: 'Викторина по математике', type: 'quiz' },
        { date: 18, title: 'Экскурсия в музей', type: 'excursion' },
        { date: 25, title: 'Родительское собрание', type: 'meeting' },
        { date: 30, title: 'Школьный концерт', type: 'event' }
    ];
    
    // Создаём HTML для календаря
    let calendarHTML = `
        <div id="calendar-page" class="page" style="display: block;">
            <h1 style="text-align: center; margin-bottom: 32px; color: var(--text-primary);">
                📅 События школы 1430
            </h1>
            
            <!-- Заголовок календаря -->
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: var(--border-radius);
                padding: 24px;
                text-align: center;
                margin-bottom: 24px;
            ">
                <h2 style="color: var(--accent-color); margin-bottom: 8px;">
                    ${monthNames[currentMonth]} ${currentYear}
                </h2>
                <p style="color: var(--text-secondary);">События и мероприятия нашей школы</p>
            </div>
            
            <!-- Список событий -->
            <div class="events-list" style="display: grid; gap: 16px;">`;
    
    // Добавляем каждое событие
    schoolEvents.forEach(event => {
        // Определяем цвет события по типу
        let eventColor;
        let eventIcon;
        switch(event.type) {
            case 'holiday': 
                eventColor = '#e74c3c'; // Красный для праздников
                eventIcon = '🎉';
                break;
            case 'quiz': 
                eventColor = '#3498db'; // Синий для викторин
                eventIcon = '🧠';
                break;
            case 'excursion': 
                eventColor = '#27ae60'; // Зелёный для экскурсий
                eventIcon = '🚌';
                break;
            case 'meeting': 
                eventColor = '#f39c12'; // Оранжевый для собраний
                eventIcon = '👥';
                break;
            default: 
                eventColor = '#9b59b6'; // Фиолетовый для прочих событий
                eventIcon = '📋';
        }
        
        // HTML карточки события
        calendarHTML += `
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: 16px;
                padding: 20px;
                display: flex;
                align-items: center;
                gap: 16px;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
                
                <!-- Дата события -->
                <div style="
                    min-width: 60px;
                    height: 60px;
                    background: ${eventColor};
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    font-size: 1.2rem;
                ">
                    ${event.date}
                </div>
                
                <!-- Информация о событии -->
                <div style="flex: 1;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                        <span style="font-size: 1.2rem;">${eventIcon}</span>
                        <h3 style="color: var(--text-primary); margin: 0; font-size: 1.1rem;">
                            ${event.title}
                        </h3>
                    </div>
                    <p style="color: var(--text-secondary); margin: 0; font-size: 0.9rem;">
                        ${event.date} ${monthNames[currentMonth]}
                    </p>
                </div>
                
                <!-- Кнопка подробнее -->
                <button style="
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background 0.3s ease;
                " onclick="showEventDetails('${event.title}')" onmouseover="this.style.background='#e55a2b'" onmouseout="this.style.background='var(--accent-color)'">
                    Подробнее
                </button>
            </div>
        `;
    });
    
    // Закрываем список событий и страницу
    calendarHTML += `
            </div>
            
            <!-- Фильтры событий -->
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: var(--border-radius);
                padding: 20px;
                margin-top: 24px;
                text-align: center;
            ">
                <h3 style="color: var(--accent-color); margin-bottom: 16px;">Фильтр по типам событий</h3>
                <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                    <button class="filter-btn" data-filter="all" style="
                        background: var(--accent-color);
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">Все события</button>
                    <button class="filter-btn" data-filter="holiday" style="
                        background: #e74c3c;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">🎉 Праздники</button>
                    <button class="filter-btn" data-filter="quiz" style="
                        background: #3498db;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">🧠 Викторины</button>
                    <button class="filter-btn" data-filter="excursion" style="
                        background: #27ae60;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        font-size: 0.9rem;
                    ">🚌 Экскурсии</button>
                </div>
            </div>
        </div>
    `;
    
    // Вставляем календарь в контейнер
    document.getElementById('other-pages').innerHTML = calendarHTML;
    
    console.log('Календарь событий школы 1430 загружен успешно!');
}

// Функция показа подробностей события
function showEventDetails(eventTitle) {
    // Показываем модальное окно с подробностями
    showNotification(`Подробности события: ${eventTitle}\n\nДля получения дополнительной информации обратитесь к классному руководителю или администрации школы 1430.`);
}

// Загрузка страницы профиля пользователя
function loadProfilePage() {
    console.log('Загрузка страницы профиля пользователя...');
    
    // Получаем данные пользователя
    const userData = getUserData();
    
    // Создаём HTML для страницы профиля
    let profileHTML = `
        <div id="profile-page" class="page" style="display: block;">
            <h1 style="text-align: center; margin-bottom: 32px; color: var(--text-primary);">
                👤 Профиль пилота
            </h1>
            
            <!-- Основная информация профиля -->
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: var(--border-radius);
                padding: 32px;
                text-align: center;
                margin-bottom: 24px;
            ">
                <!-- Аватар пользователя (эмодзи самолёта) -->
                <div style="font-size: 4rem; margin-bottom: 16px;">✈️</div>
                
                <!-- Имя и статус -->
                <h2 style="color: var(--accent-color); margin-bottom: 8px; font-size: 1.8rem;">
                    ${userData.username}
                </h2>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">
                    Пилот самолёта знаний школы 1430
                </p>
                
                <!-- Уровень и опыт -->
                <div style="
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 12px 20px;
                    border-radius: 20px;
                    margin-bottom: 20px;
                ">
                    <span style="color: var(--text-secondary);">Уровень:</span>
                    <span style="color: var(--accent-color); font-weight: bold; font-size: 1.2rem;">
                        ${userData.level}
                    </span>
                </div>
                
                <!-- Прогресс до следующего уровня -->
                <div style="margin-bottom: 16px;">
                    <div style="color: var(--text-secondary); margin-bottom: 8px; font-size: 0.9rem;">
                        Прогресс до уровня ${userData.level + 1}
                    </div>
                    <div style="
                        width: 100%;
                        height: 12px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 6px;
                        overflow: hidden;
                    ">
                        <div style="
                            width: ${getProgressToNextLevel()}%;
                            height: 100%;
                            background: linear-gradient(90deg, #3498db, var(--accent-color));
                            transition: width 0.5s ease;
                        "></div>
                    </div>
                </div>
                
                <div style="color: var(--text-secondary); font-size: 0.9rem;">
                    ${userData.totalXP} / ${getXPForNextLevel()} опыта
                </div>
            </div>
            
            <!-- Подробная статистика -->
            <div style="
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 16px;
                margin-bottom: 24px;
            ">
                <!-- Общий опыт -->
                <div style="
                    background: var(--glass-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-radius: 16px;
                    padding: 20px;
                    text-align: center;
                ">
                    <div style="font-size: 2rem; margin-bottom: 8px;">⭐</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 4px;">
                        ${userData.totalXP}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Общий опыт</div>
                </div>
                
                <!-- Количество достижений -->
                <div style="
                    background: var(--glass-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-radius: 16px;
                    padding: 20px;
                    text-align: center;
                ">
                    <div style="font-size: 2rem; margin-bottom: 8px;">🏆</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 4px;">
                        ${userData.achievements ? userData.achievements.length : 0}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Достижения</div>
                </div>
                
                <!-- Правильные ответы -->
                <div style="
                    background: var(--glass-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-radius: 16px;
                    padding: 20px;
                    text-align: center;
                ">
                    <div style="font-size: 2rem; margin-bottom: 8px;">✅</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 4px;">
                        ${userData.correctAnswers || 0}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Правильных ответов</div>
                </div>
                
                <!-- Дни активности -->
                <div style="
                    background: var(--glass-bg);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    border-radius: 16px;
                    padding: 20px;
                    text-align: center;
                ">
                    <div style="font-size: 2rem; margin-bottom: 8px;">📅</div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color); margin-bottom: 4px;">
                        ${getUserStreak()}
                    </div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">Дней подряд</div>
                </div>
            </div>
            
            <!-- Настройки -->
            <div style="
                background: var(--glass-bg);
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.18);
                border-radius: var(--border-radius);
                padding: 24px;
                margin-bottom: 24px;
            ">
                <h3 style="color: var(--accent-color); margin-bottom: 20px; text-align: center;">
                    ⚙️ Настройки
                </h3>
                
                <div style="display: grid; gap: 16px;">
                    <!-- Изменение имени -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label style="color: var(--text-primary);">Имя пилота:</label>
                        <input type="text" id="username-input" value="${userData.username}" style="
                            background: rgba(255, 255, 255, 0.1);
                            border: 1px solid rgba(255, 255, 255, 0.3);
                            border-radius: 8px;
                            padding: 8px 12px;
                            color: var(--text-primary);
                            max-width: 150px;
                        ">
                    </div>
                    
                    <!-- Звуки -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label style="color: var(--text-primary);">Звуковые эффекты:</label>
                        <input type="checkbox" id="sounds-checkbox" ${userData.soundEnabled !== false ? 'checked' : ''}>
                    </div>
                    
                    <!-- Анимации -->
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <label style="color: var(--text-primary);">Анимации:</label>
                        <input type="checkbox" id="animations-checkbox" ${userData.animationsEnabled !== false ? 'checked' : ''}>
                    </div>
                </div>
                
                <!-- Кнопка сохранения настроек -->
                <button onclick="saveProfileSettings()" style="
                    background: var(--accent-color);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    margin-top: 20px;
                    width: 100%;
                    transition: background 0.3s ease;
                " onmouseover="this.style.background='#e55a2b'" onmouseout="this.style.background='var(--accent-color)'">
                    Сохранить настройки
                </button>
            </div>
            
            <!-- Сброс прогресса (опасная зона) -->
            <div style="
                background: linear-gradient(135deg, rgba(231, 76, 60, 0.1), rgba(192, 57, 43, 0.1));
                border: 1px solid rgba(231, 76, 60, 0.3);
                border-radius: var(--border-radius);
                padding: 24px;
                text-align: center;
            ">
                <h3 style="color: #e74c3c; margin-bottom: 12px;">⚠️ Опасная зона</h3>
                <p style="color: var(--text-secondary); margin-bottom: 16px; font-size: 0.9rem;">
                    Внимание! Это действие удалит весь ваш прогресс безвозвратно.
                </p>
                <button onclick="confirmResetProgress()" style="
                    background: #e74c3c;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: background 0.3s ease;
                " onmouseover="this.style.background='#c0392b'" onmouseout="this.style.background='#e74c3c'">
                    Сбросить весь прогресс
                </button>
            </div>
        </div>
    `;
    
    // Вставляем профиль в контейнер
    document.getElementById('other-pages').innerHTML = profileHTML;
    
    console.log('Страница профиля загружена успешно!');
}

// Функция сохранения настроек профиля
function saveProfileSettings() {
    console.log('Сохранение настроек профиля...');
    
    // Получаем новые значения из формы
    const newUsername = document.getElementById('username-input').value.trim();
    const soundsEnabled = document.getElementById('sounds-checkbox').checked;
    const animationsEnabled = document.getElementById('animations-checkbox').checked;
    
    // Валидация имени пользователя
    if (newUsername.length < 1) {
        showNotification('Имя не может быть пустым!');
        return;
    }
    
    if (newUsername.length > 20) {
        showNotification('Имя слишком длинное! Максимум 20 символов.');
        return;
    }
    
    // Обновляем данные пользователя
    updateUserData({
        username: newUsername,
        soundEnabled: soundsEnabled,
        animationsEnabled: animationsEnabled
    });
    
    // Обновляем отображение на главной странице
    updateMainPageStats();
    
    // Показываем уведомление об успешном сохранении
    showNotification('Настройки успешно сохранены!');
    
    console.log('Настройки профиля сохранены');
}

// Функция подтверждения сброса прогресса
function confirmResetProgress() {
    // Показываем подтверждение через встроенный confirm
    const confirmed = confirm('Вы действительно хотите сбросить весь прогресс?\n\nЭто действие нельзя отменить!');
    
    if (confirmed) {
        // Вторичное подтверждение для безопасности
        const doubleConfirmed = confirm('Последнее предупреждение!\n\nВесь ваш прогресс, достижения и статистика будут удалены.\n\nПродолжить?');
        
        if (doubleConfirmed) {
            resetAllProgress();
        }
    }
}

// Функция сброса всего прогресса
function resetAllProgress() {
    console.log('Сброс всего прогресса пользователя...');
    
    try {
        // Удаляем все данные из LocalStorage
        localStorage.removeItem('school1430_user');
        localStorage.removeItem('school1430_achievements');
        localStorage.removeItem('school1430_subjects_progress');
        localStorage.removeItem('school1430_quiz_history');
        
        // Перезагружаем страницу для применения изменений
        location.reload();
        
    } catch (error) {
        console.error('Ошибка при сбросе прогресса:', error);
        showNotification('Произошла ошибка при сбросе прогресса. Попробуйте обновить страницу.');
    }
}

// Функция показа уведомлений через модальное окно
function showNotification(message) {
    console.log(`Показ уведомления: ${message}`);
    
    // Находим элементы модального окна
    const modal = document.getElementById('notification-modal');
    const modalText = document.getElementById('modal-text');
    
    if (modal && modalText) {
        // Заменяем \n на <br> для переносов строк в HTML
        modalText.innerHTML = message.replace(/\n/g, '<br>');
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        
        // Автоматически закрываем через 5 секунд (опционально)
        setTimeout(() => {
            closeModal();
        }, 5000); // 5000 миллисекунд = 5 секунд
    } else {
        // Fallback: используем alert если модальное окно не найдено
        alert(message);
    }
}

// Функция закрытия модального окна
function closeModal() {
    const modal = document.getElementById('notification-modal');
    if (modal) {
        modal.style.display = 'none'; // Скрываем модальное окно
    }
}

// Обновление статистики на главной странице
function updateMainPageStats() {
    console.log('Обновление статистики на главной странице...');
    
    // Получаем данные пользователя
    const userData = getUserData();
    
    // Обновляем элементы, если они существуют
    const elements = {
        'username': userData.username,
        'user-level': `Уровень ${userData.level}`,
        'total-xp': userData.totalXP,
        'achievements-count': userData.achievements ? userData.achievements.length : 0,
        'quizzes-completed': userData.quizzesCompleted || 0,
        'correct-answers': userData.correctAnswers || 0,
        'xp-text': `Опыт: ${userData.totalXP} / ${getXPForNextLevel()}`
    };
    
    // Обновляем каждый элемент
    Object.keys(elements).forEach(elementId => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = elements[elementId];
        }
    });
    
    // Обновляем прогресс-бар опыта
    const progressBar = document.getElementById('xp-progress');
    if (progressBar) {
        const progressPercent = getProgressToNextLevel();
        progressBar.style.width = `${progressPercent}%`;
    }
    
    console.log('Статистика обновлена успешно');
}

// Обработка клика вне модального окна для закрытия
document.addEventListener('click', function(event) {
    const modal = document.getElementById('notification-modal');
    if (event.target === modal) {
        closeModal(); // Закрываем модальное окно при клике на фон
    }
});

// Обработка клавиши Escape для закрытия модального окна
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal(); // Закрываем модальное окно по Escape
    }
});

// Вспомогательные функции для получения статистики
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые функции статистики здесь

// Получение прогресса до следующего уровня в процентах
function getProgressToNextLevel() {
    const userData = getUserData();
    const currentLevelXP = (userData.level - 1) * 100; // XP для текущего уровня
    const nextLevelXP = userData.level * 100; // XP для следующего уровня
    const progress = ((userData.totalXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;
    return Math.min(Math.max(progress, 0), 100); // Ограничиваем от 0 до 100%
}

// Получение XP, необходимого для следующего уровня
function getXPForNextLevel() {
    const userData = getUserData();
    return userData.level * 100; // Простая формула: уровень * 100
}

// Получение количества дней активности подряд
function getUserStreak() {
    const userData = getUserData();
    
    // Проверяем дату последнего входа
    const today = new Date().toDateString();
    const lastLogin = userData.lastLoginDate;
    
    if (lastLogin === today) {
        return userData.streak || 1; // Сегодня заходил
    } else {
        return 0; // Streak прерван
    }
}

// Логирование запуска викторины для статистики
function logQuizStart(subjectId) {
    console.log(`Статистика: запуск викторины по ${subjectId}`);
    
    // Здесь можно добавить логику для сбора аналитики
    // Например, увеличить счётчик запущенных викторин
    const userData = getUserData();
    userData.quizStartsTotal = (userData.quizStartsTotal || 0) + 1;
    updateUserData(userData);
}