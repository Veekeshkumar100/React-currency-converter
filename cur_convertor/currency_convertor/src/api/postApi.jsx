import axios from "axios";

const api =axios.create({
    baseUrl:"https://v6.exchangerate-api.com/v6/b09ed5ef41a2816f7cdf0d36",
})


export const currencyConverter=async(fromCurrency,toCurrency,amount)=>{
         const res= await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
         console.log(res);
          return res.data.conversion_result;

}