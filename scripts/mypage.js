document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        
        const newUserName = document.getElementById("new_user_name").value.trim();
        const currentPassword = document.getElementById("current_password").value;
        const newPassword = document.getElementById("new_password").value;
        const newPassword2 = document.getElementById("new_password_2").value;

        if (!currentPassword) {
            document.getElementById('errorMsg').innerHTML = "今のパスワードを入力してください。"
            document.getElementById('errorMsg').style = "color: red;"
            return;
        }

        if (!newUserName && !newPassword && !newPassword2){
            document.getElementById('errorMsg').innerHTML = "新しいユーザー名もしくはパスワードを入力してください。"
            document.getElementById('errorMsg').style = "color: red;"
            return;
        }

        if (newPassword !== newPassword2) {
            document.getElementById('errorMsg').innerHTML = "新しいパスワードが一致しません。"
            document.getElementById('errorMsg').style = "color: red;"
            return;
        }

        // const hashPassword = async (password) => {
        //     const encoder = new TextEncoder();
        //     const data = encoder.encode(password);
        //     const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        //     return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
        // };

        const currentHashedPassword = sha256(currentPassword);
        const newHashedPassword = newPassword ? sha256(newPassword) : null;

        const requestBody = {
            new_user_name: newUserName || null,
            current_hashed_password: currentHashedPassword,
            new_hasshed_password: newHashedPassword
        };

        try {
            const response = await fetch("http://126.66.127.115:5288/user/" + sessionStorage.getItem('userId') + "/change",  {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error("サーバーエラーが発生しました。");
            }
            
            // const _result = await response.json();
            document.getElementById('errorMsg').innerHTML = "更新に成功しました！"
            document.getElementById('errorMsg').style = "color: lightgreen;"
        } catch (error) {
            console.error("エラー: ", error);
            document.getElementById('errorMsg').innerHTML = "更新に失敗しました。アライグマさん or くまさんにお問い合わせください。"
            document.getElementById('errorMsg').style = "color: red;"
        }
    });
});
