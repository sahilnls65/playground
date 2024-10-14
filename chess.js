document.addEventListener("DOMContentLoaded", () => {
  const chessboard = document.getElementById("chessboard");
  const colors = ["white", "black"];

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add(colors[(row + col) % 2]);
      square.addEventListener("click", () => {
        if (square.style.backgroundColor === "pink") {
          square.style.backgroundColor = "";
          square.classList.add(colors[(row + col) % 2]);
        } else {
          square.style.backgroundColor = "pink";
          square.classList.remove("white", "black");
        }
      });
      chessboard.appendChild(square);
    }
  }
});
