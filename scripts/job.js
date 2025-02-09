document.addEventListener('DOMContentLoaded', async () => {

    let response = await fetch('http://126.66.127.115:5288/jobs/accepted/' + sessionStorage.getItem('userId') + '?token=' + sessionStorage.getItem('authToken'))
    if (response.status != 200){
        document.location.href = '/jobs';
    }
    const data = await response.json();

    document.getElementById('jobTitle').innerHTML = data.departure + "から" + data.destination + "まで乗客" + data.passenger + "人と貨物" + data.cargo + "kgを運ぶ。";
    document.getElementById('passengers').innerHTML = "<img src=\"/assets/person.svg\" alt=\"人のマーク\">：" + data.passenger + "人";
    document.getElementById('cargo').innerHTML = "<img src=\"/assets/cargo.svg\" alt=\"荷物のマーク\">：" + data.cargo.toLocaleString() + "kg";
    document.getElementById('jobmoney').innerHTML = "<img src=\"/assets/credit.svg\" alt=\"クレジットのマーク\">：" + data.gain_money.toLocaleString();
    document.getElementById('jobxp').innerHTML = "<img src=\"/assets/XP.svg\" alt=\"XP\">：" + data.gain_xp + "XP";

    const requestBody = {
        user_id: sessionStorage.getItem('userId'),
        job_id: data.job_id,
        use_aircraft: "",
    };

    async function completeJob() {
        await fetch ('http://126.66.127.115:5288/jobs/job_complete', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        document.location.href = "/jobs"
    }

    async function cancelJob() {
        await fetch ('http://126.66.127.115:5288/jobs/job_cancel', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });
        document.location.href = "/jobs"
    }

    let startButton = document.getElementById('jobComplete');
    let cancelButton = document.getElementById('jobCancel');

    startButton.addEventListener('click', () => completeJob());
    cancelButton.addEventListener('click', () => cancelJob());
});
