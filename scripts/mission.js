document.addEventListener("DOMContentLoaded", async function () {
    // const missionData = [
    //     {
    //         "id": 1,
    //         "description": "デイリーミッションをクリアする",
    //         "goal": 4,
    //         "current_progress": 2,
    //         "completed": false,
    //         "money": 3000,
    //         "xp": 1000
    //     },
    //     {
    //         "id": 2,
    //         "description": "1回フライトする",
    //         "goal": 1,
    //         "current_progress": 1,
    //         "completed": true,
    //         "money": 1000,
    //         "xp": 0
    //     },
    //     {
    //         "id": 3,
    //         "description": "3回フライトする",
    //         "goal": 3,
    //         "current_progress": 2,
    //         "completed": false,
    //         "money": 2500,
    //         "xp": 0
    //     },
    //     {
    //         "id": 4,
    //         "description": "羽田空港に1回着陸する",
    //         "goal": 1,
    //         "current_progress": 0,
    //         "completed": false,
    //         "money": 1500,
    //         "xp": 0
    //     },
    //     {
    //         "id": 5,
    //         "description": "新千歳空港から1回離陸する",
    //         "goal": 1,
    //         "current_progress": 1,
    //         "completed": true,
    //         "money": 1500,
    //         "xp": 0
    //     }
    // ];

    const response = await fetch("http://126.66.127.115:5288/missions/daily/" + sessionStorage.getItem('userId'))
    const missionData = await response.json();

    const missionList = document.getElementById("missionList");

    missionData.forEach(mission => {
        const missionItem = document.createElement("div");
        missionItem.classList.add("missionItem");
        if (mission.completed) {
            missionItem.classList.add("completed");
        }

        const missionInfo = document.createElement("div");
        missionInfo.classList.add("missionInfo");

        const missionName = document.createElement("h3");
        missionName.classList.add("missionName");
        missionName.textContent = mission.description;

        const missionProgress = document.createElement("div");
        missionProgress.classList.add("missionProgress");

        const progressBar = document.createElement("progress");
        progressBar.max = mission.goal;
        progressBar.value = mission.current_progress;

        const progressLabel = document.createElement("label");
        progressLabel.textContent = `${mission.current_progress}/${mission.goal}`;

        missionProgress.appendChild(progressBar);
        missionProgress.appendChild(progressLabel);

        missionInfo.appendChild(missionName);
        missionInfo.appendChild(missionProgress);

        const missionRewards = document.createElement("div");
        missionRewards.classList.add("missionRewards");

        const rewardMoney = document.createElement("div");
        rewardMoney.classList.add("rewardMoney");
        rewardMoney.textContent = `C ${mission.money.toLocaleString()}`;

        const rewardXP = document.createElement("div");
        rewardXP.classList.add("rewardXP");
        if (mission.xp > 0) {
            rewardXP.textContent = `XP ${mission.xp.toLocaleString()}`;
        }

        missionRewards.appendChild(rewardMoney);
        if (mission.xp > 0) {
            missionRewards.appendChild(rewardXP);
        }

        missionItem.appendChild(missionInfo);
        missionItem.appendChild(missionRewards);

        missionList.appendChild(missionItem);
    });
});
