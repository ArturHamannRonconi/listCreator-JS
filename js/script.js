// constantes
const links = document.querySelectorAll(".link");
const sectionLists = document.querySelector("#section--1");
const sectionCreate = document.querySelector("#section--2");
const buttonCreate = document.querySelector("#section--2 .button");
const inputs = document.querySelectorAll("input");



// variáveis
let listsJson = [];
let send;
let listCreator = {
    creat:() => {
        listCreator.clearErrors(inputs);
        for(let input of inputs){
            let checkInput = listCreator.checkInputs(input);
            if(checkInput !== true){
                send = false;
                listCreator.showError(input, checkInput);
            }
            else{
                send = true;
            }
        }
        if(send){
            const title = inputs[0].value;
            const listItens = inputs[1].value.split(",");

            listsJson.push({title, listItens});
            listCreator.clearIputs(inputs);


            console.log(listsJson);
        }

    },
    clearIputs:(inputs) => {
        for(let input of inputs){
            input.value = ""
        };
    },
    checkInputs:(input) => {
        switch (input.value) {
            case "":
                return "Esse campo precisa ser preenchido";
                break;
        }
        return true;
    },
    showError:(input, error) => {
        const errorElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.innerHTML = error;
        input.style.borderColor = "tomato";
        input.style.borderTopLeftRadius = "0";
        input.style.borderBottomLeftRadius = "0";

        input.parentElement.insertBefore(errorElement, input)
    },
    clearErrors:(inputs) => {
        let errorElements = document.querySelectorAll(".error");
        
        for(let input of inputs){
            input.style = "";
        }
        for(let error of errorElements){
            error.remove();
        }
    }
};


buttonCreate.addEventListener("click", listCreator.creat);


// dando função aos links
for(let link of links){
    link.addEventListener("click", (e) => {
        e.preventDefault();

        let linkMenu;

        switch(link.getAttribute("data-link")){
            case "lists":
                linkMenu = links[0]
                clearScreen();   
                sectionLists.classList.remove("none");
                linkMenu.classList.add("active");
                break;
            case "create":
                linkMenu = links[1]
                clearScreen();
                listCreator.clearIputs(inputs)
                sectionCreate.classList.remove("none");
                linkMenu.classList.add("active");
                break;
        };
    });
}

function clearScreen(){
    sectionCreate.classList.add("none");
    sectionLists.classList.add("none");

    links.forEach((link) => {
        link.classList.remove("active");
    });
}