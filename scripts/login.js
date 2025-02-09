document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const hashedPassword = await sha256(password);

            const response = await fetch(`http://126.66.127.115:5288/login?username=${encodeURIComponent(username)}&hashedpassword=${hashedPassword}`);

            if (!response.ok) {
                throw new Error("サーバーエラー");
            }

            const result = await response.json();
            sessionStorage.setItem("authToken", result.acces_token);
            sessionStorage.setItem("userId", result.user_id);
            window.location.href = "/";
        } catch (error) {
            errorMessage.textContent = "ユーザー名またはパスワードが間違っています。";
        }
    });

    async function sha256(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, "0")).join("");
    }
});
