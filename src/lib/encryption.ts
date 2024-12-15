import crypto from "crypto";
import "server-only";
const ALG = "aes-256-cbc";
export async function symmetricEncryption(val: string) {
    const key = process.env.ENCRYPTION_KEY! as string;
    if (!key) {
        throw new Error("Encryption not found.");
    }
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALG, Buffer.from(key, "hex"), iv);
    let encrypted = cipher.update(val);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}
export async function symmetricDecryption(encryption: string) {
    const key = process.env.ENCRYPTION_KEY! as string;
    if (!key) {
        throw new Error("Encryption not found.");
    }
    const textParts = encryption.split(":");
    const iv = Buffer.from(textParts.shift() as string, "hex");
    const encryptedText = Buffer.from(textParts[0], "hex");
    const decipher = crypto.createDecipheriv(ALG, Buffer.from(key, "hex"), iv);
    let decryptedVal = decipher.update(encryptedText);
    decryptedVal = Buffer.concat([decryptedVal, decipher.final()]);
    return decryptedVal.toString();
}

