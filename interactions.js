document.getElementById('toggle-btn').addEventListener('click', function() {
    var sideBar = document.querySelector('.side-bar');
    sideBar.classList.toggle('collapsed');
    this.innerHTML = sideBar.classList.contains('collapsed') ?
    '<span class="material-symbols-outlined">drag_indicator</span>' :
    '<span class="material-symbols-outlined">menu</span>';
});
