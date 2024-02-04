function numQuestions() {
  const value = document.getElementById("numQuestions").value;
  localStorage.setItem("numQuestions", value);

  const level = document.getElementById("setDificulty").value;
  localStorage.setItem("setDificulty", level);

  const category = document.getElementById("setCategory").value;
  localStorage.setItem("setCategory", category);

  const type = document.getElementById("setType").value;
  localStorage.setItem("setType", type);
}
