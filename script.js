const playerSide = document.getElementById("player")
const playerX = document.getElementById("x")
const playerO = document.getElementById("o")

playerSide.addEventListener("click", () => {
    const playerModal = document.getElementById("playermodal")
    playerModal.style.visibility = "visible"
})

playerX.addEventListener("click", () => {
    const playerModal = document.getElementById("playermodal")
    playerModal.style.visibility = "hidden"
})
playerO.addEventListener("click", () => {
    const playerModal = document.getElementById("playermodal")
    playerModal.style.visibility = "hidden"
})