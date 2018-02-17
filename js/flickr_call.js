// var myUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?id=147634988@N06&format=json&nojsoncallback=1'
var myUrl = 'https://api.flickr.com/services/rest/?api_key=a74d8c55e6c6a6af7628ac7825dfacde&method=flickr.people.getPhotos&user_id=147634988@N06&format=json&per_page=500&content_type=1&extras=url_z,url_q,description'
var proxy = 'https://cors-anywhere.herokuapp.com/';
var finalURL = proxy + myUrl;
console.log(finalURL);

$.ajax({
  beforeSend: function(request) {
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
  },
  url: finalURL,
  success: function(data) {
    console.log(data);
    var dataString = JSON.stringify(data);
    var jsonParsed = jQuery.parseJSON(dataString);
    console.log(typeof(jsonParsed));
    addImages(jsonParsed);
  }
});

/*
Get your Flickr Id from: http://idgettr.com/ and replace it with the flickrId variable on the next line. That way you have access to the images that are associated with your account.
*/



/*-------------------------------------
                  FEEDS
---------------------------------------*/
/********* PERSONAL *********/

// $.ajaxSetup({
//   headers: {
//     'x-requested-with':'XMLHttpRequest',
//     'Access-Control-Allow-Origin':'*'
//   }
// });
//
// var flickrURL = 'https://api.flickr.com/services/rest/?api_key=a74d8c55e6c6a6af7628ac7825dfacde&method=flickr.people.getPhotos&user_id=147634988@N06&format=json&per_page=500&content_type=1&extras=url_z,url_q,description';
// var proxy = 'https://cors-anywhere.herokuapp.com/';
// var finalURL = proxy + flickrURL;
// console.log(finalURL);
// //
// //
// //
// $.getJSON(finalURL,function(data){
//   console.log(data);
//   addImages(data);
// });

/*-------------------------------------
       ADD IMAGES TO THE GALLERY
---------------------------------------*/
function addImages(data) {
  console.log(data);
  $.each(data.items, function(i, item) {
    var flickrItem = document.createElement('a');
    flickrItem.className = 'flickr-image';
    flickrItem.href = item.link;
    flickrItem.target = '_blank';
    flickrItem.img = document.createElement('img');
    flickrItem.img.alt = item.title;
    flickrItem.img.src = item.media.m.replace(/_m\.jpg/, '_q.jpg');
    flickrItem.appendChild(flickrItem.img);
    $('.gallery').append(flickrItem);
    console.log(flickrItem);
  });
}
