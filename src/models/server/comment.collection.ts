import { ID, Permission } from "node-appwrite";
import { commentCollection, db } from "../name";
import { databases } from "./config";
import env from "@/app/env";

export default async function createCommentCollection() {
    // Creating Collection
    await databases.createCollection(env.appwrite.databaseApiKey, ID.unique(), commentCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Comment Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createStringAttribute(env.appwrite.databaseApiKey, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(env.appwrite.databaseApiKey, commentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, commentCollection, "typeId", 50, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, commentCollection, "authorId", 50, true),
    ]);
    console.log("Comment Attributes Created");
}