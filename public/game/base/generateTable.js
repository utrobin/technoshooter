const generateTable = (players, playerID) => {

  const compareNumeric = (a, b) => {
    if (a.kills > b.kills) return -1;
    if (a.kills < b.kills) return 1;
  };

  players.sort(compareNumeric);

  document.querySelector('.leaderboard').removeChild(document.querySelector('.table'));

  let table = document.createElement('table');
  table.className = 'table';

  const template = `
    <caption>Сurrent rating</caption>
    <tr>
      <th>Name</th>
      <th>Score</th>
      <th>Death</th>
    </tr>
  `;
  table.innerHTML = template;

  players.forEach((el) => {
    let active = "";
    let tr = document.createElement('tr');

    if (playerID == el.id) {
      active = "active";
      tr.className = active;
    }

    tr.innerHTML = `<td>${el.login}</td><td>${el.kills}</td><td>${el.deaths}</td>`;
    table.appendChild(tr);
  });

  document.querySelector('.leaderboard').appendChild(table);
};

export default generateTable;