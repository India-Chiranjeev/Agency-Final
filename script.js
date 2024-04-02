function Loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

function AnimationLoad(){
    var tl = gsap.timeline();
    tl.from(".line h1, h2", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
    });
    tl.from("#line-part-1", {
    opacity: 0,
    onStart: function () {
        var h5timer = document.querySelector("#line-part-1 h5");
        var grow = 0;
        setInterval(function () {
        if (grow < 100) {
            h5timer.innerHTML = grow++;
        } else {
            h5timer.innerHTML = grow;
        }
        }, 27);
    },
    });
    tl.to(".line h2", {
    animationName: "animation",
    opacity: 1,
    });
    tl.to("#loader", {
        opacity: 0,
        duration: 0.2,
        delay: 4
    })
    tl.from("#page-1", {
        delay: 0.2,
        y: 1600,
        opacity: 0,
        ease:Power4, 
        duration: 0.5
    })
    tl.to("#loader", {
        display: "none"
    })
    tl.from("#nav", {
        y: -120
    })
    tl.from(" #Main1 h1, #Main2 h1, #Main3 h1, #Main4 h5", {
        stagger: 0.2,
        y: 200
    })
    tl.from("#Main1, #page-2", {
        opacity: 0,
    },"-=1.5")
}

function MouseAnimation() {
    Shery.makeMagnet("#nav-part2 h4");

    document.addEventListener("mousemove", function(event) {
        gsap.to("#cursor", {
            top: event.clientY,
            left: event.clientX,
            duration: 0.2,
        });
    });
    var locker = document.querySelector("#video-content");
    var locker_video = document.querySelector("#video-content video");
    var locker_cover = document.querySelector("#video-content img");
    var button = document.querySelector("#video-content #yellow-circle");
    locker.addEventListener("mouseenter", function(){
        document.documentElement.style.cursor = 'none';
        locker.addEventListener("mousemove", function(position){
            gsap.to("#cursor", {
                opacity: 0
            })
            gsap.to("#yellow-circle", {
                top: position.clientY - 300,
                left: position.clientX - 570,
                duration: 0.2,
                ease: "power2.out" 
            })
        })
    })

    var flag = 0;
    locker.addEventListener("click", function(){
        if (flag === 0){
            locker_cover.style.opacity = 0;
            locker_video.style.opacity = 1;
            locker_video.play();
            gsap.to(button, {
                scale: 0.5
            })
            button.innerHTML = `<i class="ri-pause-line"></i>`;
            locker.addEventListener("mouseenter", function(){
                gsap.to(button, {
                    scale: 0.5
                })
                button.innerHTML = `<i class="ri-pause-line"></i>`;
            })
            flag = 1;
        } else {
            locker_cover.style.opacity = 1;
            locker_video.style.opacity = 0;
            locker_video.pause();
            gsap.to(button, {
                scale: 1
            })
            button.innerHTML = `<i class="ri-play-large-fill"></i>`;
            locker.addEventListener("mouseenter", function(){
                gsap.to(button, {
                    scale: 1
                })
                button.innerHTML = `<i class="ri-play-large-fill"></i>`;
            })
            flag = 0;
        }
})

    locker.addEventListener("mouseleave", function(){
        gsap.to("#cursor", {
            opacity: 1
        })
        gsap.to("#yellow-circle", {
            top: "-14%",
            left: "70%", 
            height: "10vw", 
            width: "10vw"
        })
        gsap.to(button, {
            scale: 1
        })
        button.innerHTML = `<i class="ri-play-large-fill"></i>`;
    })

}

function ImageAnimation(){
    Shery.imageEffect(".image-div", {
        style: 5,
        config: {"a":{"value":2,"range":[0,30]},"b":{"value":0.95,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.6060547813551177},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1.06,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.69,"range":[0,10]},"metaball":{"value":0.32,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey: true
    })

}

function Hover(){
    document.addEventListener("mousemove", function(co_ordinates){
        gsap.to("#website", {
            top: co_ordinates.y,
            left: co_ordinates.x,
            duration: 0.2,
            ease: "power2.out"
        })
    })
    
    document.querySelector("#Website_Selector").addEventListener("mouseenter", function(){
        gsap.to("#website", {
            display: "initial",
            opacity: 1
        })
    })
    
    document.querySelector("#Website_Selector").addEventListener("mouseleave", function(){
        gsap.to("#website", {
            display: "none",
            opacity: 0
        })
    })
    
    document.addEventListener("mousemove", function(co_ordinates){
        gsap.to("#mobile", {
            top: co_ordinates.y,
            left: co_ordinates.x,
            duration: 0.2,
            ease: "power2.out"
        })
    })
    
    document.querySelector("#Mobile_Selector").addEventListener("mouseenter", function(){
        gsap.to("#mobile", {
            display: "initial",
            opacity: 1
        })
    })
    
    document.querySelector("#Mobile_Selector").addEventListener("mouseleave", function(){
        gsap.to("#mobile", {
            display: "none",
            opacity: 0
        })
    })
}


ImageAnimation();
AnimationLoad();
MouseAnimation();
Loco();
Hover();

document.querySelector("#footer-content h1",).addEventListener("mouseenter", function(){
    gsap.to("#footer-content h1", {
        scale: 1.1,
    })
})


document.querySelector("#footer-content h1",).addEventListener("mouseleave", function(){
    gsap.to("#footer-content h1", {
        scale: 1,
    })
})