$(document).ready(onReady)

const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;
const isChrome = !!window.chrome && !!window.chrome.webstore;

console.log('isFirefox', isFirefox)
console.log('isSafari', isSafari)
console.log('isIE', isIE)
console.log('isEdge', isEdge)
console.log('isChrome', isChrome)

let $tableContainer
let $columnClone
let $headerClone

function onReady () {
  console.log('init!')
  
  $tableContainer = $('#search-results')

  cloneHeader()
  cloneFirstColumn()
  applyColumnAnimatedOnScroll()

  if (isFirefox) {
    applyStickyHeader()
    $('.search-results thead tr').hide()
  } else if (isChrome) {
    applyHeaderOnScroll()
  } else {
    applyHeaderAnimatedOnScroll()
  }

}

function applyHeaderOnScroll () {
  $headerClone.css('position', 'absolute')
  $tableContainer.on('scroll', function () {
    $headerClone.css('top', $(this).scrollTop())
  })
}

function cloneHeader () {
  const tableWidth = $('.search-results').outerWidth()
  const tableHeaderHeight = $('#table-header').height()
  $headerClone = $('<div />').addClass('fixed-header').width(tableWidth).height(tableHeaderHeight)

  $('#search-results th').each(function () {
      $('<div>' + $(this).html() + '</div>')
      .appendTo($headerClone)
  })

  $tableContainer.prepend($headerClone)
}

function cloneFirstColumn () {
  $columnClone = $('<div />')
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
    .prependTo($tableContainer)
}

function applyColumnAnimatedOnScroll () {
  let lastScrollLeft = 0;

  $tableContainer.scroll(function() {
    const scrollLeft = $(this).scrollLeft()
    if (lastScrollLeft == scrollLeft) {
      return
    }
    lastScrollLeft = scrollLeft;
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(adjustFirstColumn, 250));
  });
}

function applyHeaderAnimatedOnScroll () {
  $headerClone.css('position', 'absolute')
  let lastScrollTop = 0;

  $tableContainer.scroll(function() {
    const scrollTop = $(this).scrollTop()
    if (lastScrollTop == scrollTop) {
      return
    }
    lastScrollTop = scrollTop
    clearTimeout($.data(this, 'scrollTimer'));
    $.data(this, 'scrollTimer', setTimeout(adjustFirstRow, 250));
  });
}

function adjustFirstRow () {
  $headerClone.animate({
    top: $tableContainer.scrollTop()
  }, 500, 'swing')
}

function adjustFirstColumn () {
  $columnClone.animate({
    left: $tableContainer.scrollLeft()
  }, 500, 'swing')
}

function applyStickyHeader () {
  $('.fixed-header').css('position', 'sticky')
}
