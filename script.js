let tasks = document.getElementById("tasks");
let newTask = document.getElementById("newTask");
let form = document.getElementById("form");
let title = document.getElementById("title");
let date = document.getElementById("date");
let desc = document.getElementById("desc");
let mssg = document.getElementById("mssg");
let add = document.getElementById("add");

newTask.addEventListener("click", () => {
    title.value = ''
    date.value = ''
    desc.value = ''
})

// title.addEventListener("keypress", (e) => {
//     if (e.key === 'Enter') {

//         e.preventDefault();
//         formValidation()
//     }
// })

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation()
})

let formValidation = () => {
    if (title.value === '') {
        mssg.innerHTML = 'Tasks Cannot be Empty!'
    } else {
        mssg.innerHTML = ''
        acceptData()
        add.setAttribute('data-bs-dismiss', 'modal')
        add.click();

        // let abc = () => {
        //     add.setAttribute('data-bs-dismiss', '')
        // }
        // abc()


        //...........or IIFE maybe be used.................

        (() => {
            add.setAttribute('data-bs-dismiss', '')
        })();



    }
}

let data = []

let acceptData = () => {
    data.push({
        title: title.value,
        date: date.value,
        details: desc.value

    })

    localStorage.setItem('data', JSON.stringify(data))
    console.log(data);
    printData()

}

let printData = () => {
    tasks.innerHTML = "";
    data.map((value,index) => {
        return (
            tasks.innerHTML +=

            `<div class="task" id=${index}>
                    <span>${value.title}</span>
                    <span>${value.date}</span>
                    <p>${value.details}</p>
                    <span class="options">
                        <i class="fa-regular fa-pen-to-square" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
                        <i class="fa-regular fa-trash-can" onclick="deleteTask(this);printData()"></i>
                    </span>
            </div>`
        )
    })



    resetForm()

}

let resetForm = () => {
    title.value = ''
    date.value = ''
    desc.value = ''
}

let deleteTask = (target) => {
    target.parentElement.parentElement.remove()
    data.splice(target.parentElement.parentElement.id,1)
    localStorage.setItem('data', JSON.stringify(data))
    console.log(data);


}

let editTask = (target) => {
    title.value = target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML

    date.value = target.parentElement.previousElementSibling.previousElementSibling.innerHTML

    desc.value = target.parentElement.previousElementSibling.innerHTML

    deleteTask(target)



}


(() => {
    data = JSON.parse(localStorage.getItem('data')) || [];
    printData();
    console.log(data);
})()