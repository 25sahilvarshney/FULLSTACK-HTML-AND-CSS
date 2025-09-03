const avatarContainer = document.getElementById("avatarContainer");
const generateBtn = document.getElementById("generateBtn");
const clearBtn = document.getElementById("clearBtn");
const nameInput = document.getElementById("nameInput");

let avatars = [];

function renderAvatars() {
  avatarContainer.innerHTML = '';
  for (let i = 0; i < avatars.length; i++) {
    const name = avatars[i];
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatar');
    
    if (name) {
      const initials = name.slice(0, 2).toUpperCase();
      avatarDiv.innerText = initials;

      const label = document.createElement("span");
      label.innerText = name;
      avatarDiv.appendChild(label);

      // Remove on click
      avatarDiv.onclick = () => {
        avatars[i] = null; // mark empty
        renderAvatars();
      };
    } else {
      avatarDiv.classList.add("empty");
    }

    avatarContainer.appendChild(avatarDiv);
  }
}

generateBtn.onclick = () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter a name!");

  // Reuse first empty spot
  const emptyIndex = avatars.findIndex(a => a === null);
  if (emptyIndex !== -1) {
    avatars[emptyIndex] = name;
  } else {
    avatars.push(name);
  }

  nameInput.value = '';
  renderAvatars();
};

clearBtn.onclick = () => {
  avatars = [];
  renderAvatars();
};