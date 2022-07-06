import * as crypto from "crypto";

export function hashPassword(password: string)
{
    const hmac = crypto.createHmac("SHA512", "HK98)((GHgjGFjd7)(*09&807y(*TYCFx)*dRF*YD88&g8aH&878TGGgjfjhgIt8w&yuGg97(87da");
    hmac.update(password);
    return hmac.digest("hex");
}