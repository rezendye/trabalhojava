


BY: EMANUELLE, ROBERT, PAULA







// Pega o formulário da página
const form = document.getElementById("form-atividade");

//  Emojis felizes e tristes em formato de imagens
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji decepcionado" />';

// Guarda os nomes das atividades em uma lista
const atividades = [];

// Armazena as notas das atividades
const notas = [];

// Mostra se foi aprovado ou reprovado usando palavras em um quadro
const spanAprovado = '<span class="aprovado">Aprovado</span>';
const spanReprovado = '<span class="reprovado">Reprovado</span>';

// Pergunta pro usuário qual é a nota mínima e guarda em formato de número
const notaMinima = parseFloat(prompt("Digite a Nota Mínima: "));

// Vamos guardar as linhas da tabela em um texto
let linhas = ' ';

// Coloca uma espécie de "ouvinte" que fica de olho no botão de enviar do formulário
form.addEventListener('submit', function(e) {
    // Não deixa a página atualizar sozinha quando o formulário é enviado
    e.preventDefault();

    // Chama umas funções para adicionar linhas, atualizar a tabela e a média
    adicionaLinha();
    atualizaTabela();
    atualizaMeidaFinal();
});

// Função para adicionar uma nova linha na tabela
function adicionaLinha() {
    // Pega as caixinhas onde o usuário coloca nome da atividade e nota
    const inputNomeAtividade = document.getElementById("nome-atividade");
    const inputNotaAtividade = document.getElementById("nota-atividade");

    // Vê se a atividade já foi colocada antes
    if (atividades.includes(inputNomeAtividade.value)) {
        // Mostra um alerta se já tiver sido colocada
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida!`);
    } else {
        // Coloca a atividade e a nota nas suas listinhas
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));

        // Monta uma linha da tabela em HTML
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        // Decide se a atividade foi aprovada ou não e coloca a imagem apropriada
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';

        // Junta essa linha nova com as que já tinham
        linhas += linha;
    }

    // Limpa as caixinhas de entrada depois de adicionar uma linha
    inputNomeAtividade.value = ' ';
    inputNotaAtividade.value = ' ';
}

// Função para atualizar a tabela com as linhas que foram montadas
function atualizaTabela() {
    // Pega a parte do HTML onde fica o corpo da tabela
    const corpoTabela = document.querySelector('tbody');
    // Coloca as linhas novas nesse corpo da tabela
    corpoTabela.innerHTML = linhas;
}

// Função para atualizar a média final e mostrar se passou ou não
function atualizaMeidaFinal() {
    // Calcula a média final usando a função de calcular
    const mediaFinal = calculaMediaFinal();

    // Mostra a média final na página
    document.getElementById("media-final-valor").innerHTML = mediaFinal;

    // Decide se o aluno passou ou não e atualiza o texto na página
    document.getElementById("media-final-resultado").innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

// Função para calcular a média de todas as notas
function calculaMediaFinal() {
    let somaDasNotas = 0;

    // Vai somando todas as notas para calcular a média
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    // Divide a soma pelo número de notas para achar a média e retorna
    return somaDasNotas / notas.length;
}
