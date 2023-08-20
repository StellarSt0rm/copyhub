console.log(`Automatic Filling:\n `); console.log(`----`)
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
  console.log(`Appending Template To '#content'`);
  contentElement.insertAdjacentHTML("beforeend", template);
  console.log(`  Appended Template.`);
  console.log(`----`);
  return "Done.";
}

function handleTagClick(tag) {
  console.log(`Tag '${tag}' Clicked.`);
}

function handleIdClick(id) {
  console.log(`ID '${id}' Clicked. (And Copied To User Clipboard)`);
  navigator.clipboard.writeText(`${id}`);
}

function SearchTags(jsonData, searchTerm) {
	console.log(`Searching Tag Matches For '${searchTerm}'`)
	function searchJson(jsonData, searchTerm) {
		let matches = [];
		for (let key in jsonData) {
			let value = jsonData[key];
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
	const results = searchJson(jsonData, searchTerm);
	if (results.length > 0) {
		return results
	} else {
		return results
	}
}

// Example data for multiple template executions
const templateDataList = [
	{ id: "123", pasta: "Pasta Text 1", tags: ["Tag1", "Tag2"] },
	{ id: "456", pasta: "Pasta Text 2", tags: ["Tag3", "Tag4"] },
	{ id: "789", pasta: "Pasta Text 3", tags: ["Tag5", "Tag6"] },
	{ id: "101112", pasta: "Pasta Text 4", tags: ["Tag7", "Tag8"] },
	// Add more template data objects as needed
]
const jsonData = {
	"1": {
			"tags": ["apple", "banana", "cherry"]
	},
	"2": {
			"tags": ["banana", "grape"]
	},
	"3": {
			"tags": ["apple", "orange"]
	},
	"4": {
			"tags": ["banana", "strawberry"]
	},
	"5": {
			"tags": ["kiwi", "mango"]
	}
};

// Fill and append templates using the example data
templateDataList.forEach(data => {
	appendTemplate(data.id, data.pasta, data.tags);
})