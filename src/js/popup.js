// query tab to handle this
chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;

    if (url.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)) {
        document.write('');
        chrome.tabs.create({url: 'https://youtubevi.com/watch?v=' + url.split('v=')[1]})
    } else if (url.match(/youtube.com/)) {
        document.getElementById('message').innerText = "⚠ The current tab contains a lot of videos, please select each video to download";
        document.getElementById('message').style.color = "#afaf0b";
    }
});


// add click goto
var clickEvent = document.getElementsByClassName('goto');

for (var i = 0; i < clickEvent.length; i++) {
    clickEvent[i].addEventListener('click', function () {
        chrome.tabs.create({url: 'https://youtubevi.com/'})
    })
}
