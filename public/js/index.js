const socket = io();

// socket.on("productList", (data) =>{
//     console.log(data);
// })

const productData = document.getElementById("prodsList-dysplay");
socket.on("productList",async (data)=>{
    console.log(data);
    let prodsList = "";
    await data.forEach((e) => {
        prodsList += `<h3> titulo: ${e.title}</h3><br><h4>id: ${e.id}</h4><br><p>code: ${e.code}</p>`;
    });
    productData.innerHTML = prodsList;
})

