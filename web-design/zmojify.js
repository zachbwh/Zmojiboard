
currentLanguage = ["en", "English"]
currentLanguageData = "";
currntEmojis = [];
visibleEmojis = [];

languages = [
  ["af", "Afrikaans"],
  ["am", "Amharic"],
  ["ar", "Arabic"],
  ["as", "Assamese"],
  ["az", "Azerbaijani"],
  ["be", "Belarusian"],
  ["bg", "Bulgarian"],
  ["bn", "Bangla"],
  ["bs", "Bosnian"],
  ["ca", "Catalan"],
  ["cs", "Czech"],
  ["cy", "Welsh"],
  ["da", "Danish"],
  ["de", "German"],
  ["el", "Greek"],
  ["en", "English"],
  ["es", "Spanish"],
  ["et", "Estonian"],
  ["eu", "Basque"],
  ["fa", "Persian"],
  ["fi", "Finnish"],
  ["fil", "Filipino"],
  ["fr", "French"],
  ["ga", "Irish"],
  ["gl", "Galician"],
  ["gu", "Gujarati"],
  ["he", "Hebrew"],
  ["hr", "Croatian"],
  ["hu", "Hungarian"],
  ["hy", "Armenian"],
  ["id", "Indonesian"],
  ["is", "Icelandic"],
  ["it", "Italian"],
  ["ja", "Japanese"],
  ["ka", "Georgian"],
  ["kk", "Kazakh"],
  ["km", "Khmer"],
  ["kn", "Kannada"],
  ["ko", "Korean"],
  ["ky", "Kyrgyz"],
  ["lo", "Lao"],
  ["lt", "Lithuanian"],
  ["lv", "Latvian"],
  ["mk", "Macedonian"],
  ["ml", "Malayalam"],
  ["mn", "Mongolian"],
  ["mr", "Marathi"],
  ["ms", "Malay"],
  ["my", "Burmese"],
  ["nb", "Norwegian Bokmål"],
  ["ne", "Nepali"],
  ["nl", "Dutch"],
  ["or", "Odia"],
  ["pa", "Punjabi"],
  ["pl", "Polish"],
  ["pt", "Portuguese"],
  ["ro", "Romanian"],
  ["ru", "Russian"],
  ["si", "Sinhala"],
  ["sk", "Slovak"],
  ["sl", "Slovenian"],
  ["sq", "Albanian"],
  ["sr", "Serbian"],
  ["sv", "Swedish"],
  ["sw", "Swahili"],
  ["ta", "Tamil"],
  ["te", "Telugu"],
  ["th", "Thai"],
  ["tr", "Turkish"],
  ["uk", "Ukrainian"],
  ["ur", "Urdu"],
  ["uz", "Uzbek"],
  ["vi", "Vietnamese"],
  ["zh", "Chinese"],
  ["zu", "Zulu"],
]

function getLanguageIndex(languageCode) {
  for (i = 0; i < languages.length; i++) {
    if (languageCode == languages[i][0]) {
      return i;
    }
  }
}

function getLanguageData(languageIndex) {
  var languageRequest = new XMLHttpRequest();
  languageRequest.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      parser = new DOMParser();
      var languageData = parser.parseFromString(this.responseText,"text/xml");
      languages[languageIndex][2] = languageData;
      currentLanguageData = languageData;
    }
  }
  languageRequest.open("GET", "http://zmojify.io/languages/" + languages[languageIndex][0] + ".xml", true);
  languageRequest.send();
}

function search (search, language) {
  emojiListAll = currentLanguageData.getElementsByTagName("annotation");
  searchEmojiListExact = [];
  searchEmojiListPartial = [];
  search = search.toLowerCase();

  if (search != "" && search != null) {
    for (i = 0; i < emojiListAll.length; i++) {
      searchTotalMatch = false;
      searchPartialMatch = false;
      emojiTags = [];
      if (emojiListAll[i].getAttribute("type") != null && emojiListAll[i].getAttribute("type") == "tts") {
        emojiTags.push(emojiListAll[i].innerHTML)
      } else {
        emojiTags = emojiListAll[i].innerHTML.split(" | ");
      }
      for (j = 0; j < emojiTags.length; j++) {
        if (search == emojiTags[j].toLowerCase()) {
          searchTotalMatch = true;
        } else if (emojiTags[j].toLowerCase().startsWith(search)) {
          searchPartialMatch = true;
        }
      }
      //console.log(searchEmojiList.length);

      if (searchTotalMatch /*&& !containsEmoji(searchEmojiList, emojiListAll[i].getAttribute("cp"))*/) {
        searchEmojiListExact.push(emojiListAll[i].getAttribute("cp"));
      } else if (searchPartialMatch /*&& !containsEmoji(searchEmojiList, emojiListAll[i].getAttribute("cp"))*/) {
        searchEmojiListPartial.push(emojiListAll[i].getAttribute("cp"));
      }
    }
  }
  searchEmojiList = searchEmojiListExact.concat(searchEmojiListPartial);
  return searchEmojiList;
}

function containsEmoji (emojiArray, emoji) {
  for (i = 0; i < emojiArray.length; i++) {
    if (emojiArray[i] === emoji) {
      return true;
    }
  }
  return false;
}

function printEmojiNames(n) {
  for (i = 0; i < n; i++) {
    console.log(currentLanguageData.getElementsByTagName("annotation")[i].innerHTML)
  }
}

function handleKeyPress (event, query) {
  //console.log(event.which);
  var selected_emoji = document.getElementById("emoji-select");
  if (event.which == 38) { // up arrow key
  } else if (event.which == 40) { // down arrow key
  } else {
      results = search(query, "en");
      if (results.length != 0) {
        displayEmojis(results);
        //document.getElementById("output").innerHTML = results[0];
      } else {
        document.getElementById("output").innerHTML = "";
      }

  }
}

function displayEmojis (emojiArray) {
  document.getElementById("output").innerHTML = "";
  for (i = 0; i < emojiArray.length; i++) {
    var newElement = document.createElement('li');
    newElement.appendChild(document.createTextNode(emojiArray[i]));
    document.getElementById("output").appendChild(newElement);
  }
}

function populateLanguageList() {
  var selectBox = document.getElementById("languages");
  for (i = 0; i < languages.length; i++) {
    var newLanguage = document.createElement("option");
    newLanguage.innerHTML = languages[i][1];
    newLanguage.value = languages[i][0];
    selectBox.add(newLanguage);
  }
  selectBox.value = currentLanguage[0];
  //selectBox.disabled = true;
  selectBox.show = true;
}

getLanguageData(15);
new Clipboard('.btn');
