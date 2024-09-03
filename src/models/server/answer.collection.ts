import { ID, Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";
import env from "@/app/env";

export default async function createAnswerCollection() {
    // Creating Collection
    await databases.createCollection(env.appwrite.databaseApiKey, ID.unique(), answerCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Answer Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(env.appwrite.databaseApiKey, answerCollection, "content", 10000, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, answerCollection, "authorId", 50, true),
    ]);
    console.log("Answer Attributes Created");
}