function setSettings(settingsJsonData) {
  localStorage.setItem("settings", JSON.stringify(settingsJsonData))
}

function getSettings() {
  const data = localStorage.getItem("settings")
  return JSON.parse(data)
}

function deleteSettings() {
  localStorage.removeItem("settings")
}