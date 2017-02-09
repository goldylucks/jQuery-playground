$(document).ready(onReady)

function onReady () {
  console.log('init!')
  const $headerClone = $('#table-header').clone()
                                        .attr('id', 'table-header-clone')
                                        .addClass('fixed-header')
                                        .prependTo('#search-results')

  $('#search-results').on('scroll', function () {
    $headerClone.css('top', $(this).scrollTop())
  })
  console.log('done!')
}