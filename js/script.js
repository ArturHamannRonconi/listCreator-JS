// constantes
const links = document.querySelectorAll(".link");
const sectionLists = document.querySelector("#section--1");
const sectionCreate = document.querySelector("#section--2");
const buttonCreate = document.querySelector("#section--2 .button");



// variáveis
let listsJson = [];
let listCreator = {
    creat:() => {
        const inputs = document.querySelectorAll("input");
        const checkInput = listCreator.checkInputs(inputs);
        
        if(checkInput === true){
            const title = inputs[0].value;
            const listItens = inputs[1].value.split(",");

            listsJson.push({title, listItens});
            listCreator.clearIputs(inputs);


            console.log(listsJson);
        }
        else{
            // let errorMensage = "Os dois campos precisam ser preenchidos com um título e pelo menos 1 item";
            // listCreator.showError(input, errorMensage);
            console.log(checkInput)
        }

    },
    clearIputs:(inputs) => {
        for(let input of inputs){
            input.value = ""
        };
    },
    checkInputs:(inputs) => {
        for(let input of inputs){
            switch (input.value) {
                case "":
                    return "Esse campo precisa ser preenchido";
                    break;
            }
        }
        return true;
    },
    showError:(input, error) => {
        const errorElement = document.createElement("div");
        const label = document.querySelector(".list-create-area");
        errorElement.classList.add("error");
        errorElement.innerHTML = error;

        label.insertBefore(errorElement, input.nextElementSibling)

    }
};


buttonCreate.addEventListener("click", listCreator.creat);


// dando função aos links
for(let link of links){
    link.addEventListener("click", (e) => {
        e.preventDefault();

        switch(link.getAttribute("data-link")){
            case "lists":
                clearScreen();   
                sectionLists.classList.remove("none");
                link.classList.add("active");
                break;
            case "create":
                clearScreen();
                sectionCreate.classList.remove("none");
                link.classList.add("active");
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