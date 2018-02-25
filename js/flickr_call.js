
function callFlickrApi(pageNumber) {
var myUrl = 'https://api.flickr.com/services/rest/?api_key=a74d8c55e6c6a6af7628ac7825dfacde&method=flickr.people.getPhotos&user_id=147634988@N06&format=json&per_page=10&content_type=1&extras=url_c,url_h,url_o&page='
var proxy = 'https://cors-anywhere.herokuapp.com/';
var finalURL = proxy + myUrl + pageNumber;
$.ajax({
  beforeSend: function(request) {
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
  },
  url: finalURL,
  success: function(data) {
    var dataString = JSON.stringify(data);
    dataString = dataString.replace('jsonFlickrApi(','');
    dataString = dataString.replace(')','');
    var jsonInitialParse = jQuery.parseJSON(dataString);
    var jsonTrueParse = jQuery.parseJSON(jsonInitialParse);
    addImages(jsonTrueParse.photos.photo);
    morePhotos();
  }
});
}
callFlickrApi();

var pageCount = 1;

function addImages(data) {
  $.each(data, function(i, item) {
    var flickrItem = document.createElement('img');
    flickrItem.src = item.url_c;
    flickrItem.className = 'img-fluid flickr-image';
    $('.gallery').append(flickrItem);
  });
}

function morePhotos() {
  var button = document.createElement('button');
  button.className="more-photos";
    $('.gallery').append('<br/>');
  $('.gallery').append(button);
  $('.more-photos').html('More Photos');
  $('.more-photos').on('click', function(event){
    $('.more-photos').remove();
    pageCount++;
    callFlickrApi(pageCount);
  });
}
