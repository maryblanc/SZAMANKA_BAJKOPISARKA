const PASSWORD = "szamanka";

function checkPassword() {

  const input =
    document
      .getElementById("passwordInput")
      .value;

  if(input === PASSWORD) {

    document
      .getElementById("lockScreen")
      .style.display = "none";

    document
      .getElementById("app")
      .classList.remove("hidden");

    localStorage.setItem("tereUnlocked", "true");

  } else {

    document
      .getElementById("errorText")
      .innerText =
        "wrong password :(";
  }
}

window.onload = () => {

  const unlocked =
    localStorage.getItem("tereUnlocked");

  if(unlocked === "true") {

    document
      .getElementById("lockScreen")
      .style.display = "none";

    document
      .getElementById("app")
      .classList.remove("hidden");
  }
};