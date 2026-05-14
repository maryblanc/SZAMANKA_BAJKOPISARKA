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
  }
};

async function loadData() {

  try {

    document
      .getElementById("loadingScreen")
      .style.display = "flex";

    document
      .getElementById("loadingScreen")
      .style.opacity = "1";

    const currentUser =
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
          "https://script.google.com/macros/s/AKfycbz2TEAfaDzuRdJxuUMkYYIMytBOa4Z3qU4M-BFeWwaus1-WoN-TGD23TK8jRW3L36YUfg/exec"
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