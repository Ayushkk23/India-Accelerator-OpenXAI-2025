"use client";

import { motion } from "framer-motion";
import { TrendingUp, FileText, Sparkles, Zap, Target, AlertTriangle, BarChart3, DollarSign, TrendingDown } from "lucide-react";

interface NewsWelcomeProps {
  onSummarizeNews: (newsText: string, companyName: string) => void;
}

export function NewsWelcome({ onSummarizeNews }: NewsWelcomeProps) {
  const exampleNews = [
    {
      title: "Apple Q4 Earnings Beat Expectations",
      company: "Apple Inc. (AAPL)",
      text: "Apple reported Q4 earnings of $1.46 per share, beating analyst estimates of $1.39. Revenue grew 8% year-over-year to $89.5 billion, driven by strong iPhone sales and services growth. The company also announced a new $90 billion share buyback program.",
    },
    {
      title: "Tesla Announces New Gigafactory",
      company: "Tesla Inc. (TSLA)",
      text: "Tesla announced plans to build a new Gigafactory in Mexico, expected to produce 1 million vehicles annually. The $5 billion investment will create 6,000 jobs and focus on producing the next-generation vehicle platform. Production is expected to begin in 2025.",
    },
    {
      title: "Federal Reserve Holds Interest Rates Steady",
      company: "Federal Reserve",
      text: "The Federal Reserve maintained the federal funds rate at 5.25%-5.50% for the third consecutive meeting. Fed Chair Powell indicated that while inflation has moderated, the committee remains cautious about declaring victory. Markets reacted positively to the dovish tone.",
    }
  ];

  const handleExampleClick = (example: typeof exampleNews[0]) => {
    onSummarizeNews(example.text, example.company);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] text-center px-3 sm:px-4">
      {/* Hero Section */}
      <motion.div 
        className="mb-6 sm:mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.4)",
              "0 0 0 10px rgba(34, 197, 94, 0)",
              "0 0 0 0 rgba(34, 197, 94, 0)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
        </motion.div>
        
        <motion.h1 
          className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome to MarketPulse
        </motion.h1>
        <motion.p 
          className="text-base sm:text-xl text-white/70 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          AI-Powered Market Intelligence
        </motion.p>
        <motion.p 
          className="text-white/60 max-w-2xl text-sm sm:text-base mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Transform complex financial news into actionable market insights with AI-powered analysis, 
          real-time sentiment tracking, and predictive market trends.
        </motion.p>
      </motion.div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl w-full">
        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
          </div>
          <h3 className="text-white font-semibold mb-1 sm:mb-2">Market Analysis</h3>
          <p className="text-white/60 text-xs sm:text-sm">
            Extract key market insights and trend analysis from financial news
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
          </div>
          <h3 className="text-white font-semibold mb-1 sm:mb-2">Price Impact</h3>
          <p className="text-white/60 text-xs sm:text-sm">
            Understand how news affects stock prices and market sentiment
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
          </div>
          <h3 className="text-white font-semibold mb-1 sm:mb-2">Risk Assessment</h3>
          <p className="text-white/60 text-xs sm:text-sm">
            Identify market risks and volatility factors for informed decisions
          </p>
        </motion.div>
      </div>

      {/* Example News */}
      <div className="w-full max-w-4xl">
        <motion.h2 
          className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Try with Market Examples
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {exampleNews.map((example, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
              onClick={() => handleExampleClick(example)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-green-400" />
                <span className="text-xs text-white/60">{example.company}</span>
              </div>
              <h3 className="text-white font-medium text-sm mb-1 sm:mb-2">{example.title}</h3>
              <p className="text-white/60 text-xs line-clamp-3">{example.text}</p>
              <motion.div 
                className="flex items-center gap-1 mt-3 text-green-400 text-xs"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Sparkles className="w-3 h-3" />
                <span>Analyze market impact</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <motion.div 
        className="mt-8 sm:mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-white/60 mb-3 sm:mb-4">Or paste your own market news below</p>
        <motion.div 
          className="flex items-center justify-center gap-2 text-white/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-4 h-4" />
          <span className="text-sm">Powered by Llama 3.2 (1B)</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
