const USERS = {

  "bajkopisarka": "teresa",
  "cooper": "teresa",
  "teresa": "teresa",

  "szamanka": "marysia",
  "betty": "marysia",
  "marysia": "marysia"
};

const SESSION_TIME =
  1000 * 60 * 20;

const TODAY =
  new Date().toDateString();


  function checkPassword() {

  const input =
    document
      .getElementById("passwordInput")
      .value
      .toLowerCase();

  const user =
    USERS[input];

  if(user) {

    document
      .getElementById("lockScreen")
      .style.display = "none";

    document
      .getElementById("app")
      .classList.remove("hidden");

    localStorage.setItem(
      "tereUnlocked",
      "true"
    );

    localStorage.setItem(
      "tereUser",
      user
    );

    localStorage.setItem(
      "tereUnlockTime",
      Date.now()
    );

    setUserBadge(user);


    document
  .getElementById("passwordInput")
  .value = "";

    document
      .getElementById("errorText")
      .innerText = "";
    loadData();

  } else {

    document
      .getElementById("errorText")
      .innerText =
        "złe hasło :(";
  }
}

function setUserBadge(user) {

  document
    .getElementById("userBadge")
    .innerText =
      user === "teresa"
        ? "T"
        : "M";
}

window.onload = async () => {

  const unlocked =
    localStorage.getItem("tereUnlocked");

  const unlockTime =
    localStorage.getItem("tereUnlockTime");

  const user =
    localStorage.getItem("tereUser");

  const now =
    Date.now();

  const sessionValid =
    unlockTime &&
    (now - unlockTime < SESSION_TIME);

  if(unlocked === "true" && sessionValid) {

    document
      .getElementById("lockScreen")
      .style.display = "none";

    document
      .getElementById("app")
      .classList.remove("hidden");

    setUserBadge(user);

    await loadData();

  } else {

    localStorage.removeItem("tereUnlocked");

    localStorage.removeItem("tereUser");

    localStorage.removeItem("tereUnlockTime");

    document
      .getElementById("loadingScreen")
      .style.display = "none";
  }
};

async function loadData(userOverride = null) {

  try {

    document
      .getElementById("loadingScreen")
      .style.display = "flex";

    document
      .getElementById("loadingScreen")
      .style.opacity = "1";

    const currentUser =
      userOverride ||
      localStorage.getItem("tereUser");

    if(!currentUser) {

      document
        .getElementById("loadingScreen")
        .style.display = "none";

      return;
    }

    const cacheKey =
      `dailyData_${currentUser}`;

    const cachedData =
      localStorage.getItem(cacheKey);

    const cachedDate =
      localStorage.getItem(
        `${cacheKey}_date`
      );

    let data;

    if(cachedData && cachedDate === TODAY) {

      data =
        JSON.parse(cachedData);

      console.log("USING CACHE");

    } else {

      console.log("FETCHING NEW DATA");

      const response =
        await fetch(
          `https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec?user=${currentUser}`
        );

      data =
        await response.json();

      localStorage.setItem(
        cacheKey,
        JSON.stringify(data)
      );

      localStorage.setItem(
        `${cacheKey}_date`,
        TODAY
      );
    }

    console.log(data);

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

        if(data.latestMessage) {

          document
            .getElementById("latestMessageText")
            .innerText =
              `od ${data.latestMessage.from} ✨\n\n${data.latestMessage.message}`;

        } else {

          document
            .getElementById("latestMessageText")
            .innerText =
              "jeszcze nic tu nie ma ✨";
        }

    document
      .getElementById("loadingScreen")
      .style.opacity = "0";

    setTimeout(() => {

      document
        .getElementById("loadingScreen")
        .style.display = "none";

    }, 500);

  } catch(error) {

    console.error(error);

    document
      .getElementById("loadingScreen")
      .style.display = "none";
  }
}


document
  .getElementById("passwordInput")
  .addEventListener("keydown", (e) => {

    if(e.key === "Enter") {
      checkPassword();
    }
  });

// show another quote

  async function showAnotherQuote() {

  const button =
    event.target;

  const originalText =
    button.innerText;

  button.classList.add("loading");

  button.innerText =
    "✨ ładowanie...";

  try {

    const currentUser =
      localStorage.getItem("tereUser");

    const response =
      await fetch(
        `https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec?user=${currentUser}`
      );

    const data =
      await response.json();

    document
      .getElementById("quote")
      .innerText =
        data.quote;

  } catch(error) {

    console.error(error);

  } finally {

    button.classList.remove("loading");

    button.innerText =
      originalText;
  }
}

async function showAnotherMeme() {

  const button =
    event.target;

  const originalText =
    button.innerText;

  button.classList.add("loading");

  button.innerText =
    "✨ ładowanie...";

  const currentUser =
    localStorage.getItem("tereUser");

  const response =
    await fetch(
      `https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec?user=${currentUser}`
    );

  const data =
    await response.json();

  document
    .getElementById("memeImage")
    .src =
      data.meme;

  button.classList.remove("loading");

  button.innerText =
    originalText;
}


async function showAnotherPhoto() {

  const button =
    event.target;

  const originalText =
    button.innerText;

  button.classList.add("loading");

  button.innerText =
    "✨ ładowanie...";

  try {

    const currentUser =
      localStorage.getItem("tereUser");

    const response =
      await fetch(
        `https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec?user=${currentUser}`
      );

    const data =
      await response.json();

    document
      .getElementById("photoImage")
      .src =
        data.photo;

  } catch(error) {

    console.error(error);

  } finally {

    button.classList.remove("loading");

    button.innerText =
      originalText;
  }
}


async function showAnotherVideo() {

  const button =
    event.target;

  const originalText =
    button.innerText;

  button.classList.add("loading");

  button.innerText =
    "✨ ładowanie...";

  try {

    const currentUser =
      localStorage.getItem("tereUser");

    const response =
      await fetch(
        `https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec?user=${currentUser}`
      );

    const data =
      await response.json();

    document
      .getElementById("videoPlayer")
      .src =
        data.video;

  } catch(error) {

    console.error(error);

  } finally {

    button.classList.remove("loading");

    button.innerText =
      originalText;
  }
}


async function sendMessage() {

  const button =
    event.target;

  const originalText =
    button.innerText;

  const message =
    document
      .getElementById("messageInput")
      .value
      .trim();

  if(!message) {
    return;
  }

  button.classList.add("loading");

  button.innerText =
    "✨ wysyłanie...";

  try {

    const currentUser =
      localStorage.getItem("tereUser");

    const otherUser =
      currentUser === "teresa"
        ? "marysia"
        : "teresa";

    await fetch(
      "https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec",
      {
        method: "POST",

        body: JSON.stringify({
          to: otherUser,
          from: currentUser,
          message
        })
      }
    );

    document
      .getElementById("messageInput")
      .value = "";

    button.innerText =
      "✨ wysłano";

    setTimeout(() => {

      button.innerText =
        originalText;

      button.classList.remove("loading");

    }, 1200);

  } catch(error) {

    console.error(error);

    button.classList.remove("loading");

    button.innerText =
      originalText;
  }
}


function updateClock() {

  const now =
    new Date();

  const date =
    now.toLocaleDateString(
      "pl-PL",
      {
        weekday: "long",
        day: "numeric",
        month: "long"
      }
    );

  const time =
    now.toLocaleTimeString(
      "pl-PL",
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    );

  document
    .getElementById("dateClock")
    .innerHTML =
      `🩷 ${date}<br>${time}`;
}

updateClock();

setInterval(updateClock, 1000);


function logout() {

  localStorage.removeItem(
    "tereUnlocked"
  );

  localStorage.removeItem(
    "tereUser"
  );

  localStorage.removeItem(
    "tereUnlockTime"
  );

  location.reload();
}


setInterval(() => {

  const unlocked =
    localStorage.getItem(
      "tereUnlocked"
    );

  if(unlocked === "true") {

    loadData();
  }

}, 20000);