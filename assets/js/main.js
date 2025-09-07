async function loadUsers() {
  try {
    // Запрос (замени URL на свой)
    const response = await fetch("http://localhost:8080/leaderboard?tournament_id=3");
    if (!response.ok) throw new Error(`HTTP ошибка: ${response.status}`);

    const tournament = await response.json();

    const nameDiv = document.getElementById("tournament_name");
    nameDiv.innerHTML = `${tournament.name}`;

    const container = document.getElementById("leaderboard");
    container.innerHTML = ""; // очищаем перед рендером

    tournament.results.forEach(user => {

      const block = document.createElement("div");
      block.className = "user-block";

      const avatar = document.createElement("img");
      avatar.className = "avatar";
      avatar.src = user.avatar_url;
      avatar.onerror = function() {
        this.src = 'https://cdn.discordapp.com/attachments/1399166057477963777/1413458320043540531/image.png?ex=68bea424&is=68bd52a4&hm=dd82911fa78f7c746f4b8ce34fe0c1a0f4fa541d950c5894fc0efd54d03c16d3&';
        this.onerror = null;
      };

      const info = document.createElement("div");
      info.className = "user-info";
      const date = new Date(user.timestamp * 1000);
      // Генерация содержимого блока
      info.innerHTML = `
        <span class="username">${user.username}</span>
        <span class="score">Score: ${user.score}</span>
        <span class="cost">Cost: ${user.cost}</span>
        <span class="time">Time: ${date.toLocaleString()}</span>
      `;
      
      block.appendChild(avatar);
      block.appendChild(info);
      container.appendChild(block);
    });

    console.log(tournament)

  } catch (err) {
    console.error("Ошибка:", err);
  }
}

loadUsers();
