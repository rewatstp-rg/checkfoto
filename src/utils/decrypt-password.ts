const saltBase64Salt = `${import.meta.env.VITE_SALT_KEY_BASE64}`;
// const ivBase64Salt = `${import.meta.env.VITE_IV_KEY_BASE64}`;
const encryptKey = `${import.meta.env.VITE_ENCRYPT_KEY}`;

function base64ToBytes(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
}

function bufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i += 1) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

async function deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordBytes = encoder.encode(password);

    // Import the password to generate a key material
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        passwordBytes,
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    // Use PBKDF2 to derive the AES key (256 bits)
    const key = await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 100000,  // 100,000 iterations (higher is more secure)
            hash: "SHA-256",     // Hash function to use (SHA-256 for stronger keys)
        },
        keyMaterial,
        { name: "AES-CBC", length: 256 },  // AES-256
        false,
        ["encrypt", "decrypt"]
    );

    return key;
}


// ใช้ สําหรับ generate salt
// function generateSalt(): Uint8Array {
//     return crypto.getRandomValues(new Uint8Array(16));  // Random 16-byte salt
// }

// function bufferToBase64Wihtsalt(buffer: ArrayBuffer): string {
//     return btoa(String.fromCharCode(...new Uint8Array(buffer)));
// }

export const generateIv = () => (
    crypto.getRandomValues(new Uint8Array(16))
)

export async function encryptWithSalt(text: string, iv: any) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // Generate a random salt
    const salt = base64ToBytes(saltBase64Salt);

    // Derive the AES key from the password and salt
    const key = await deriveKeyFromPassword(encryptKey, salt);

    // Generate a random IV (16 bytes for AES-CBC)
    // const iv = base64ToBytes(ivBase64Salt);

    // Encrypt the data using the derived key and IV
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        key,
        data
    );

    // Convert the encrypted data to Base64
    const encryptedBase64 = bufferToBase64(encrypted);
    const ivBase64 = bufferToBase64(iv);

    return {
        encryptedData: encryptedBase64,
        iv: ivBase64
    };
}