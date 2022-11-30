// This is an array containing the paths to all the 
// images we have used for cards so far
// we need this so we can prevent duplicate
// images from being used on our cards
const entityImagesUsed = [];

// this map is used to escape xml entities
// to there character equivalent
var escaped_one_to_xml_special_map = {
'&amp;': '&',
'&quot;': '"',
'&lt;': '<',
'&gt;': '>'
};
// this function uses the above map to replace 
// all xml entities to there character equivalent
function decodeXml(string) {
    return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g,
        function(str, item) {
            return escaped_one_to_xml_special_map[item];
    });
}

/*function constrainLength(str, length)
{
    if (str.length > length)
    {
        console.log("this ran");

        //trim the string to the maximum length
        str = str.substring(0, length);
        //re-trim if we are in the middle of a word
        str = str.substr(0, Math.min(str.length, str.lastIndexOf(" ")))
        
        str += "...";
    }
    return str;
}
*/

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        getInfo(this);
    }
};
xhttp.open("GET", "themes.xml", true);
xhttp.send();

// toursXML is the response from an XML request for the themes.xml
// This function calls the getXMLForTheme function for each
// ThemeData in the themes.xml
function getInfo(toursXML) {
    var tours, xmlDoc;
    xmlDoc = toursXML.responseXML;
    tours = xmlDoc.getElementsByTagName("ThemeData");
    for (i = 0; i < tours.length; i++) {
        var themeName = tours[i].childNodes[3].innerHTML;
        themeName = decodeXml(themeName);
        var themeDescription = tours[i].childNodes[0].innerHTML;
        themeDescription = decodeXml(themeDescription);
        //themeDescriptionTrimmed = constrainLength(themeDescription, 100);
        var themeId = tours[i].childNodes[2].innerHTML;

        createCard(themeName, themeDescription, themeId);

        getXMLForTheme(themeName, themeDescription, themeId);
    }
};

// This function makes a XMLHttpRequest to load in
// the xml for a specific theme
function getXMLForTheme(themeName, themeDescription, themeId)
{
    // make xml request to get the theme data
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            getImageFromXML(this, themeId);
        }
    };
    
    xhttp.open("GET", "xmlForEachTheme/" + themeId +  ".xml", true);
    xhttp.send(); 
}

// Uses the xml file for the specific theme to find an image for the card
// then populates the image based on the image-[themeId] id attribute
// added to each cards image
function getImageFromXML(themeXML, themeId)
{
    var entities, xmlDoc;
    xmlDoc = themeXML.responseXML;
    entities = xmlDoc.getElementsByTagName("ThemeEntityAbridgedData");
    for (i = 0; i < entities.length; i++) {
        var imagePath = entities[i].childNodes[0].innerHTML;
        var imageName = entities[i].childNodes[1].innerHTML;
        // Check to see if the imagePath is not empty
        // if it is empty we will try the next entity
        if ((imagePath || imagePath.trim()) && (entityImagesUsed.indexOf(imagePath) >= 0) == false){
            var image = document.getElementById("image-"+themeId);
            image.setAttribute('src', imagePath);
            image.setAttribute('alt', imageName);
            entityImagesUsed.push(imagePath);
            break; // we only want one card per theme
        }
    }
}