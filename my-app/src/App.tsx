import React, { useState, useEffect } from 'react';

function App() {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/values')
      .then(response => response.json())
      .then(data => setValues(data));
  }, []);

  return (
    <div className="App">
      <header>
        <h1>initindfdfdfdfitinit</h1>
      </header>
      <main>
        <p>jajajjajaa using dfdfdfdfTypeScript.</p>
        <ul>
          {values.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
