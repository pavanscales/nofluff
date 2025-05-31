"use client";

import React, { useState } from "react";

const Submit = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [context, setContext] = useState("");
  const [impact, setImpact] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const isStep1Valid = title.length >= 5 && description.length >= 10;
  const isStep2Valid = context.length >= 10 && impact.length >= 10;
  const isStep3Valid = selectedTags.length > 0;

  const { mutate: submitProblem, isLoading, isSuccess } = api.submit.submitProblem.useMutation({
    onSuccess: () => {
      alert("Problem submitted successfully!");
      setStep(1);
      setTitle("");
      setDescription("");
      setContext("");
      setImpact("");
      setSelectedTags([]);
    },
    onError: (err) => {
      alert("Error: " + err.message);
    },
  });

  const handleContinue = () => {
    if (step === 1 && isStep1Valid) return setStep(2);
    if (step === 2 && isStep2Valid) return setStep(3);
    if (step === 3 && isStep3Valid) {
      submitProblem({
        title,
        description,
        context,
        impact,
        tags: selectedTags,
      });
    }
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      } else {
        alert("You can select up to 5 tags only.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Submit Your Problem</h2>

      {step === 1 && (
        <>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Enter problem title"
          />

          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Describe the problem"
          />
        </>
      )}

      {step === 2 && (
        <>
          <label className="block mb-2 font-semibold">Context</label>
          <textarea
            value={context}
            onChange={e => setContext(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Explain the context"
          />

          <label className="block mb-2 font-semibold">Impact</label>
          <textarea
            value={impact}
            onChange={e => setImpact(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="What's the impact?"
          />
        </>
      )}

      {step === 3 && (
        <>
          <label className="block mb-2 font-semibold">Select Tags</label>
          <div className="flex flex-wrap gap-2">
            {["Education", "Health", "Technology", "Environment", "Social"].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 flex justify-between">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Back
          </button>
        )}

        <button
          onClick={handleContinue}
          disabled={
            (step === 1 && !isStep1Valid) ||
            (step === 2 && !isStep2Valid) ||
            (step === 3 && !isStep3Valid) ||
            isLoading
          }
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {step === 3 ? (isLoading ? "Submitting..." : "Submit") : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default Submit;
