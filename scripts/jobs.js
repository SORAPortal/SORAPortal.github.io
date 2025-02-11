function generateJobHTML(jobData) {
    return `
        <div class="jobItem" data-job-id="${jobData.job_id}">
            <div class="jobTitle">${jobData.departure}から${jobData.destination}まで乗客${jobData.passenger}人と貨物${jobData.cargo.toLocaleString()}kgを運ぶ。</div>
            <div class="jobReward">
                <div class="Money">報酬金額：<img src="/assets/credit.svg" alt="クレジット" style="height: 1.3em"> ${jobData.gain_money.toLocaleString()}</div>
                <div class="XP">獲得経験値：${jobData.gain_xp.toLocaleString()}XP</div>
            </div>
            <div class="jobDescription">${jobData.passenger}人の乗客と、${jobData.cargo.toLocaleString()}kgの貨物を、${jobData.departure}から${jobData.destination}に運んでください。<br>報酬は${jobData.gain_money.toLocaleString()}クレジットと、${jobData.gain_xp.toLocaleString()}XPです。</div>
            <div class="JobRequirements">
                <div class="passenger">
                    <img src="/assets/person.svg" alt="人のマーク" style="height: 1.3em; margin-right:5px">
                    ${jobData.passenger}人
                </div>
                <div class="cargo">
                    <img src="/assets/cargo.svg" alt="荷物のマーク" style="height:1.3em; margin-right:10px">
                    ${jobData.cargo.toLocaleString()}kg
                </div>
            </div>
            <div class="jobAction">
                <button class="jobAccept">ACCEPT</button>
                <button class="JobReject">REJECT</button>
            </div>
        </div>
    `;
}

function renderJobs(jobList) {
    const container = document.getElementById('jobList');
    if (!container) return;
    
    container.innerHTML = jobList.map(job => generateJobHTML(job)).join('');
}

async function fetchJobs(apiUrl) {
    try {
        const response = await fetch("http://126.66.127.115:5288/jobs/" + sessionStorage.getItem('userId') + "?token=" +  sessionStorage.getItem('authToken'));
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jobs = await response.json();
        renderJobs(jobs);
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
    }
}

async function acceptJob(jobId) {
    const userId = sessionStorage.getItem("userId");

    const requestBody = {
        user_id: userId,
        job_id: jobId,
        use_aircraft: "",
    };

    try {
        const response = await fetch("http://126.66.127.115:5288/jobs/job_accept", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        document.location.href = "/job"
    } catch (error) {
        console.error("ジョブの受諾に失敗:", error);
        alert("ジョブの受諾に失敗しました。");
    }
}

async function rejectJob(jobId) {
    const userId = sessionStorage.getItem("userId");

    const requestBody = {
        user_id: userId,
        job_id: jobId,
        use_aircraft: "",
    };

    try {
        const response = await fetch("http://126.66.127.115:5288/jobs/job_reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        location.reload();
    } catch (error) {
        console.error("ジョブの破棄に失敗:", error);
        alert("ジョブの破棄に失敗しました。");
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    fetchJobs("http://126.66.127.115:5288/jobs/" + sessionStorage.getItem('userId') + "?token=" +  sessionStorage.getItem('authToken'));

    const response = await fetch("http://126.66.127.115:5288/jobs/accepted/" + sessionStorage.getItem('userId') + "?token=" +  sessionStorage.getItem('authToken'));
    if (response.status === 200) {
        window.location.href = "/job"
    }

    document.getElementById("jobList").addEventListener("click", (event) => {
        if (event.target.classList.contains("jobAccept")) {
            const jobId = event.target.closest(".jobItem").dataset.jobId;
            acceptJob(jobId);
        }
        if (event.target.classList.contains("JobReject")) {
            const jobId = event.target.closest(".jobItem").dataset.jobId;
            rejectJob(jobId);
        }
    });
});
