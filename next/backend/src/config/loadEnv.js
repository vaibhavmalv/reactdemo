import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadEnvironment() {
    const mode = process.env.NODE_ENV || "local";

    const envMap = {
        local: ".env.local",
        development: ".env.development",
        production: ".env"
    };

    const envFile = envMap[mode] || ".env";

    const envPath = path.join(__dirname, "../../../", envFile);

    // Check if ENV file exists
    if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        console.log(`🌍 Loaded ENV file: ${envFile}`);
    } else {
        console.log(`⚠️ ENV file not found (${envFile}) → continuing without .env`);
    }

    return mode;
}

export default loadEnvironment;
