// constantes
const links = document.querySelectorAll(".link");
const sectionLists = document.querySelector("#section--1");
const sectionCreate = document.querySelector("#section--2");
const buttonCreate = document.querySelector("#section--2 .button");



// variáveis
let listsJson = [];
let listCreator = {
    creat:() => {
        const inputTitle = document.querySelector("#section--2 input").value;
        const textAreaItens = document.querySelector("#section--2 textarea").value;

        if(inputTitle != "" && textAreaItens != ""){
            const title = inputTitle;
            const listItens = textAreaItens.split(",");

            listsJson.push({title, listItens});
            listCreator.clearIputs();
            console.log(listsJson);
        }
        else{
            console.log("não funcionou")
        }
    },
    clearIputs:() => {
        let inputs = document.querySelectorAll("input");
        let textareas = document.querySelectorAll("textarea");

        for(let input of inputs){
            input.value = ""
        };
        for(let textarea of textareas){
            textarea.value = ""
        };

    }
};


buttonCreate.addEventListener("click", listCreator.creat);


// dando função aos links
for(let link of links){
    link.addEventListener("click", (e) => {
        e.preventDefault();

        switch(link.getAttribute("data-link")){
            case "lists":
                clearClasses();   
                sectionLists.classList.remove("none");
                break;
            case "create":
                clearClasses();
                sectionCreate.classList.remove("none");
                break;
        };
    });
}

function clearClasses(){
    sectionCreate.classList.add("none");
    sectionLists.classList.add("none");
}