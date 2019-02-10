import './styles/app.scss'
import 'velocity-animate/velocity'
import html2canvas from 'html2canvas'

$.fn.scrollPreview = function () {
  html2canvas(this[0], {allowTaint: true}).then(canvas => {
    document.body.appendChild(canvas)
  })
}

$.fn.createGhost = function () {
  return $('<div>').height(this.height())
}

$.fn.heightFromContent = function () {
  this.each(function () {
    $(this).height($(this).children('.section__content').height())
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
  let sections = container.children('.section')
  let lastScrollTop = $(document).scrollTop()

  sections.heightFromContent().zIndexDescending()
  container.createGhost().appendTo('body')

  let upperSection = sections.first()
  let lowerSection = sections.eq(1)

  function getUpperSection() {
    return sections.filter(function () {
      return $(document).scrollTop() >= $(this).position().top
    }).last()
  }

  $(window).scroll(function () {
    if (Math.abs(lastScrollTop - $(document).scrollTop()) < 5) {
      return
    }

    lastScrollTop = $(document).scrollTop()

    container.velocity('stop')
    upperSection.children('.section__content').velocity('stop')
    lowerSection.children('.section__content').velocity('stop')

    container.velocity({
      translateY: -$(document).scrollTop(),
      translateZ: 0
    }, {duration: 0, delay: 0, easing: 'linear'})

    upperSection = getUpperSection()
    lowerSection = upperSection.next('.section')

    upperSection.children('.section__content').velocity({
      translateY: 0,
      translateZ: 0
    }, {duration: 0, delay: 0, easing: 'linear'})

    lowerSection.children('.section__content').velocity({
      translateY: -upperSection.position().top - (upperSection.height() - $(document).scrollTop()),
      translateZ: 0
    }, {duration: 0, delay: 0, easing: 'linear'})
  })
}

$('#main').fullpageScroll()
