document.addEventListener("DOMContentLoaded", ()=>{

let curr1Data = document.getElementById("curr1")
let curr2Data = document.getElementById("curr2")
let poxID1 = document.getElementById("curr1_money")
let poxID2 = document.getElementById("curr2_money")
let butt = document.getElementById("change")
let errorMessage = document.getElementById("errorMessage")

fetch("https://open.er-api.com/v6/latest/AMD")
.then(response => {
if(!response.ok){
    throw new Error("the network is not ok")
       
}
return response.json()
})
.then((result) => {

let rates = result.rates

let data = ["USD", "RUB", "AZN"]
console.log("all is ok")

document.querySelectorAll(".as")
.forEach((item, idx)=>{
    let pelem  = item.querySelector("p")
    pelem.textContent =`${data[idx]} :` + rates[data[idx]]
})

getCurr()
butt.addEventListener("click",changedata )

function getCurr() {


let keys = Object.keys(rates)

for (let i = 0; i < keys.length; i++) {
    let opt1 = document.createElement("option");
    opt1.textContent = keys[i];
    opt1.value = keys[i];
    curr1Data.appendChild(opt1);

    let opt2 = document.createElement("option");
    opt2.textContent = keys[i];
    opt2.value = keys[i];
    curr2Data.appendChild(opt2);
}

curr1Data.addEventListener("change", () => {
console.log(curr1Data.value) // ARM
console.log(poxID1.value)
})

curr2Data.addEventListener("change", () => {
let val = curr2Data.value // USD
let pox = rates[val] * +poxID1.value
curr2_money.value = pox.toFixed(3)
console.log(curr2_money.value)
})
}

function changedata(){

    let val1 = curr1Data.value // Arm
    
    let resval =curr2Data.value

    poxID1.value = poxID2.value
    curr1Data.value = curr2Data.value

    curr2Data.value = val1
    let val2 = poxID1.value  // 400
    fetch(`https://open.er-api.com/v6/latest/${resval}`)
    .then(response=>response.json())
    .then(newres=> {
        console.log(newres)
        console.log(resval)
        console.log(newres.rates)

        poxID2.value = (val2 * newres.rates[curr2Data.value].toFixed(3))
    }).catch(err => {
        console.error("Fetch error:", err);
    })
}

}).catch(err=>{
    errorMessage.innerHTML = "OOPS! There was an error fetching data.";
    console.log(err)
})

})