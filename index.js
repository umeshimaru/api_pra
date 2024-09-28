const btn = document.querySelector("button")

function createTable(address){
const table = document.querySelector(".table")
table.innerHTML = 
                  `<table class=" table-success" style="width:300px;"> 
                  <tbody>
                  <tr>
                  <td>都道府県</td><td>${address.address1}</td>
                  </tr>
                  <tr>
                  <td>市区町村</td><td>${address.address2}</td>
                  </tr>
                  <tr>
                  <td>住所</td><td>${address.address3}</td>
                  </tr>
                  </tbody>
                  </table>`

}

function invalidZipCode(zip_code){
let message;
const p = document.querySelector("p")

if(zip_code.length == 0){ 
  message = "郵便番号を入力してください"
  
}else if(zip_code.length !==0 && zip_code.length !==7 ){
  message = "住所が見つかりませんでした"
  
}else if(zip_code.length == 7){
 return 
  
}
  // case 0 < zip_code.length && zip_code.length > 7:
  // case 7 < zip_code.length :
   

p.innerHTML = message
setTimeout(function(){
  p.innerHTML = ""
},3000)
return true 
}


function fetchAddress(){
  let zip_code = document.getElementById("zipcode").value 
  const url  = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip_code}`
  
  if(invalidZipCode(zip_code)){
    clearInput()
    return 
  }
 
  fetch(url).then(function(res){
    return res.json();
  }).then(function(data){
    const address = data.results[0]
    createTable(address)
  })

clearInput()

}


function clearInput(){
  const input = document.getElementById("zipcode")
  input.value = '';
  input.focus()

}

document.body.addEventListener("keydown",e => {if(e.key === "Enter")  return fetchAddress();
})


btn.addEventListener("click",fetchAddress)

