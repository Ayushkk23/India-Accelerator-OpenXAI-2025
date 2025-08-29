"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NewsInput } from "./news-input";
import { NewsSummary } from "./news-summary";
import { NewsHeader } from "./news-header";
import { NewsWelcome } from "./news-welcome";
import { 
  Trash2, 
  Download, 
  Share2, 
  Sparkles, 
  Zap, 
  TrendingUp, 
  Bot,
  FileText,
  Copy,
  Check
} from "lucide-react";

interface Summary {
  id: string;
  newsText: string;
  companyName: string;
  summary: string;
  timestamp: Date;
}

export function NewsSummarizer() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const summariesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new summaries arrive
  useEffect(() => {
    summariesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [summaries]);

  // Check online status
  useEffect(() => {
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
    checkOnlineStatus();

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  const summarizeNews = async (newsText: string, companyName: string) => {
    if (!newsText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/summarize-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          newsText: newsText.trim(),
          companyName: companyName.trim()
        }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        const serverMsg = typeof data?.error === 'string' ? `: ${data.error}` : '';
        throw new Error(`HTTP error ${response.status}${serverMsg}`);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      const newSummary: Summary = {
        id: Date.now().toString(),
        newsText: newsText.trim(),
        companyName: companyName.trim(),
        summary: data.summary,
        timestamp: new Date(),
      };

      setSummaries(prev => [...prev, newSummary]);
    } catch (err) {
      console.error("Error summarizing news:", err);
      setError(err instanceof Error ? err.message : "Failed to summarize news");
    } finally {
      setIsLoading(false);
    }
  };

  const clearSummaries = () => {
    setSummaries([]);
    setError(null);
  };

  const exportSummaries = () => {
    const summariesText = summaries
      .map(summary => 
        `Company: ${summary.companyName || 'N/A'}\n` +
        `Date: ${summary.timestamp.toLocaleString()}\n` +
        `News Text:\n${summary.newsText}\n\n` +
        `Summary:\n${summary.summary}\n` +
        '─'.repeat(50) + '\n'
      )
      .join('\n');
    
    const blob = new Blob([summariesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketpulse-summaries-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareSummaries = async () => {
    if (navigator.share) {
      const summariesText = summaries
        .map(summary => 
          `${summary.companyName || 'N/A'}: ${summary.summary.substring(0, 200)}...`
        )
        .join('\n\n');
      
      try {
        await navigator.share({
          title: 'MarketPulse News Summaries',
          text: summariesText,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      const summariesText = summaries
        .map(summary => 
          `${summary.companyName || 'N/A'}: ${summary.summary}`
        )
        .join('\n\n');
      
      try {
        await navigator.clipboard.writeText(summariesText);
        alert('Summaries copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
      }
    }
  };

  const copySummary = async (summary: Summary) => {
    try {
      await navigator.clipboard.writeText(summary.summary);
      setCopiedId(summary.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy summary:', err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-green-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Stock chart lines */}
        <div className="absolute top-20 left-10 w-32 h-16 opacity-10">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path d="M0,40 L20,30 L40,35 L60,20 L80,25 L100,15" stroke="currentColor" strokeWidth="1" fill="none" className="text-green-400"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-24 h-12 opacity-10">
          <svg viewBox="0 0 100 50" className="w-full h-full">
            <path d="M0,30 L25,20 L50,25 L75,15 L100,10" stroke="currentColor" strokeWidth="1" fill="none" className="text-emerald-400"/>
          </svg>
        </div>
        
        {/* Floating elements */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-1/4 w-2 h-2 bg-green-400 rounded-full opacity-60"
        />
        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-50"
        />
        <motion.div 
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-60 right-1/4 w-1 h-1 bg-green-300 rounded-full opacity-40"
        />
      </div>

      {/* Header */}
      <NewsHeader
        modelName="Llama 3.2 (1B)"
        isOnline={isOnline}
        onClearSummaries={clearSummaries}
        onSettings={() => console.log('Settings clicked')}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {summaries.length === 0 ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <NewsWelcome onSummarizeNews={summarizeNews} />
              </motion.div>
            ) : (
              <motion.div
                key="summaries"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {summaries.map((summary, index) => (
                  <motion.div
                    key={summary.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <NewsSummary
                      summary={summary}
                      onCopy={() => copySummary(summary)}
                      isCopied={copiedId === summary.id}
                    />
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center"
                  >
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-4 text-white/80 border border-white/20 shadow-lg">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full"
                        />
                        <span>Analyzing market data...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Error message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-center"
                  >
                    <div className="bg-red-500/20 backdrop-blur-sm rounded-lg px-4 py-3 text-red-400 text-sm border border-red-500/20 shadow-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        {error}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Scroll anchor */}
          <div ref={summariesEndRef} />
        </div>
      </div>

      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="border-t border-white/10 bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/90 backdrop-blur-sm"
      >
        <NewsInput
          onSummarizeNews={summarizeNews}
          isLoading={isLoading}
          placeholder={isOnline ? "Paste financial news article here..." : "You're offline. Check your connection."}
        />
      </motion.div>
    </div>
  );
}
