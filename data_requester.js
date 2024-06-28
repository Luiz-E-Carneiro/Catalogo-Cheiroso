async function data_requester(action, item = null, type = null) {
    var data = await fetch(`http://localhost/catalogo-cheiroso/data_taker.php?action=${action}&item=${item}&type=${type}`)
    data = await data.json()
    console.log(data)
}
