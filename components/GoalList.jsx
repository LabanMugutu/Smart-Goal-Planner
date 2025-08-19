import React from "react";
import GoalCard from "./GoalCard";

export default function GoalList({ goals = [], onPatch, onDelete }){
  return (
    <div className="goal-list">
      {goals.map(g => (
        <GoalCard key={g.id} goal={g} onPatch={onPatch} onDelete={onDelete} />
      ))}
    </div>
  );
}
