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

    setTimeout(function() {
      var entryUrl  = $('div[id*="' + general_id + '"]').find('a[id*="entry_title"]').first().attr('href');

      if ( entryUrl.indexOf('lesjoiesducode') > -1 ) {
        var entryBody = $('div[id*="' + general_id + '"]').find('div[id*="entryBody"]').first();     

        $.get(entryUrl, function( data ) {      
            var img_url = $(data).find('.e > img').attr('src');                
            entryBody.prepend('<img src="' + img_url + '"/>');
        }, 'html');
      }
    }, 500);
});