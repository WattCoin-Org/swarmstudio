import { useState } from 'react';

export default function CostTracker() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-dark-panel border-t border-dark-border">
      {/* Toggle tab */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-dark-card/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-accent-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-mono font-medium">Cost Tracker</span>
        </div>
        <svg 
          className={`w-4 h-4 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-dark-border">
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-text-secondary font-mono border-b border-dark-border">
                  <th className="pb-2 font-medium">Agent</th>
                  <th className="pb-2 font-medium">Provider</th>
                  <th className="pb-2 font-medium">Model</th>
                  <th className="pb-2 font-medium text-right">Input Tokens</th>
                  <th className="pb-2 font-medium text-right">Output Tokens</th>
                  <th className="pb-2 font-medium text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="6" className="pt-8 text-center text-text-muted">
                    No data yet. Start a conversation to track costs.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
