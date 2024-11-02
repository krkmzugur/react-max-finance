import { calculateInvestmentResults, formatter } from './util/investment.js';
import React, { useState } from 'react';
import Header from './components/Header.jsx';

function InvestmentForm({ inputValues, setInputValues }) {
  function handleInputChange(e, input) {
    setInputValues((inputValues) => {
      return {
        ...inputValues,
        [input]: Number(e.target.value),
      };
    });
  }

  return (
    <main>
      <div id="user-input">
        <div className="input-group">
          <div>
            <label>Initial Investment</label>
            <input
              type="number"
              value={inputValues.initialInvestment}
              required
              placeholder="Initial Investment"
              onChange={(e) => handleInputChange(e, 'initialInvestment')}
            />
          </div>
          <div>
            <label>Annual Investment</label>
            <input
              type="number"
              value={inputValues.annualInvestment}
              required
              placeholder="Annual Investment"
              onChange={(e) => handleInputChange(e, 'annualInvestment')}
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label>Expected Return</label>
            <input
              type="number"
              value={inputValues.expectedReturn}
              required
              placeholder="Expected return"
              onChange={(e) => handleInputChange(e, 'expectedReturn')}
            />
          </div>
          <div>
            <label>duration</label>
            <input
              type="number"
              value={inputValues.duration}
              required
              placeholder="Duration"
              onChange={(e) => handleInputChange(e, 'duration')}
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
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const isValid = inputValues.duration >= 1;

  const result = calculateInvestmentResults({
    initialInvestment: inputValues.initialInvestment,
    annualInvestment: inputValues.annualInvestment,
    expectedReturn: inputValues.expectedReturn,
    duration: inputValues.duration,
  });

  return (
    <>
      <Header />;
      <InvestmentForm
        setInputValues={setInputValues}
        inputValues={inputValues}
      />
      {!isValid && (
        <p className="center">Duration not equal zero and less zero.</p>
      )}
      {isValid && <TableFullBody tableListValue={result} />}
    </>
  );
}

export default App;
