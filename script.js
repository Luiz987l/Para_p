let quantidadeDisponivel = {
    frase: {
        romantico: 2,
        motivacional: 2,
        amigos: 2,
        reflexao: 2
    },
    poema: {
        romantico: 2,
        motivacional: 2,
        amigos: 2,
        reflexao: 2
    }
};

function desativarBotoes() {
    document.querySelector("button").disabled = true;

    setTimeout(() => {
        document.querySelector("button").disabled = false;
    }, 2000);
}

function atualizarContadorNaTela() {
    const tipo = document.getElementById("tipoConteudo").value;
    const categoria = document.getElementById("categoria").value;
    const restante = quantidadeDisponivel[tipo][categoria];
    
    document.getElementById("contadorMensagem").innerText =
        `Tipo: ${tipo}, Categoria: ${categoria}, Restante: ${restante}`;
}

function gerarFrase() {
    const tipo = document.getElementById("tipoConteudo").value;
    const categoria = document.getElementById("categoria").value;

    const conteudos = {
        frase: {
            romantico: [
                "O amor verdadeiro é aquele que o vento não leva e a distância não separa.",
                "Você é a razão dos meus sorrisos mais sinceros."
            ],
            motivacional: [
                "Acredite em você e tudo será possível.",
                "Grandes jornadas começam com um simples passo."
            ],
            amigos: [
                "Amigos são a família que escolhemos.",
                "Na amizade verdadeira, o tempo nunca separa."
            ],
            reflexao: [
                "A vida é feita de momentos, aproveite cada um.",
                "Pensar é o primeiro passo para mudar."
            ]
        },
        poema: {
            romantico: [
                "No silêncio do teu olhar, encontro paz e encanto sem par.",
                "Te amo com a força do mar, com a calma do luar."
            ],
            motivacional: [
                "Lute com fé no coração, o topo é a sua direção.",
                "A vida pulsa em cada amanhecer, levante e comece a vencer."
            ],
            amigos: [
                "Em cada riso compartilhado, um laço é criado.",
                "Na jornada da vida, a amizade é luz que não se apaga."
            ],
            reflexao: [
                "Somos feitos de instantes, de sonhos e esperanças vibrantes.",
                "A alma cresce em cada lição, na dor, no amor e na reflexão."
            ]
        }
    };

    const lista = conteudos[tipo][categoria];
    const restante = quantidadeDisponivel[tipo][categoria];

    if (restante <= 0) {
        document.getElementById("frase").innerText = "Nenhuma mensagem restante nessa categoria.";
        return;
    }

    const mensagem = lista[Math.floor(Math.random() * lista.length)];

    quantidadeDisponivel[tipo][categoria]--;

    // Envia e-mail se chegou a zero
    if (quantidadeDisponivel[tipo][categoria] === 0) {
        fetch('http://localhost:5000/notificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo, categoria })
        }).then(res => console.log("Notificação enviada!"));
    }

    document.getElementById("frase").innerText = mensagem;
    atualizarContadorNaTela();
    desativarBotoes();
}

// Atualiza contador sempre que o usuário mudar os selects
document.getElementById("tipoConteudo").addEventListener("change", atualizarContadorNaTela);
document.getElementById("categoria").addEventListener("change", atualizarContadorNaTela);

function atualizarContadorNaTela() {
    let total = 0;
    for (let tipo in quantidadeDisponivel) {
        for (let categoria in quantidadeDisponivel[tipo]) {
            total += quantidadeDisponivel[tipo][categoria];
        }
    }
    document.getElementById("contadorMensagem").innerText = `Mensagens restantes: ${total}`;
}
