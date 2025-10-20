// const base_url = "https://rawcdn.githack.com/fawazahmed0/exchange-api/1/latest/currencies/usd/pkr.json"

const dropdowns = document.querySelectorAll(".dropdown select")

const btn = document.querySelector("form button")

const fromCurrency = document.querySelector("select[name='from']")

const toCurrency = document.querySelector("select[name='to']")

const amount = document.querySelector(".amount input")

const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(currcode in countryList){
        let options = document.createElement("option");
        options.innerText = currcode;
        options.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            options.selected = "selected"
        }else if(select.name === "to" && currcode  === "PKR"){
            options.selected = "selected"
        }
        select.append(options);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target)
    })
}
const updateflag = (element)=>{
    let currcode = element.value
    let countrycode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}
btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input")
    let amtval = amount.value;
    if(amtval === "" && amtval <= 1){
        amount.value = 1;
    }
    const from = fromCurrency.value.toLowerCase();  
    const to = toCurrency.value.toLowerCase(); 
    const URL = `https://open.er-api.com/v6/latest/${from}`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data.rates[to.toUpperCase()]
    let final_amount = (amtval * rate).toFixed(2);
    console.log(final_amount)
    msg.innerText = `${amtval} ${fromCurrency.value} = ${final_amount} ${toCurrency.value}`

    
    
})
