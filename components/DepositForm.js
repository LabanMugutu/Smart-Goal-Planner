import React, { useState } from "react";

export default function DepositForm({ onDeposit }){
  const [amount, setAmount] = useState('');
  async function submit(e){
    e.preventDefault();
    const num = Number(amount);
    if(!amount || isNaN(num) || num <= 0) return alert('Enter a positive amount');
    await onDeposit(num);
    setAmount('');
  }
  return (
    <form onSubmit={submit} style={{marginTop:8, display:'flex', gap:8}}>
      <input className="input" type="number" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
      <button className="btn" type="submit">Add</button>
    </form>
  );
}
