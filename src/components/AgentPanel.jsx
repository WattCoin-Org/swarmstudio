import { useState } from 'react';
import AgentCard from './AgentCard';
import { getAgentColor, REFEREE_COLOR } from '../utils/colors';
import { PROVIDERS } from '../config/providers';
import ProviderSelect from './ProviderSelect';
import StatusBadge from './StatusBadge';

function RefereeCard({ referee, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const provider = PROVIDERS[referee.provider];
  const hasKey = !!(referee.apiKey && referee.apiKey.trim());

  return (
    <div className={`bg-dark-card border rounded-lg overflow-hidden transition-colors ${hasKey ? 'border-yellow-600/50' : 'border-dark-border'}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: REFEREE_COLOR }} />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">{referee.name || 'Referee'}</div>
            <div className="text-xs text-text-secondary">{hasKey ? (provider?.name || referee.provider) : 'Optional — configure to enable Resolve'}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {hasKey && <span className="text-xs text-yellow-500 font-mono">Ready</span>}
          <svg
            className={`w-4 h-4 text-text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-dark-border">
          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5 mt-4">Name</label>
            <input
              type="text"
              value={referee.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-sm focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <ProviderSelect
            provider={referee.provider}
            model={referee.model}
            customModel={referee.customModel}
            baseUrl={referee.baseUrl}
            apiKey={referee.apiKey}
            onChange={(updates) => onUpdate(updates)}
          />

          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5">API Key</label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={referee.apiKey || ''}
                onChange={(e) => onUpdate({ apiKey: e.target.value })}
                placeholder={provider?.placeholder || 'your-api-key'}
                autoComplete="off"
                data-1p-ignore
                data-lpignore="true"
                className="w-full px-3 py-2 pr-20 bg-dark-bg border border-dark-border rounded-lg text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-text-muted"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-text-secondary hover:text-text-primary"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-text-secondary mb-1.5">
              System Prompt <span className="text-text-muted">(optional — has smart default)</span>
            </label>
            <textarea
              value={referee.systemPrompt || ''}
              onChange={(e) => onUpdate({ systemPrompt: e.target.value })}
              placeholder="You are the Referee — an impartial judge resolving a multi-agent AI debate..."
              rows={3}
              className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-text-muted resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AgentPanel({ agents, onUpdateAgent, onAddAgent, onDeleteAgent, referee, onUpdateReferee }) {
  const canAddMore = agents.length < 6;
  const canDelete = agents.length > 2;

  return (
    <div className="w-80 h-full bg-dark-panel border-r border-dark-border flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-dark-border">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono font-semibold">Agents</h2>
          <span className="px-2 py-0.5 bg-dark-card rounded text-xs text-text-secondary">
            {agents.length}
          </span>
        </div>
      </div>

      {/* Agent list */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {agents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            color={getAgentColor(index)}
            onUpdate={(updates) => onUpdateAgent(agent.id, updates)}
            onDelete={() => onDeleteAgent(agent.id)}
            canDelete={canDelete}
          />
        ))}

        {/* Referee section */}
        <div className="pt-3 border-t border-dark-border">
          <div className="text-xs font-mono text-text-muted mb-2 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            REFEREE (optional)
          </div>
          <RefereeCard referee={referee} onUpdate={onUpdateReferee} />
        </div>
      </div>

      {/* Add button */}
      <div className="p-4 border-t border-dark-border">
        <button
          onClick={onAddAgent}
          disabled={!canAddMore}
          className="w-full px-4 py-3 gradient-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Agent
          {!canAddMore && <span className="text-xs opacity-75">(Max 6)</span>}
        </button>
      </div>
    </div>
  );
}
