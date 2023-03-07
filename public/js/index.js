const socket = io();

// socket.on("productList", (data) =>{
//     console.log(data);
// })

const productData = document.getElementById("prodsList");
socket.on("productList", (data)=>{
    productData.innerText = data;
})