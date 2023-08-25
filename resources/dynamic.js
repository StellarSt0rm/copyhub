// Template Filler Function
function appendTemplate(id, pasta, tags) {
	const template = `
		<container style="margin: 10px;">
			<button onclick="handleIdClick('${id}')" class="id-text">ID: ${id}</button>
			<p class="pasta">${pasta}</p>
			<div class="tags">
				<p class="text">Tags:&nbsp;</p>
				${tags.map(tag => `<button onclick="handleTagClick('${tag}')">${tag}</button>&nbsp;`).join('')}
			</div>
		</container>
	`;
	
	console.log(`Filling Template For ID '${id}'`);
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
}

function handleIdClick(id) {
	console.log(`ID '${id}' Clicked. (And Copied To User Clipboard)`);
	navigator.clipboard.writeText(`${id}`);
}

// Test Function To Search In The Json (Will Be Hooked With 'appendTemplate()' At Some Point
function searchTags(pastaJsonData, searchTerm) {
	console.log(`Searching Tag Matches For '${searchTerm}'`)
	function searchJson(pastaJsonData, searchTerm) {
		let matches = [];
		for (let key in pastaJsonData) {
			let value = pastaJsonData[key];
			if (typeof value === "object" && "tags" in value) {
				let tags = value["tags"];
				if (tags.includes(searchTerm)) {
					matches.push(key);
					console.log(`  Match Found!`);
				}
			}
			if (typeof value === "object") {
				matches = matches.concat(searchJson(value, searchTerm));
			}
		}
		return matches
	}
	const results = searchJson(pastaJsonData, searchTerm);
	if (results.length > 0) {
		return results
	} else {
		return results
	}
}

// Data Extractor From ID
function extractJsonData(ids, pastaJsonData) {
	for (const id of ids) {
		const idData = pastaJsonData[id];
			if (idData) {
				console.log(`Extracting Data For ID '${id}'`)
				console.log(`  Extracting Pasta`)
				const pasta = idData.pasta;
				console.log(`  Extracting Tags`)
				const tags = idData.tags;

				console.log(`  Sending Data To 'appendTemplate()'`)
				console.log(` --`)
				appendTemplate(id, pasta, tags);
		}
	}
}

// Search Handler
document.getElementById('searchbar').addEventListener('submit', function(event) {
	event.preventDefault(); // Prevents the form from submitting normally

	var searchQuery = document.getElementById('textbox').value;

	var url = 'https://stellarst0rm.github.io/copyhub/search?query=' + encodeURIComponent(searchQuery) + '&param=1234';

	window.location.href = url; // Redirects to the search page with the query parameters
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
			document.getElementById("loader-wrapper").classList.add("loaded");
			for (const id in pastaJsonData) {
				if (pastaJsonData.hasOwnProperty(id)) {
					const { pasta, tags } = pastaJsonData[id];
					appendTemplate(id, pasta, tags);
				}
			}
			document.getElementById("content").classList.add("loaded2");
	} catch (error) {
		console.error('(Set Json Data) An error occurred:', error);
	}
}

automaticFilling();