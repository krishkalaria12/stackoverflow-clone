"use client";

import env from "@/app/env";
import { databases } from "@/models/client/config";
import { useAuthStore } from "@/store/Auth";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";

const DeleteQuestion = ({ questionId, authorId }: { questionId: string; authorId: string }) => {
    const router = useRouter();
    const { user } = useAuthStore();

    const deleteQuestion = async () => {
        try {
            await databases.deleteDocument(env.appwrite.databaseApiKey, env.appwrite.questionCollectionApiKey, questionId);

            router.push("/questions");
        } catch (error: any) {
            window.alert(error?.message || "Something went wrong");
        }
    };

    return user?.$id === authorId ? (
        <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 p-1 text-red-500 duration-200 hover:bg-red-500/10"
            onClick={deleteQuestion}
        >
            <IconTrash className="h-4 w-4" />
        </button>
    ) : null;
};

export default DeleteQuestion;
