function setSettingsCookie(settingsJsonData, exdays) {
  document.cookie = `settings=${settingsJsonData};expires=${new Date(Date.now() + exdays * 86400000).toUTCString()};path=/;SameSite=Strict;Secure`;
}

function getSettingsCookie() {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf("settings=") === 0) {
      return JSON.parse(cookie.substring(9, cookie.length));
    }
  }
}

function deleteSettingsCookie() {
	const expiredDate = new Date(0).toUTCString();
	document.cookie = `settings=;expires=${expiredDate};path=/;SameSite=Strict;Secure`;
}