"use client";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
interface Quote {
  topic: string;
  quote: string;
}
interface QuoteFormProps {
  onQuotesUpdate: Dispatch<SetStateAction<any[]>>;
  onTopicChange: Dispatch<SetStateAction<string>>;
  onRandomModeChange: Dispatch<SetStateAction<boolean>>;
}

export default function QuoteForm({ onQuotesUpdate, onTopicChange, onRandomModeChange }: QuoteFormProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    onRandomModeChange(false);
    onTopicChange(topic.toLowerCase().trim());
    
    try {
      const response = await fetch("/quotes.json");
      console.log("Response Status:", response.status);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const dataFromJson = await response.json();
      console.log("Raw Data:", dataFromJson);
      const filteredQuotes = dataFromJson
        .filter((quote: Quote) => quote.topic.toLowerCase().trim() === topic.toLowerCase().trim())
        .slice(0, 3);
      if (filteredQuotes.length === 0) {
        const randomQuotes = dataFromJson.filter((q: Quote) => q.quote.trim()).slice(0, 3);
        setQuotes(randomQuotes);
        onQuotesUpdate(randomQuotes);
      } else {
        setQuotes(filteredQuotes);
        onQuotesUpdate(filteredQuotes);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setQuotes([]);
      onQuotesUpdate([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomQuotes = async () => {
    setIsLoading(true);
    onRandomModeChange(true);
    onTopicChange("");
    setTopic("");
    
    try {
      const response = await fetch("/quotes.json");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const dataFromJson = await response.json();
      
      // Get random quotes from different topics
      const shuffledQuotes = dataFromJson.sort(() => 0.5 - Math.random());
      const randomQuotes = shuffledQuotes.slice(0, 3);
      
      setQuotes(randomQuotes);
      onQuotesUpdate(randomQuotes);
    } catch (error) {
      console.error("Fetch Error:", error);
      setQuotes([]);
      onQuotesUpdate([]);
    } finally {
      setIsLoading(false);
    }
  };

  const popularTopics = ["motivation", "life", "success", "love", "wisdom", "happiness", "courage", "technology", "education", "hope", "friendship", "health", "creativity"];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-6">
        {/* Main input section */}
        <div className="relative">
          <div className="bg-gray-200 backdrop-blur-lg rounded-2xl p-8 border-2 border-gray-400 shadow-lg">
            <label htmlFor="topic" className="block text-lg font-semibold text-gray-700 mb-4">
              What inspires you today?
            </label>
            
            <div className="relative">
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-6 py-4 bg-gray-100 backdrop-blur-sm border-2 border-gray-400 rounded-xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-lg"
                placeholder="Enter a topic (e.g., motivation, life, success...)"
                disabled={isLoading}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Popular topics */}
        <div className="text-center">
          <p className="text-gray-700 text-sm mb-4">Popular topics:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularTopics.map((popularTopic) => (
              <button
                key={popularTopic}
                type="button"
                onClick={() => setTopic(popularTopic)}
                className="px-4 py-2 bg-gray-200 backdrop-blur-sm text-gray-700 rounded-full text-sm hover:bg-blue-200 hover:text-blue-800 transition-all duration-300 border-2 border-gray-400 hover:border-blue-400"
                disabled={isLoading}
              >
                {popularTopic}
              </button>
            ))}
          </div>
        </div>

        {/* Submit button and Random button */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || !topic.trim()}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-300/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate Quotes
              </>
            )}
          </button>

          {/* Random Quote Button */}
          <button
            type="button"
            onClick={handleRandomQuotes}
            disabled={isLoading}
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-300/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-pulse"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Surprising...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Surprise Me!
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}