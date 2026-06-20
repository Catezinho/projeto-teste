function carregarTabelaUsuarios() {
    const tbody = document.getElementById('tabelaUsuarios');
    tbody.innerHTML = '';
    usuarios.forEach(u => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${u.id}</td>
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>${u.tipo}</td>
            <td>${u.ativo ? 'Sim' : 'Não'}</td>
            <td class="acoes">
                <button class="btn-editar" onclick="editarUsuario(${u.id})">Editar</button>
                <button class="btn-excluir" onclick="excluirUsuario(${u.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirFormUsuario() {
    document.getElementById('formUsuarioContainer').style.display = 'block';
    document.getElementById('formUsuarioTitulo').textContent = 'Cadastrar Usuário';
    document.getElementById('formUsuario').reset();
    document.getElementById('usuarioId').value = '';
    document.getElementById('ativo').checked = true;
}

function fecharFormUsuario() {
    document.getElementById('formUsuarioContainer').style.display = 'none';
}

document.getElementById('formUsuario').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('usuarioId').value;
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const tipo = document.getElementById('tipo').value;
    const ativo = document.getElementById('ativo').checked;

    if (id) {
        const usuario = usuarios.find(u => u.id == id);
        if (usuario) {
            usuario.nome = nome;
            usuario.email = email;
            usuario.tipo = tipo;
            usuario.ativo = ativo;
        }
    } else {
        usuarios.push({ id: proximoId(usuarios), nome, email, tipo, ativo });
    }
    fecharFormUsuario();
    carregarTabelaUsuarios();
});

function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    document.getElementById('usuarioId').value = usuario.id;
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('tipo').value = usuario.tipo;
    document.getElementById('ativo').checked = usuario.ativo;
    document.getElementById('formUsuarioTitulo').textContent = 'Editar Usuário';
    document.getElementById('formUsuarioContainer').style.display = 'block';
}

function excluirUsuario(id) {
    if (confirm('Deseja excluir este usuário?')) {
        usuarios = usuarios.filter(u => u.id !== id);
        carregarTabelaUsuarios();
    }
}