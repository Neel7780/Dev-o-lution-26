import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return NextResponse.json({ error: "Webhook URL not configured" }, { status: 500 });
    }

    try {
        const requestBody = await req.json();
        const { name, "contact-person": contactPerson, email, "contact-number": contactNumber, message } = requestBody;

        if (!name?.trim() || !contactPerson?.trim() || !email?.trim() || !contactNumber?.trim() || !message?.trim()) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const contentLines = [
            `**Name:** ${name.trim()}`,
            `**Contact Person:** ${contactPerson.trim()}`,
            `**Email:** ${email.trim()}`,
            `**Contact Number:** ${contactNumber.trim()}`,
            `**Message:** ${message.trim()}`,
        ];

        const formattedMessage = contentLines.join("\n");

        const payload = {
            content: formattedMessage,
        };

        const discordResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (discordResponse.ok) {
            return NextResponse.json({ message: "Webhook sent successfully" });
        } else {
            const discordResponseBody = await discordResponse.text();
            console.error("Discord API Error:", discordResponseBody);
            return NextResponse.json({ error: "Failed to send webhook" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error while processing webhook:", error);
        return NextResponse.json({ error: "Error while sending webhook" }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "GET method is not allowed on this route" }, { status: 405 });
}