const API_URL = import.meta.env.VITE_API_URL || "https://wattcoin-production-81a7.up.railway.app";

export async function testKey(provider, apiKey, baseUrl = "") {
  const res = await fetch(`${API_URL}/api/v1/swarmstudio/test-key`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, api_key: apiKey, base_url: baseUrl })
  });
  return res.json();
}

export async function fetchModels(provider, apiKey, baseUrl = "") {
  const res = await fetch(`${API_URL}/api/v1/swarmstudio/models`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, api_key: apiKey, base_url: baseUrl })
  });
  return res.json();
}

// streamChat will be implemented in Task C
export async function* streamChat(provider, model, apiKey, baseUrl, messages, maxTokens = 4096) {
  // Placeholder — Task C implements this
  yield { type: "error", message: "Not implemented yet" };
}
