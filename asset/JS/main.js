
//decleration & intinal values
let bodycolor=document.querySelector("body");
let btnMode=document.querySelector("#mode");
let inputs = document.querySelectorAll("input");
let Branch = document .querySelector("#Branch")
let count= inputs[6];
let creat =document.getElementById("creat");
let table =document.getElementById("table");
let output=document.getElementById("output");
let allData=[];
const d = new Date();
var deleteall=document.getElementById("deleteall");
let mode="creat";
let globalID;
let ball =document.querySelector("#ball");
let themeSwitch=document.querySelector("#theme-switch");
let navbar =document.querySelector(".navbar");
let alert=document.querySelector(".alert");
let total =document.querySelector("#total");

//all functions
//frist function calculat the total cost
let calculate = ()=>{
  let p=inputs[1].value;
  let t=inputs[2].value;
  let TC=inputs[3].value;
  let dis=inputs[4].value;
  let total = +p + +(p*t/100) + +TC - +(p*dis/100);
  inputs[5].value = Math.ceil (total);
  
 }

//second function show data
let showData=()=>{
  
  let tableRow ="";
for(i=0;i<allData.length;i++){
  
 tableRow += `
 <tr>
 <td> ${i+1} </td>
 <td>${allData[i].Title}</td>
 <td>${allData[i].Price}</td>
 <td>${allData[i].Tax}</td>
 <td>${allData[i].Transfer} </td>
 <td>${allData[i].Discont}</td>
 <td>${allData[i].Total}</td>
 <td><img src="${allData[i].img}" alt="product img" style="width:100px; height=100px my-5"></td>
 <td>${allData[i].Branch}</td>
  <td>${d.toUTCString()}</td>
  <td><button class="btn mt-2 bounce" onclick="removeItem(${i})"><i class="fa-regular fa-trash-can fa-xl" style="color: #eb2e32;"></i></button> <button class="btn mt-2 bounce" onclick="editItem(${i})"><i class="fa-regular fa-pen-to-square fa-xl" style="color: #ffc107;"></i></button></td>
   </tr>`;
}
table.innerHTML =tableRow;

if(allData.length>0){
  output.innerHTML=`<button id="deleteall" class=" btn btn-danger col-12 " onclick="removeAll()" >Delete All<span>"${allData.length}"</span></button>`
}else{
  output.innerHTML=`<button id="deleteall" class="none btn btn-danger col-12 " onclick="removeAll()" >Delete All</button>`
}
}

//third function validation
let ValiditData=()=>{
  if(inputs[0].value.trim()=='' || inputs[0].value.length >20 ||inputs[0].value.length <3 ){
    alert.classList.remove("none");
    alert.innerText="Enter product titel more than 3 charater & less than 20 charater"
    inputs[0].classList.add("border","border-3","border-danger");
    return false;}

    if(inputs[1].value.trim()=='' || inputs[1].value < 1){
      alert.classList.remove("none");
      alert.innerText="Enter positive value in price"
      inputs[1].classList.add("border","border-3","border-danger");
      return false;
    }
    
    if(inputs[2].value.trim()=='' || inputs[2].value < 1 ||inputs[2].value >= 100){
      alert.classList.remove("none");
      alert.innerText="Enter positive value in tax% 0:100"
      inputs[2].classList.add("border","border-3","border-danger");
      return false;
    }
    if(inputs[3].value.trim()=='' || inputs[3].value < 1){
      alert.classList.remove("none");
      alert.innerText="Enter positive value in transfer cost"
      inputs[3].classList.add("border","border-3","border-danger");
      return false;
    }
    if(inputs[4].value.trim()=='' || inputs[4].value < 1||inputs[4].value >= 100){
      alert.classList.remove("none");
      alert.innerText="Enter positive value in discount% 0:100"
      inputs[4].classList.add("border","border-3","border-danger");
      return false;
    }
    if(Branch.value=="0"){
      alert.classList.remove("none");
      alert.innerText="choose the Branch"
      Branch.classList.add("border","border-3","border-danger");
      return false;
    }
 else{
  for(i=0 ; i<=4; i++){
    inputs[i].classList.remove ("border","border-3","border-danger");
  }
  Branch.classList.remove("border","border-3","border-danger");
   alert.classList.add("none");
    creatProduct();
  }}

//forth function creat the object
let creatProduct=()=>{
  let product ={
    Title:inputs[0].value,
    Price:inputs[1].value,
    Tax:inputs[2].value,
    Transfer:inputs[3].value,
    Discont:inputs[4].value,
    Total:inputs[5].value,
    count:count.value,
    img:inputs[7].value,
    Branch:Branch.value
  }
  if(mode == "creat"){
  if(product.count>1){
  for(let i=0;i< product.count; i++ ){
    allData.push(product);}
  }else{
    allData.push(product);
  }}else{
    allData[globalID]= product;
    mode="creat";
    creat.classList.replace("btn-warning","btn-info");
  creat.innerText="Creat";
  count.classList.remove("none");
  }
  showData();
  localStorage.setItem("product",JSON.stringify(allData));
  clearInput();

}
//fifth function clear input after creat
let clearInput=()=>{
  inputs[0].value="";
  inputs[1].value="";
  inputs[2].value="";
  inputs[3].value="";
  inputs[4].value="";
  inputs[5].value="";
  inputs[6].value="";
  inputs[7].value="";
  Branch.value="0";
}

//sixth function remove single item
let removeItem=(index)=>{
  if (confirm("you gona delete this element are you sure?")) {
  allData.splice(index ,1);
  localStorage.setItem("product",JSON.stringify(allData));
  showData();
  } else {
    
  } 
  
}

//seventh function remve all items
let removeAll=()=>{
  if (confirm("you gona delete this element are you sure?")) {
  localStorage.clear();
allData.splice(0);
showData();
  } else {
    
  } 
}

//eigth function Edit item
let editItem=(i)=>{
  mode="update";
  globalID=i;
  creat.classList.replace("btn-info","btn-warning");
  creat.innerText="Update";
 inputs[0].value= allData[i].Title;
 inputs[1].value=allData[i].Price;
 inputs[2].value= allData[i].Tax;
 inputs[3].value= allData[i].Transfer;
 inputs[4].value=allData[i].Discont;
 inputs[5].value= allData[i].Total;
count.classList.add("none");
 inputs[7].value=allData[i].img;
 Branch.value=allData[i].Branch;
 
}

//ninth function light mode
let changeMode=()=>{
  if(bodycolor.classList.contains("bodycolordark")){
  bodycolor.classList.toggle("bodycolordark");
  navbar.classList.replace("navbar-black" ,"navbar-white");
  navbar.classList.replace("navbar-dark" ,"navbar-light");
   // btnMode.classList.replace("btn-light","btn-dark");
   // btnMode.innerHTML= `<i class="fa-regular fa-moon"></i>` ;
ball.style.transform = "translateX(-38px)"
themeSwitch.style.backgroundColor="plum";
}
else {
  bodycolor.classList.toggle("bodycolordark");
  navbar.classList.replace("navbar-white" ,"navbar-black");
  navbar.classList.replace("navbar-light" ,"navbar-dark");
 // btnMode.classList.replace("btn-dark","btn-light");
 // btnMode.innerHTML= `<i class="fa-solid fa-sun"></i>` ;
 ball.style.transform = "translateX(0px)"
 themeSwitch.style.backgroundColor = "grey";
}
}


//tenth function get total
/*let getTotal=()=>{
 var x=0; 
 
for(let i=0; i<=allData.length ; i++){
 var y =parseInt( allData[i].Total);
 x=x+y;
 total.innerText=x; 
} 



}*/





// main logic

if(localStorage.product!= null){
  allData=JSON.parse(localStorage.product);
}else{
  allData=[];
}
showData();
//getTotal();
for(let i=0 ; i<=inputs.length-1 ;i++){
inputs[i].addEventListener('keyup', calculate );}
creat.addEventListener("click", ValiditData );

