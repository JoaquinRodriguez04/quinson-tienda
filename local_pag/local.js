// variables

const icon_list = document.getElementById("list")
const navbar = document.getElementById("navbar_container")
const btn_close = document.getElementById("btn_close")

// funciones

// events

icon_list.addEventListener("click",() => {
    navbar.classList.toggle("display_block")
    icon_list.classList.toggle("display_none")
})

btn_close.addEventListener("click",() => {
    navbar.classList.remove("display_block")
    icon_list.classList.remove("display_none")
})