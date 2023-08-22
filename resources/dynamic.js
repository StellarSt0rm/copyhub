console.log(`Automatic Filling:\n `); console.log(`----`)

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
function searchTags(jsonTagsTestDataList, searchTerm) {
	console.log(`Searching Tag Matches For '${searchTerm}'`)
	function searchJson(jsonTagsTestDataList, searchTerm) {
		let matches = [];
		for (let key in jsonTagsTestDataList) {
			let value = jsonTagsTestDataList[key];
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
	const results = searchJson(jsonTagsTestDataList, searchTerm);
	if (results.length > 0) {
		return results
	} else {
		return results
	}
}

// Test Data
const jsonDataList = [
	{ id: "1", pasta: "Test Pasta 1", tags: [ "Test Tag 1", "Test Tag 2", "Test Tag 3" ] },
	{ id: "2", pasta: "Test Pasta 2", tags: [ "Test Tag 3", "Test Tag 4", "Test Tag 5" ] },
	{ id: "3", pasta: "Test Pasta 3", tags: [ "Test Tag 5", "Test Tag 6", "Test Tag 7" ] },
	{ id: "4", pasta: "Test Pasta 4", tags: [ "Test Tag 7", "Test Tag 8", "Test Tag 9" ] },
]
var jsonTagsTestDataList=[]; fetch('./resources/copypastas.json').then(response => response.json()).then(jsonData => { jsonTagsTestDataList = jsonData; })

// Fill Templates
jsonDataList.forEach(data => {
	appendTemplate(data.id, data.pasta, data.tags);
})
