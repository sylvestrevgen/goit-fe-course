"use strict";

// TASK #1

let input;
const numbers = [];
let total = 0;

while (true) {
  input = prompt("Введите число");
  if (input === null) {
    break;
  }
  input = Number(input);
  if (Number.isNaN(input) === true) {
    alert("Было введено не число, попробуйте ещё раз!");
  } else {
    numbers.push(input);
  }
}
if (numbers.length < 1) {
  alert("Массив пустой, невозможно посчитать сумму!");
} else {
  for (const number of numbers) {
    total = total + number;
  }
  console.log(`Общая сумма чисел равна ${total}.`);
}

// TASK #2

const passwords = ["qwerty", "111qwe", "123123", "r4nd0mp4zzw0rd"];
let attemptsLeft = 3;
let userPassword;

do {
  userPassword = prompt("Введите свой пароль");
  if (userPassword === null) {
    //проверка на отмену
    break;
  }
  if (passwords.includes(userPassword)) {
    //проверка на правильный пароль
    alert("Добро пожаловать!");
    break;
  } else {
    attemptsLeft -= 1;

    if (attemptsLeft >= 1) {
      //условие для того, чтобы не появлялось сообщение "У вас осталось 0 попыток"
      alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток`);
    }
  }
} while (attemptsLeft !== 0);

if (attemptsLeft === 0) {
  alert("У вас закончились попытки, аккаунт заблокирован!");
}
