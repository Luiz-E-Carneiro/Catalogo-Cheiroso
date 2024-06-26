async function data_requester(action) {
    var data = await fetch(`http://localhost/catalogo-cheiroso/data_taker.php?action=${action}`)
    data = await data.json()
    console.log(data)
}
