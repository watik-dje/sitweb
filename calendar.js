function checkData(){
    let currentYear = new Date().getFullYear()
    let currentMonth = new Date().getMonth()
    let yearSelect = document.getElementById("year")
    let monthSelect = document.getElementById("month")
    let button = document.getElementById("submit")
    let inputs = document.querySelectorAll(".calendar .container .data form div input")
    for(let i = 0 ; i < yearSelect.children.length ;i++){
        if(+yearSelect.children[i].value === currentYear){
            yearSelect.children[i].setAttribute("selected" ,"")
            yearSelect.name = yearSelect.children[i].value
        }
    }
    yearSelect.addEventListener("change",function(){
        yearSelect.name = yearSelect.value
    })
    monthSelect.addEventListener("change",function(){
        monthSelect.name = monthSelect.value
    })
    for(let i = 0 ; i < monthSelect.children.length ;i++){
        if(+monthSelect.children[i].value === currentMonth+1){
            monthSelect.children[i].setAttribute("selected" ,"")
            monthSelect.name = monthSelect.children[i].value
        }
    }
    let warning = document.querySelector(".calendar .error")
    button.onclick = function(){
        if(inputs[0].value !== "" && inputs[1].value !== ""){
            let url = `https://api.aladhan.com/v1/calendarByCity/${yearSelect.name}/${monthSelect.name}?city=${inputs[1].value.trim()}&country=${inputs[0].value.trim()}`
            axios.get(url).then((response)=>{
                let data = response.data.data
                window.sessionStorage.setItem("data" , JSON.stringify(data))
                window.location.href = "tablecalendar.html"
                console.log(data)
            }).catch((error)=>{
                warning.children[1].innerHTML = error.response.data.data 
                warning.classList.add("show")
                for(input of inputs){
                    input.onkeyup = function(){
                        warning.classList.remove("show")
                    }
                }
            })
        }
        else if(inputs[0].value === "" && inputs[1].value !== ""){
            warning.children[1].innerHTML = "enter country !"
            warning.classList.add("show")
            for(input of inputs){
                input.onkeyup = function(){
                    warning.classList.remove("show")
                }
            }
        }
        else if(inputs[0].value !== "" && inputs[1].value === ""){
            warning.children[1].innerHTML = "enter city !"
            warning.classList.add("show")
            for(input of inputs){
                input.onkeyup = function(){
                    warning.classList.remove("show")
                }
            }
        }
        else{
            warning.classList.add("show")
            for(input of inputs){
                input.onkeyup = function(){
                    warning.classList.remove("show")
                }
            }
        }
}
}
checkData()