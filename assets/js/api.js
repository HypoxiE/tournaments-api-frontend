function cacheDataSession(key, data, ttl) {
  const cacheEntry = {
    timestamp: Date.now(),
    ttl: ttl,
    data: data
  };
  sessionStorage.setItem(key, JSON.stringify(cacheEntry));
}

// Получаем данные из sessionStorage, если ещё актуальны
function getCachedDataSession(key) {
  const item = sessionStorage.getItem(key);
  if (!item) return null;

  const cacheEntry = JSON.parse(item);
  const now = Date.now();

  if (now - cacheEntry.timestamp > cacheEntry.ttl) {
    // устарело → удаляем
    sessionStorage.removeItem(key);
    return null;
  }

  return cacheEntry.data;
}

export async function getResults() {
	const cacheKey = "tournament";
	const cacheTTL = 5 * 60 * 1000;

	const cached = getCachedDataSession(cacheKey);
	if (cached) return cached;

	const response = await fetch("http://localhost:8080/leaderboard?tournament_id=1");
	if (!response.ok){
		throw new Error(`HTTP ошибка: ${response.status}`)
	};
	let data = await response.json()

	cacheDataSession(cacheKey, data, cacheTTL);

	return data
}