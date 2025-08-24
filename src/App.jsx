import React, { useEffect, useState } from "react";
import { getGoals, createGoal, updateGoal, deleteGoal } from "./api";
import Overview from "./components/Overview";
import GoalList from "./components/GoalList";
import AddGoalForm from "./components/AddGoalForm";

export default function App(){
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGoals();
  }, []);

  async function loadGoals(){
    setLoading(true);
    setError(null);
    try{
      const data = await getGoals();
      setGoals(data);
    }catch(err){
      setError(err.message || "Unknown error");
    }finally{
      setLoading(false);
    }
  }

  async function handleAdd(goal){
    try{
      const created = await createGoal(goal);
      setGoals(prev => [...prev, created]);
    }catch(err){
      alert(err.message || "Failed to add goal");
    }
  }

  async function handlePatch(id, updates){
    try{
      const updated = await updateGoal(String(id), updates);
      setGoals(prev => prev.map(g => g.id === String(id) ? updated : g));
    }catch(err){
      alert(err.message || "Failed to update goal");
    }
  }

  async function handleDelete(id){
    try{
      await deleteGoal(String(id));
      setGoals(prev => prev.filter(g => g.id !== String(id)));
    }catch(err){
      alert(err.message || "Failed to delete goal");
    }
  }

  if(loading) return <div className="container">Loading...</div>;
  if(error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <div className="header">
        <div className="app-title">Smart Goal Planner</div>
        <div className="small">{goals.length} goals</div>
      </div>

      <div className="grid">
        <div>
          <div className="card overview">
            <Overview goals={goals} />
          </div>

          <div style={{height:12}} />

          <div className="card">
            <h3 style={{marginTop:0}}>Add New Goal</h3>
            <AddGoalForm onAdd={handleAdd} />
          </div>

        </div>

        <div>
          <div className="card">
            <h3 style={{marginTop:0}}>All Goals</h3>
            <GoalList goals={goals} onPatch={handlePatch} onDelete={handleDelete} />
          </div>
        </div>
      </div>

      <div className="footer">Run json-server with <code>npm run server</code> and React with <code>npm start</code>.</div>
    </div>
  );
}
