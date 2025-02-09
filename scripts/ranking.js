fetch('http://126.66.127.115:5288/ranking/money')
    .then(response => response.json())
    .then(data => {
        const moneyRanking = document.getElementById('moneyRanking');
        moneyRanking.innerHTML = '';

        let rank = 1;
        data.forEach(player => {
            if (player.player_name == 'kumaAdmin') {
                return;
            }
            const listItem = document.createElement('ul');

            const rankItem = document.createElement('li');
            rankItem.className = 'rank';
            // rankItem.textContent = player.rank;
            rankItem.textContent = rank;
            rank++;
            listItem.appendChild(rankItem);

            const playerNameItem = document.createElement('li');
            playerNameItem.className = 'playerName';
            playerNameItem.textContent = player.player_name;
            listItem.appendChild(playerNameItem);

            const playerMoneyItem = document.createElement('li');
            playerMoneyItem.className = 'playerMoney';
            playerMoneyItem.textContent = player.money.toLocaleString(); // 3桁ごとにカンマを挿入
            listItem.appendChild(playerMoneyItem);

            moneyRanking.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching ranking data:', error));

fetch('http://126.66.127.115:5288/ranking/xp')
    .then(response => response.json())
    .then(data => {
        const xpRanking = document.getElementById('XPRanking');
        xpRanking.innerHTML = '';

        let rank = 1;
        data.forEach(player => {
            if (player.player_name == 'kumaAdmin') {
                return;
            }
            const listItem = document.createElement('ul');

            const rankItem = document.createElement('li');
            rankItem.className = 'rank';
            // rankItem.textContent = player.rank;
            rankItem.textContent = rank;
            rank++;
            listItem.appendChild(rankItem);

            const playerNameItem = document.createElement('li');
            playerNameItem.className = 'playerName';
            playerNameItem.textContent = player.player_name;
            listItem.appendChild(playerNameItem);

            const playerXpItem = document.createElement('li');
            playerXpItem.className = 'playerXp';
            playerXpItem.textContent = player.xp.toLocaleString(); // 3桁ごとにカンマを挿入
            listItem.appendChild(playerXpItem);

            XPRanking.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching ranking data:', error));
