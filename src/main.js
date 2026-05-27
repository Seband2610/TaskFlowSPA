import "./styles/global.css";

console.log("MAIN JS CARGA");

// =====================
// LOGIN
// =====================
const btnLogin = document.querySelector("#btnLogin");

if (btnLogin) {
  console.log("ESTOY EN LOGIN");

  btnLogin.addEventListener("click", () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (email === "" || password === "") {
      alert("Completa todo");
      return;
    }

    localStorage.setItem("user", email);
    window.location.href = "/src/views/dashboard.html";
  });
}

// =====================
// DASHBOARD
// =====================
if (document.querySelector("#taskInput")) {
  const user = localStorage.getItem("user");
  const userName = document.querySelector("#userName");

  if (userName && user) {
    userName.textContent = user.split("@")[0];
  }

  // LOGOUT
  const logoutBtn = document.querySelector("#logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "/src/views/login.html";
    });
  }

  // TASKS
  const input = document.querySelector("#taskInput");
  const btn = document.querySelector("#addTaskBtn");
  const list = document.querySelector("#taskList");

  if (input && btn && list) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function render() {
      list.innerHTML = "";

      tasks.forEach((task, i) => {
        const li = document.createElement("li");

        li.textContent = task + " ";

        const del = document.createElement("button");
        del.textContent = "x";

        del.addEventListener("click", () => {
          tasks.splice(i, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          render();
        });

        li.appendChild(del);
        list.appendChild(li);
      });
    }

    render();

    btn.addEventListener("click", () => {
      const value = input.value;

      if (!value) return;

      tasks.push(value);
      localStorage.setItem("tasks", JSON.stringify(tasks));

      input.value = "";
      render();
    });

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        btn.click();
      }
    });
  }
}
