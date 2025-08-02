import { currencyConverter } from './api/postApi';
import { useState } from 'react';
import './App.css';
import {  useQuery } from '@tanstack/react-query';



function App() {
   const [amount,setAmount]=useState(0)
   const [fromCurrency,setFromCurrency]=useState("USD");
   const [toCurrency,setToCurrency]=useState("INR");


  //  const{data:convertedAmount,isLoding,error }=useQueries({
  //     queryKey:["currency"],
  //     queryFn:()=>currencyConverter(fromCurrency,toCurrency,amount),
  //     // enabled:false,
      
      
  //  });

  const {
    data: convertedAmount,
    isLoding,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: () => currencyConverter(fromCurrency, toCurrency, amount),
    // enabled: false,
  });
// console.log(convertedAmount)
   const handleConvertCurrency=()=>{
refetch();
   }

  return (
       <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>

        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {
                  ["USD","EUR","INR","GBP","AUD"].map((currency)=>{
                    return <option key={currency} value={currency}>{currency}</option>
                  })
                }
               
              </select>
            </label>
          </div>
          <div>
            <label>
              To:
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
        </div>
    
        <button
          disabled={isLoding || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {isLoding ? "Converting.." : "Convert"}
     </button>  
    


        <hr />
       
        {convertedAmount &&(
          <div> <h1>
            
            {amount} {fromCurrency}= {convertedAmount.toFixed}{toCurrency}
            </h1></div>
        ) 
        }
        {error && error.message};

        </div>
        </section>
  )
}
// import { currencyConverter, fetchData } from './api/postApi';

export default App
