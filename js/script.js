const buttonAdditem = document.querySelector(".button");
const itemList = document.querySelector(".itemList");


itemList.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        if(itemList.value != ""){
            const lista = document.querySelector(".lista");
            const itemArmazenado = `<li>${itemList.value}</li>`;
            lista.innerHTML += itemArmazenado;
            
        }
        else{
            alert("é necessário adicionar um ingrediente no campo!");
        }
        itemList.value = "";
    }
});
buttonAdditem.addEventListener("click", () => {
    if(itemList.value != ""){
        const lista = document.querySelector(".lista");
        const itemArmazenado = `<li>${itemList.value}</li>`;
        lista.innerHTML += itemArmazenado;
        
    }
    else{
        alert("é necessário adicionar um item da lista no campo!");
    }
    itemList.value = "";
});
