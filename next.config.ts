import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    }
};

export default nextConfig;