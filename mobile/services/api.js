import { EXPO_PUBLIC_API_URL } from "@env";

export async function loginRequest(email, password) {
    const res = await fetch(`${EXPO_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return res.json();
}
