$(document).ready(onReady)

function onReady () {
  console.log('init!')

const tableWidth = $('.search-results').outerWidth()
const tableHeaderHeight = $('#table-header').height()
const $headerClone = $('<div />').addClass('fixed-header').width(tableWidth).height(tableHeaderHeight)

$('#search-results th').each(function () {
    $('<div>' + $(this).html() + '</div>')
    .appendTo($headerClone)
})

$('.search-results thead tr').hide()

$headerClone.prependTo('#search-results')

// const $columnClone = $('<div />')
// const columnWidth = $('.country').eq(0).outerWidth()

// $('tbody.list .country').each(function () {
//   const $this = $(this)
//   $('<div>' + $(this).html() + '</div>')
//     .height($this.outerHeight())
//     .appendTo($columnClone)
// })
// $columnClone
//   .addClass('fixed-column')
//   .outerWidth(columnWidth)
//   .css('top', $headerClone.outerHeight())
//   .prependTo('#search-results')

  
}