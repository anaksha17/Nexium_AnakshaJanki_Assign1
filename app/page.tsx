"use client";
import { useState } from "react";
import QuoteForm from "./QuoteForm";

interface Quote {
  topic: string;
  quote: string;
}

const topicThemes = {
  motivation: {
    gradient: "from-orange-300 via-red-300 to-pink-300",
    bgGradient: "from-orange-200/30 via-red-200/30 to-pink-200/30",
    borderColor: "border-orange-400/60 hover:border-red-500/80",
    icon: "⚡",
    animation: "animate-bounce",
    cardBg: "bg-gradient-to-br from-orange-200/20 to-red-200/20"
  },
  life: {
    gradient: "from-green-300 via-emerald-300 to-teal-300",
    bgGradient: "from-green-200/30 via-emerald-200/30 to-teal-200/30",
    borderColor: "border-green-400/60 hover:border-emerald-500/80",
    icon: "🌱",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-green-200/20 to-emerald-200/20"
  },
  success: {
    gradient: "from-yellow-300 via-orange-300 to-red-300",
    bgGradient: "from-yellow-200/30 via-orange-200/30 to-red-200/30",
    borderColor: "border-yellow-400/60 hover:border-orange-500/80",
    icon: "🏆",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-yellow-200/20 to-orange-200/20"
  },
  love: {
    gradient: "from-pink-300 via-rose-300 to-red-300",
    bgGradient: "from-pink-200/30 via-rose-200/30 to-red-200/30",
    borderColor: "border-pink-400/60 hover:border-rose-500/80",
    icon: "💖",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-pink-200/20 to-rose-200/20"
  },
  wisdom: {
    gradient: "from-indigo-300 via-purple-300 to-blue-300",
    bgGradient: "from-indigo-200/30 via-purple-200/30 to-blue-200/30",
    borderColor: "border-indigo-400/60 hover:border-purple-500/80",
    icon: "🦉",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-indigo-200/20 to-purple-200/20"
  },
  happiness: {
    gradient: "from-yellow-300 via-lime-300 to-green-300",
    bgGradient: "from-yellow-200/30 via-lime-200/30 to-green-200/30",
    borderColor: "border-yellow-400/60 hover:border-lime-500/80",
    icon: "😊",
    animation: "animate-bounce",
    cardBg: "bg-gradient-to-br from-yellow-200/20 to-lime-200/20"
  },
  courage: {
    gradient: "from-red-300 via-orange-300 to-yellow-300",
    bgGradient: "from-red-200/30 via-orange-200/30 to-yellow-200/30",
    borderColor: "border-red-400/60 hover:border-orange-500/80",
    icon: "🦁",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-red-200/20 to-orange-200/20"
  },
  technology: {
    gradient: "from-blue-300 via-cyan-300 to-teal-300",
    bgGradient: "from-blue-200/30 via-cyan-200/30 to-teal-200/30",
    borderColor: "border-blue-400/60 hover:border-cyan-500/80",
    icon: "💻",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-blue-200/20 to-cyan-200/20"
  },
  education: {
    gradient: "from-purple-300 via-indigo-300 to-blue-300",
    bgGradient: "from-purple-200/30 via-indigo-200/30 to-blue-200/30",
    borderColor: "border-purple-400/60 hover:border-indigo-500/80",
    icon: "📚",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-purple-200/20 to-indigo-200/20"
  },
  hope: {
    gradient: "from-sky-300 via-blue-300 to-indigo-300",
    bgGradient: "from-sky-200/30 via-blue-200/30 to-indigo-200/30",
    borderColor: "border-sky-400/60 hover:border-blue-500/80",
    icon: "🌟",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-sky-200/20 to-blue-200/20"
  },
  friendship: {
    gradient: "from-teal-300 via-green-300 to-emerald-300",
    bgGradient: "from-teal-200/30 via-green-200/30 to-emerald-200/30",
    borderColor: "border-teal-400/60 hover:border-green-500/80",
    icon: "🤝",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-teal-200/20 to-green-200/20"
  },
  health: {
    gradient: "from-green-300 via-lime-300 to-yellow-300",
    bgGradient: "from-green-200/30 via-lime-200/30 to-yellow-200/30",
    borderColor: "border-green-400/60 hover:border-lime-500/80",
    icon: "🏃",
    animation: "animate-bounce",
    cardBg: "bg-gradient-to-br from-green-200/20 to-lime-200/20"
  },
  creativity: {
    gradient: "from-purple-300 via-pink-300 to-rose-300",
    bgGradient: "from-purple-200/30 via-pink-200/30 to-rose-200/30",
    borderColor: "border-purple-400/60 hover:border-pink-500/80",
    icon: "🎨",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-purple-200/20 to-pink-200/20"
  },
  default: {
    gradient: "from-gray-400 via-gray-500 to-gray-400",
    bgGradient: "from-gray-300/40 via-gray-400/40 to-gray-300/40",
    borderColor: "border-gray-500/60 hover:border-gray-600/80",
    icon: "💭",
    animation: "animate-pulse",
    cardBg: "bg-gradient-to-br from-gray-300/20 to-gray-400/20"
  }
};

export default function Home() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [isRandomMode, setIsRandomMode] = useState(false);

  const getCurrentTheme = () => {
    if (isRandomMode) return topicThemes.default;
    return topicThemes[currentTopic as keyof typeof topicThemes] || topicThemes.default;
  };

  const theme = getCurrentTheme();

  return (
    <div className={`min-h-screen bg-gradient-to-br from-orange-200 via-orange-300 to-gray-300 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-40">
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.bgGradient}`}></div>
      </div>
      <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${theme.bgGradient} opacity-60`}></div>
      
      <div className={`absolute top-20 left-10 text-gray-600/60 text-6xl ${theme.animation} select-none`}>
        {theme.icon}
      </div>
      <div className={`absolute top-40 right-20 text-gray-600/60 text-6xl ${theme.animation} select-none`} style={{animationDelay: '1000ms'}}>
        {theme.icon}
      </div>
      <div className={`absolute bottom-32 left-20 text-gray-600/60 text-6xl ${theme.animation} select-none`} style={{animationDelay: '500ms'}}>
        {theme.icon}
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-block p-1 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mb-6">
            <div className="bg-gray-700 rounded-full px-6 py-2">
              <span className="text-gray-200 text-sm font-medium tracking-wider">Quoracle</span>
            </div>
          </div>
          
          <h1 className={`text-6xl md:text-7xl font-bold bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent mb-6 animate-fade-in`}>
            Quote Generator
          </h1>
          
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Discover powerful quotes that inspire, motivate, and illuminate your path forward. 
            Enter any topic and let wisdom find you.
          </p>
        </div>
        
        <QuoteForm 
          onQuotesUpdate={setQuotes} 
          onTopicChange={setCurrentTopic}
          onRandomModeChange={setIsRandomMode}
        />
        
        <div id="quoteDisplay" className="mt-16">
          {quotes.length > 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
                  {isRandomMode ? "Random Inspiration" : `Your ${currentTopic} Quotes`}
                </h2>
                <div className={`w-24 h-1 bg-gradient-to-r ${theme.gradient} mx-auto rounded-full`}></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {quotes.map((quote: Quote, index: number) => {
                  const [text, author] = quote.quote.split(" - ");
                  const displayAuthor = author ? author.trim() : "Unknown";
                  const quoteTheme = topicThemes[quote.topic as keyof typeof topicThemes] || topicThemes.default;

                  return (
                    <div
                      key={index}
                      className={`group relative ${quoteTheme.cardBg} backdrop-blur-lg p-8 rounded-2xl border-2 ${quoteTheme.borderColor} transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-gray-500/40 animate-fade-in`}
                      style={{
                        animationDelay: `${index * 150}ms`
                      }}
                    >
                      <div className={`absolute top-4 left-4 text-4xl ${quoteTheme.animation}`}>
                        {quoteTheme.icon}
                      </div>
                      <div className="absolute top-4 right-4 text-gray-600/60 text-4xl font-serif leading-none">
                        &quot;
                      </div>
                      <div className="relative z-10 mt-12">
                        <blockquote className="text-lg text-gray-800 leading-relaxed font-medium mb-6 italic">
                          &quot;{text}&quot;
                        </blockquote>
                        <div className="flex items-center justify-between">
                          <cite className="text-gray-700 font-semibold text-sm uppercase tracking-wider">
                            — {displayAuthor}
                          </cite>
                          <div className={`w-8 h-8 bg-gradient-to-r ${quoteTheme.gradient} rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </div>
                        </div>
                        <div className={`mt-4 inline-block px-3 py-1 bg-gradient-to-r ${quoteTheme.gradient} rounded-full text-xs font-semibold text-white uppercase tracking-wider`}>
                          {quote.topic}
                        </div>
                      </div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${quoteTheme.gradient} opacity-10 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`}></div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-block p-4 bg-gray-200/70 backdrop-blur-lg rounded-full mb-6">
                <svg className="w-12 h-12 text-gray-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-xl text-gray-700 mb-4">
                Ready to discover wisdom?
              </p>
              <p className="text-gray-600">
                Enter a topic above to generate inspiring quotes tailored just for you.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <footer className="relative z-10 text-center py-8 border-t border-gray-500">
        <p className="text-gray-600 text-sm">
          Crafted with ❤️ for seekers of wisdom and inspiration
        </p>
      </footer>
    </div>
  );
}