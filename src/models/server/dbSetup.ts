import { db } from "../name";
import { databases } from "./config";

import createQuestionCollection from "./question.collection";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createVoteCollection from "./vote.collection";

export default async function getOrCreateDb() {
    try {
        await databases.get(db);
        console.log("Database Connection established");
    } catch (error) {
        try {
            await databases.create(db, db);
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