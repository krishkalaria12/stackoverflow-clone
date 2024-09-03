"use client";

import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import QuestionForm from "@/components/QuestionForm";
import { Meteors } from "@/components/magicui/meteors";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

export default function AskQuestion() {
    const { user } = useAuthStore();
    const router = useRouter();
    const { toast } = useToast();

    const postQuestion = async (formData: FormData) => {
        const response = await axios.post("/api/ask-question", formData);
        return response.data
    }

    const postQuestionMutation = useMutation({
        mutationFn: postQuestion,
        onSuccess: () => {
            toast({
                title: "Group created successfully",
                description: "You've successfully created a new group",
                variant: "default",
                duration: 5000,
            })
            router.push(`/questions`);
        },
        onError: (error: any) => {
            toast({
                title: 'Uh oh! Something went wrong.',
                description: "Please Try Again Later!!",
                variant: 'destructive',
                duration: 5000,
            })
        }
    })


    if (!user) {
        router.push("/login");
        return null;
    }

    const handleSubmit = (formData: FormData) => {
        console.log("Form Data:", formData);
        postQuestionMutation.mutate(formData);
    };

    const isLoading = postQuestionMutation.isPending;

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-12 text-white">
            <Meteors number={20} />
            <div className="container mx-auto max-w-3xl">
                <h1 className="mb-8 text-center text-4xl font-bold">Ask a Question</h1>
                <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                    <QuestionForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>
            </div>
        </div>
    );
}
