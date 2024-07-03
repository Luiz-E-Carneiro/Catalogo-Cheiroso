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
var data
var action_num
async function data_requester(action, item = null, type = null) {
    var counter
    counter = Number(cards_area.children.length)
    document.querySelectorAll('.unity').forEach(function (element) {
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
    var action_type = Number(element.dataset.type)
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
    data.forEach(function (element, i) {
        var unity = document.createElement("div")
        unity.addEventListener("click", function () {
            show_modal(unity.dataset.data_num)
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

const show_modal = (i) => {
    var infos = data[i];
    console.log(infos);

    let back_modal = document.createElement("div");
    back_modal.classList.add("back_modal");

    document.body.appendChild(back_modal);

    let div_modal = document.createElement("div");
    div_modal.classList.add("modal");

    back_modal.appendChild(div_modal);

    let div_img = document.createElement("div");
    div_img.classList.add("div_img");

    div_modal.appendChild(div_img);

    let img = document.createElement("img");
    img.src = `http://image.tmdb.org/t/p/w500${infos.backdrop_path}`;

    let span_date = document.createElement("span");
    span_date.innerText = "Lançamento: ";

    let p_release_date = document.createElement("p");
    if (infos.release_date) {
        p_release_date.innerText = infos.release_date;
    } else {
        p_release_date.innerText = infos.first_air_date;
    }

    let div_foot_img = document.createElement("div");
    div_foot_img.appendChild(span_date);
    div_foot_img.appendChild(p_release_date);

    div_img.appendChild(img);
    div_img.appendChild(div_foot_img);

    let div_desc = document.createElement("div");
    div_desc.classList.add("div_desc");

    let span_title = document.createElement("span");
    span_title.innerText = "Título: ";

    let p_title = document.createElement("p");
    if (infos.title) {
        p_title.innerText = infos.title;
    } else {
        p_title.innerText = infos.name;
    }

    let div1 = document.createElement("div");
    div1.appendChild(span_title);
    div1.appendChild(p_title);

    let span_overview = document.createElement("span");
    span_overview.innerText = "Descrição: ";

    let p_overview = document.createElement("p");
    p_overview.innerText = infos.overview;

    let div2 = document.createElement("div");
    div2.appendChild(span_overview);
    div2.appendChild(p_overview);

    let span_adult = document.createElement("span");
    span_adult.innerText = "Adulto: ";
    let p_adult = document.createElement("p");

    if (infos.adult) {
        p_adult.innerText = "Sim";
    } else {
        p_adult.innerText = "Não";
    }
    let div3 = document.createElement("div");
    div3.appendChild(span_adult);
    div3.appendChild(p_adult);

    let div_numbers = document.createElement("div");
    div_numbers.classList.add("div_numbers");

    let span_vote = document.createElement("span");
    span_vote.innerText = "Média de Votos: ";

    let p_vote_average = document.createElement("p");
    p_vote_average.innerText = `${Number(infos.vote_average).toFixed(1)}/10`;

    let div4 = document.createElement("div");
    div4.appendChild(span_vote);
    div4.appendChild(p_vote_average);

    let span_pop = document.createElement("span");
    span_pop.innerText = "Populariedade: ";

    let p_popularity = document.createElement("p");
    p_popularity.innerText = infos.popularity;

    let div5 = document.createElement("div");
    div5.appendChild(span_pop);
    div5.appendChild(p_popularity);

    let btn_close = document.createElement("button");
    btn_close.innerHTML = `<span class="material-symbols-outlined">close</span>`;
    btn_close.classList.add('btn_close_modal');

    btn_close.addEventListener("click", function () {
        back_modal.style.display = "none"
    })

    div_numbers.appendChild(btn_close);

    div_numbers.appendChild(div4);
    div_numbers.appendChild(div5);

    div_desc.appendChild(div1);
    div_desc.appendChild(div2);
    div_desc.appendChild(div3);
    div_desc.appendChild(div_numbers);

    let div_actions = document.createElement("div");
    div_actions.classList.add("div_actions");

    let div_favorite = document.createElement("div");
    div_favorite.classList.add("div_favorite");
    let span_favorite = document.createElement("span");
    span_favorite.innerText = "Favoritar";
    let button_favorite = document.createElement("button");
    button_favorite.innerHTML = `<span class="material-symbols-outlined">star</span>`;
    div_favorite.appendChild(span_favorite);
    div_favorite.appendChild(button_favorite);
    
    let div_watch_later = document.createElement("div");
    div_watch_later.classList.add("div_watch_later");
    let span_watch_later = document.createElement("span");
    span_watch_later.innerText = "Assistir Depois ";
    let button_watch_later = document.createElement("button");
    button_watch_later.innerHTML = `<span class="material-symbols-outlined">visibility_off</span>`;
    div_watch_later.appendChild(span_watch_later);
    div_watch_later.appendChild(button_watch_later);

    div_actions.appendChild(div_favorite);
    div_actions.appendChild(div_watch_later);

    div_desc.appendChild(div_actions);

    div_modal.appendChild(div_desc);

    button_watch_later.addEventListener("click", ()=> watch_later(infos, button_watch_later));
    button_favorite.addEventListener("click", ()=> favorite_it(infos, button_favorite));
}

const watch_later = (infos, btn) => {
    if(btn.innerHTML === `<span class="material-symbols-outlined">visibility_off</span>`)
    btn.innerHTML = `<span class="material-symbols-outlined">visibility</span>`
    else btn.innerHTML = `<span class="material-symbols-outlined">visibility_off</span>`;
}

const favorite_it = (infos, btn) => {
    if(btn.innerHTML === `<span class="material-symbols-outlined">star</span>`){
        btn.innerHTML = `<span class="material-symbols-outlined">hotel_class</span>`
    }else {
        btn.innerHTML = `<span class="material-symbols-outlined">star</span>`;
    }
    console.log(btn.children);
    
}