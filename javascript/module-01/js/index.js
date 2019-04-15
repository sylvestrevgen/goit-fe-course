/*
TASK #1
*/

const ADMIN_PASSWORD = 'm4ng0h4ckz';
let userPassword;
let message;

userPassword = prompt('Введите пароль: ');
if (userPassword === null) {
  message = 'Отменено пользователем!';
} else if (userPassword === ADMIN_PASSWORD) {
  message = 'Добро пожаловать!';
} else {
  message = 'Доступ запрещен, неверный пароль!';
}
alert(message);

/*
TASK #2
*/

let credits = 23580;
const pricePerDroid = 3000;
let totalPrice;

let userBuy = prompt('Какое количество дроидов вы бы хотели приобрести?');

if (userBuy === null) {
  console.log('Отменено пользователем!');
} else {
  totalPrice = userBuy * pricePerDroid;
  if (totalPrice > credits) {
    console.log('Недостаточно средств на счету!');
  } else {
    console.log(`Вы купили ${userBuy} дроидов, на счету осталось ${credits - totalPrice} кредитов.`);
  }
}

/*
TASK #3
*/

let userDelivery = prompt("Укажите страну в которую нужна доставка!");
userDelivery = userDelivery.toLowerCase();
const priceChina = 100;
const priceSouthAmerica = 250;
const priceAustralia = 170;
const priceIndia = 80;
const priceJamaica = 120;

switch (userDelivery) {
  case "китай":
    console.log(`Доставка в ${userDelivery} будет стоить ${priceChina} кредитов`);
    break;

  case "южная америка":
    console.log(`Доставка в ${userDelivery} будет стоить ${priceSouthAmerica} кредитов`);
    break;

  case "австралия":
    console.log(`Доставка в ${userDelivery} будет стоить ${priceAustralia} кредитов`);
    break;

  case "индия":
    console.log(`Доставка в ${userDelivery} будет стоить ${priceIndia} кредитов`);
    break;

  case "ямайка":
    console.log(`Доставка в ${userDelivery} будет стоить ${priceJamaica} кредитов`);
    break;

  default:
    console.log("В вашей стране доставка недоступна!");
    break;
}
