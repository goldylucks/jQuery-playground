$(document).ready(onReady)

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