"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Send, FileText, Building2, Sparkles, BarChart3 } from "lucide-react";

interface NewsInputProps {
  onSummarizeNews: (newsText: string, companyName: string) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function NewsInput({ onSummarizeNews, isLoading, placeholder }: NewsInputProps) {
  const [newsText, setNewsText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newsText]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsText.trim() || isLoading) return;
    
    onSummarizeNews(newsText, companyName);
    setNewsText("");
    setCompanyName("");
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText.length > 100) {
      setIsExpanded(true);
    }
  };

  return (
    <motion.div 
      className="border-t border-white/10 bg-white/5 backdrop-blur-sm p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {/* Company Name Input */}
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 text-white/60">
              <Building2 className="w-4 h-4" />
              <span className="text-sm">Company:</span>
            </div>
            <motion.input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g., Apple Inc. (AAPL) - Optional"
              className="w-full sm:flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all duration-200"
              whileFocus={{ scale: 1.02 }}
            />
          </motion.div>

          {/* News Text Input */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="flex items-center gap-2 text-white/60 mt-2">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div className="flex-1 relative">
                <motion.textarea
                  ref={textareaRef}
                  value={newsText}
                  onChange={(e) => setNewsText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  placeholder={placeholder || "Paste market news article here..."}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 resize-none focus:outline-none focus:ring-2 focus:ring-green-500/50 min-h-[60px] max-h-[300px] transition-all duration-200"
                  rows={isExpanded ? 6 : 3}
                  whileFocus={{ scale: 1.01 }}
                />
                
                {/* Character count */}
                <motion.div 
                  className="absolute bottom-2 right-2 text-xs text-white/40"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {newsText.length} chars
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div 
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Sparkles className="w-3 h-3" />
              <span>Press Cmd/Ctrl + Enter to analyze</span>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                type="submit"
                disabled={!newsText.trim() || isLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Analyzing Market...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Analyze Market Data
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </form>
    </motion.div>
  );
}
