window.onload = function () {
    searchHead(); //头部滚动
    timeBack(); //倒计时
    bannerEffect();
}
// 头部js效果
function searchHead() {
    // 头部搜索快js效果
    //1. 获取当前banner的高度
    var banner = document.querySelector(".jd_banner");
    var bannerHeight = banner.offsetHeight;
    var search = document.querySelector(".jd_search");
    //2.获取banner滚出屏幕的距离
    window.onscroll = function () {
        var offsetTop = document.documentElement.scrollTop; //指定了doctype   没指定可用document.body.scrollTop
        var opacity = 0;
        if (offsetTop < bannerHeight) {
            opacity = offsetTop / bannerHeight;
            search.style.background = "rgba(233,35,34," + opacity + ")"
        }
    }
}

// 倒计时效果
function timeBack() {
    var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
    var totalTime = 3000;
    var setId = setInterval(function () {
        totalTime--;
        //清除定时
        if (totalTime < 0) {
            clearInterval(setId);
            return;
        }
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = hour % 10;
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = minute % 10;
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = second % 10;
    }, 1000)
}

// // 轮播图  
// 当浏览器载入 HTML 文档, 它就会成为 Document 对象。
// Document 对象是 HTML 文档的根节点。HTML中每一个元素都是 节点:
// Document 对象使我们可以从脚本中对 HTML 页面中的所有元素进行访问。
function bannerEffect() {
    // 一.组合图片
    // 1.获取轮播图结构
    var banner = document.querySelector(".jd_banner");
    // 2.获取图片容器
    var imgBox = banner.querySelector("ul:first-of-type");
    // 3.获取原始第一张图
    var first = imgBox.querySelector("li:first-of-type");
    // 4.获取最后一张图
    var last = imgBox.querySelector("li:last-of-type");
    //5.在首尾插入两张图片 appendChild在末尾追加如果有则删除后追加   insertBefore(需要插入的元素，位置)
    imgBox.appendChild(first.cloneNode(true)); //true时真克隆复制li中所有属性和后代，false只复制li的属性，内容，后面的子元素不复制
    imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);

    //  二.设置样式(通过js实现)
    var lis = imgBox.querySelectorAll("li");
    var count = lis.length;
    var index = 1;
    var bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + "px"; //容器宽度
    for (var i = 0; i < count; i++) {
        lis[i].style.width = bannerWidth + "px"; //图片宽度
    }
    imgBox.style.left = -bannerWidth + "px" //设置偏移
    //当屏幕发生变化时，重新计算图片宽度
    window.onresize = function () {
        bannerWidth = banner.offsetWidth;
        imgBox.style.width = count * bannerWidth + "px"; //容器宽度
        for (var i = 0; i < count; i++) {
            lis[i].style.width = bannerWidth + "px"; //图片宽度
        }
        imgBox.style.left = -index * bannerWidth + "px"
    }

    //实现自动轮播
    var startTime = function () {
        timerId = setInterval(function () {
            index++;
            imgBox.style.transition = "left 0.5s ease-in-out";
            imgBox.style.left = (-index * bannerWidth) + "px";
            //判断是否到最后一张
            setTimeout(function () {
                if (index == count - 1) {
                    index = 1;
                    // 如果一个元素添加过过渡效果，效果会一直在，如果不想要，需要清除，否者卡顿
                    imgBox.style.transition = "none";
                    imgBox.style.left = (-index * bannerWidth) + "px";
                }
            }, 500);
        }, 1500)
    }
    startTime();

    var timerId;
    var isEnd = true;
    //实现手动轮播
    var startX, moveX, distanceX;
    imgBox.addEventListener("touchstart", function (e) {
        console.log("start");
        clearInterval(timerId);
        startX = e.targetTouches[0].clientX;
    });
    imgBox.addEventListener("touchmove", function (e) {
        console.log(isEnd);
        if (isEnd == true) {
            moveX = e.targetTouches[0].clientX;
            distanceX = moveX - startX;
            imgBox.style.transition = "left 0.5s ease-in-out";
            //  imgBox.style.transition="none"//细节：后期滚动卡顿，为保证效果正常，将前面可能的过渡效果清除 1次清除就可
            //细节:本次的滑动操作应该基于之前轮播图已经偏移的距离   left参照的是最原始坐标
            imgBox.style.left = -index * bannerWidth + distanceX + "px";
        }
    });
    imgBox.addEventListener("touchend", function (e) {

        if (Math.abs(distanceX) > 100) {
            isEnd = false;
            //判断滑动方向
            if (distanceX > 0) {
                index--;
            }
            if (distanceX < 0) {
                index++;
            }
            imgBox.style.left = -index * bannerWidth + "px";

        } else if (Math.abs(distanceX) >= 0) {

            imgBox.style.left = -index * bannerWidth + "px";

        }
        distanceX = 0;
        moveX = 0;
        startX = 0;

    });


    imgBox.addEventListener("webkitTransitionEnd", function () {
        console.log("hx");
        if (index == count - 1) {
            index = 1;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        } else if (index == 0) {
            index = count - 2;
            imgBox.style.transition = "none";
            imgBox.style.left = -index * bannerWidth + "px";
        }

        setTimeout(function () {
            isEnd = true;
            clearInterval(timerId);
            startTime();
        }, 500);
        indicators(index);

    });
    //点轮播
    function indicators(index) {
        var indicator = banner.querySelector("ul:last-of-type").querySelectorAll("li");
        //清除其他样式
        for (var i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove("active");
        }
        //添加样式
        console.log(index);
        indicator[index - 1].classList.add("active");
    }
}