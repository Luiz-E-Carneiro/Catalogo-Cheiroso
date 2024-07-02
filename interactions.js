document.getElementById('toggle-btn').addEventListener('click', function() {
    var sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('collapsed');
    this.innerHTML = sideBar.classList.contains('collapsed') ?
    '<span class="material-symbols-outlined">drag_indicator</span>' :
    '<span class="material-symbols-outlined">menu</span>';
});
var cards_area = document.getElementById("cards-area")
var load_screen = document.getElementById("load_screen")
var empty_screen = document.getElementById("empty_screen")
var data
var action_num
async function data_requester(action, item = null, type = null) {
    var counter
    counter = Number(cards_area.children.length)
    document.querySelectorAll('.unity').forEach(function(element) {
        element.remove();
    });
    /*if (counter >= 3) {
        for (var i = 2; i <= counter-1; i ++) {
            console.log(cards_area.children);
            cards_area.removeChild(cards_area.children[i])
        }
    }*/
    console.log(`http://localhost/catalogo-cheiroso/data_taker.php?action=${action}&item=${item}&type=${type}`)
    data = await fetch(`http://localhost/catalogo-cheiroso/data_taker.php?action=${action}&item=${item}&type=${type}`)
    data = await data.json()
    load_screen.style.display = "none"
    if (Number(data.err_code) == 204) {
        empty_screen.style.display = "flex"
    } else {
        content_creater()
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
    var action_type
    if (action_num >= 5) {
    }
    data_requester(action_num, action_item, action_type)
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
    data.forEach(function(element, i) {
        var unity = document.createElement("div")
        unity.addEventListener("click", function() {
            show_modal(this)
        })
        unity.addEventListener("mouseenter", function() {
            show_desc(this)
        })
        unity.addEventListener("mouseleave", function() {
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
