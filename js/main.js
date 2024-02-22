import { createNode } from "./utilities.js";
import { showGameDetails } from "./details.js";

export const urlApi = "https://free-to-play-games-database.p.rapidapi.com/api";
const urlAllGames = urlApi.concat("/games");
const urlWebGames = urlApi.concat("/games?platform=browser");
const urlPcGames = urlApi.concat("/games?platform=pc");
export const output = document.getElementById("output");
export const currentLocation = window.location.pathname;

if (currentLocation === "/JS-API/") {
  const allGames = document.getElementById("all-games");
  const webGames = document.getElementById("web-games");
  const pcGames = document.getElementById("pc-games");

  getGamesData(urlAllGames);

  allGames.addEventListener("click", () => {
    getGamesData(urlAllGames);
  });
  webGames.addEventListener("click", () => {
    getGamesData(urlWebGames);
  });
  pcGames.addEventListener("click", () => {
    getGamesData(urlPcGames);
  });
}

export async function getGamesData(url) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "33120feaa4msh71483202838c8c0p16d147jsn93fde0d94277",
      "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (response.ok) {
      const result = await response.json();
      updateDisplay(result);
    } else {
      console.log("Could not fetch data");
      output.innerText = "Something got wrong";
    }
  } catch (error) {
    console.error(error);
    output.innerText = "An error occurred when fetching data";
  }
}
// const data = await getGamesData(urlAllGames);
// showGames(data);

function updateDisplay(array) {
  switch (currentLocation) {
    case "/index.html":
      showGames(array);
      break;
    case "/details.html":
      showGameDetails(array);
      break;
  }
}

function showGames(array) {
  //TODO some games has web and pc platform. Fix card display!
  //console.log(array[178]); //two platforms
  //42, 55,178,200,228,244,248
  if (array) {
    output.innerText = "";
  }
  let alt = "";
  let iconPath = "";
  array.forEach((element) => {
    // console.log(element.platform, element.id, array.indexOf(element));
    const card = createNode("div", {
      class: "flex column card",
    });
    const thumb = createNode("img", {
      src: `${element.thumbnail}`,
      alt: `${element.title}`,
      title: `${element.title}`,
    });
    const title = createNode("h2", {});
    title.innerText = `${element.title}`;
    const shortDesc = createNode("p", {});
    shortDesc.innerText = `${element.short_description}`;
    const details = createNode("div", {
      class: "flex card-details",
    });

    if (element.platform === "Web Browser") {
      alt = "Browser-based game";
      iconPath = "../images/web.png";
    } else {
      alt = "Available on Windows";
      iconPath = "../images/windows.png";
    }
    const platform = createNode("img", {
      src: `${iconPath}`,
      alt: `${alt}`,
      title: `${alt}`,
    });
    const genre = createNode("p", {});
    genre.innerText = `${element.genre}`;

    const readMore = createNode("a", {
      href: `details.html?id=${element.id}`,
      target: "_blank",
      role: "button",
    });
    readMore.innerText = "Read more";

    details.append(platform, genre);
    card.append(thumb, title, shortDesc, details, readMore);
    output.appendChild(card);
  });
}
