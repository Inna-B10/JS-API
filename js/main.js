const urlAll = "https://free-to-play-games-database.p.rapidapi.com/api/games";
const output = document.getElementById("output");

async function getGamesData(url) {
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
      return result;
    } else {
      console.log("Could not fetch data");
      output.innerText = "Something got wrong";
    }
  } catch (error) {
    console.error(error);
    output.innerText = "An error occurred when fetching data";
  }
}
const data = await getGamesData(urlAll);
showGames(data);

function createNode(node, attributes) {
  const el = document.createElement(node);
  for (let key in attributes) {
    el.setAttribute(key, attributes[key]);
  }
  return el;
}

function showGames(array) {
  let alt = "";
  let iconPath = "";
  array.forEach((element) => {
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
      class: "flex",
    });
    if (element.genre === "Web Browser") {
      alt = "Browser based game";
      iconPath = "../images/web.png";
    } else {
      alt = "Game for Windows";
      iconPath = "../images/windows.png";
    }
    const platform = createNode("img", {
      src: `${iconPath}`,
      alt: `${alt}`,
      title: `${alt}`,
    });
    const genre = createNode("p", {});
    genre.innerText = `${element.genre}`;
    details.appendChild(platform);
    details.appendChild(genre);
    card.appendChild(thumb);
    card.appendChild(title);
    card.appendChild(shortDesc);
    card.appendChild(details);
    output.appendChild(card);
  });
}
