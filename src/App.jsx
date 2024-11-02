import { calculateInvestmentResults, formatter } from './util/investment.js';
import React, { useState } from 'react';

function Header() {
  return (
    <header id="header">
      <img src="investment-calculator-logo.png" alt="React Logo" />
      <h1>React Investment Calculator</h1>
    </header>
  );
}

function InvestmentForm({ inputValues, setInputValues }) {
  function handleInputChange(e, input) {
    console.log(e.target.value, input);
    setInputValues((prevValues) => ({
      ...prevValues,
      [input]: Number(e.target.value),
    }));
  }

  return (
    <main>
      <div id="user-input">
        <div className="input-group">
          <div>
            <label>Initial Investment</label>
            <input
              type="number"
              placeholder="Initial Investment"
              onChange={(e) => handleInputChange(e, 'input1')}
            />
          </div>
          <div>
            <label>Annual Investment</label>
            <input
              type="number"
              placeholder="Annual Investment"
              onChange={(e) => handleInputChange(e, 'input2')}
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label>Expected Return</label>
            <input
              type="number"
              placeholder="Expected return"
              onChange={(e) => handleInputChange(e, 'input3')}
            />
          </div>
          <div>
            <label>duration</label>
            <input
              type="number"
              placeholder="Duration"
              onChange={(e) => handleInputChange(e, 'input4')}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function TableFullBody({ tableListValue }) {
  let totalInvestment = 0;
  return (
    <div>
      <table id="result">
        <thead>
          <tr>
            <th>Year</th>
            <th>Investmen Value</th>
            <th> Interest(Year) </th>
            <th>Annual Investment</th>
          </tr>
        </thead>
        <tbody>
          {tableListValue.map((item) => {
            totalInvestment = totalInvestment + item.interest;
            return (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{formatter.format(item.valueEndOfYear)}</td>
                <td>{formatter.format(item.interest)}</td>
                <td>{formatter.format(totalInvestment)}</td>
                <td>
                  {formatter.format(item.valueEndOfYear - totalInvestment)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
  });

  const result = calculateInvestmentResults({
    initialInvestment: inputValues.input1 || 0,
    annualInvestment: inputValues.input2 || 0,
    expectedReturn: inputValues.input3 || 0,
    duration: inputValues.input4 || 0,
  });

  return (
    <>
      <Header />;
      <InvestmentForm
        inputValues={inputValues}
        setInputValues={setInputValues}
      />
      <TableFullBody tableListValue={result} />
    </>
  );
}

export default App;
