function carregarSelects() {
    const selLivro = document.getElementById('idLivro');
    const selUsuario = document.getElementById('idUsuario');
    selLivro.innerHTML = '<option value="">Selecione</option>';
    selUsuario.innerHTML = '<option value="">Selecione</option>';
    livros.forEach(l => {
        const opt = document.createElement('option');
        opt.value = l.id;
        opt.textContent = `${l.titulo} (${l.disponiveis} disp.)`;
        selLivro.appendChild(opt);
    });
    usuarios.forEach(u => {
        const opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent = u.nome;
        selUsuario.appendChild(opt);
    });
}

function carregarTabelaEmprestimos() {
    const tbody = document.getElementById('tabelaEmprestimos');
    tbody.innerHTML = '';
    emprestimos.forEach(e => {
        const livro = livros.find(l => l.id === e.idLivro);
        const usuario = usuarios.find(u => u.id === e.idUsuario);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${livro ? livro.titulo : 'N/A'}</td>
            <td>${usuario ? usuario.nome : 'N/A'}</td>
            <td>${e.dataEmprestimo}</td>
            <td>${e.dataDevolucaoPrevista}</td>
            <td><span class="status ${e.status}">${e.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirFormEmprestimo() {
    document.getElementById('formEmprestimoContainer').style.display = 'block';
    document.getElementById('formEmprestimo').reset();
    carregarSelects();
}

function fecharFormEmprestimo() {
    document.getElementById('formEmprestimoContainer').style.display = 'none';
}

document.getElementById('formEmprestimo').addEventListener('submit', function(e) {
    e.preventDefault();
    const idLivro = parseInt(document.getElementById('idLivro').value);
    const idUsuario = parseInt(document.getElementById('idUsuario').value);
    const dataDevolucao = document.getElementById('dataDevolucao').value;
    if (!idLivro || !idUsuario || !dataDevolucao) {
        alert('Preencha todos os campos.');
        return;
    }
    const livro = livros.find(l => l.id === idLivro);
    if (!livro || livro.disponiveis <= 0) {
        alert('Livro indisponível.');
        return;
    }
    emprestimos.push({
        id: proximoId(emprestimos),
        idLivro,
        idUsuario,
        dataEmprestimo: new Date().toISOString().slice(0,10),
        dataDevolucaoPrevista: dataDevolucao,
        status: 'ativo'
    });
    livro.disponiveis--;
    fecharFormEmprestimo();
    carregarTabelaEmprestimos();
    carregarSelects();
});