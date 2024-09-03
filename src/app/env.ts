const env = {
    appwrite: {
        endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_HOST_URL),
        projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apikey: String(process.env.APPWRITE_API_KEY),
        storageApiKey: String(process.env.APPWRITE_STORAGE_API_KEY),
        databaseApiKey: String(process.env.APPWRITE_DATABASE_API_KEY),
        questionCollectionApiKey: String(process.env.APPWRITE_QUESTIONS_COLLECTION_API_KEY),
        answerCollectionApiKey: String(process.env.APPWRITE_ANSWERS_COLLECTION_API_KEY),
        commentCollectionApiKey: String(process.env.APPWRITE_COMMENTS_COLLECTION_API_KEY),
        voteCollectionApiKey: String(process.env.APPWRITE_VOTES_COLLECTION_API_KEY),
    }
}

export default env