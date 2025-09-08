async function getResults() {
  // Запрос (замени URL на свой)
  const response = await fetch("http://localhost:8080/leaderboard?tournament_id=3");
  if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);
  return await response.json()
}

async function drawTable(tournament) {
  try {

    const nameDiv = document.getElementById("tournament_name");
    nameDiv.innerHTML = `${tournament.name}`;

    const container = document.getElementById("leaderboard");
    container.innerHTML = "";

    tournament.results.forEach(result => {

      let comment_content = "", streams = "";

      result.metadata.forEach(data => {
        if (data.key == "comment") {
          comment_content = data.value
        } else if (data.key == "streams") {
          streams = data.value
        }
      });

      const block = document.createElement("div");
      block.className = "result-block";

      const avatar = document.createElement("img");
      avatar.className = "avatar";
      avatar.src = result.avatar_url;
      avatar.onerror = function() {
        this.src = 'https://i.imgur.com/9iT2ogu.png';
        this.onerror = null;
      };

      const info = document.createElement("div");
      info.className = "result-info-block";
      const date = new Date(result.timestamp * 1000);
      //date.toLocaleString()
      // Генерация содержимого блока
      info.innerHTML = `
        <span class="username">${result.username}</span>
        <span class="score">Score: ${result.score}</span>
        <span class="cost">Cost: ${result.cost}</span>
      `;

      const comment = document.createElement("div");
      comment.className = "result-comment-block";
      comment.innerHTML = comment_content;

      block.appendChild(avatar);
      block.appendChild(info);
      block.appendChild(comment);
      container.appendChild(block);
    });

    console.log(tournament)

  } catch (err) {
    console.error("Ошибка:", err);
  }
}

async function main() {
  let tournament;
  try {
    tournament = await getResults();
  } catch (err) {
    const container = document.getElementById("leaderboard");
    container.innerHTML = "";

    const error = document.createElement("div");
    error.className = "error-block";
    error.innerHTML = "Ошибка: Не удалось связаться с сервером. Попробуйте позже.";

    container.appendChild(error);
    return
  }
  await drawTable(tournament);
}

main();
