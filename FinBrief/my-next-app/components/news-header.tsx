"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { TrendingUp, Settings, Trash2, Wifi, WifiOff, BarChart3 } from "lucide-react";

interface NewsHeaderProps {
  modelName: string;
  isOnline: boolean;
  onClearSummaries: () => void;
  onSettings: () => void;
}

export function NewsHeader({ 
  modelName, 
  isOnline, 
  onClearSummaries, 
  onSettings 
}: NewsHeaderProps) {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-slate-800 via-emerald-900 to-green-800 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">MarketPulse</h1>
            <p className="text-xs text-white/60">AI Market Intelligence</p>
          </div>
        </motion.div>
      </div>

      <div className="flex items-center gap-3">
        {/* Online status indicator */}
        <motion.div 
          className="flex items-center gap-2 text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isOnline ? (
            <div className="flex items-center gap-1 text-green-400">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Wifi className="w-3 h-3" />
              </motion.div>
              <span>Live</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-red-400">
              <WifiOff className="w-3 h-3" />
              <span>Offline</span>
            </div>
          )}
        </motion.div>

        {/* Model info */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-white/60">
          <span>AI:</span>
          <motion.span 
            className="font-mono bg-white/10 px-2 py-1 rounded border border-white/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {modelName}
          </motion.span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSettings}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSummaries}
              className="text-red-300 hover:text-red-200 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
