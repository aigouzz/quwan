/**
 * Created by Administrator on 2016/8/2.
 */
var global = this;

function rollDelay(j, c, g, h) {
    clearInterval(global[h]);
    var i = 0;
    global[h] = setInterval(function() {
            var a = Math.exp( - g * i) * c;
            j.scrollLeft += a;
            if (Math.abs(a) < 10) {
                if (Math.abs(a) <= 1) {
                    clearInterval(global[h])
                }
            }
            i++
        },
        16)
}
function pageGuideMousedown(d, e) {
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    e.preventDefault();
    var f = d.parentElement.parentElement.id;
    global[f + "st"] = e.pageX;
    global[f + "fg"] = 1;
    clearInterval(global[f + "int"])
}
function pageGuideMousemove(d, e) {
    var f = d.parentElement.parentElement.id;
    if (!global[f + "fg"]) {
        return
    }
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    e.preventDefault();
    d.scrollLeft += global[f + "st"] - e.pageX;
    global[f + "_sp"] = global[f + "st"] - e.pageX;
    global[f + "st"] = e.pageX
}
function pageGuideMouseup(d, e) {
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    e.preventDefault();
    var f = d.parentElement.parentElement.id;
    global[f + "fg"] = 0;
    rollDelay(d, global[f + "_sp"], 0.03, f + "int")
}
function pageGuideMouseout(d, e) {
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    e.preventDefault();
    var f = d.parentElement.parentElement.id;
    global[f + "fg"] = 0
}
function pageGuideTouchstart(d, e) {
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    var f = d.parentElement.parentElement.id;
    global[f + "st"] = e.touches[0].pageX;
    clearInterval(global[f + "int"])
}
function pageGuideTouchmove(d, e) {
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    var f = d.parentElement.parentElement.id;
    global[f + "_sp"] = global[f + "st"] - e.touches[0].pageX;
    if (Math.abs(global[f + "_sp"]) >= 5) {
        e.preventDefault()
    }
    d.scrollLeft += global[f + "_sp"];
    global[f + "st"] = e.touches[0].pageX
}
function pageGuideTouchend(d, e) {
    if (!e) {
        e = (window || global).event;
        if (!e) {
            return
        }
    }
    var f = d.parentElement.parentElement.id;
    rollDelay(d, global[f + "_sp"], 0.06, f + "int")
}