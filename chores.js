var contentArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

document.getElementById("save_chore").addEventListener("click", () => {
  addChore();
});

document.getElementById("delete_chores").addEventListener("click", () => {
  localStorage.clear();
  flashcards.innerHTML = '';
  contentArray = [];
});

document.getElementById("show_chore_box").addEventListener("click", () => {
  document.getElementById("create_chore").style.display = "block";
});

document.getElementById("close_chore_box").addEventListener("click", () => {
  document.getElementById("create_chore").style.display = "none";
});

choreMaker = (text, delThisIndex) => {
  const chore = document.createElement("div");
  const choreTitle = document.createElement('h2');
  const frequency = document.createElement('h2');
  const del = document.createElement('i');

  chore.className = 'chore';

  choreTitle.setAttribute("style", "border-top:1px solid red; padding: 15px; margin-top:30px");
  choreTitle.textContent = text.my_choreTitle;

  frequency.setAttribute("style", "text-align:center; display:none; color:red");
  frequency.textContent = text.my_frequency;

  del.className = "fas fa-minus";
  del.addEventListener("click", () => {
    contentArray.splice(delThisIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    window.location.reload();
  })

  chore.appendChild(choreTitle);
  chore.appendChild(frequency);
  chore.appendChild(del);

  chore.addEventListener("click", () => {
    if(frequency.style.display == "none")
      frequency.style.display = "block";
    else
      frequency.style.display = "none";
  })

  document.querySelector("#chores").appendChild(chore);
}

contentArray.forEach(choreMaker);

addChore = () => {
  const choreTitle = document.querySelector("#choreTitleInput");
  const frequency = document.querySelector("#frequencyInput");

  let chore_info = {
    'my_choreTitle' : choreTitle.value,
    'my_frequency'  : frequency.value
  }

  contentArray.push(chore_info);
  localStorage.setItem('items', JSON.stringify(contentArray));
  choreMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  choreTitle.value = "";
  frequency.value = "";
}