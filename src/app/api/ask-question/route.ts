import { NextRequest, NextResponse } from "next/server";
import { client, databases, storage } from "@/models/server/config";
import { ID } from "node-appwrite";
import env from "@/app/env";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData(); // Use formData to handle file uploads
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;
        const tags = JSON.parse(formData.get("tags") as string);
        const authorId = formData.get("authorId") as string;
        const attachment = formData.get("attachment") as File | null;

        console.log(title, content, tags, authorId, attachment)

        if (!title || !content || !authorId) {
            return NextResponse.json({
                error: "Missing required fields"
            }, { status: 400 });
        }

        let attachmentId = null;
        if (attachment) {
            const file = await storage.createFile(
                env.appwrite.storageApiKey,
                ID.unique(),
                attachment
            );
            attachmentId = file.$id;
        }

        const question = await databases.createDocument(
            env.appwrite.databaseApiKey,
            env.appwrite.questionCollectionApiKey,
            ID.unique(),
            {
                title,
                content,
                tags,
                authorId,
                attachmentId,
            }
        );

        return NextResponse.json({
            message: "Question posted successfully",
            question
        }, { status: 201 });
    } catch (error: any) {
        console.error("Error creating question:", error);
        return NextResponse.json(
            { error: error?.message || "Error creating question" },
            { status: error?.status || error?.code || 500 }
        );
    }
}
