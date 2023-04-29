import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface RealEstateCalculator {
  income: number;
  loan: number;
  equity: number;
}

function App() {

  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/values')
      .then(response => response.json())
      .then(data => setValues(data));
  }, [])
  
  const [inputs, setInputs] = useState<RealEstateCalculator>({
    income: 0,
    loan: 0,
    equity: 0,
  });

  const [cashFlow,setCashFlow] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setInputs({ ...inputs, [name]: parseFloat(value)});
  }

  const handleCalculateClick = async () => {
    try {
      const response = await axios.post<number>('/api/calculator', inputs);
      setCashFlow(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Real Estate Calculator</h1>
      </header>
      <main>
        <form>

          <div>
            <label>Income: </label>
            <input type="number" name="income" value={inputs.income} onChange={handleInputChange} />
          </div>

          <div>
            <label>Loan: </label>
            <input type="number" name="loan" value={inputs.loan} onChange={handleInputChange} />
          </div>

          <div>
            <label>Equity: </label>
            <input type="number" name="equity" value={inputs.equity} onChange={handleInputChange} />
          </div>

          <p>Test</p>
          <ul>
            {values.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </form>
        
      </main>
    </div>
  );
}

export default App;
