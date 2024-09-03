import { ID, Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";
import env from "@/app/env";

export default async function createVoteCollection() {
    // Creating Collection
    await databases.createCollection(env.appwrite.databaseApiKey, ID.unique(), voteCollection, [
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("Vote Collection Created");

    // Creating Attributes
    await Promise.all([
        databases.createEnumAttribute(env.appwrite.databaseApiKey, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, voteCollection, "typeId", 50, true),
        databases.createEnumAttribute(
            env.appwrite.databaseApiKey,
            voteCollection,
            "voteStatus",
            ["upvoted", "downvoted"],
            true
        ),
        databases.createStringAttribute(env.appwrite.databaseApiKey, voteCollection, "votedById", 50, true),
    ]);
    console.log("Vote Attributes Created");
}