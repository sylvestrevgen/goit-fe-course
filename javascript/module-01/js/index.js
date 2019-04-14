/*
TASK #1
*/

const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message;

message = prompt('Введите пароль: ');
if (message === null) {
  alert('Отменено пользователем!');
} else if (message === ADMIN_PASSWORD) {
  alert('Добро пожаловать!');
} else {
  alert('Доступ запрещен, неверный пароль!');
}

/*
TASK #2
*/

// let credits = 23580;
// const pricePerDroid = 3000;
// let totalPrice;

// let userBuy = prompt('Какое количество дроидов вы бы хотели приобрести?');

// if (userBuy === null) {
//   console.log('Отменено пользователем!');
// } else {
//   totalPrice = userBuy * pricePerDroid;
//   if (totalPrice > credits) {
//     console.log('Недостаточно средств на счету!');
//   } else {
//     credits = credits - totalPrice;
//     console.log(`Вы купили ${userBuy} дроидов, на счету осталось ${credits} кредитов.`);
//   }
// }

/*
TASK #3
*/

// let userDelivery = prompt("Укажите страну в которую нужна доставка!");
// userDelivery = userDelivery.toLowerCase();
// let deliveryMessage;
// let price;

// switch (userDelivery) {
//   case "китай":
//     price = 100;
//     deliveryMessage = `Доставка в ${userDelivery} будет стоить ${price} кредитов`;
//     console.log(deliveryMessage);
//     break;

//   case "южная америка":
//     price = 250;
//     deliveryMessage = `Доставка в ${userDelivery} будет стоить ${price} кредитов`;
//     console.log(deliveryMessage);
//     break;

//   case "австралия":
//     price = 170;
//     deliveryMessage = `Доставка в ${userDelivery} будет стоить ${price} кредитов`;
//     console.log(deliveryMessage);
//     break;

//   case "индия":
//     price = 80;
//     deliveryMessage = `Доставка в ${userDelivery} будет стоить ${price} кредитов`;
//     console.log(deliveryMessage);
//     break;

//   case "ямайка":
//     price = 120;
//     deliveryMessage = `Доставка в ${userDelivery} будет стоить ${price} кредитов`;
//     console.log(deliveryMessage);
//     break;

//   default:
//     console.log("В вашей стране доставка недоступна!");
//     break;
// }
