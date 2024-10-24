document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get("id");

    fetch(`/api/filmes/${filmeId}`)
        .then(response => response.json())
        .then(filme => {
            document.getElementById("titulo").textContent = filme.titulo;
            document.getElementById("sinopse").textContent = filme.sinopse;
            document.getElementById("genero").textContent = filme.genero;
            document.getElementById("anoLancamento").textContent = filme.anoLancamento;

            document.getElementById("editarFilmeBtn").addEventListener("click", function () {
                window.location.href = `/form-filme.html?id=${filmeId}`;
            });

            document.getElementById("adicionarAnaliseBtn").addEventListener("click", function () {
                window.location.href = `/form-analise.html?filmeId=${filmeId}`;
            });

            document.getElementById("voltarBtn").addEventListener("click", function () {
                window.location.href = `/lista-filmes.html`;
            });
        });
});
