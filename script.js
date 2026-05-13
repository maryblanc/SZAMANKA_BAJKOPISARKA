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

window.onload = async () => {

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

  await loadData();
};


async function loadData() {

  const response =
    await fetch("https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec");

  const data =
    await response.json();
  
    console.log(data);
    console.log(data.meme);
    console.log(data.photo);
    console.log(data.video);

  document
    .getElementById("quote")
    .innerText =
      data.quote;

  document
    .getElementById("memeImage")
    .src =
      data.meme;
      document
      .getElementById("memeImage")
      .onload = () =>
        console.log("MEME LOADED");

      document
  .getElementById("photoImage")
  .src =
    data.photo;

document
  .getElementById("videoPlayer")
  .src =
    data.video;

    document
      .getElementById("loadingScreen")
      .style.opacity = "0";

    setTimeout(() => {

  document
    .getElementById("loadingScreen")
    .style.display = "none";

}, 500);
}

