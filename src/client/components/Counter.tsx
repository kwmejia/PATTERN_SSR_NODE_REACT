import React, { useEffect, useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(()=> {
    onMounted()
  }, [])

  const onMounted = async() => {
    const data = await fetch('/books')
    const resp = await data.json()
    console.log(resp)
  }
  return (
    <div>
      <h2>Contador</h2>
      <p>Valor: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
};