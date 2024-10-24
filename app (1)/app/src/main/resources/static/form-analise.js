document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const analiseId = urlParams.get("id");
    const filmeId = urlParams.get("filmeId");

    if (analiseId) {
        fetch(`/api/analises/${analiseId}`)
            .then(response => response.json())
            .then(analise => {
                document.getElementById("analise").value = analise.analise;
                document.getElementById("nota").value = analise.nota;
            });
    }

    document.getElementById("salvarAnaliseBtn").addEventListener("click", function () {
        const analise = document.getElementById("analise").value;
        const nota = document.getElementById("nota").value;

        const novaAnalise = {
            filme: { id: parseInt(filmeId) },
            analise: analise,
            nota: parseInt(nota)
        };

        const method = analiseId ? "PUT" : "POST";
        const url = analiseId ? `/api/analises/${analiseId}` : `/api/analises`;

        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novaAnalise)
        }).then(response => {
            if (response.ok) {
                alert("Análise salva com sucesso!");
                window.location.href = `/lista-analises.html?filmeId=${filmeId}`;
            }
        }).catch(error => {
            console.error("Erro:", error);
            alert("Erro ao salvar a análise. Verifique o console para mais detalhes.");
        });
    });

    document.getElementById("voltarBtn").addEventListener("click", function () {
        window.location.href = `/detalhes-filme.html?id=${filmeId}`;
    });
});
