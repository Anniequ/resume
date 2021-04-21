/**********************************************************************
 * top nav bar sticky
 */
!function () {
    var view = document.querySelector('#topNavBar')
    var controller = {
        view: null,
        init: function (view) {
            this.view = view
            this.bindEvents()
        },
        bindEvents: function () {
            window.addEventListener('scroll', () => {
                let scY = window.scrollY
                if (scY > 0) {
                    this.active() //箭头函数内外this不变
                } else {
                    this.deactive()
                }
            })
        },
        active: function () {
            this.view.classList.add('sticky')
        },
        deactive: function () {
            this.view.classList.remove('sticky')
        }
    }
    controller.init(view)
}.call()

