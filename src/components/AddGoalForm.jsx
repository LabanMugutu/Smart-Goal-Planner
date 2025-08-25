import React, { useState } from "react";

// Component for adding a new savings goal
export default function AddGoalForm({ onAdd }) {
  // State variables for form inputs
  const [name, setName] = useState('');          // Goal name
  const [target, setTarget] = useState('');      // Target amount
  const [category, setCategory] = useState('Other'); // Goal category
  const [deadline, setDeadline] = useState('');  // Goal deadline date

  // Function to reset form fields to default values
  function reset() {
    setName('');
    setTarget('');
    setCategory('Other');
    setDeadline('');
  }

  // Handles form submission
  async function submit(e) {
    e.preventDefault(); // Prevent page reload on submit

    // Validate required fields
    if (!name || !target || !deadline) {
      return alert('Please fill name, target and deadline');
    }

    // Create a goal object to send to parent component
    const payload = { 
      name, 
      targetAmount: Number(target) || 0, // Convert target to number
      savedAmount: 0,                     // Start with 0 saved
      category, 
      deadline, 
      createdAt: new Date().toISOString().slice(0, 10) // Current date (YYYY-MM-DD)
    };

    // Call the parent function to add the new goal
    await onAdd(payload);

    // Clear form fields after submission
    reset();
  }

  return (
    <form onSubmit={submit}>
      {/* Name field */}
      <div className="form-field">
        <label className="small">Name</label>
        <input 
          className="input" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
      </div>

      {/* Target amount field */}
      <div className="form-field">
        <label className="small">Target Amount</label>
        <input 
          className="input" 
          type="number" 
          value={target} 
          onChange={e => setTarget(e.target.value)} 
        />
      </div>

      {/* Category dropdown */}
      <div className="form-field">
        <label className="small">Category</label>
        <select 
          className="select" 
          value={category} 
          onChange={e => setCategory(e.target.value)}
        >
          <option>Travel</option>
          <option>Emergency</option>
          <option>Electronics</option>
          <option>Home</option>
          <option>Real Estate</option>
          <option>Education</option>
          <option>Shopping</option>
          <option>Vehicle</option>
          <option>Retirement</option>
          <option>Other</option>
        </select>
      </div>

      {/* Deadline date field */}
      <div className="form-field">
        <label className="small">Deadline</label>
        <input 
          className="input" 
          type="date" 
          value={deadline} 
          onChange={e => setDeadline(e.target.value)} 
        />
      </div>

      {/* Submit button */}
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" type="submit">Add Goal</button>
      </div>
    </form>
  );
}
