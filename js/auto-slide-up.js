! function () {
    // add offset class
    //前面的loading时间会影响，loading太长看不到
    let specialTags = document.querySelectorAll("[data-x]")
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add("offset")
    }
    findClosestAndRemoveOffset()

    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset()
    })
    /*************************************************************/
    function findClosestAndRemoveOffset() {
        //获取当前滚到那里了高亮标题
        let scY = window.scrollY
        let specialTags = document.querySelectorAll("[data-x]")
        let minIndex = 0
        for (let i = 1; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - scY) < Math.abs(specialTags[minIndex].offsetTop - scY)) {
                minIndex = i
            }
        }
        //minIndex当前离顶部最近的元素
        specialTags[minIndex].classList.remove('offset')
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')  //神经病一定要加搜索里加引号
        let li = a.parentNode
        let liAndBrother = li.parentNode.children
        for (let i = 0; i < liAndBrother.length; i++) {
            liAndBrother[i].classList.remove("highlight")
        }
        li.classList.add("highlight")
        let liTags = document.querySelectorAll('nav.menu > ul > li')
        for (let i = 0; i < liTags.length; i++) {
            liTags[i].onmouseenter = function (x) {
                x.currentTarget.classList.add('active')
            }
            liTags[i].onmouseleave = function (x) {
                x.currentTarget.classList.remove('active')
            }
        }
    }
}.call()