setTimeout(function () {
    siteWelcome.classList.remove("active")
}, 100)		//loading,加载太快看不到，加一个延时才能看加载页面


let specialTags = document.querySelectorAll("[data-x]")
for (let i = 0; i < specialTags.length; i++) {
    specialTags[i].classList.add("offset")
}

findClosest(window.scrollY)   //前面的loading时间会影响，loading太长看不到
window.onscroll = function () {
    let scY = window.scrollY
    if (scY > 0) {
        topNavBar.classList.add("sticky")
    } else {
        topNavBar.classList.remove("sticky")
    }
    findClosest(scY)
}
function findClosest(scY){
    /*************************/
    //获取当前滚到那里了高亮标题
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
}


let liTags = document.querySelectorAll("nav.menu > ul > li")
//console.log(aTags)
for (let i = 0; i < liTags.length; i++) {
    liTags[i].onmouseenter = function (x) {   //监听的是父元素，不然不可选，因为移出就没了
        x.currentTarget.classList.add("active")
        /*let li = x.currentTarget  //x:因为liTags的顺序不可靠  currentTarget和Target分别是当前监听的Target和用户操作的Target，在onclick事件里面可能会出错
        let brother = li.getElementsByTagName("ul")[0]   
        brother.classList.add("active")*/
    }
    liTags[i].onmouseleave = function (x) {
        x.currentTarget.classList.remove("active")
        /*let li = x.currentTarget  
        let brother = li.getElementsByTagName("ul")[0]   
        brother.classList.remove("active")*/
    }
}

let aTags = document.querySelectorAll("nav.menu > ul > li > a")
for (let i = 0; i < aTags.length; i++) {
    aTags[i].onclick = function (x) {
        x.preventDefault() //阻止默认动作
        let a = x.currentTarget
        let href = a.getAttribute("href") //获得写在a里的href,如果使用a.href会得到浏览器解析的，加上了http://XXXXX
        let element = document.querySelector(href)
        let top = element.offsetTop  //距离window的距离，不随scroll改变而改变。

        let n = 25  //移动25次
        let duration = 500 / n  //每次移动的时间
        let currentTop = window.scrollY  //当前滚动的距离
        let targetTop = top - 80
        let stride = (targetTop - currentTop) / n
        let i = 0
        let id = setInterval(() => {
            if (i === n) {
                window.clearInterval(id)
                return
            }
            i = i + 1
            window.scrollTo(0, currentTop + stride * i)
        }, duration)

    }
}


portfolio1.onclick = function () {
    portfolioBar.className = "bar state-1"
}
portfolio2.onclick = function () {
    portfolioBar.className = "bar state-2"
}
portfolio3.onclick = function () {
    portfolioBar.className = "bar state-3"
}
		
//轮播
const swiper = new Swiper('.swiper-container', {
// Optional parameters

loop: true,

// If we need pagination
pagination: {
el: '.swiper-pagination',
},

// Navigation arrows
navigation: {
nextEl: '.swiper-button-next',
prevEl: '.swiper-button-prev',
},

//   // And if we need scrollbar
//   scrollbar: {
//     el: '.swiper-scrollbar',
//   },
});
