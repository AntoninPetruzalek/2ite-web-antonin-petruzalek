const form = document.getElementById("form");
const status = document.getElementById("status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.textContent = "Zpráva odeslána (demo).";
  form.reset();
});
