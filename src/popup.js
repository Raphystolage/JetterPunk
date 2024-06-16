// Translate strings
document.getElementById("subtitle-features").textContent = chrome.i18n.getMessage("Features")
document.getElementById("subtitle-settings").textContent = chrome.i18n.getMessage("Settings")
document.getElementById("feature-solve").textContent = chrome.i18n.getMessage("Solve")
document.getElementById("feature-title").textContent = chrome.i18n.getMessage("Title")
document.getElementById("setting-test").textContent = chrome.i18n.getMessage("Test")


/**
 * Bind check property of popup checkboxes to the matching feature activity
 * @return {void}
 */
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


/**
 * Change activity of feature "featureName"
 * @param {string} featureName Name of the feature
 * @return {void}
 */
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
