import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getOrCreateDb from "@/models/server/dbSetup";
import getOrCreateStorage from "@/models/server/storageSetup";

export async function middleware(request: NextRequest) {
    // fire up connection of storage and database when app is called
    await Promise.all([
        getOrCreateDb(), 
        getOrCreateStorage()
    ]);
    
    return NextResponse.next();
}

export const config = {
    // match all request paths except for the ones that starts with : 
    // api, _next/static , _next/image, favicon.com

    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};