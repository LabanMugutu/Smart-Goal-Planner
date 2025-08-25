import React, { useState } from "react";
import EditGoalForm from "./EditGoalForm";
import DepositForm from "./DepositForm";
import { differenceInDays, parseISO, isValid } from 'date-fns';

function daysLeft(deadline){
  if(!deadline) return null;
  const d = parseISO(deadline);
  if(!isValid(d)) return null;
  return differenceInDays(d, new Date());
}

export default function GoalCard({ goal, onPatch, onDelete }){
  const [editing, setEditing] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const { id, name, targetAmount = 0, savedAmount = 0, category, deadline } = goal || {};

  const saved = Number(savedAmount) || 0;
  const target = Number(targetAmount) || 0;
  const percent = target > 0 ? Math.min(100, Math.round((saved / target) * 100)) : (saved > 0 ? 100 : 0);
  const days = daysLeft(deadline);
  const isComplete = saved >= target && target > 0;
  let stateLabel = '';
  if(isComplete) stateLabel = 'Completed';
  else if(days !== null && days < 0) stateLabel = 'Overdue';
  else if(days !== null && days <= 30) stateLabel = 'Due Soon';

  async function handleDelete(){
    if(window.confirm('Delete this goal?')) await onDelete(id);
  }

  async function handleEdit(updates){
    await onPatch(id, updates);
    setEditing(false);
  }

  async function handleDeposit(amount){
    const amt = Number(amount) || 0;
    if(amt <= 0) return;
    const newAmount = saved + amt;
    await onPatch(id, { savedAmount: newAmount });
    setDepositing(false);
  }

  const remaining = Math.max(0, target - saved);

  return (
    <div className="goal-card card">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h4 style={{margin:0}}>{name}</h4>
          <div className="small">{category} • Target: KES {Number(target).toLocaleString()}</div>
        </div>
        <div className="small">{isComplete ? <span style={{color:'green'}}>✅</span> : null}</div>
      </div>

      <div className="progress" aria-hidden>
        <div style={{width:`${percent}%`}}></div>
      </div>
      <div className="row small">
        <div>Saved: KES {Number(saved).toLocaleString()}</div>
        <div style={{marginLeft:8}}>Remaining: KES {remaining.toLocaleString()}</div>
        <div style={{marginLeft:'auto'}} className="small">{percent}%</div>
      </div>

      <div className="small">Deadline: {deadline || '—'} {stateLabel ? ' • ' + stateLabel : ''}</div>
      {stateLabel === 'Due Soon' && <div className="warning">⚠️ Deadline within 30 days</div>}
      {stateLabel === 'Overdue' && <div className="overdue">⛔ Overdue and incomplete</div>}

      <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
        <div className="actions">
          <button className="btn secondary" onClick={()=>setDepositing(p=>!p)}>{depositing ? 'Cancel' : 'Deposit'}</button>
          <button className="btn" onClick={()=>setEditing(p=>!p)}>{editing ? 'Close' : 'Edit'}</button>
          <button className="btn danger" onClick={handleDelete}>Delete</button>
        </div>
        <div className="small">{days === null ? 'No deadline' : (days > 0 ? `${days} days left` : 'Past deadline')}</div>
      </div>

      {depositing && <DepositForm onDeposit={handleDeposit} />}
      {editing && <EditGoalForm goal={goal} onSave={handleEdit} />}
    </div>
  );
}
