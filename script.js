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


async function loadData() {

  const response =
    await fetch("https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec");

  const data =
    await response.json();

  document
    .getElementById("quote")
    .innerText =
      data.quote;

  document
    .getElementById("memeImage")
    .src =
      data.meme;

      document
  .getElementById("photoImage")
  .src =
    data.photo;

document
  .getElementById("videoPlayer")
  .src =
    data.video;
}

loadData();