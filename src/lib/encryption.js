import crypto from "crypto";

// Ensure a fixed 32-byte (256-bit) secret key
function generateSecretKey() {
  return crypto.randomBytes(32).toString("hex"); // 64 hex characters
}

// Use a constant SECRET_KEY and ensure it's stored persistently
const SECRET_KEY_HEX = process.env.ENCRYPTION_SECRET;
const SECRET_KEY = Buffer.from(SECRET_KEY_HEX, "hex");

const IV_LENGTH = 16; // AES block size (16 bytes)

// Encrypt URL
export function encryptURL(url) {
  if (!url || typeof url !== "string") {
    throw new Error("❌ encryptURL() received an invalid URL.");
  }

  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv("aes-256-cbc", SECRET_KEY, iv);

  let encrypted = cipher.update(url, "utf8", "hex");
  encrypted += cipher.final("hex");
  console.log("Encrypted:", encrypted);
  return iv.toString("hex") + ":" + encrypted; // Ensure IV is stored
}

export function decryptURL(encrypted) {
  try {
    console.log("🔍 decryptURL received:", encrypted);

    if (!encrypted || typeof encrypted !== "string") {
      throw new Error("❌ decryptURL() received an invalid input.");
    }

    const decodedToken = decodeURIComponent(encrypted);
    console.log("🔍 Decoded Token:", decodedToken);

    if (!decodedToken.includes(":")) {
      throw new Error(
        "❌ Invalid encrypted data format. Expected format: IV:CipherText"
      );
    }

    const [ivHex, encryptedText] = decodedToken.split(":");

    if (!ivHex || !encryptedText) {
      throw new Error("❌ decryptURL() failed: Missing IV or ciphertext.");
    }

    console.log("🔍 IV (Hex):", ivHex);
    console.log("🔍 Encrypted Text (Hex):", encryptedText);

    const iv = Buffer.from(ivHex, "hex");

    if (iv.length !== 16) {
      throw new Error(
        `❌ Invalid IV length: ${iv.length}. It must be 16 bytes.`
      );
    }

    const decipher = crypto.createDecipheriv("aes-256-cbc", SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    console.log("✅ Decryption Successful:", decrypted);
    return decrypted;
  } catch (error) {
    console.error("❌ decryptURL() failed:", error.message);
    throw new Error("Decryption error: Invalid key, IV, or corrupted data.");
  }
}

//โค้ดนี้ทำหน้าที่ในการเข้ารหัสและถอดรหัส URL โดยใช้ AES-256-CBC
// ซึ่งช่วยเพิ่มความปลอดภัยในการเก็บหรือส่ง URL ที่อาจมีข้อมูลสำคัญ
// โดยการใช้ IV ที่สุ่มสร้างขึ้นในแต่ละครั้งช่วยเพิ่มความปลอดภัยอีกระดับหนึ่ง.
