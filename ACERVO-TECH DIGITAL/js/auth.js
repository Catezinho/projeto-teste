const CREDENCIAIS_FIXAS = {
    admin: { email: 'admin@biblioteca.com', senha: 'admin123', perfil: 'administrador', nome: 'Bibliotecário' },
    visitante: { email: 'visitante@biblioteca.com', senha: 'visitante123', perfil: 'visitante', nome: 'Usuário Comum' }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formLogin');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const senha = document.getElementById('senha').value.trim();
            let usuario = null;

            // 1. Verifica nas credenciais fixas (apenas para testes)
            for (let chave in CREDENCIAIS_FIXAS) {
                if (CREDENCIAIS_FIXAS[chave].email === email && CREDENCIAIS_FIXAS[chave].senha === senha) {
                    usuario = CREDENCIAIS_FIXAS[chave];
                    break;
                }
            }

            // 2. Verifica no localStorage (usuários cadastrados)
            if (!usuario) {
                const cadastrados = JSON.parse(localStorage.getItem('usuariosCadastrados') || '[]');
                const encontrado = cadastrados.find(u => u.email === email && u.senha === senha);
                if (encontrado) {
                    usuario = {
                        email: encontrado.email,
                        nome: encontrado.nome,
                        perfil: 'visitante',
                        senha: encontrado.senha
                    };
                }
            }

            if (usuario) {
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                window.location.href = 'pages/dashboard.html';
            } else {
                document.getElementById('mensagemErro').textContent = 'E-mail ou senha inválidos.';
            }
        });
    }
});

function verificarAutenticacao() {
    const dados = sessionStorage.getItem('usuarioLogado');
    if (!dados) {
        window.location.href = '../index.html';
        return null;
    }
    return JSON.parse(dados);
}

function logout() {
    sessionStorage.removeItem('usuarioLogado');
    window.location.href = '../index.html';
}

function exibirUsuarioNoMenu() {
    const usuario = verificarAutenticacao();
    if (usuario) {
        const span = document.getElementById('nomeUsuario');
        if (span) span.textContent = `👋 ${usuario.nome}`;
    }
}