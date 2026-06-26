import { jwtDecode } from "src/auth/context/jwt/utils";

interface DecodedToken {
    exp: number;
}

export const isTokenExpired = (token: string): boolean => {
    console.log("🚀 ~ isTokenExpired");
    try {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        console.log("🚀 ~ isTokenExpired ~ decoded.exp:", decoded.exp);
        return decoded.exp < currentTime;
    } catch (e) {
        return true; // token ไม่ valid
    }
};