"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const tags = [
  "Technology",
  "Software Development",
  "Digital Privacy",
  "Cybersecurity",
  "AI & Automation",
  "Mobile Apps",
  "Digital Accessibility",
  "Web Development",
  "Cloud Computing",
  "Environment",
  "Climate Action",
  "Renewable Energy",
  "Waste Management",
  "Sustainable Living",
  "Conservation",
  "Urban Planning",
  "Healthcare",
  "Mental Health",
  "Fitness & Exercise",
  "Nutrition",
  "Elder Care",
  "Telehealth",
  "Health Tech",
  "Education",
  "Online Learning",
  "Professional Development",
  "STEM Education",
  "Coding Bootcamps",
  "Technical Documentation",
];

export default function SubmitProblem() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [problemTitle, setProblemTitle] = useState("");
  const [problemDescription, setProblemDescription] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const canContinue =
    problemTitle.trim().length > 0 &&
    problemDescription.trim().length >= 50 &&
    selectedTags.length > 0;

  const handleContinue = () => {
    if (!canContinue) return;
    // Here you can handle navigation or form submission
    alert("Continue to next step!");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit a Problem</h1>

          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <span className="ml-2 text-sm text-gray-600">Problem Details</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <span className="ml-2 text-sm text-gray-400">Context & Impact</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <span className="ml-2 text-sm text-gray-400">Review & Submit</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Tell us about the problem</h2>

          <div className="mb-6">
            <Input
              type="text"
              placeholder="Problem Title (e.g., 'Finding affordable short-term housing for internships')"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
              className="w-full text-gray-600 placeholder:text-gray-400"
            />
          </div>

          <div className="mb-4">
            <Textarea
              placeholder="Describe the problem in detail. What specifically makes this difficult?"
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              className="w-full min-h-[120px] text-gray-600 placeholder:text-gray-400 resize-none"
            />
          </div>

          <p className="text-sm text-gray-500 mb-8">
            Min 50 characters. Be specific about what makes this challenging.
          </p>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tags (select up to 5)</h3>
            <p className="text-sm text-gray-600 mb-4">Select categories that best describe this problem</p>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full max-w-md text-gray-600 placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleTag(tag)}
                  disabled={!selectedTags.includes(tag) && selectedTags.length >= 5}
                  className={`text-sm ${
                    selectedTags.includes(tag)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  } ${!selectedTags.includes(tag) && selectedTags.length >= 5 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {tag}
                </Button>
              ))}
            </div>

            {selectedTags.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Selected tags ({selectedTags.length}/5):</p>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-blue-100 text-blue-800">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleContinue}
              disabled={!canContinue}
              className={`px-6 py-2 text-white rounded ${
                canContinue ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
