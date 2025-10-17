// Модуль для работы с LocalStorage приложения "Самолёт знаний" школы 1430
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые функции для работы с данными здесь

// Ключи для хранения данных в LocalStorage
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые ключи для новых типов данных
const STORAGE_KEYS = {
    USER_DATA: 'school1430_user',              // Основные данные пользователя
    ACHIEVEMENTS: 'school1430_achievements',    // Разблокированные достижения
    SUBJECTS_PROGRESS: 'school1430_subjects',  // Прогресс по предметам
    QUIZ_HISTORY: 'school1430_quiz_history',   // История викторин
    SETTINGS: 'school1430_settings'            // Настройки приложения
};

// Функция загрузки или создания профиля пользователя
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте новые поля в defaultUserData
function loadUserProfile() {
    console.log('Загрузка профиля пользователя школы 1430...');
    
    try {
        // Пытаемся загрузить данные из LocalStorage
        let userData = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA));
        
        // Если данных нет, создаём новый профиль
        if (!userData) {
            console.log('Создание нового профиля пользователя...');
            userData = createDefaultUserProfile();
        }
        
        // Проверяем и обновляем структуру данных (для совместимости со старыми версиями)
        userData = migrateUserData(userData);
        
        // Обновляем дату последнего входа и streak
        updateLoginStreak(userData);
        
        // Сохраняем обновлённые данные
        saveUserData(userData);
        
        console.log('Профиль пользователя загружен:', userData.username);
        return userData;
        
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        
        // В случае ошибки создаём новый профиль
        const newProfile = createDefaultUserProfile();
        saveUserData(newProfile);
        return newProfile;
    }
}

// Создание профиля пользователя по умолчанию
// ДЛЯ МАСШТАБИРОВАНИЯ: изменяйте начальные значения здесь
function createDefaultUserProfile() {
    console.log('Создание профиля по умолчанию для школы 1430...');
    
    return {
        // Основная информация
        userId: generateUUID(),           // Уникальный ID пользователя
        username: 'Пилот',              // Имя по умолчанию (можно изменить в настройках)
        createdAt: new Date().toISOString(), // Дата создания профиля
        
        // Система уровней и опыта
        totalXP: 0,                     // Общий накопленный опыт
        level: 1,                       // Текущий уровень (вычисляется из totalXP)
        
        // Статистика ответов
        correctAnswers: 0,              // Количество правильных ответов
        totalAnswers: 0,                // Общее количество ответов
        
        // Статистика викторин
        quizzesCompleted: 0,            // Завершённые викторины
        quizStartsTotal: 0,             // Общее количество запусков викторин
        
        // Достижения
        achievements: [],               // Массив ID разблокированных достижений
        
        // Активность пользователя
        lastLoginDate: new Date().toDateString(), // Дата последнего входа
        streak: 1,                      // Количество дней активности подряд
        totalDaysActive: 1,             // Общее количество активных дней
        
        // Настройки
        soundEnabled: true,             // Звуковые эффекты включены
        animationsEnabled: true,        // Анимации включены
        
        // Прогресс по предметам (будет заполняться отдельно)
        subjectsProgress: {}            // Объект с прогрессом по каждому предмету
    };
}

// Функция миграции данных пользователя (для обновлений приложения)
// ДЛЯ МАСШТАБИРОВАНИЯ: добавляйте проверки новых полей здесь
function migrateUserData(userData) {
    console.log('Проверка и обновление структуры данных пользователя...');
    
    // Создаём шаблон с актуальными полями
    const template = createDefaultUserProfile();
    
    // Проверяем и добавляем отсутствующие поля
    Object.keys(template).forEach(key => {
        if (userData[key] === undefined) {
            userData[key] = template[key];
            console.log(`Добавлено новое поле: ${key}`);
        }
    });
    
    // Обновляем уровень на основе опыта (на случай изменения формулы)
    userData.level = calculateLevelFromXP(userData.totalXP);
    
    return userData;
}

// Обновление streak'а пользователя (дни активности подряд)
// ДЛЯ МАСШТАБИРОВАНИЯ: можно добавить более сложную логику streak'ов
function updateLoginStreak(userData) {
    const today = new Date().toDateString();     // Сегодняшняя дата в строковом формате
    const yesterday = new Date();                // Создаём объект даты
    yesterday.setDate(yesterday.getDate() - 1);  // Устанавливаем вчерашний день
    const yesterdayStr = yesterday.toDateString(); // Преобразуем в строку
    
    console.log(`Проверка streak: сегодня ${today}, последний вход ${userData.lastLoginDate}`);
    
    if (userData.lastLoginDate === today) {
        // Пользователь уже заходил сегодня - streak не изменяется
        console.log('Пользователь уже заходил сегодня');
        return;
    } else if (userData.lastLoginDate === yesterdayStr) {
        // Пользователь заходил вчера - увеличиваем streak
        userData.streak = (userData.streak || 1) + 1;
        console.log(`Streak увеличен до ${userData.streak} дней`);
    } else {
        // Пользователь пропустил дни - сбрасываем streak
        userData.streak = 1;
        console.log('Streak сброшен до 1 дня');
    }
    
    // Обновляем дату последнего входа
    userData.lastLoginDate = today;
    
    // Увеличиваем общий счётчик активных дней
    userData.totalDaysActive = (userData.totalDaysActive || 1) + 1;
}

// Вычисление уровня на основе опыта
// ДЛЯ МАСШТАБИРОВАНИЯ: измените формулу здесь для другой сложности прогрессии
function calculateLevelFromXP(totalXP) {
    // Простая формула: каждые 100 опыта = +1 уровень
    // Минимальный уровень = 1
    return Math.floor(totalXP / 100) + 1;
}

// Генерация уникального ID пользователя
// Используется при создании нового профиля
function generateUUID() {
    // Простая генерация UUID v4 на основе Math.random()
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Функция получения данных пользователя
// ДЛЯ МАСШТАБИРОВАНИЯ: всегда используйте эту функцию для получения данных
function getUserData() {
    try {
        // Загружаем данные из LocalStorage
        const userData = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_DATA));
        
        if (!userData) {
            // Если данных нет, создаём и возвращаем новый профиль
            console.warn('Данные пользователя не найдены, создание нового профиля');
            return loadUserProfile();
        }
        
        return userData;
    } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
        return createDefaultUserProfile();
    }
}

// Функция сохранения данных пользователя
// ДЛЯ МАСШТАБИРОВАНИЯ: всегда используйте эту функцию для сохранения данных
function saveUserData(userData) {
    try {
        // Обновляем уровень перед сохранением
        userData.level = calculateLevelFromXP(userData.totalXP);
        
        // Сохраняем в LocalStorage как JSON строку
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
        
        console.log('Данные пользователя сохранены');
    } catch (error) {
        console.error('Ошибка сохранения данных пользователя:', error);
        
        // Показываем уведомление об ошибке пользователю
        if (typeof showNotification === 'function') {
            showNotification('Ошибка сохранения данных. Ваш прогресс может быть потерян.');
        }
    }
}

// Функция обновления данных пользователя
// Принимает объект с полями для обновления
// ДЛЯ МАСШТАБИРОВАНИЯ: используйте эту функцию для частичного обновления данных
function updateUserData(updateData) {
    console.log('Обновление данных пользователя:', Object.keys(updateData));
    
    // Получаем текущие данные
    const userData = getUserData();
    
    // Объединяем с новыми данными
    Object.assign(userData, updateData);
    
    // Сохраняем обновлённые данные
    saveUserData(userData);
    
    return userData;
}

// Функция добавления опыта пользователю
// amount - количество добавляемого опыта
// ДЛЯ МАСШТАБИРОВАНИЯ: измените логику начисления опыта здесь
function addExperience(amount) {
    console.log(`Добавление ${amount} опыта пользователю`);
    
    const userData = getUserData();
    const oldLevel = userData.level;
    
    // Добавляем опыт
    userData.totalXP = (userData.totalXP || 0) + amount;
    
    // Пересчитываем уровень
    const newLevel = calculateLevelFromXP(userData.totalXP);
    userData.level = newLevel;
    
    // Сохраняем данные
    saveUserData(userData);
    
    // Проверяем повышение уровня
    if (newLevel > oldLevel) {
        console.log(`Поздравляем! Новый уровень: ${newLevel}`);
        
        // Показываем уведомление о повышении уровня
        if (typeof showNotification === 'function') {
            showNotification(`🎉 Поздравляем!\n\nВы достигли ${newLevel} уровня!\nПолучено ${amount} опыта.`);
        }
        
        // Проверяем достижения за уровень
        if (typeof checkAchievements === 'function') {
            checkAchievements();
        }
    }
    
    return { oldLevel, newLevel, totalXP: userData.totalXP };
}

// Функция записи правильного ответа
// ДЛЯ МАСШТАБИРОВАНИЯ: добавьте дополнительную статистику здесь
function recordCorrectAnswer(subjectId = null) {
    console.log('Запись правильного ответа', subjectId ? `по ${subjectId}` : '');
    
    const userData = getUserData();
    
    // Увеличиваем счётчики
    userData.correctAnswers = (userData.correctAnswers || 0) + 1;
    userData.totalAnswers = (userData.totalAnswers || 0) + 1;
    
    // Обновляем прогресс по предмету, если указан
    if (subjectId) {
        if (!userData.subjectsProgress) userData.subjectsProgress = {};
        if (!userData.subjectsProgress[subjectId]) userData.subjectsProgress[subjectId] = { correct: 0, total: 0 };
        
        userData.subjectsProgress[subjectId].correct += 1;
        userData.subjectsProgress[subjectId].total += 1;
    }
    
    // Сохраняем данные
    saveUserData(userData);
    
    // Добавляем опыт за правильный ответ
    addExperience(10); // Базовые 10 очков за правильный ответ
}

// Функция записи неправильного ответа
// ДЛЯ МАСШТАБИРОВАНИЯ: измените логику штрафов здесь
function recordIncorrectAnswer(subjectId = null) {
    console.log('Запись неправильного ответа', subjectId ? `по ${subjectId}` : '');
    
    const userData = getUserData();
    
    // Увеличиваем только общий счётчик ответов
    userData.totalAnswers = (userData.totalAnswers || 0) + 1;
    
    // Обновляем прогресс по предмету, если указан
    if (subjectId) {
        if (!userData.subjectsProgress) userData.subjectsProgress = {};
        if (!userData.subjectsProgress[subjectId]) userData.subjectsProgress[subjectId] = { correct: 0, total: 0 };
        
        userData.subjectsProgress[subjectId].total += 1;
    }
    
    // Сохраняем данные (без добавления опыта за неправильный ответ)
    saveUserData(userData);
}

// Функция завершения викторины
// results - объект с результатами викторины
// ДЛЯ МАСШТАБИРОВАНИЯ: добавьте дополнительные поля в results
function recordQuizCompletion(results) {
    console.log('Запись завершения викторины:', results);
    
    const userData = getUserData();
    
    // Увеличиваем счётчик завершённых викторин
    userData.quizzesCompleted = (userData.quizzesCompleted || 0) + 1;
    
    // Сохраняем результат в историю (последние 50 викторин)
    if (!userData.quizHistory) userData.quizHistory = [];
    
    const quizRecord = {
        subjectId: results.subjectId,
        score: results.score,
        totalQuestions: results.totalQuestions,
        completedAt: new Date().toISOString(),
        timeSpent: results.timeSpent || 0
    };
    
    userData.quizHistory.unshift(quizRecord); // Добавляем в начало массива
    
    // Ограничиваем историю 50 записями
    if (userData.quizHistory.length > 50) {
        userData.quizHistory = userData.quizHistory.slice(0, 50);
    }
    
    // Сохраняем данные
    saveUserData(userData);
    
    // Проверяем достижения
    if (typeof checkAchievements === 'function') {
        checkAchievements();
    }
    
    console.log('Викторина записана в историю');
}

// Функция получения прогресса по предмету
// subjectId - идентификатор предмета
// возвращает процент прогресса (0-100)
function getSubjectProgress(subjectId) {
    const userData = getUserData();
    
    if (!userData.subjectsProgress || !userData.subjectsProgress[subjectId]) {
        return 0; // Нет прогресса
    }
    
    const subjectData = userData.subjectsProgress[subjectId];
    
    if (subjectData.total === 0) {
        return 0; // Не было ответов
    }
    
    // Вычисляем процент правильных ответов
    const percentage = (subjectData.correct / subjectData.total) * 100;
    
    // Ограничиваем максимумом 100%
    return Math.min(Math.round(percentage), 100);
}

// Функция получения количества изученных предметов
// Предмет считается изученным, если прогресс >= 70%
function getCompletedSubjectsCount() {
    const userData = getUserData();
    
    if (!userData.subjectsProgress) return 0;
    
    let completedCount = 0;
    
    Object.keys(userData.subjectsProgress).forEach(subjectId => {
        if (getSubjectProgress(subjectId) >= 70) {
            completedCount++;
        }
    });
    
    return completedCount;
}

// Функция получения общего количества пройденных викторин
function getTotalQuizzesCompleted() {
    const userData = getUserData();
    return userData.quizzesCompleted || 0;
}

// Функция получения среднего балла по всем викторинам
function getAverageScore() {
    const userData = getUserData();
    
    if (!userData.quizHistory || userData.quizHistory.length === 0) {
        return 0;
    }
    
    // Вычисляем средний процент правильных ответов
    const totalScore = userData.quizHistory.reduce((sum, quiz) => {
        const percentage = (quiz.score / quiz.totalQuestions) * 100;
        return sum + percentage;
    }, 0);
    
    return totalScore / userData.quizHistory.length;
}

// Функция сохранения достижений
// achievementId - ID разблокированного достижения
function unlockAchievement(achievementId) {
    console.log(`Разблокировка достижения: ${achievementId}`);
    
    const userData = getUserData();
    
    // Инициализируем массив достижений, если его нет
    if (!userData.achievements) {
        userData.achievements = [];
    }
    
    // Проверяем, что достижение ещё не разблокировано
    if (!userData.achievements.includes(achievementId)) {
        userData.achievements.push(achievementId);
        saveUserData(userData);
        
        console.log('Достижение успешно разблокировано!');
        return true; // Достижение было разблокировано
    }
    
    return false; // Достижение уже было разблокировано
}

// Функция проверки разблокировки достижения
function isAchievementUnlocked(achievementId) {
    const userData = getUserData();
    return userData.achievements && userData.achievements.includes(achievementId);
}

// Функция получения всех разблокированных достижений
function getUnlockedAchievements() {
    const userData = getUserData();
    return userData.achievements || [];
}

// Функция экспорта данных пользователя
// Для резервного копирования или переноса данных
function exportUserData() {
    console.log('Экспорт данных пользователя...');
    
    const userData = getUserData();
    
    // Создаём объект с метаданными для экспорта
    const exportData = {
        exportedAt: new Date().toISOString(),
        appVersion: '1.0.0',
        schoolId: 1430,
        userData: userData
    };
    
    // Преобразуем в JSON строку
    const jsonData = JSON.stringify(exportData, null, 2);
    
    console.log('Данные готовы к экспорту:', jsonData.length, 'символов');
    return jsonData;
}

// Функция импорта данных пользователя
// Для восстановления из резервной копии
function importUserData(jsonData) {
    console.log('Импорт данных пользователя...');
    
    try {
        const importData = JSON.parse(jsonData);
        
        // Проверяем структуру импортируемых данных
        if (!importData.userData || !importData.schoolId) {
            throw new Error('Неверная структура данных для импорта');
        }
        
        // Проверяем совместимость со школой 1430
        if (importData.schoolId !== 1430) {
            throw new Error('Данные предназначены для другой школы');
        }
        
        // Мигрируем данные для совместимости
        const userData = migrateUserData(importData.userData);
        
        // Сохраняем импортированные данные
        saveUserData(userData);
        
        console.log('Данные успешно импортированы');
        return true;
        
    } catch (error) {
        console.error('Ошибка импорта данных:', error);
        
        if (typeof showNotification === 'function') {
            showNotification('Ошибка импорта данных. Проверьте файл и попробуйте снова.');
        }
        
        return false;
    }
}

// Функция очистки старых данных
// Вызывается автоматически для освобождения места в LocalStorage
function cleanupOldData() {
    console.log('Очистка старых данных...');
    
    const userData = getUserData();
    
    // Ограничиваем историю викторин 50 записями
    if (userData.quizHistory && userData.quizHistory.length > 50) {
        userData.quizHistory = userData.quizHistory.slice(0, 50);
        console.log('История викторин обрезана до 50 записей');
    }
    
    // Удаляем устаревшие поля (если они есть)
    const deprecatedFields = ['oldField1', 'tempData', 'cache'];
    let hasChanges = false;
    
    deprecatedFields.forEach(field => {
        if (userData[field] !== undefined) {
            delete userData[field];
            hasChanges = true;
            console.log(`Удалено устаревшее поле: ${field}`);
        }
    });
    
    // Сохраняем изменения, если они были
    if (hasChanges) {
        saveUserData(userData);
    }
    
    console.log('Очистка завершена');
}

// Автоматическая очистка при загрузке (выполняется не чаще раза в день)
function scheduleCleanup() {
    const lastCleanup = localStorage.getItem('school1430_last_cleanup');
    const today = new Date().toDateString();
    
    if (lastCleanup !== today) {
        cleanupOldData();
        localStorage.setItem('school1430_last_cleanup', today);
    }
}

// Запуск автоматической очистки
scheduleCleanup();