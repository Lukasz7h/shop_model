"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const crypto = require("crypto");
function hashPassword(password) {
    const hmac = crypto.createHmac("SHA512", "HK98)((GHgjGFjd7)(*09&807y(*TYCFx)*dRF*YD88&g8aH&878TGGgjfjhgIt8w&yuGg97(87da");
    hmac.update(password);
    return hmac.digest("hex");
}
exports.hashPassword = hashPassword;
//# sourceMappingURL=hashPassword.js.map