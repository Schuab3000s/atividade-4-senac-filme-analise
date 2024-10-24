document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const filmeId = urlParams.get("id");

    if (filmeId) {
        fetch(`/api/filmes/${filmeId}`)
            .then(response => response.json())
            .then(filme => {
                document.getElementById("titulo").value = filme.titulo;
                document.getElementById("sinopse").value = filme.sinopse;
                document.getElementById("genero").value = filme.genero;
                document.getElementById("anoLancamento").value = filme.anoLancamento;
                document.getElementById("filmeId").value = filme.id;
            });
    }

    document.getElementById("salvarFilmeBtn").addEventListener("click", function () {
        const titulo = document.getElementById("titulo").value;
        const sinopse = document.getElementById("sinopse").value;
        const genero = document.getElementById("genero").value;
        const anoLancamento = document.getElementById("anoLancamento").value;

        const filme = {
            titulo: titulo,
            sinopse: sinopse,
            genero: genero,
            anoLancamento: parseInt(anoLancamento)
        };

        if (filmeId) {
            fetch(`/api/filmes/${filmeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filme)
            }).then(response => {
                if (response.ok) {
                    alert("Filme atualizado com sucesso!");
                    window.location.href = "/lista-filmes.html";
                }
            });
        } else {
            fetch("/api/filmes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(filme)
            }).then(response => {
                if (response.ok) {
                    alert("Filme salvo com sucesso!");
                    window.location.href = "/lista-filmes.html";
                }
            });
        }
    });
});