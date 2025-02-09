function updateClock () {
    let nowTime = new Date();
    let nowHour = nowTime.getUTCHours();
    let nowMin = nowTime.getUTCMinutes();
    let clock = nowHour + ":" + nowMin + 'z';

    document.getElementById('clock').innerHTML = clock;
}

document.addEventListener("DOMContentLoaded", async () => {
    updateClock();
    let response = await fetch('http://126.66.127.115:5288/user/' + sessionStorage.getItem('userId'));
    let data = await response.json();
    document.getElementById('money').innerHTML = "<img src=\"/assets/credit.svg\" alt=\"お金のアイコン\">" + data.money.toLocaleString();
    document.getElementById('xp').innerHTML = "<img src=\"/assets/XP.svg\" alt=\"XP\">" + data.xp.toLocaleString();
});

setInterval('updateClock()', 1000);
