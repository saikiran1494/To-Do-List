let listContainer = document.querySelector(".listcontainer");
let input = document.querySelector("#inputvalue");

function addTask(){
    if (input.value == "")
        alert("enter todo");
    else{
        let list = document.createElement("li");
        listContainer.appendChild(list);
        list.innerHTML = input.value;
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        list.appendChild(span);
        input.value = "";
    }
    store();

}

listContainer.addEventListener("click",function(e){
    if (e.target.tagName == "LI"){
        e.target.classList.toggle("checked");
        store();
        
    }
    else if (e.target.tagName == "SPAN"){
        e.target.parentElement.remove();
        store();
    }
},false);

function store()
{
    localStorage.setItem("data1",listContainer.innerHTML);
}
function show(){
    listContainer.innerHTML = localStorage.getItem("data1");
}
show();