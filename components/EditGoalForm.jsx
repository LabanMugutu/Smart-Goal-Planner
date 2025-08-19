import React, { useState } from "react";

export default function EditGoalForm({ goal, onSave }){
  const [name, setName] = useState(goal?.name || '');
  const [target, setTarget] = useState(String(goal?.targetAmount ?? ''));
  const [category, setCategory] = useState(goal?.category || '');
  const [deadline, setDeadline] = useState(goal?.deadline || '');

  async function submit(e){
    e.preventDefault();
    if(!name || !target || !deadline) return alert('Fill required fields');
    await onSave({ name, targetAmount: Number(target) || 0, category, deadline });
  }

  return (
    <form onSubmit={submit} style={{marginTop:8}}>
      <div className="form-field">
        <label className="small">Name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="small">Target Amount</label>
        <input className="input" type="number" value={target} onChange={e=>setTarget(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="small">Category</label>
        <input className="input" value={category} onChange={e=>setCategory(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="small">Deadline</label>
        <input className="input" type="date" value={deadline} onChange={e=>setDeadline(e.target.value)} />
      </div>
      <div style={{display:'flex',gap:8}}>
        <button className="btn" type="submit">Save</button>
      </div>
    </form>
  );
}
