console.log("foi");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const result = document.querySelector(".result");
// const resultForecast = document.querySelector(".result .forecast");
// const resultError = document.querySelector(".result .error");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  result.innerHTML = "<p>Loading...</p>";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        result.innerHTML = `<p>${data.error}</p>`;
      } else {
        result.innerHTML = `<p>${data.location}</p> <p>${data.forecast}</p>`;
      }
    });
  });
});
