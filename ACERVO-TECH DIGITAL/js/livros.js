
function carregarTabelaLivros() {
    const tbody = document.getElementById('tabelaLivros');
    tbody.innerHTML = '';
    
    livros.forEach(l => {
        // Nova regra: se o livro não tiver a variável 'status', assumimos que está 'ativo'
        const statusLivro = l.status || 'ativo';
        
        const tr = document.createElement('tr');
        
        // Se o livro estiver descartado, pintamos a linha de vermelho claro para sinalizar ao Administrador
        if (statusLivro === 'descartado') {
            tr.style.backgroundColor = '#ffeeee';
            tr.style.opacity = '0.75';
        }

        tr.innerHTML = `
            <td>${l.id}</td>
            <td>${l.titulo}</td>
            <td>${l.autor}</td>
            <td>${l.isbn}</td>
            <td>${l.categoria}</td>
            <td>${l.exemplares}</td>
            <td>${statusLivro === 'descartado' ? '<span style="color:#d32f2f; font-weight:bold;">Descartado</span>' : l.disponiveis}</td>
            <td class="acoes">
                ${statusLivro === 'ativo' ? `
                    <button class="btn-editar" onclick="editarLivro(${l.id})">Editar</button>
                    <button class="btn-excluir" onclick="excluirLivro(${l.id})">Descartar</button>
                ` : `<em>Histórico Mantido</em>`}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirFormLivro() {
    document.getElementById('formLivroContainer').style.display = 'block';
    document.getElementById('formLivroTitulo').textContent = 'Cadastrar Livro';
    document.getElementById('formLivro').reset();
    document.getElementById('livroId').value = '';
}

function fecharFormLivro() {
    document.getElementById('formLivroContainer').style.display = 'none';
}

document.getElementById('formLivro').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('livroId').value;
    const titulo = document.getElementById('titulo').value.trim();
    const autor = document.getElementById('autor').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const exemplares = parseInt(document.getElementById('exemplares').value);

    if (id) {
        const livro = livros.find(l => l.id == id);
        if (livro) {
            livro.titulo = titulo;
            livro.autor = autor;
            livro.isbn = isbn;
            livro.categoria = categoria;
            livro.exemplares = exemplares;
            livro.disponiveis = Math.min(livro.disponiveis, exemplares);
        }
    } else {
        livros.push({
            id: proximoId(livros),
            titulo, autor, isbn, categoria,
            exemplares,
            disponiveis: exemplares,
            status: 'ativo' // Novos livros entram sempre como ativos
        });
    }
    fecharFormLivro();
    carregarTabelaLivros();
});

function editarLivro(id) {
    const livro = livros.find(l => l.id === id);
    if (!livro) return;
    document.getElementById('livroId').value = livro.id;
    document.getElementById('titulo').value = livro.titulo;
    document.getElementById('autor').value = livro.autor;
    document.getElementById('isbn').value = livro.isbn;
    document.getElementById('categoria').value = livro.categoria;
    document.getElementById('exemplares').value = livro.exemplares;
    document.getElementById('formLivroTitulo').textContent = 'Editar Livro';
    document.getElementById('formLivroContainer').style.display = 'block';
}

// ===== NOVA REGRA DE NEGÓCIO: DESBASTAMENTO (SOFT DELETE) =====
function excluirLivro(id) {
    const livro = livros.find(l => l.id === id);
    if (!livro) return;

    // Alerta inteligente verificando a regra dos 3 anos
    const confirmacao = confirm(`📚 POLÍTICA DE DESBASTAMENTO\n\nO livro "${livro.titulo}" já cumpriu o prazo de obsolescência de 3 anos ou encontra-se danificado?\n\nAo confirmar, este será DESCARTADO do acervo físico. O registo no sistema será mantido para o histórico de empréstimos.`);
    
    if (confirmacao) {
        // Exclusão Lógica: não apagamos o livro, apenas mudamos o seu estado
        livro.status = 'descartado';
        livro.disponiveis = 0; // O livro já não está na prateleira
        
        alert('✅ Descarte registado com sucesso! A obra foi retirada de circulação.');
        carregarTabelaLivros(); // Atualiza o ecrã para mostrar a linha vermelha de "Descartado"
    }
}
