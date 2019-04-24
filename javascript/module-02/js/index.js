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
  if (Number.isNaN(input)) {
    alert("Было введено не число, попробуйте ещё раз!");
  } else {
    numbers.push(input);
  }
}
if (numbers.length) { // if (numbers.length > 0)
  for (const number of numbers) {
    total += number;
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
  }
  attemptsLeft -= 1;

  if (attemptsLeft) { //if (attemptsLeft !== 0)
    //условие для того, чтобы не появлялось сообщение "У вас осталось 0 попыток"
    alert(`Неверный пароль, у вас осталось ${attemptsLeft} попыток`);
  } else {
    alert("У вас закончились попытки, аккаунт заблокирован!");
  }
} while (attemptsLeft); //while (attemptsLeft > 0)