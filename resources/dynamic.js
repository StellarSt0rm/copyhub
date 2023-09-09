// Other Functions
function wait(secs) {
  return new Promise(resolve => setTimeout(resolve, secs * 1000));
}

// Time Calc Function
function calcTime() {
  if(ctrl == 100) {
    return `0s`
  } else if(ms == 99) {
    ms = 0
    s++
    return `${s}.${ms}s`
  } else {
    ms++
    return `${s}.${ms}s`
  }
}

// Template Filler Function
function appendTemplate(id, pasta, tags, time) {
	const template = `
		<container style="margin: 10px; animation: fadeInCascading ${time} ease forwards;">
			<button onclick="handleIdClick('${id}')" class="id-text">ID: ${id}</button>
			<p class="pasta">${pasta}</p>
			<div class="tags">
				<p class="text">Tags:&nbsp;</p>
				${tags.map(tag => `<button onclick="handleTagClick('${tag}')">${tag}</button>&nbsp;`).join('')}
			</div>
		</container>
	`;
	
	console.log(`Filling Template For ID '${id}' (Ease In Time: ${time})`);
	const contentElement = document.getElementById("content");
	console.log(`  Inserted ID`)
	console.log(`  Inserted Pasta`)
	console.log(`  Inserted Tags`)
	console.log(`Appending Template To '#content'`);
	contentElement.insertAdjacentHTML("beforeend", template);
	console.log(`  Appended Template.`);
	console.log(`----`);
	return "Done.";
}

// Action Handler Functions
function handleTagClick(tag) {
	console.log(`Tag '${tag}' Clicked.`);
	var url = 'https://stellarst0rm.github.io/copyhub/search?tag=' + encodeURIComponent(tag) + '&param=1234';
	window.location.href = url;
}

function handleIdClick(id) {
	console.log(`ID '${id}' Clicked. (And Copied To User Clipboard)`);
	navigator.clipboard.writeText(`${id}`);
}

// Search Handler
document.getElementById('searchbar').addEventListener('submit', function(event) {
	event.preventDefault();
	var searchQuery = document.getElementById('textbox').value;
	var url = 'https://stellarst0rm.github.io/copyhub/search?query=' + encodeURIComponent(searchQuery) + '&param=1234';
	window.location.href = url;
});

/* Local Test Json Data (For Local Testing)
var pastaJsonData={
	"1": {
		"pasta": "Test Pasta 1",
		"cursed-level": 0,
		"made-as": "any",
		"directed-to": "any",
		"tags": [ "Test Tag 1", "Test Tag 2", "Test Tag 3", "Test Tag 4" ],
		"lang": "en_US"
	},
	"2": {
		"pasta": "Test Pasta 2",
		"cursed-level": 0,
		"made-as": "any",
		"directed-to": "any",
		"tags": [ "Test Tag 3", "Test Tag 4", "Test Tag 5", "Test Tag 6" ],
		"lang": "en_US"
	},
	"3": {
		"pasta": "Test Pasta 3",
		"cursed-level": 0,
		"made-as": "any",
		"directed-to": "any",
		"tags": [ "Test Tag 5", "Test Tag 6", "Test Tag 7", "Test Tag 8" ],
		"lang": "en_US"
	},
	"4": {
		"pasta": "Test Pasta 4",
		"cursed-level": 0,
		"made-as": "any",
		"directed-to": "any",
		"tags": [ "Test Tag 7", "Test Tag 8", "Test Tag 9", "Test Tag 10" ],
		"lang": "en_US"
	}
};*/

// Set Json Data And Start Initial Card Filling
var pastaJsonData = [];
async function automaticFilling() {
	console.log(`Transfering Pasta Data...`)
	try {
			const response = await fetch('./resources/copypastas.json');
			const jsonData = await response.json();
			pastaJsonData = jsonData;

			console.log(`Automatic Filling:\n `); console.log(`----`);
			await wait(0.1);
			s = 0
			ms = 0
			ctrl = 0
			if(!window.location.href.includes("copyhub/search")) {
				for (const id in pastaJsonData) {
					if (pastaJsonData.hasOwnProperty(id)) {
						const { pasta, tags } = pastaJsonData[id];
						appendTemplate(id, pasta, tags, calcTime());
					}
				}
			}
			document.getElementById("content").classList.add("loaded2");
			document.getElementById("loader-wrapper").classList.add("loaded");
	} catch (error) {
		console.error('(Set Json Data) An error occurred:', error);
	}
}
automaticFilling();