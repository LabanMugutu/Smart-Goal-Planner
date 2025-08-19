import React from "react";
import { differenceInDays, parseISO, isValid } from 'date-fns';

export default function Overview({ goals }){
  const totalGoals = Array.isArray(goals) ? goals.length : 0;
  const totalSaved = (goals || []).reduce((s,g)=>s + (Number(g.savedAmount) || 0),0);
  const completed = (goals || []).filter(g => (Number(g.savedAmount) || 0) >= (Number(g.targetAmount) || 0)).length;

  const soon = (goals || []).filter(g => {
    const d = g && g.deadline ? parseISO(g.deadline) : null;
    if(!d || !isValid(d)) return false;
    const days = differenceInDays(d, new Date());
    return days <= 30 && days > 0 && (Number(g.savedAmount) || 0) < (Number(g.targetAmount) || 0);
  }).length;

  const overdue = (goals || []).filter(g => {
    const d = g && g.deadline ? parseISO(g.deadline) : null;
    if(!d || !isValid(d)) return false;
    return differenceInDays(d, new Date()) < 0 && (Number(g.savedAmount) || 0) < (Number(g.targetAmount) || 0);
  }).length;

  return (
    <div>
      <h3 style={{marginTop:0}}>Overview</h3>
      <p>Total goals: <strong>{totalGoals}</strong></p>
      <p>Total saved: <strong>KES {totalSaved.toLocaleString()}</strong></p>
      <p>Completed: <strong>{completed}</strong></p>
      <p>Closing soon (≤30 days & not complete): <strong className="warning">{soon}</strong></p>
      <p>Overdue: <strong className="overdue">{overdue}</strong></p>
    </div>
  );
}
