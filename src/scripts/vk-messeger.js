import { Config } from "@vkontakte/superappkit";
import { Messenger } from "@vkontakte/superappkit";

Config.init({
  appId: 12345678, // ID вашего приложения на платформе
});

// Функция для создания SuperApp-токена
function generateSuperAppToken(data) {
  // Код для обмена и получения токенов
  // ....

  // Установка SuperApp-токена
  Config.setSuperAppToken(superAppToken);
}

// Обработчик события
Config.onAuth(() => {
  // Показывает форму аутентификации
  Connect.userVisibleAuth()
    .then((data) => {
      console.log(data);
      // Вызов вашей функции для создания SuperApp-токена
      generateSuperAppToken(data);
    })
    .catch((err) => {
      console.log("Ошибка", err);
    });
});

/*Config.onRequestSuperAppToken((params, options) => {
  // params.refresh указывает, что токен надо обновить
  if (params.refresh) {
    // С помощью параметра action можно скрыть форму входа, 
    // если можно авторизоваться бесшовно
    Connect.userVisibleAuth({ action: { name: 'login_silent_user' } })
      .then( (data) = {
        // Вызываем функцию для обновления и 
        // установки SuperApp-токена 
        generateSuperAppToken(data); 
      })
      .catch( (err) => { 
        console.log('Ошибка', err);
      });
  } else {
    // Если событие произошло, но param.refresh == false, 
    // устанавливаем существующий SuperApp-токен
    Config.setSuperAppToken(superAppToken, options);
  }
});*/

// Создаёт объект Messenger, который предоставляет
// программный интерфейс для работы с виджетом
const messenger = new Messenger({
  // Можно передать следующие значения
  // для указания параметров всплывающего окна.
  // Значения необязательные.
  styles: {
    right: "15px", // Расстояние от правой границы
    // окна виджета до правой границы экрана.
    bottom: "15px", // Расстояние от нижней границы
    // окна виджета до низа экрана.
    zIndex: 1, // z-index атрибут всплывающего окна виджета.
    // По умолчанию — 1.
  },
});

// Открывает окно обмена сообщениями
messenger.open({
  peer_id: -44153834, // Идентификатор сообщества, от которого
  // будут отправляться сообщения.
  // Укажите этот идентификатор со знаком минус.
  scheme: "bright_light", // Визуальная тема виджета:
  // 'bright_light' | 'space_gray'.
  expanded: true, // Нужно ли раскрыть виджет сразу.
  messageSound: true, // Проигрывать звук при получении сообщения
  openSound: false, // Проигрывать звук при раскрытии виджета
  mode: "extended", // Отображать ли список чатов справа
  // в виджете: 'extended' | 'default'.
  expandTimeout: 3000, // Количество миллисекунд до открытия виджета
  chatJoinHash: "...", // Хеш (символы после `https://vk.me/join/`)
  // в ссылке-приглашении в чат
  customActions: [
    "to_convo_list", // Кнопки в верхней части виджета.
    "common_dropdown", // Не более трёх.
    "close",
  ],
});
