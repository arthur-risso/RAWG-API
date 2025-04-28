import { getGames } from "./api.js";
import { debounce, createElement } from "./utils.js";

let currentPage = 1;
let currentSearch = "";

const gameList = document.querySelector("#game-list");
const pageNumber = document.querySelector("#page-number");
const message = document.querySelector("#message");

async function renderGames(page = 1, search = "") {
  const { results: games, fromCache } = await getGames(page, search);

  gameList.innerHTML = "";

  if (games.length === 0) {
    const li = createElement("li", {}, "Nenhum jogo encontrado.");
    gameList.appendChild(li);
    message.textContent = "";
    pageNumber.textContent = page;
    return;
  }

  games.forEach(({ name, background_image }) => {
    const title = createElement("h3", {}, name);
    const img = createElement("img", {
      src: background_image,
      alt: name,
      width: "200",
    });
    const li = createElement("li", {}, title, img);

    gameList.appendChild(li);
  });

  message.textContent = fromCache
    ? "Dados carregados do cache."
    : "Dados carregados da API.";
  pageNumber.textContent = page;
  currentPage = page;
}

document.addEventListener("DOMContentLoaded", () => {
  renderGames(currentPage);

  document.querySelector("#prev-btn").addEventListener("click", () => {
    if (currentPage > 1) renderGames(currentPage - 1, currentSearch);
  });

  document.querySelector("#next-btn").addEventListener("click", () => {
    renderGames(currentPage + 1, currentSearch);
  });

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener(
    "input",
    debounce((e) => {
      currentSearch = e.target.value.trim();
      currentPage = 1;
      renderGames(currentPage, currentSearch);
    }, 500)
  );
});
