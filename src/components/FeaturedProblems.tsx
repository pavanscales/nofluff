
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronUp } from "lucide-react";

type ProblemCardProps = {
  id: number;
  title: string;
  description: string;
  categories: string[];
  votes: number;
  comments: number;
};
const ProblemCard = ({ title, description, categories, votes, comments }: ProblemCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-gray-500">
              <ChevronUp size={16} />
              <span>{votes}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              <span>{comments}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.map((category, index) => (
            <Badge 
              key={`${category}-${index}`} 
              className="bg-blue-50 text-blue-700 hover:bg-blue-50"
            >
              {category}
            </Badge>
          ))}
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button variant="outline" className="w-full">
          View Details <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const FeaturedProblems = () => {
  const problems = [
    {
      id: 1,
      title: "Finding like-minded people",
      description: "Connecting with people who share your interests and goals can be challenging in today's fragmented digital landscape.",
      categories: ["Social", "Community Building"],
      votes: 245,
      comments: 18,
    },
    {
      id: 2,
      title: "Encrypted Digital Communication",
      description: "Secure messaging that really protects your privacy without compromising on features and usability.",
      categories: ["Security", "Privacy"],
      votes: 189,
      comments: 12,
    },
    {
      id: 3,
      title: "Subscription and Content Management",
      description: "Managing multiple subscriptions across different platforms is becoming increasingly difficult for consumers.",
      categories: ["Productivity", "Digital Literacy"],
      votes: 173,
      comments: 9,
    },
  ];
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
          Featured Problems
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
          Discover the most popular problems that need solutions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} {...problem} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link to="/problems">Browse All Problems</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
export default FeaturedProblems;
