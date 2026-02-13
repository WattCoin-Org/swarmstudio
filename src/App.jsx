import { useState } from 'react';
import AgentPanel from './components/AgentPanel';
import ControlBar from './components/ControlBar';
import ChatWindow from './components/ChatWindow';
import CostTracker from './components/CostTracker';

function createDefaultAgent(id, name, provider, model) {
  return {
    id,
    name,
    provider,
    model,
    customModel: '',
    baseUrl: '',
    apiKey: '',
    systemPrompt: '',
    status: 'idle'
  };
}

export default function App() {
  const [agents, setAgents] = useState([
    createDefaultAgent(1, 'Agent 1', 'openai', 'gpt-4o'),
    createDefaultAgent(2, 'Agent 2', 'anthropic', 'claude-sonnet-4-20250514'),
  ]);

  const [prompt, setPrompt] = useState('');
  const [rounds, setRounds] = useState(3);

  const handleUpdateAgent = (id, updates) => {
    setAgents(agents.map(agent => 
      agent.id === id ? { ...agent, ...updates } : agent
    ));
  };

  const handleAddAgent = () => {
    if (agents.length >= 6) return;
    
    const newId = Math.max(...agents.map(a => a.id)) + 1;
    const newAgent = createDefaultAgent(
      newId, 
      `Agent ${newId}`, 
      'openai', 
      'gpt-4o-mini'
    );
    setAgents([...agents, newAgent]);
  };

  const handleDeleteAgent = (id) => {
    if (agents.length <= 2) return;
    setAgents(agents.filter(agent => agent.id !== id));
  };

  const handleStart = () => {
    // Placeholder for Task C
    console.log('Start conversation:', { prompt, rounds, agents });
    alert('Conversation engine not implemented yet (Task C)');
  };

  // Check if at least 2 agents have API keys
  const agentsWithKeys = agents.filter(a => a.apiKey && a.apiKey.trim()).length;
  const canStart = agentsWithKeys >= 2 && prompt.trim();

  return (
    <div className="h-screen flex flex-col bg-dark-bg">
      <ControlBar
        prompt={prompt}
        rounds={rounds}
        onPromptChange={setPrompt}
        onRoundsChange={setRounds}
        onStart={handleStart}
        canStart={canStart}
      />

      <div className="flex-1 flex overflow-hidden">
        <AgentPanel
          agents={agents}
          onUpdateAgent={handleUpdateAgent}
          onAddAgent={handleAddAgent}
          onDeleteAgent={handleDeleteAgent}
        />

        <ChatWindow />
      </div>

      <CostTracker />
    </div>
  );
}
