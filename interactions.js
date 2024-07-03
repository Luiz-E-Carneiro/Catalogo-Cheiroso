document.getElementById('toggle-btn').addEventListener('click', function () {
    var sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('collapsed');
    this.innerHTML = sideBar.classList.contains('collapsed') ?
        '<span class="material-symbols-outlined">drag_indicator</span>' :
        '<span class="material-symbols-outlined">menu</span>';
});
var cards_area = document.getElementById("cards-area")
var load_screen = document.getElementById("load_screen")
var empty_screen = document.getElementById("empty_screen")
var back_modal = document.getElementById("back_modal")
var modal_img = document.getElementById("modal_img")
var modal_data = document.getElementById("modal_data")
var vote_counter = document.getElementById("vote_counter")
var modal_bottom = document.getElementById("modal_bottom")
var data
var fav_list
var watch_list
var action_num
var action_type
async function data_requester(action, item, type, data_arm) {
    var data_return
    if (data_arm == false) {
        document.querySelectorAll('.unity').forEach(function (element) {
            element.remove();
        });
    }
    /*if (counter >= 3) {
        for (var i = 2; i <= counter-1; i ++) {
            console.log(cards_area.children);
            cards_area.removeChild(cards_area.children[i])
        }
    }*/
    console.log(`http://localhost/catalogo-cheiroso/data_taker.php?action=${action}&item=${item}&type=${type}`)
    data_return = await fetch(`http://localhost/catalogo-cheiroso/data_taker.php?action=${action}&item=${item}&type=${type}`)
    data_return = await data_return.json()
    load_screen.style.display = "none"
    if (Number(data_return.err_code) == 204 && data_arm == false) {
        empty_screen.style.display = "flex"
    } else if (Number(data_return.err_code) != 204 && data_arm == false) {
        data = data_return
        content_creater()
    } else if (data_arm == 1) {
        fav_list = data_return
    } else if (data_arm == 2) {
        watch_list = data_return
    }
    console.log(data)
}
function content_require(element) {
    empty_screen.style.display = "none"
    load_screen.style.display = "flex"
    element.classList.add("clicked")
    element.parentNode.children[element.classList[0] == "btn-filme" ? 1 : 0].classList.remove("clicked")
    action_num = Number(element.dataset.action_num)
    var action_item
    action_type = Number(element.dataset.type)
    if (action_num >= 5) {
    }
    data_requester(action_num, action_item, action_type, false)
    data_requester(5, action_item, action_type, 1)
    data_requester(6, action_item, action_type, 2)
}
/*
<div class="unity">
    <div class="unity_desc">
        <p>Unity_name</p>
        <div>
            <p>2024</p>
            <p>00</p>
        </div>
    </div>
</div>
*/
function content_creater() {
    data.forEach(function (element, i) {
        if (action_num >= 5) {
            element = element[0]
        }
        var unity = document.createElement("div")
        unity.addEventListener("click", function () {
            show_modal(this)
        })
        unity.addEventListener("mouseenter", function () {
            show_desc(this)
        })
        unity.addEventListener("mouseleave", function () {
            unshow_desc(this)
        })
        unity.classList.add("unity")
        unity.dataset.data_num = i
        unity.dataset.content_id = element.id
        unity.style.backgroundImage = `url("http://image.tmdb.org/t/p/w500${element.backdrop_path}")`
        var unity_desc = document.createElement("div")
        unity_desc.classList.add("unity_desc")
        var div = document.createElement("div")
        var p0 = document.createElement("p")
        var p1 = document.createElement("p")
        var p2 = document.createElement("p")
        if (element.title != undefined) {
            p0.innerHTML = element.title
        } else {
            p0.innerHTML = element.name
        }
        if (element.release_date != undefined) {
            p1.innerHTML = element.release_date.substring(0, 4)
        } else {
            p1.innerHTML = element.first_air_date.substring(0, 4)
        }
        p2.innerHTML = `${Number(element.vote_average).toFixed(1)}/10`
        div.appendChild(p1)
        div.appendChild(p2)
        unity_desc.appendChild(p0)
        unity_desc.appendChild(div)
        unity.appendChild(unity_desc)
        cards_area.appendChild(unity)
        setTimeout(() => {
            unity.style.opacity = 1
        }, (1000 * (i / 100)));
    });
}
var unity_time_out
function show_desc(element) {
    clearTimeout(unity_time_out)
    element.children[0].style.display = "flex"
    element.children[0].style.opacity = 1
}
function unshow_desc(element) {
    element.children[0].style.opacity = 0
    unity_time_out = setTimeout(() => {
        element.children[0].style.display = "none"
    }, 250);
}
content_require(document.getElementsByClassName("btn-filme")[0])


const show_modal = (element) => {
    var infos = data[Number(element.dataset.data_num)]
    if (action_num >= 5) {
        infos = infos[0]
    }
    back_modal.style.display = "flex"
    back_modal.style.opacity = 1
    back_modal.dataset.data_num = Number(element.dataset.data_num)
    modal_img.children[0].style.backgroundImage = `url("http://image.tmdb.org/t/p/w500${infos.backdrop_path}")`
    modal_data.children[0].innerHTML = infos.title != undefined ? infos.title : infos.name
    modal_data.children[1].innerHTML = infos.release_date != undefined ? infos.release_date : infos.first_air_date
    modal_data.children[2].innerHTML = `Lingua: ${infos.original_language}`
    modal_data.children[3].innerHTML = `Adulto: ${infos.adult ? `Sim` : `Não`}`
    modal_data.children[5].innerHTML = `Sinopse: ${infos.overview}`
    vote_counter.children[0].style.width = `${Number.parseInt(Number(infos.vote_average) * 10)}%`
    if (fav_list.err_code == undefined) {
        fav_list.forEach(function(element, i) {
            if (infos.id == element[1]) {
                modal_bottom.children[0].classList.add("fav")
            }
        })
    }
    if (watch_list.err_code == undefined) {
        watch_list.forEach(function(element, i) {
            if (infos.id == element[1]) {
                modal_bottom.children[1].classList.add("watch")
            }
        })
    }
}
function unshow_modal(element) {
    back_modal.style.opacity = 0
    setTimeout(() => {
        back_modal.style.display = "none"
    }, 250);
}
function fav_item(element) {
    info = data[Number(back_modal.dataset.data_num)]
    console.log(JSON.stringify(info))
    if (element.classList[0] == "fav") {
        element.classList.remove("fav")
        data_requester(9, info.id, action_type, action_num == 5 ? false : 1)
    } else {
        element.classList.add("fav")
        data_requester(7, JSON.stringify(info), action_type, action_num == 5 ? false : 1)
    }
    data_requester(5, 0, action_type, 1)
}
function watch_item(element) {
    info = data[Number(back_modal.dataset.data_num)]
    if (element.classList[0] == "watch") {
        element.classList.remove("watch")
        data_requester(10, info.id, action_type, action_num == 6 ? false : 2)
    } else {
        element.classList.add("watch")
        data_requester(8, JSON.stringify(info), action_type, action_num == 6 ? false : 2)
    }
    data_requester(6, 0, action_type, 2)
}
