function setSettings(settingsJsonData) {
  localStorage.setItem("settings", JSON.stringify(settingsJsonData))
}

function getSettings() {
  const data = localStorage.getItem("settings")
  if(data = null) {return false}
  return JSON.parse(data)

}

function deleteSettings() {
  localStorage.removeItem("settings")
}