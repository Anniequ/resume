!function () {
    var view = View('nav.menu')
    var controller = {
        view:null,
        aTags:null,
        animate:null,       
        init:function(view){
            this.view = view
            this.aTags = this.view.querySelectorAll('nav.menu > ul > li > a')
            this.initAnimation()
            this.bindEvents()
        },
        initAnimation:function(){
            function animate(time){
                requestAnimationFrame(animate)
                TWEEN.update(time)
            }
            requestAnimationFrame(animate)
        },
        scrollToElement:function(element){           
                    let top = element.offsetTop  //距离window的距离，不随scroll改变而改变。      
                    let currentTop = window.scrollY  //当前滚动的距离
                    let targetTop = top - 80
                    let stride = targetTop - currentTop
                    var coords = { y: currentTop }
                    var t = Math.abs((stride / 100) * 300)
                    if (t > 500) { t = 500 }
                    var tween = new TWEEN.Tween(coords) //起始位置
                        .to({ y: targetTop }, t)  //结束位置和时间
                        .easing(TWEEN.Easing.Cubic.InOut) //缓动类型
                        .onUpdate(function () {
                            window.scrollTo(0, coords.y)  //如何更新页面
                        })
                        .start()
        },
        bindEvents: function(){
            for (let i = 0; i < this.aTags.length; i++) {
                this.aTags[i].onclick = (x)=>{
                    x.preventDefault() //阻止默认动作
                    let a = x.currentTarget
                    let href = a.getAttribute("href") //获得写在a里的href,如果使用a.href会得到浏览器解析的，加上了http://XXXXX
                    let element = document.querySelector(href)
                    this.scrollToElement(element)
                }
            }
        }
    }   
    controller.init(view)
}.call()
