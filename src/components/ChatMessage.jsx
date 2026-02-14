import { getAgentColor, REFEREE_COLOR } from '../utils/colors';

export default function ChatMessage({ message, agentIndex, isStreaming }) {
  const isReferee = message.isReferee;
  const agentColor = isReferee ? REFEREE_COLOR : getAgentColor(agentIndex);

  return (
    <div className={`flex gap-3 px-4 py-3 transition-colors ${isReferee ? 'bg-yellow-900/10 border-t border-b border-yellow-800/30' : 'hover:bg-dark-panel/50'}`}>
      {/* Agent color dot */}
      <div 
        className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${isReferee ? 'ring-2 ring-yellow-500/40' : ''}`}
        style={{ backgroundColor: agentColor }}
      />

      {/* Message content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className={`text-sm font-medium ${isReferee ? 'text-yellow-400' : 'text-text-primary'}`}>
            {isReferee ? `⚖️ ${message.agentName}` : message.agentName}
          </span>
          <span className="text-xs text-text-muted font-mono">
            {isReferee ? 'Resolution' : `Round ${message.round}`}
          </span>
        </div>
        
        <div className={`text-sm leading-relaxed ${message.error ? 'text-red-400 italic' : isReferee ? 'text-yellow-100/80' : 'text-text-secondary'}`}>
          {message.content}
          {isStreaming && (
            <span className={`inline-block w-2 h-4 ml-1 animate-pulse ${isReferee ? 'bg-yellow-400' : 'bg-accent-amber'}`} />
          )}
        </div>
      </div>
    </div>
  );
}
