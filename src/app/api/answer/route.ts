import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { UserPrefs } from "@/store/Auth"

import { ID } from "node-appwrite";

export async function POST(request: NextRequest) {
    try {
        const {questionId, answer, authorId} = await request.json();

        if (!questionId || !answer || !authorId) {
            return NextResponse.json({
                error: "Missing required fields"
            }, {
                status: 400
            })
        }

        // create answer
        const AnswerCreation = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            questionId,
            authorId
        })

        // Increase author reputation
        const prefs = await users.getPrefs<UserPrefs>(authorId);
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1
        })

        return NextResponse.json({
            message: "Answer created successfully"
        }, {
            status: 201
        })

    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error creating answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const {answerId} = await request.json();

        if (!answerId) {
            return NextResponse.json({
                error: "Missing required fields"
            }, {
                status: 400
            })
        }

        const answer = await databases.getDocument(db, answerCollection, answerId);

        if (answer) {
            const response = await databases.deleteDocument(db, answerCollection, answerId);

            const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
            await users.updatePrefs(answer.authorId, {
                reputation: Number(prefs.reputation) - 1
            })

            return NextResponse.json(
                {
                    message: "Answer deleted successfully"
                }, 
                {
                    status: 205
                }
            )
        }
    } catch (error: any) {
        return NextResponse.json(
            {
                error: error?.message || "Error deleting answer"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}