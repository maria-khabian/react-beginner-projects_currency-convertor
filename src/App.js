import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('PLN');
  const [toCurrency, setToCurrency] = React.useState('USD');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  // const [rates, setRates] = React.useState({});
  const ratesRef = React.useRef({});

  const onChangeFromPrice = (eventValue) => {
    const price = eventValue / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(3));
    setFromPrice(eventValue);
  };
  const onChangeToPrice = (eventValue) => {
    //const result = ( rates[fromCurrency] / rates[toCurrency] ) * eventValue
    const price = eventValue / ratesRef.current[toCurrency];
    const result = price * ratesRef.current[fromCurrency];
    setFromPrice(result.toFixed(3));
    setToPrice(eventValue);
  };

  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/nbrb.json')
      .then((response) => response.json())
      .then((data) => {
        ratesRef.current = data.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert('Не удалось получить данные...');
      });
  }, []);

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeValue={onChangeFromPrice}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeValue={onChangeToPrice}
        onChangeCurrency={setToCurrency}
      />
    </div>
  );
}

export default App;
