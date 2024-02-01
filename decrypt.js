const crypto = require("crypto");


module.exports = {
    decrypt:
        function (cipher, type = null) {
            let sKey = "";
            let ivKey = "";

            if (!cipher) return "Not Found";
            if (type === "common") {
                sKey = "OTIxNjM0NTI3MjY5NjMyOQ==";
                ivKey = "MDUwNzA2MDMwMjA4MDEwNA==";
            } else {
                sKey = "c3RhckBsaXZlZ2EqOTYzLg==";
                ivKey = "MDYwODA0MDMwNzAxMDUwMg==";
            }
            const decipher = crypto.createDecipheriv(
                "aes-128-cbc",
                Buffer.from(sKey, "base64"),
                Buffer.from(ivKey, "base64")
            );
            const text = Buffer.concat([
                decipher.update(Buffer.from(cipher, "base64")),
                decipher.final(),
            ]);

            return text.toString();
        }
}