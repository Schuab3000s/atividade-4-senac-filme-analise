document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("adicionarFilmeBtn").addEventListener("click", function () {
        window.location.href = "/form-filme.html";
    });

    document.getElementById("listarAnalisesBtn").addEventListener("click", function () {
        window.location.href = "/lista-analises.html";
    });

    fetch("/api/filmes")
        .then(response => response.json())
        .then(filmes => {
            const tbody = document.getElementById("filmesTableBody");
            tbody.innerHTML = ""; // Limpar a tabela antes de adicionar os filmes
            filmes.forEach(filme => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${filme.id}</td>
                    <td>${filme.titulo}</td>
                    <td>${filme.genero}</td>
                    <td>
                        <button class="btn btn-info detalhes-filme-btn" data-id="${filme.id}">Detalhes</button>
                        <button class="btn btn-warning editar-filme-btn" data-id="${filme.id}">Editar</button>
                        <button class="btn btn-danger deletar-filme-btn" data-id="${filme.id}">Excluir</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".detalhes-filme-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const filmeId = this.getAttribute("data-id");
                    window.location.href = `/detalhes-filme.html?id=${filmeId}`;
                });
            });

            document.querySelectorAll(".editar-filme-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const filmeId = this.getAttribute("data-id");
                    window.location.href = `/form-filme.html?id=${filmeId}`;
                });
            });

            document.querySelectorAll(".deletar-filme-btn").forEach(button => {
                button.addEventListener("click", function () {
                    const filmeId = this.getAttribute("data-id");
                    fetch(`/api/filmes/${filmeId}`, {
                        method: "DELETE"
                    }).then(response => {
                        if (response.ok) {
                            alert("Filme excluído com sucesso!");
                            window.location.reload();
                        } else {
                            alert("Erro ao excluir o filme. Tente novamente.");
                        }
                    }).catch(error => {
                        console.error("Erro:", error);
                        alert("Erro ao excluir o filme. Verifique o console para mais detalhes.");
                    });
                });
            });
        })
        .catch(error => {
            console.error("Erro ao buscar filmes:", error);
            alert("Erro ao buscar filmes. Verifique o console para mais detalhes.");
        });
});
