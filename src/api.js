 const BASE = "/goals";
 // Use relative path (proxy handles localhost:3000)

function normalizeGoal(g) {
  if (!g) return g;
  return {
    ...g,
    id: String(g.id),
    targetAmount: Number(g.targetAmount) || 0,
    savedAmount: Number(g.savedAmount) || 0,
  };
}

export async function getGoals() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch goals");
  const data = await res.json();
  return Array.isArray(data) ? data.map(normalizeGoal) : [];
}

export async function createGoal(goal) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal),
  });
  if (!res.ok) throw new Error("Failed to create goal");
  const created = await res.json();
  return normalizeGoal(created);
}

export async function updateGoal(id, updates) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update goal");
  const updated = await res.json();
  return normalizeGoal(updated);
}

export async function deleteGoal(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete goal");
  return true;
}
