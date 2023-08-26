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