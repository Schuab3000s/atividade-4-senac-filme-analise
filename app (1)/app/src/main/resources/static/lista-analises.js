document.addEventListener("DOMContentLoaded", function () {
    fetch(`/api/analises`)
        .then(response => response.json())
        .then(analises => {
            const tbody = document.getElementById("analisesTableBody");
            tbody.innerHTML = ""; 

            if (analises.length === 0) {
                const row = document.createElement("tr");
                row.innerHTML = `<td colspan="5" class="text-center">Nenhuma análise encontrada.</td>`;
                tbody.appendChild(row);
            } else {
                analises.forEach(analise => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${analise.id}</td>
                        <td>${analise.filme.titulo}</td>
                        <td>${analise.analise}</td>
                        <td>${analise.nota}</td>
                        <td>
                            <button class="btn btn-warning edit-analise-btn" data-id="${analise.id}">Editar</button>
                            <button class="btn btn-danger delete-analise-btn" data-id="${analise.id}">Excluir</button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }

            document.querySelectorAll(".edit-analise-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const analiseId = this.getAttribute("data-id");
                    window.location.href = `/form-analise.html?id=${analiseId}`;
                });
            });

            document.querySelectorAll(".delete-analise-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const analiseId = this.getAttribute("data-id");
                    fetch(`/api/analises/${analiseId}`, {
                        method: "DELETE"
                    }).then(response => {
                        if (response.ok) {
                            alert("Análise excluída com sucesso!");
                            window.location.reload();
                        } else {
                            alert("Erro ao excluir a análise. Tente novamente.");
                        }
                    }).catch(error => {
                        console.error("Erro:", error);
                        alert("Erro ao excluir a análise. Verifique o console para mais detalhes.");
                    });
                });
            });
        })
        .catch(error => {
            console.error("Erro ao buscar análises:", error);
            alert("Erro ao buscar análises. Verifique o console para mais detalhes.");
        });

    document.getElementById("voltarListaFilmesBtn").addEventListener("click", function () {
        window.location.href = "/lista-filmes.html";
    });
});
