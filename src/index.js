import './styles/app.scss'

$.fn.fullpageScroll = function () {
  let container = this
  let sections = container.children('.section')

  sections.each(function (index) {
    $(this).height($(this).children('.section__content').height())
    $(this).css('z-index', sections.length - index)
  })

  let upperSection = sections.first()
  let lowerSection = sections.eq(1)
  // let lowerSection = sections.last()

  $(window).scroll(function () {
    console.log($(window).scrollTop())
    lowerSection.children('.section__content').css('transform', `translate3d(0, ${-(lowerSection.offset().top - $(document).scrollTop())}px, 0)`)
  })
}

$('#main').fullpageScroll()
