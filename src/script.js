let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let monthDay = now.getDate();
let time = now.getHours() + ":" + now.getMinutes();

function todaysDate() {
  let dateToChange = document.querySelector("#today-date");
  dateToChange.innerHTML = `${today} ${time}`;
}
todaysDate();
