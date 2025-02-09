document.addEventListener("DOMContentLoaded", () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
        window.location.href = "/login"
    }
});
