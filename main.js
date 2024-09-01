// ------------start header-----------------
// ----start get data of positions----
let sound = false
function getDataOfPositions(id) {
    let mainLink = document.querySelector(".sections header .container .location .earth > div > li .main-link");
    let list = document.querySelector(".sections header .container .location .earth .list");
    axios.get("countries.json").then((data)=>{
        let responses = data.data
        mainLink.textContent = responses[id].country.name
        mainLink.setAttribute("data-id" , responses[id].id)
        mainLink.setAttribute("data-code" , responses[id].country.code)
        window.localStorage.setItem("id",responses[id].id)
        list.innerHTML= ""
        for(let i = 0; i < responses.length ;i++){
            let content = `
            <li onclick="getIdFromElements(${responses[i].id})">
                <i class="fa-solid fa-location-dot"></i>
                <a data-code="${responses[i].country.code}" data-id="${responses[i].id}">${responses[i].country.name}</a>
            </li>
            `
            list.innerHTML+= content
        }
        let listOfCities = document.querySelector(".main-section .content nav div ul")
        listOfCities.innerHTML=""
        for(let i = 0; i < 6 ;i++){
            let content2 = `
                <li onclick = "getDataForCities(this.children[1].textContent)">
                    <i class="fa-solid fa-location-dot"></i>
                    <a>${responses[id].country.cities[i]}</a>
                </li>  
                ` 
            listOfCities.innerHTML += content2
        }
        let video = document.querySelector(".sections video")
        video.src = `mosque/${responses[id].country.mosque_src}`
        if(window.matchMedia("(max-width : 370px)").matches){
            if(mainLink.innerHTML === "Tunisia"){
                video.style ="left: -120px;"
            }
            else if(mainLink.innerHTML === "Morocco"){
                video.style ="left: 0;"
            }
            else{
                video.style ="left: 50%;transform: translateX(-50%);"
            }
        }
        let children = list.children[id]
        if(children.children[1].getAttribute("data-id") === mainLink.getAttribute("data-id")){
            list.removeChild(children)
        }
        animation(children.children[1].textContent)
        let cities = document.querySelector(".main-section .content nav h3")
        cities.innerHTML = `cities of ${responses[id].country.name}`
        if(mainLink.innerHTML === "Saudi Arabia"){
            cities.innerHTML = `cities of Ksa`
        }
        let firstChild = listOfCities.children[0]
        firstChild.classList.add("clicked")
        firstChild.click()
    })
}
getDataOfPositions(0)
if(window.localStorage.getItem("id")){
    getDataOfPositions(window.localStorage.getItem("id")-1)
}
// ----start replace elements of list in main link----
function getIdFromElements(id){
    getDataOfPositions(id-1)
    let list1 = document.querySelector(".sections header .container .location .earth .list");
    list1.classList.remove("show")
    window.location.reload()
}
// ----end replace elements of list in main link----
// ----end get data of positions----
// ----start show list of positions----
function showList(){
    let list2 = document.querySelector(".sections header .container .location .earth > div")
    let list3 = document.querySelector(".sections .effects .traduction div")
    list2.addEventListener("click",()=>{
        document.querySelector(".sections header .container .location .earth .list").classList.toggle("show")
    })
    list3.addEventListener("click",()=>{
        document.querySelector(".sections .effects .traduction div ul").classList.toggle("show")
    })
}
showList()
// ----end show list of positions----
// ----start media query of header----
if(window.matchMedia("(max-width:992px)").matches){
    document.querySelector(".sections header .container .links").innerHTML = `
        <div>
            <div class="more">
                <a>
                more
                <i class="fa-solid fa-angle-down"></i>
                </a>
            </div>
            <ul class="list">
                <li id ="index.html">
                    <i class="fa-solid fa-house"></i>
                    <a href="index.html">home</a>
                </li>
                <li id ="calendar.html">
                    <i class="fa-solid fa-calendar-days"></i>
                    <a href="calendar.html">calendar time</a>
                </li>
                <li id="otherCountries.html">
                    <i class="fa-solid fa-earth-americas"></i>
                    <a>other countries</a>
                </li>
                <li id="contactus.html"> 
                    <i class="fa-solid fa-address-book"></i>
                    <a>contact us</a>
                </li>
            </ul>
        </div>`;
    let list = document.querySelector(".sections header .container .links > div .more")
    let list1 = document.querySelector(".sections header .container .links > div .list")
    for(let i = 0 ; i < list1.children.length ; i++){
        list1.children[i].onclick = function(){
            location.href = list1.children[i].id
        }
    }
    list.addEventListener("click",()=>{
        document.querySelector(".sections header .container .links > div .list").classList.toggle("show")
    })
}
// ---- end media query of header----
// ----------------end header---------------------
// ----------------start effects-------------------
// ----start animation of title----
function animation(country){
    let title = document.querySelector(".sections .effects .main-title h1")
    new Promise((resolve)=>{
        setTimeout(() => {
            title.innerHTML = "islamic prayers time"
            title.style =`animation: keyboard 3s 1s steps(20) 1 , border 1s both infinite;`
        }, 0);
        setTimeout(() => {
            title.innerHTML = `in ${country}`
            title.style = `animation: keyboard2 3s 0.5s steps(${country.length +3}) 1 , border 1s both infinite ; letter-spacing: 0 ; text-shadow: 0 0 6px #25b293;`
            resolve()
        }, 4000);
    }).then(()=>{
        setTimeout(() => {
            title.innerHTML = "islamic prayers time"
            title.style =`animation: keyboard3 2s steps(20) 1 forwards , border 1s both infinite;`
        }, 4000);
    })
}
// ----end animation of title----
// ----start effects----
function effects(){
    // ----start traduction----
    // ----start add selected class on the clicked language element----
    let validLanguage = document.querySelectorAll(".sections .effects .traduction div:first-child ul li")
    validLanguage.forEach((li)=>{
        let selected = document.getElementsByClassName("selected")
        li.addEventListener("click", ()=>{
            for(select of selected){
                select.classList.remove("selected")
            }
            li.classList.add("selected")
        })
    })
    // ----end add selected class on the clicked language element----
    // ----end traduction----
    // ----start effect dark mode----
    let icon = document.querySelector(".sections .effects .traduction div:last-child > i")
    icon.addEventListener("click", ()=>{
        icon.classList.toggle("night")
        if(icon.classList.contains("night")){
            document.querySelector(".sections header .container .links div a").classList.add("dark")
        }else{
            document.querySelector(".sections header .container .links div a").classList.remove("dark")
        }
    })
    // ----end effect dark mode----
    // ----start sound----
    let audio = document.querySelector(".sections .effects .traduction div:last-child > div i:last-child")
    if(sessionStorage.getItem("activate")){
        sound = true
        audio.classList = sessionStorage.getItem("activate")
        audio.style = "color: #ffba3c;cursor:default;"
        audio.previousElementSibling.style = "display:none"
    }
    audio.onclick = function(){
        sound = true
        audio.classList = "fa-solid fa-volume-high"
        audio.style = "color: #ffba3c;cursor:default;"
        audio.previousElementSibling.style = "display:none"
        sessionStorage.setItem("activate" , audio.classList)
    }
    // ----end sound----
}
effects()
// ----------------end effects-------------------
// ----------------start content-------------------
// start muadinin
function getMuadinin(id){
    axios.get("muazin.json").then((response)=>{
        let list = document.querySelector(".main-section .content aside ul")
        let data = response.data
        list.innerHTML =""
        for(let i = 0 ; i < data.length ;i++){
            let content = `
                <li>
                    <img src="moaadinin/${data[i].image_src}" alt="">
                    <label for="moaadin${[i+1]}">
                        <p>${data[i].muaadin}</p>
                    </label>
                    <i id="${i+1}" class="fa-solid fa-volume-high" onclick="getCurrentSound(this.parentElement)"></i>
                    <input type="radio" id="${i+1}" onclick ="getTargetMuadin(this.id)">
                    <audio src="moaadinin/${data[i].audio_src}"></audio>
                </li>
            `
            list.innerHTML += content
        }
        list.children[id].children[3].setAttribute("checked" , true)
        window.localStorage.setItem("muadinId" , id)
    })
}
getMuadinin(0)
if(window.localStorage.getItem("muadinId")){
    getMuadinin(window.localStorage.getItem("muadinId"))
}
function getTargetMuadin(id){
    getMuadinin(id-1)
}
let currentAzan = null
function getCurrentSound(currentSound){
    if(currentAzan && currentAzan.src.includes(currentSound.lastElementChild.src)){
        if(!currentAzan.paused){
            currentAzan.pause()
            return
        }
    }
    if(currentAzan){
        currentAzan.pause()
    }
    currentAzan = new Audio(currentSound.lastElementChild.src)
    currentAzan.play()
}
// end muadinin
// ----start prayers times----
function getDataForCities(elements){
    let mainLink = document.querySelector(".sections header .container .location .earth > div > li .main-link");
    let parentOfPrayersTime = document.querySelector(".main-section .content .times div .prayers-time ul")
    let h4 = document.querySelector(".main-section .content .times div .hours")
    document.querySelectorAll(".main-section .content nav div ul li").forEach((city)=>{
        let clicked = document.getElementsByClassName("clicked")
        city.addEventListener("click", ()=>{
            for(click of clicked){
                click.classList.remove("clicked")
            }
            city.classList.add("clicked")
        })
    })
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let url = `https://api.aladhan.com/v1/calendarByCity/${year}/${month+1}?city=${elements}&country=${mainLink.textContent}`;
    axios.get(url).then((response) =>{
            let data = response.data
            let weekDay = document.querySelector(".main-section .content .times div .day")
            weekDay.innerHTML= `${data.data[day-1].date.gregorian.weekday.en} ,
            <span>${data.data[day-1].date.readable}</span>
            `
            let objOfPrayers = data.data[day-1].timings
            function getCurrentTime(){
                let now = new Date();
                let hours = String(now.getHours()).padStart(2 , "0");
                let minutes = String(now.getMinutes()).padStart(2 , "0");
                return `${hours}:${minutes}`
            }
            function updatePrayerTimes(){
                let currentTime = getCurrentTime()
                let nextPrayer = null
                let prayerTimesArray = [
                    {name:"fajr" , time: objOfPrayers.Fajr , id:"fajr-time"},
                    {name:"sunrise" , time: objOfPrayers.Sunrise , id:"sunrise-time"},
                    {name:"dhuhr" , time: objOfPrayers.Dhuhr , id:"dhuhr-time"},
                    {name:"asr" , time: objOfPrayers.Asr , id:"asr-time"},
                    {name:"maghrib" , time: objOfPrayers.Maghrib , id:"maghrib-time"},
                    {name:"isha" , time: objOfPrayers.Isha , id:"isha-time"}
                ]
                parentOfPrayersTime.innerHTML = ""
                for(let i = 0 ; i< prayerTimesArray.length ;i++){
                    let content = `
                        <li id ="${prayerTimesArray[i].id}">
                            <h5>${prayerTimesArray[i].name} :</h5>
                            <p>${prayerTimesArray[i].time}</p>
                            <i class="fa-solid fa-volume-high"></i>
                        </li>
                    `
                    parentOfPrayersTime.innerHTML += content
                    let currentPrayer = prayerTimesArray[i]
                    let nextPrayerItem = prayerTimesArray[(i + 1) % prayerTimesArray.length]
                    if(currentTime >= currentPrayer.time.slice(0,5) && currentTime < nextPrayerItem.time){
                        h4.innerHTML = `
                            <p>next prayer is : <span>${nextPrayerItem.name}</span></p>
                        `;
                        nextPrayer = nextPrayerItem
                    }
                    else if(currentPrayer.name ==="isha" && (currentTime >= currentPrayer.time.slice(0,5) || !nextPrayer)){
                        h4.innerHTML = `
                            <p>next prayer is : <span>${nextPrayerItem.name}</span></p>
                        `;
                        nextPrayer = prayerTimesArray[0]
                    }
                }
                if(window.matchMedia("(max-width:590px)").matches){
                    let aside = document.querySelector(".main-section .content aside")
                    let div = document.querySelector(".main-section .content .times > div .prayers-time")
                    let nav = document.querySelector(".main-section .content nav")
                    let lis = document.querySelectorAll(".main-section .content .times div .prayers-time ul li")
                    let h4Day = document.querySelector(".main-section .content .times div .day")
                    let h4Hours = document.querySelector(".main-section .content .times div .hours")
                    if(aside.offsetWidth > 60 || nav.offsetWidth > 40){
                        for(li of lis){
                            li.children[0].style = "font-size:13px;width:fit-content;"
                            li.children[1].style = "font-size:13px;flex-grow:1;margin:0 0 0 5px"
                            li.children[2].style = "font-size:12px;"
                            li.style = "padding: 12px 5px"
                            h4Day.style = "font-size:13px;line-height:18px; padding:5px 10px;"
                            h4Day.children[0].style = "font-size:13px;"
                            h4Hours.style = "font-size:13px;line-height:18px;padding:5px 10px;"
                            h4Hours.children[0].style = "font-size:13px;"
                        }
                    }
                    if(aside.offsetWidth > 60){
                        nav.style = "display:none"
                        div.style = "margin: 20px 0 20px 5px"
                    }
                    if(nav.offsetWidth > 40){
                        aside.style = "display:none"
                        div.style = "margin: 20px 5px 20px 0"
                    }
                    aside.onmouseenter = function(){
                        for(li of lis){
                            li.children[0].style = "font-size:13px;width:fit-content;"
                            li.children[1].style = "font-size:13px;flex-grow:1;margin:0 0 0 5px"
                            li.children[2].style = "font-size:12px;"
                            li.style = "padding: 12px 5px"
                            li.parentElement.style = "margin: 5px 0"
                            h4Day.style = "font-size:13px;line-height:18px;padding:5px 10px;"
                            h4Day.children[0].style = "font-size:13px;"
                            h4Hours.style = "font-size:13px;line-height:18px;padding:5px 10px;"
                            h4Hours.children[0].style = "font-size:13px;"
                            nav.style = "display:none"
                            div.style = "margin: 20px 0 20px 5px"
                        }
                    }
                    aside.onmouseleave = function(){
                        for(li of lis){
                            li.children[0].style = ""
                            li.children[1].style = ""
                            li.style = ""
                            li.parentElement.style = ""
                            h4Day.style = ""
                            h4Day.children[0].style = ""
                            h4Hours.style = ""
                            h4Hours.children[0].style = ""
                            div.style = ""
                            nav.style = ""
                        }
                    }
                    nav.onmouseenter = function(){
                        for(li of lis){
                            li.children[0].style = "font-size:13px;width:fit-content;"
                            li.children[1].style = "font-size:13px;flex-grow:1;margin:0 0 0 5px"
                            li.children[2].style = "font-size:12px;"
                            li.style = "padding: 12px 5px"
                            li.parentElement.style = "margin: 5px 0"
                            h4Day.style = "font-size:13px;line-height:18px;"
                            h4Day.children[0].style = "font-size:13px;"
                            h4Hours.style = "font-size:13px;line-height:18px;"
                            h4Hours.children[0].style = "font-size:13px;"
                            aside.style = "display:none"
                            div.style = "margin:20px 5px 20px 0"
                        }
                    }
                    nav.onmouseleave = function(){
                        for(li of lis){
                            li.children[0].style = ""
                            li.children[1].style = ""
                            li.style = ""
                            li.parentElement.style = ""
                            h4Day.style = ""
                            h4Day.children[0].style = ""
                            h4Hours.style = ""
                            h4Hours.children[0].style = ""
                            aside.style = ""
                            div.style = ""
                        }
                    }
                }
                parentOfPrayersTime.children[1].lastElementChild.classList = "fa-solid fa-volume-xmark"
                prayerTimesArray.forEach((prayer)=>{
                    document.getElementById(prayer.id).classList.remove("highlight")
                })
                if(nextPrayer){
                    document.getElementById(nextPrayer.id).classList.add("highlight")
                }
                for(let i = 0; i < parentOfPrayersTime.children.length; i++){
                    if(parentOfPrayersTime.children[i].children[1].innerHTML.slice(0,5) == currentTime && !parentOfPrayersTime.children[i].children[0].innerHTML.includes("sunrise") ){
                        let mainLink = document.querySelector(".sections header .container .location .earth > div li .main-link")
                        axios.get("https://apiip.net/api/check?accessKey=4d7f6e95-8aa4-46e3-acd1-2efd7abbff41").then((response)=>{
                            let checked = Array.from(document.querySelectorAll(".main-section .content aside ul li")).filter((el)=>{
                                return el.children[3].hasAttribute("checked")
                            })
                            if(response.data.countryCode === mainLink.getAttribute("data-code")){
                                document.querySelector(".adhan").innerHTML = `
                                <div>
                                    <img src="border.png" alt="">
                                    <div class="close">
                                        <i class="fa-solid fa-mosque main-icon"></i>
                                        <i class="fa-solid fa-xmark closing"></i>
                                        </div>
                                    <h3>${currentTime}</h3>
                                    <div class="prayer">
                                        <img src="islamic royal.png" alt="">
                                        <h5>${parentOfPrayersTime.children[i].children[0].innerHTML.substr(0, parentOfPrayersTime.children[i].children[0].innerHTML.length - 2)}</h5>
                                        <div>
                                            <img src="${checked[0].children[0].getAttribute("src")}" alt="">
                                            <p>${checked[0].children[1].children[0].innerHTML}</p>
                                        </div>
                                    </div>
                                </div>
                                `
                                document.querySelector(".adhan").style = "display:flex;"
                                if(sound === true && sessionStorage.getItem("activate")){
                                    checked[0].lastElementChild.play()
                                    document.querySelector(".adhan > div .close .closing").onclick = function(){
                                        document.querySelector(".adhan").style = "display:none;"
                                        checked[0].lastElementChild.pause()
                                    }
                                    setTimeout(() => {
                                        document.querySelector(".adhan").style = "display:none;"
                                        checked[0].lastElementChild.onloadedmetadata = function(){
                                            checked[0].lastElementChild.pause()
                                        }
                                    },Math.ceil(checked[0].lastElementChild.duration * 1000));
                                }
                                else{
                                    document.querySelector(".adhan > div .close .closing").onclick = function(){
                                        document.querySelector(".adhan").style = "display:none;"
                                        checked[0].lastElementChild.pause()
                                    }
                                    setTimeout(() => {
                                        document.querySelector(".adhan").style = "display:none;"
                                        checked[0].lastElementChild.pause()
                                    }, 120000);
                                }
                            }
                        })
                    }
                }
            }
            updatePrayerTimes()
            setInterval(() => updatePrayerTimes(), 60000);
        })
    }
// ----end prayers times----
// ----------------end content-------------------