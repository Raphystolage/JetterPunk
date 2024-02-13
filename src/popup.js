function checkCheckboxes() {
    chrome.storage.local.get("features").then((result) => {
        for(var feature of result.features) {
            document.getElementById(feature.name + "-checkbox").checked = feature.isActive;
        }
    });
}

checkCheckboxes();