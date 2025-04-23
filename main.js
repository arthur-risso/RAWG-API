import { getGames } from "./api.js";

export async function renderGames() {
    const data = await getGames();
    const games = data?.results;

    const gameList = document.querySelector('#game-list');
    gameList.innerHTML = ''

    games.forEach((game) => {
        const li = document.createElement('li');

        const title = document.createElement('h3')
        title.textContent = game.name

        const img = document.createElement('img');
        img.src = game.background_image;
        img.alt = game.name;
        img.width = 200;

        li.appendChild(title)
        li.appendChild(img)
        gameList.appendChild(li)

    })
}

document.addEventListener('DOMContentLoaded', renderGames)