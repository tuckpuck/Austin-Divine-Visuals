var myUrl = 'https://api.flickr.com/services/feeds/photos_public.gne?id=147634988@N06&format=json&nojsoncallback=1'
var proxy = 'https://cors-anywhere.herokuapp.com/';
var finalURL = proxy + myUrl;

$.ajax({
    url: finalURL,
    success: function(data) {
        console.log(data);
        addImages(data);
    }
});

/*
Get your Flickr Id from: http://idgettr.com/ and replace it with the flickrId variable on the next line. That way you have access to the images that are associated with your account.
*/
// https://api.flickr.com/services/rest/";var flickrOptions={method:"flickr.photos.search",user_id:"136839724@N02",api_key:"e94ed6119afae842434d2aaf7e636558"
//     privacy_filter:1,tags:$jscomp$loop$1.country,extras:"url_m,url_z",per_page:100,format:"json",nojsoncallback:1}

/*-------------------------------------
                  FEEDS
---------------------------------------*/
/********* PERSONAL *********/
var flickrURL = 'https://api.flickr.com/services/feeds/photos_public.gne?id=147634988@N06&format=json&nojsoncallback=1';




/*-------------------------------------
            FLICKR API CALL
---------------------------------------*/
// Using jQuery we can easily make the call to flickr using $.getJSON
// $.getJSON(flickrURL).done(function(data) {
  // console.log(data);
  // addImages(data);
// });

/*-------------------------------------
       ADD IMAGES TO THE GALLERY
---------------------------------------*/
function addImages(data) {
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
  });
}
