console.log(`Automatic Filling:\n `); console.log(`----`)

function fillTemplate(id, pastaText, tags) {
	const template = `
		<container style="margin: 10px;">
			<button onclick="handleIdClick('${id}')" class="id-text">ID: ${id}</button>
			<p class="pasta">${pastaText}</p>
			<div class="tags">
				<p class="text">Tags:&nbsp;</p>
				${tags.map(tag => `<button onclick="handleTagClick('${tag}')">${tag}</button>&nbsp;`).join('')}
			</div>
		</container>
	`;
	return template;
}

function handleTagClick(tag) {
	// Do something when a tag button is clicked
	console.log(`Tag '${tag}' Clicked.`);
}

function handleIdClick(id) {
	// Do something when a tag button is clicked
	console.log(`ID '${id}' Clicked. (And Copied To User Clipboard)`);
	navigator.clipboard.writeText(`${id}`)
}

function appendTemplate(id, pasta, tags) {
	console.log(`Filling Template For ID '${id}'`);
	const filledTemplate = fillTemplate(id, pasta, tags);
	console.log(`  Filled Template.`);
	const contentElement = document.getElementById("content");
	console.log(`Appending Template To '#content'`)
	contentElement.insertAdjacentHTML("beforeend", filledTemplate);
	console.log(`  Appended Template.`); console.log(`----`);
	return "Done."
}

// Example data for multiple template executions
const templateDataList = [
	{ id: "123", pasta: "Pasta Text 1", tags: ["Tag1", "Tag2"] },
	{ id: "456", pasta: "Pasta Text 2", tags: ["Tag3", "Tag4"] },
	{ id: "789", pasta: "Pasta Text 3", tags: ["Tag5", "Tag6"] },
	{ id: "101112", pasta: "Pasta Text 4", tags: ["Tag7", "Tag8"] },
	// Add more template data objects as needed
];

// Fill and append templates using the example data
templateDataList.forEach(data => {
	appendTemplate(data.id, data.pasta, data.tags);
});
