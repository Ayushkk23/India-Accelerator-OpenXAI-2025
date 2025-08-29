"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { 
  Copy, 
  Check, 
  Building2, 
  Clock, 
  TrendingUp, 
  Target, 
  DollarSign, 
  AlertTriangle,
  Lightbulb,
  BarChart3
} from "lucide-react";

interface Summary {
  id: string;
  newsText: string;
  companyName: string;
  summary: string;
  timestamp: Date;
}

interface NewsSummaryProps {
  summary: Summary;
  onCopy: () => void;
  isCopied: boolean;
}

export function NewsSummary({ summary, onCopy, isCopied }: NewsSummaryProps) {
  const formatTimestamp = (date: Date) => {
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderSummaryContent = (content: string) => {
    // Split content into sections based on markdown headers
    const sections = content.split(/(?=^\*\*[^*]+\*\*:)/m);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      const lines = section.split('\n').filter(line => line.trim());
      const header = lines[0];
      const content = lines.slice(1).join('\n');
      
      // Extract icon and title from header
      let icon = <Target className="w-4 h-4" />;
      let title = "Summary";
      let color = "text-green-400";
      
      if (header.includes('Key Points')) {
        icon = <Target className="w-4 h-4" />;
        title = "Key Points";
        color = "text-blue-400";
      } else if (header.includes('Market Impact')) {
        icon = <TrendingUp className="w-4 h-4" />;
        title = "Market Impact";
        color = "text-green-400";
      } else if (header.includes('Actionable Insights')) {
        icon = <Lightbulb className="w-4 h-4" />;
        title = "Actionable Insights";
        color = "text-yellow-400";
      } else if (header.includes('Risk Factors')) {
        icon = <AlertTriangle className="w-4 h-4" />;
        title = "Risk Factors";
        color = "text-red-400";
      }
      
      return (
        <motion.div 
          key={index} 
          className="mb-4 sm:mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-3">
            <motion.div 
              className="p-1.5 bg-white/10 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {icon}
            </motion.div>
            <h3 className={`font-semibold text-sm ${color}`}>{title}</h3>
          </div>
          
          {/* Section Content */}
          <div className="ml-8">
            {content.split('\n').map((line, lineIndex) => {
              const trimmed = line.trim();
              
              // Handle bullet points (both - and *)
              const bulletMatch = trimmed.match(/^[-*]\s?(.*)$/);
              if (bulletMatch) {
                const bulletText = bulletMatch[1] || trimmed.replace(/^[-*]\s?/, '');
                return (
                  <motion.div 
                    key={lineIndex} 
                    className="flex items-start gap-3 mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index * 0.1) + (lineIndex * 0.05) }}
                  >
                    <span className={`${color} mt-1.5 text-sm`}>•</span>
                    <span className="text-white/90 text-sm leading-relaxed">{bulletText}</span>
                  </motion.div>
                );
              }
              
              // Handle regular text
              if (trimmed) {
                return (
                  <motion.p 
                    key={lineIndex} 
                    className="text-white/80 text-sm leading-relaxed mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index * 0.1) + (lineIndex * 0.05) }}
                  >
                    {line}
                  </motion.p>
                );
              }
              
              return null;
            })}
          </div>
        </motion.div>
      );
    });
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 overflow-hidden shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-green-400" />
              <span className="text-white/60 text-sm truncate">
                {summary.companyName || 'Company not specified'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Clock className="w-3 h-3" />
              <span>{formatTimestamp(summary.timestamp)}</span>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCopy}
              className="flex-shrink-0 text-white/60 hover:text-white hover:bg-white/10"
            >
              {isCopied ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-4 h-4 text-green-400" />
                </motion.div>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Original News Text */}
      <div className="p-4 border-b border-white/10 bg-white/5">
        <h4 className="text-white font-medium text-sm mb-3">Original News:</h4>
        <div className="text-white/70 text-sm leading-relaxed max-h-32 overflow-y-auto">
          {summary.newsText.length > 300 
            ? `${summary.newsText.substring(0, 300)}...` 
            : summary.newsText
          }
        </div>
      </div>

      {/* AI Summary */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BarChart3 className="w-4 h-4 text-white" />
          </motion.div>
          <h4 className="text-white font-semibold">Market Analysis</h4>
        </div>
        
        <div className="space-y-4">
          {renderSummaryContent(summary.summary)}
        </div>
      </div>
    </motion.div>
  );
}
