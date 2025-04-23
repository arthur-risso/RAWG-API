const api_key = "b35f3096fb7246e2899d1fb575e93def"
const url = `https://api.rawg.io/api/games`

export async function getGames(currentPage = 1) {
    const params = new URLSearchParams({
        key: api_key,
        page_size: 5,
        page: currentPage,
    });

    try {
        const res = await fetch(`${url}?${params}`);
        if (!res.ok) {
            throw new Error('Deu erro aqui velhinho');
        }
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Erro:", error)
    }

}
