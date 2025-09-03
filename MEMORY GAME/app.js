function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const emojis = ["🐶", "🐱", "🐰", "🦊", "🐼", "🐵", "🐸", "🐷"];

let newArray = shuffle([...emojis,...emojis]);

console.log(newArray);

// Select the box

let div = document.querySelector("#game-board");

newArray.forEach((val,idx)=>{
    // console.log(val,idx);
    // Creat a new box
    let card = document.createElement('div');
    // Add class for styling
    card.setAttribute("class","card");

    
    // Storing addition info
    card.dataset.emoji = val; 

    card.dataset.index = idx;

    card.addEventListener("click",handleClick);

    // Append the class

    div.appendChild(card);
    

    console.log(card);
})
function handleClick(e) {
  console.log(EventTarget.target);
  console.log("box clicked");
}
