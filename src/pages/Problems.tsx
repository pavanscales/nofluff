import { useState, useMemo, useCallback } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";

const Problems = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Most Votes");

  const problems = useMemo(
    () => [
      {
        id: 1,
        title: "Finding like-minded people is rather difficult",
        description:
          "Finding people who have similar interests is becoming increasingly hard due to people not interacting as much as they used to.",
        categories: ["Online Communities", "Community Building", "Mental Health"],
        votes: 9,
      },
      {
        id: 2,
        title: "Fragmented Digital Identity Management",
        description:
          "Managing multiple digital identities across platforms is complex. Password managers don’t fully solve it.",
        categories: ["Digital Privacy", "Cybersecurity", "Digital Accessibility"],
        votes: 5,
      },
      {
        id: 3,
        title: "Subscription and Content Management",
        description:
          "Managing multiple subscriptions across different platforms is increasingly difficult.",
        categories: ["Digital Literacy", "Software Development"],
        votes: 173,
      },
      {
        id: 4,
        title: "Remote Work Collaboration",
        description:
          "Tools for effective collaboration across time zones in distributed teams are limited.",
        categories: ["Software Development", "Professional Development"],
        votes: 156,
      },
    ],
    []
  );

  const categories = useMemo(
    () => [
      "Community Building",
      "Cybersecurity",
      "Digital Accessibility",
      "Digital Literacy",
      "Digital Privacy",
      "Mental Health",
      "Online Communities",
      "Social Media",
      "Software Development",
      "Time Management",
      "Transportation",
      "Waste Management",
    ],
    []
  );

  const handleCategoryClick = useCallback(
    (category: string) => {
      setSearchQuery(category);
    },
    []
  );

  const filteredProblems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return problems;
    return problems.filter(
      (problem) =>
        problem.title.toLowerCase().includes(query) ||
        problem.description.toLowerCase().includes(query) ||
        problem.categories.some((cat) => cat.toLowerCase().includes(query))
    );
  }, [problems, searchQuery]);

  const sortedProblems = useMemo(() => {
    switch (sortBy) {
      case "Most Votes":
        return [...filteredProblems].sort((a, b) => b.votes - a.votes);
      default:
        return filteredProblems;
    }
  }, [filteredProblems, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-center md:text-left">Problems</h1>
        <p className="text-gray-500 mb-6 text-sm text-center md:text-left">
          Browse challenges or add your own.
        </p>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <Input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:flex-1 text-sm h-9"
          />
          <select
            className="w-full md:w-40 h-9 px-2 py-1 bg-white border border-gray-300 rounded text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Most Votes</option>
            <option>Recent</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
          {categories.map((category) => (
            <Badge
              key={category}
              className="bg-white text-gray-800 hover:bg-gray-100 border border-gray-200 cursor-pointer py-1 px-2 text-xs"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="space-y-4">
          {sortedProblems.length === 0 ? (
            <p className="text-center text-gray-500">No problems found.</p>
          ) : (
            sortedProblems.map((problem) => (
              <Card key={problem.id} className="shadow-sm border border-gray-200 overflow-hidden">
                <CardContent className="px-4 py-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
                    <h2 className="text-lg font-semibold">{problem.title}</h2>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <ChevronUp size={16} />
                      <span>{problem.votes}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {problem.categories.map((category) => (
                      <Badge
                        key={`${problem.id}-${category}`}
                        className="bg-blue-50 text-blue-700 border-none text-xs px-2 py-0.5"
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-700 mb-4 text-sm">{problem.description}</p>

                  <Button variant="outline" className="w-full text-xs h-8">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Problems;
