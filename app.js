$(document).ready(onReady)

// Firefox 1.0+
const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
const isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
const isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
const isChrome = !!window.chrome && !!window.chrome.webstore;

console.log('isFirefox', isFirefox)
console.log('isSafari', isSafari)
console.log('isIE', isIE)
console.log('isEdge', isEdge)
console.log('isChrome', isChrome)

function onReady () {
  console.log('init!')

  const $tableContainer = $('#search-results')

  const tableWidth = $('.search-results').outerWidth()
  const tableHeaderHeight = $('#table-header').height()
  const $headerClone = $('<div />').addClass('fixed-header').width(tableWidth).height(tableHeaderHeight)

  $('#search-results th').each(function () {
      $('<div>' + $(this).html() + '</div>')
      .appendTo($headerClone)
  })

  $('.search-results thead tr').hide()

  $tableContainer.prepend($headerClone)

  const $columnClone = $('<div />')
  const columnWidth = $('.country').eq(0).outerWidth()

  $('tbody.list .country').each(function () {
    const $this = $(this)
    $('<div>' + $(this).html() + '</div>')
      .height($this.outerHeight())
      .appendTo($columnClone)
  })

  $columnClone
    .addClass('fixed-column')
    .outerWidth(columnWidth)
    .css('top', $headerClone.outerHeight())
    .prependTo('#search-results')

  let lastScrollLeft = 0;

  $tableContainer.scroll(function() {
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(function() {
        adjustFirstColumn()
    }, 250));
  });

  function adjustFirstColumn () {
    $columnClone.animate({
      left: $tableContainer.scrollLeft()
    }, 500, 'swing')
  }
  
}