const definitionResult = document.getElementById("definitionResult");
const wordInput = document.getElementById("word");

document.getElementById("getDefinition").addEventListener("click", async () => {
  const word = wordInput.value;
  if (!word) {
    definitionResult.textContent = "Please enter a word.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (!response.ok) {
      throw new Error("Word not found");
    }

    const data = await response.json();
    console.log(data);
    displayDefinition(data);

    // for (let i = 0; i < tasks.length; i++) {
    //   const task = tasks[i];
    //   const li = document.createElement("p");
    //   li.innerHTML = `
    //     <span>${task.name}</span>
    //     <button onclick="deleteTask(${i})">Delete</button>
    //   `;
    //   taskList.appendChild(li);
    // }
  } catch (error) {
    definitionResult.textContent = `Error: ${error.message}`;
  }
});

function displayDefinition(data) {
  definitionResult.innerHTML = ""; // Clear previous results

  const word = data[0].word;
  const phonetic = data[0].phonetic || "Phonetic not available";
  const meanings = data[0].meanings;

  const titleElement = document.createElement("h3");
  titleElement.textContent = `Definition of ${word}`;
  definitionResult.appendChild(titleElement);

  const phoneticElement = document.createElement("p");
  phoneticElement.className = "phonetic";
  phoneticElement.innerHTML = `<strong>Phonetic:</strong> ${phonetic}`;
  definitionResult.appendChild(phoneticElement);

  for (let i = 0; i < meanings.length; i++) {
    const meaning = meanings[i];
    const meaningDiv = document.createElement("div");
    meaningDiv.className = "meaning";

    const partOfSpeechElement = document.createElement("h4");
    partOfSpeechElement.textContent = `Part of Speech: ${meaning.partOfSpeech}`;
    meaningDiv.appendChild(partOfSpeechElement);

    for (let j = 0; j < meaning.definitions.length; j++) {
      const def = meaning.definitions[j];
      const definitionElement = document.createElement("p");
      definitionElement.innerHTML = `<strong>Definition:</strong> ${def.definition}`;
      meaningDiv.appendChild(definitionElement);

      if (def.example) {
        const exampleElement = document.createElement("p");
        exampleElement.innerHTML = `<em>Example:</em> ${def.example}`;
        meaningDiv.appendChild(exampleElement);
      }
    }

    definitionResult.appendChild(meaningDiv);
  }
}
