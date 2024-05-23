function initializeCheckboxes() {
    var checkboxes = document.getElementsByClassName("feature-checkbox");
    for(let checkbox of checkboxes) {
        let matchingFeatureName = checkbox.id.split("-checkbox")[0];
        chrome.storage.local.get("features").then((result) => {
            checkbox.checked = result.features[matchingFeatureName].isActive;
            checkbox.addEventListener("click", () => changeFeatureActivity(matchingFeatureName))
        });
    }
}

function changeFeatureActivity(featureName) {
    chrome.storage.local.get("features").then((result) => {
        for(var feature in result.features) {
            feature = result.features[feature];
            if(feature.name == featureName) {
                feature.isActive = !feature.isActive;
                result.features[featureName] = feature
                console.debug(`"${featureName}" feature activity changed to : ${feature.isActive}`)
                break;
            }
        }
        chrome.storage.local.set({"features": result.features})
    });
}

initializeCheckboxes();