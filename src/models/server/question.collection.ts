import { ID, IndexType, Permission } from "node-appwrite"

import {db, questionCollection} from "@/models/name"
import { databases } from "./config"
import env from "@/app/env";

export default async function createQuestionCollection(){ 
    // create collection
    await databases.createCollection(env.appwrite.databaseApiKey, ID.unique(), questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("Question collection created successfully");
    
    // creating attributes and indexes
    await Promise.all([
        databases.createStringAttribute(env.appwrite.databaseApiKey, questionCollection, "title", 100, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, questionCollection, "content", 10000, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(env.appwrite.databaseApiKey, questionCollection, "attachmentId", 100, false),
    ])
    console.log("Question attributes created successfully");

    // create Indexes
    await Promise.all([
        databases.createIndex(
            db, 
            questionCollection, 
            "title", 
            IndexType.Fulltext, 
            ["title"], 
            ["asc"]
        ),
        databases.createIndex(
            db, 
            questionCollection, 
            "content", 
            IndexType.Fulltext, 
            ["content"], 
            ["asc"]
        ),
    ])
}