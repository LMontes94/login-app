import { API_URL } from "@env";
console.log("API_URL:", API_URL);
export async function loginRequest(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return res.json();
}
