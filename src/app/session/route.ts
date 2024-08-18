import { type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { defaultSession, sessionOptions } from "../lib";
import { redirect } from "next/navigation";
import { type SessionData } from "../lib";

export async function POST(request: NextRequest) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    const formData = await request.formData();
    
    session.isLoggedIn = true;
    session.username = formData.get("username") as string;
    await session.save();

    return Response.redirect(`${request.nextUrl.origin}/`, 303);
}

export async function GET(request: NextRequest) {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    const action = new URL(request.url).searchParams.get("action");
    if (action === "logout") {
        session.destroy();
        return redirect(
            "/",
        );
    }

    if (session.isLoggedIn !== true) {
        return Response.json(defaultSession);
    }

    return Response.json(session);
}