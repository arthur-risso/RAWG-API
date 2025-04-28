const api_key = "b35f3096fb7246e2899d1fb575e93def";
const url = `https://api.rawg.io/api/games`;
const cache_duration = 5 * 60 * 1000;

function buildCacheKey(page, search) {
  return `games_${page}_${search || "all"}`;
}

export async function getGames(page = 1, search = "") {
  const cacheKey = buildCacheKey(page, search);
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < cache_duration) {
      return { results: data, fromCache: true };
    }
  }

  const params = new URLSearchParams({
    key: api_key,
    page_size: 5,
    page: page,
  });

  if (search) {
    params.append("search", search);
  }

  try {
    const res = await fetch(`${url}?${params}`);
    if (!res.ok) {
      throw new Error("Erro ao buscar jogos");
    }

    const data = await res.json();
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ data: data.results, timestamp: Date.now() })
    );
    return { results: data.results, fromCache: false };
  } catch (error) {
    console.error("Erro:", error);
    return { results: [], fromCache: false };
  }
}
