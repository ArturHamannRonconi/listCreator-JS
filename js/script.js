const sectionLists = document.querySelector("#section--1");
const listsArea = document.querySelector("#section--1 .container");
const sectionCreate = document.querySelector("#section--2");
const buttonCreate = document.querySelector("#section--2 .button");
const inputs = document.querySelectorAll("input:not(.not)");

let listsJson = [];
let listCreator = {
    creat:() => {
        let send = true;
        
        listCreator.clearErrors(inputs);
        
        for(let input of inputs){
            let checkInput = listCreator.checkInputs(input);
            if(checkInput !== true){
                send = false;
                listCreator.showError(input, checkInput);
            }
        }
        if(send){
            const title = inputs[0].value;
            const listItens = inputs[1].value.split(",");
            
            listsJson.push({title, listItens});
            listCreator.clearIputs(inputs);
            listsArea.innerHTML = "";
            
            listCreator.showList();
        }

    },
    showList:() => {
        listsJson.map((list) => {
            const listClone = document.querySelector(".list--area").cloneNode(true);
            const settings = listClone.querySelector(".edit-icon--area");
            const tools = listClone.querySelector(".edit-list--area");
            const back = listClone.querySelector(".back");
            const edit = listClone.querySelector(".edit");
            const exclude = listClone.querySelector(".exclude");
            const inputOfList = listClone.querySelector(".inputOfList");

            function addItem(){
                listClone.querySelector(".list").innerHTML = "";
                for(let item of list.listItens){
                    let listItem = `<li>${item}</li>`;
                    listClone.querySelector(".list").innerHTML += listItem;
                }
            }

            listClone.querySelector("h2").innerHTML = list.title;
            addItem();

            settings.addEventListener("click", () => {
                settings.querySelector(".icons").classList.remove("girando");
                settings.querySelector(".icons").classList.add("girando");
                settings.style.width = "0%";
                setTimeout(() => {
                    settings.classList.add("none");
                    tools.classList.remove("none");
                    setTimeout(() => {
                        tools.style.width = "120px";
                    }, 10);
                }, 500);
            });
            
            back.addEventListener("click", () => {
                settings.querySelector(".icons").classList.remove("girando");
                tools.style.width = "0%";
            
                if(inputOfList.classList == "inputOfList none"){
                    setTimeout(() => {
                        settings.classList.remove("none");
                        setTimeout(() => {
                            settings.style = "";
                            setTimeout(() => {
                                settings.querySelector(".icons").classList.add("girando");
                            }, 0);
                        }, 10)
                    }, 450);
                    setTimeout(() => {
                        tools.classList.add("none");
                    }, 400);
                }
                else{
                    inputOfList.style.width = "0%";
                    setTimeout(() => {
                        inputOfList.classList.add("none");
                        setTimeout(() => {
                            tools.style.width = "0%";
                            setTimeout(() => {
                                settings.classList.remove("none");
                                setTimeout(() => {
                                    settings.style = "";
                                    setTimeout(() => {
                                        settings.querySelector(".icons").classList.add("girando");
                                    }, 0);
                                }, 10)
                            }, 450);
                            setTimeout(() => {
                                tools.classList.add("none");
                            }, 400);
                        }, 10)
                    }, 10)
                }
            });
            edit.addEventListener("click", () => {
                if(inputOfList.classList == "inputOfList none"){
                    tools.style.width = "360px";
                    setTimeout(() => {
                        inputOfList.classList.remove("none");
                        setTimeout(() => {
                            inputOfList.style.width = "210px";
                        }, 10)
                    }, 10)
                }
                else{
                    inputOfList.style.width = "0%";
                    setTimeout(() => {
                        inputOfList.classList.add("none");
                        setTimeout(() => {
                            tools.style.width = "120px";
                        }, 10)
                    }, 10)
                }
            
            });
            exclude.addEventListener("click", () => {
                listsJson.splice(listsJson.findIndex(item => (item.title == list.title && item.listItens == list.listItens)? true:false), 1);
                listClone.style.opacity = "0";
                setTimeout(() => {
                    listClone.remove();
                    if(listsJson == 0){
                        listsArea.innerHTML = "";
                        if(listsJson.length === 0){
                            arraylinks.push(linkClone.querySelector("a.link"));
                            listsArea.insertAdjacentElement("afterbegin", linkClone);
                        }
                    }
                }, 500);
            });

            inputOfList.querySelector(".not").addEventListener("keydown", (e) => {
                let inputOfListValue = inputOfList.querySelector(".not");
                if(e.key === "Enter" && inputOfListValue.value != ""){
                    list.listItens.push(inputOfListValue.value);
                    addItem();
                    inputOfListValue.value = "";
                }
            });


            listsArea.insertAdjacentElement("beforeend", listClone);

        });
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
        input.classList.add("input--error");

        input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors:(inputs) => {
        let errorElements = document.querySelectorAll(".error");
        
        for(let input of inputs){
            input.classList.remove("input--error");
        }
        for(let error of errorElements){
            error.remove();
        }
    }
};


buttonCreate.addEventListener("click", listCreator.creat);
for(let input of inputs){
    input.addEventListener("keypress", (e) => {
        if(e.key === "Enter"){
            listCreator.creat();
        }
    });
}


// dando função aos links
const links = document.querySelectorAll(".link");
const linkClone = document.querySelector(".link--area");
let arraylinks = [...links];

for(let link of arraylinks){
    link.addEventListener("click", (e) => {
        e.preventDefault();

        let linkMenu;

        switch(link.getAttribute("data-link")){
            case "lists":
                linkMenu = arraylinks[1]
                clearScreen();   
                sectionLists.classList.remove("none");
                linkMenu.classList.add("active");
                break;
            case "create":
                linkMenu = arraylinks[2]
                clearScreen();
                listCreator.clearIputs(inputs);
                listCreator.clearErrors(inputs);
                sectionCreate.classList.remove("none");
                linkMenu.classList.add("active");
                break;
        };
    });
}

function clearScreen(){
    sectionCreate.classList.add("none");
    sectionLists.classList.add("none");

    arraylinks.forEach((link) => {
        link.classList.remove("active");
    });
}


if(listsJson.length === 0){
    arraylinks.push(linkClone.querySelector("a.link"));
    listsArea.insertAdjacentElement("afterbegin", linkClone);
}