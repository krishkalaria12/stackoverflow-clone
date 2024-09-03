import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import React from "react";
import EditQues from "./EditQues";
import env from "@/app/env";

const Page = async ({ params }: { params: { quesId: string; quesName: string } }) => {
    const question = await databases.getDocument(env.appwrite.databaseApiKey, env.appwrite.questionCollectionApiKey, params.quesId);

    return <EditQues question={question} />;
};

export default Page;
