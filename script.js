// get content and add it to view
function(general_id) {
  setTimeout(function() {
    var entryUrl = $('div[id*="' + general_id + '"]').find('a[id*="entry_title"]').first().attr('href');

    if ( entryUrl.indexOf('lesjoiesducode') > -1 ) {
      var entryBody = $('div[id*="' + general_id + '"]').find('div[id*="entryBody"]').first();     
      $.get(entryUrl, function( data ) {      
        var img_url = $(data).find('.e > img').attr('src');                
        if ( entryBody.first().find('img').first().attr('src') != img_url ) {
          entryBody.prepend('<center><img src="' + img_url + '"/></center>');
        }
      }, 'html');
    }
  }, 300);
}

// keayboard control
$(document).keydown(function(evt) {
  var general_id;
  setTimeout(function() {
    general_id = $('.inlineFrame, .slideEntryContent').find('table').find('a').first().attr('id').split('=')[0];
    display(general_id);
  }, 300);
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