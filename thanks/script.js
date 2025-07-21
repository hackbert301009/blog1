function addThanks() {
  const input = document.getElementById("thanksInput");
  const value = input.value.trim();
  if (value === "") return;

  const li = document.createElement("li");
  li.textContent = value;
  document.getElementById("thanksList").appendChild(li);
  input.value = "";
}

function clearList() {
  document.getElementById("thanksList").innerHTML = "";
}
