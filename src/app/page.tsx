import React from "react";
import {HeroSection} from "@/app/components/HeroSection";
import {LatestQuestions} from "@/app/components/LatestQuestions";
import {TopContributers} from "@/app/components/TopContributers";
import {Footer} from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        <HeroSection />
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold">Latest Questions</h2>
              <LatestQuestions />
            </div>
            <div>
              <h2 className="mb-6 text-3xl font-bold">Top Contributors</h2>
              <TopContributers />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
