import { db } from "../name";
import { databases } from "./config";

import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";
import { ID } from "node-appwrite";
import env from "@/app/env";

export default async function getOrCreateDb() {
    try {
        await databases.get(env.appwrite.databaseApiKey);
        console.log("Database Connection established");
    } catch (error) {
        try {
            await databases.create(ID.unique(), db);
            console.log("Database Creation Successful");

            // Create collections
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection(),
            ])
            console.log("Collection Creation Successful");
            console.log("Database connection established");
        } catch (error) {
            console.log("Error creating databases", error);
        }
    }

    return databases;
}