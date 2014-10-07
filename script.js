var handledTumblrs = ["http://lesjoiesducode.fr", "http://thecodinglove.com"];

// get content and add it to view
function display(general_id) {
  setTimeout(function() {
    var entryUrl = $('div[id*="' + general_id + '"]').find('a[id*="entry_title"]').first().attr('href');

    var slashAfterDomainIndex = entryUrl.indexOf('/', 7);
    var domain = entryUrl.substr(0, slashAfterDomainIndex);
    if ( $.inArray(domain, handledTumblrs) > -1 ) {
      var entryBody = $('div[id*="' + general_id + '"]').find('div[id*="entryBody"]').first();

      var loaderImgUrl = "https://s3.feedly.com/production/head/images/loading-rectangle.gif";
      entryBody.prepend('<center><img id="temp" src="' + loaderImgUrl + '"/></center>');

      $.get(entryUrl, function( data ) {      
        var img_url = $(data).find('.e > img').attr('src');                
        if ( entryBody.first().find('img').first().attr('src') != img_url ) {
          $('#temp').remove();
          entryBody.prepend('<center><img src="' + img_url + '"/></center>');
        }
      }, 'html');
    }
  }, 300);
}

// keayboard control
$(document).keydown(function(evt) {
  var general_id;
  general_id = $('.inlineFrame, .slideEntryContent').find('table').find('a').first().attr('id').split('=')[0];
  display(general_id);
});

// mouse control
$(document).on('click', function(evt) {
  var general_id;
  if ( $(evt.target).is('a') ) {
    general_id = $(evt.target).attr('id').split('=')[0];
  }
  else if ( $(evt.target).is('div') ) {
    general_id = $(evt.target).find('a').attr('id').split('=')[0];
  }
  else {
    return;
  }
  display(general_id);
});