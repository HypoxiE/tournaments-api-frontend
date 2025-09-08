async function getResults() {
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

      let formula_content = tournament.formula.replace(new RegExp("\\*", "g"), "×");
      let formula_annotation_content = "<b>Подробности рассчёта</b>";
      let formula_annotation_content_formula = tournament.formula.replace(new RegExp("\\*", "g"), "×");
      const local_formula_annotation = new Map();
      local_formula_annotation.set("humans", "людей");
      local_formula_annotation.set("animals", "животных");

      result.metrics.forEach(data => {
        formula_content = formula_content.replace(new RegExp(data.key, "g"), data.value);

        if (local_formula_annotation.get(data.key) != undefined){
          formula_annotation_content = formula_annotation_content + `${data.value} ${local_formula_annotation.get(data.key)}<br>`;
          formula_annotation_content_formula = formula_annotation_content_formula.replace(new RegExp(data.key, "g"), "(" + data.value + " " + local_formula_annotation.get(data.key) + ")");
        } else {
          formula_annotation_content = formula_annotation_content + `${data.value} ${data.key}<br>`;
          formula_annotation_content_formula = formula_annotation_content_formula.replace(new RegExp(data.key, "g"), "(" + data.value + " " + data.key + ")");
        }
      });
      formula_annotation_content = formula_annotation_content + "<b>" + formula_annotation_content_formula + " = " + result.score + " очков" + "</b>";
      formula_content = formula_content + " = " + result.score + " очков";

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
        <span class="score">Очки: ${result.score}</span>
        <span class="cost">Стоимость: ${result.cost}</span>
      `;

      const formula_annotation = document.createElement("div");
      formula_annotation.className = "result-formula-extra-info-block";
      formula_annotation.innerHTML = formula_annotation_content;
      formula_annotation.addEventListener("click", () => {
        formula_annotation.classList.toggle("active");
      });

      const comment = document.createElement("div");
      comment.className = "result-comment-block";
      comment.innerHTML = comment_content;
      comment.title = comment_content;

      const formula = document.createElement("div");
      formula.className = "result-formula-block";
      formula.innerHTML = formula_content;
      formula.addEventListener("click", () => {
        formula_annotation.classList.toggle("active");
      });

      const comment_formula_block = document.createElement("div");
      comment_formula_block.className = "result-comment-formula-block";
      comment_formula_block.appendChild(comment);
      comment_formula_block.appendChild(formula);

      block.appendChild(avatar);
      block.appendChild(info);
      block.appendChild(comment_formula_block);
      block.appendChild(formula_annotation)
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

main()