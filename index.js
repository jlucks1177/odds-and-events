// State
const state = {
  bank: [],
  odds: [],
  evens: [],
};

// Function to build our submit number form
function addNumberInput() {
  const form = document.createElement("form");
  form.innerHTML = `
        <label>
        Add a number to the number bank
        <input name="count" type="number"/>
        </label>
        <button>Add number</button>
    `;
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const count = data.get("count");
    const countNum = Number(count);
    if (Number.isInteger(countNum)) {
      state.bank.push(countNum);
      form.reset();
    }
    render();
  });
  return form;
}

// Building the sort controls
function buildSortControls() {
  const sortButtons = document.createElement("div");
  sortButtons.innerHTML = `
        <button type="button">Sort 1</button>
        <button type="button"> Sort All</button>
    `;
  const sortOneButton = sortButtons.querySelector("button:first-child");
  sortOneButton.addEventListener("click", (event) => {
    const moved = sortOne();
    if (moved) {
      render();
    }
  });
  const sortAllButton = sortButtons.querySelector("button:last-child");
  sortAllButton.addEventListener("click", (event) => {
    sortAll();
    render();
  });
  return sortButtons;
}

//Sort One Button functionality
function sortOne() {
  if (state.bank.length === 0) {
    return false;
  }
  const firstNum = state.bank.shift();

  if (firstNum % 2 === 0) {
    state.evens.push(firstNum);
  } else {
    state.odds.push(firstNum);
  }
  return true;
}

//Sort All Button functionality
function sortAll() {
  while (sortOne()) {
    // keep going :)
  }
}

//Building Bank!
function buildBank() {
  const bankSec = document.createElement("section");

  const bankCopy = Array.from(state.bank);
  bankCopy.sort((a, b) => a - b);

  const bankJoin = bankCopy.join("  | ");
  bankSec.innerHTML = `
    <h2>Bank</h2>  
    <p>${bankJoin}</p>
  `;
  return bankSec;
}

//Building Odds!
function buildOdds() {
  const oddsSec = document.createElement("section");

  const oddsCopy = Array.from(state.odds);
  oddsCopy.sort((a, b) => a - b);

  const oddsJoin = oddsCopy.join("  | ");
  oddsSec.innerHTML = `
    <h2>Odds</h2>  
    <p>${oddsJoin}</p>
  `;
  return oddsSec;
}

//Building Evens!
function buildEvens() {
  const evensSec = document.createElement("section");

  const evensCopy = Array.from(state.evens);
  evensCopy.sort((a, b) => a - b);

  const evensJoin = evensCopy.join("  | ");
  evensSec.innerHTML = `
    <h2>Evens</h2>  
    <p>${evensJoin}</p>
  `;
  return evensSec;
}

// Render function
const render = () => {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <h1>Odds and Evens</h1>
    `;

  app.append(
    addNumberInput(),
    buildSortControls(),
    buildBank(),
    buildOdds(),
    buildEvens()
  );
};

render();
