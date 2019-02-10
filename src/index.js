import './styles/app.scss'
import 'velocity-animate/velocity'

$.fn.createOutline = function () {
  return $('<div>').height(this.height())
}

$.fn.heightFromContent = function () {
  this.each(function () {
    $(this).height($(this).children('.fullpage-scroll__section-content').height())
  })

  return this
}

$.fn.zIndexDescending = function () {
  let elements = this

  elements.each(function (index) {
    $(this).css('z-index', elements.length - index)
  })

  return this
}

$.fn.fullpageScroll = function () {
  let container = this
  let sections = container.children('.fullpage-scroll__section')
  let lastScrollTop = $(window).scrollTop()

  sections.heightFromContent().zIndexDescending()
  container.createOutline().appendTo('body')

  let upperSection = sections.first()
  let lowerSection = sections.eq(1)

  function getUpperSection() {
    return sections.filter(function () {
      return $(window).scrollTop() >= $(this).position().top
    }).last()
  }

  $(window).scroll(function () {
    if (Math.abs(lastScrollTop - $(window).scrollTop()) < 5) {
      return
    }

    lastScrollTop = $(window).scrollTop()

    container.velocity('stop')
    upperSection.children('.fullpage-scroll__section-content').velocity('stop')
    lowerSection.children('.fullpage-scroll__section-content').velocity('stop')

    upperSection = getUpperSection()
    lowerSection = upperSection.next('.fullpage-scroll__section')

    container.velocity({
      translateY: -$(window).scrollTop(),
      translateZ: 0
    }, {duration: 0, delay: 0, easing: 'linear'})

    upperSection.children('.fullpage-scroll__section-content').velocity({
      translateY: 0,
      translateZ: 0
    }, {duration: 0, delay: 0, easing: 'linear'})

    lowerSection.children('.fullpage-scroll__section-content').velocity({
      translateY: -upperSection.position().top - (upperSection.height() - $(window).scrollTop()),
      translateZ: 0
    }, {duration: 0, delay: 0, easing: 'linear'})
  })
}

$('#main').fullpageScroll()
