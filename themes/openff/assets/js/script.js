$(document).ready(function () {
  $('[data-menu]').mouseover(function () {
    $('[data-submenu]').removeClass('hover');
    $('[data-submenu="' + $(this).attr('data-menu') + '"]').addClass('hover');
  })
  $('.submenus').mouseleave(function () {
    $('[data-submenu]').removeClass('hover');
  })
  setHash();
  $('[data-subheader]').each(function () {
    var subheader = $(this);
    $('main').find($(this).attr('data-subheader')).each(function () {
      var text = $(this).text();
      var slug = slugify(text);
      var button = $('<div><b><a data-active="hash" href="#' + slug + '">' + text + '</a></b></div>');
      subheader.append(button);
      $(this).before('<a name="' + slug + '"></a>');
    });
  })
  $('.foldopen-readmore').click(function () {
    var container = $(this).closest('.foldopen');
    container.addClass('opening');
    window.setTimeout(function () {
      container.addClass('opened');
    }, 10, container)
  })
  $('.foldopen-readless').click(function () {
    var container = $(this).closest('.foldopen');
    container.removeClass('opened opening');
  })
})
$( window ).on( 'hashchange', function( e ) {
  setHash();
});
function setHash() {
  var hash = document.location.hash.replace('#', '');
  $('[data-filter]').each(function () {
    var filters = $(this).attr('data-filter').split(',');
    var found = !!!hash
    for (var i in filters) {
      var filter = filters[i].trim()
      if (hash && filter && hash.split('_').indexOf(filter) >= 0) {
        found = true
      }
      if (found) {
        $(this).removeClass('inactive')
      } else {
        $(this).addClass('inactive')
      }
    }
  })
  $('[data-active="hash"]').each(function () {
    if (hash === $(this).attr('href').replace('#', '')) $(this).addClass('active')
    else $(this).removeClass('active')
  })
}
function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}