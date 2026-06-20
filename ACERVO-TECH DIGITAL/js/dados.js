let livros = [
    { id: 1, titulo: 'Dom Casmurro', autor: 'Machado de Assis', isbn: '978-85-01-00001-0', categoria: 'Literatura', exemplares: 3, disponiveis: 2 },
    { id: 2, titulo: 'O Hobbit', autor: 'J.R.R. Tolkien', isbn: '978-85-01-00002-7', categoria: 'Fantasia', exemplares: 5, disponiveis: 5 },
    { id: 3, titulo: 'Algoritmos', autor: 'Cormen', isbn: '978-85-01-00003-4', categoria: 'Técnico', exemplares: 2, disponiveis: 1 }
];

let usuarios = [
    { id: 1, nome: 'Ana Silva', email: 'ana@email.com', tipo: 'Aluno', ativo: true },
    { id: 2, nome: 'Carlos Souza', email: 'carlos@email.com', tipo: 'Professor', ativo: true }
];

let emprestimos = [
    { id: 1, idLivro: 1, idUsuario: 1, dataEmprestimo: '2026-06-10', dataDevolucaoPrevista: '2026-06-24', status: 'ativo' },
    { id: 2, idLivro: 3, idUsuario: 2, dataEmprestimo: '2026-06-05', dataDevolucaoPrevista: '2026-06-19', status: 'ativo' }
];

function proximoId(lista) {
    return lista.length ? Math.max(...lista.map(i => i.id)) + 1 : 1;
}