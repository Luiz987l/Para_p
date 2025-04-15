let quantidadeDisponivel = {
    frase: {
        romantico: 5,
        motivacional: 5,
        amigos: 5,
        reflexao: 5
    },
    poema: {
        romantico: 5,
        motivacional: 5,
        amigos: 5,
        reflexao: 5
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
                "Você é a razão dos meus sorrisos mais sinceros.",
                "Desde que te conheci, meu coração só sabe bater por você.",
                "Você é o motivo do meu sorriso todos os dias.",
                "Em um mundo cheio de incertezas, te amar é a minha única certeza."
            ],
            motivacional: [
                "Acredite em você e tudo será possível.",
                "Grandes jornadas começam com um simples passo.",
                "Acredite em você, porque ninguém pode fazer isso melhor que você mesmo.",  "Cada passo, por menor que pareça, te aproxima do seu objetivo.",
                "Desistir não é uma opção para quem nasceu para vencer."
            ],
            amigos: [
                "Amigos são a família que escolhemos.",
                "Na amizade verdadeira, o tempo nunca separa.",
                "Amigos são a família que o coração escolhe.",
                "A verdadeira amizade não se mede pelo tempo, mas pela intensidade dos momentos vividos juntos",
                "Com um amigo de verdade ao lado, até os dias difíceis se tornam mais leves."
            ],
            reflexao: [
                "A vida é feita de momentos, aproveite cada um.",
                "Pensar é o primeiro passo para mudar.",
                "Nem sempre o que perdemos era realmente nosso — às vezes, a vida apenas nos ensina a soltar.",
                "O tempo não apaga, ele revela quem realmente vale a pena.",
                "Crescer dói, mas permanecer no mesmo lugar dói ainda mais."
            ]
        },
        poema: {
            romantico: [
                "No silêncio do teu olhar, encontro paz e encanto sem par.",
                "Te amo com a força do mar, com a calma do luar.",
                "Te encontrei sem procurar, e agora não sei mais andar por caminhos que não tenham o som do teu respirar.",
                "Teus olhos são estrelas que iluminam meu caminho, e teu sorriso é o sol que aquece meu destino.",
                "Te amar é como dançar sob a luz da lua, onde cada passo é uma nova aventura."
            ],
            motivacional: [
                "Lute com fé no coração, o topo é a sua direção.",
                "A vida pulsa em cada amanhecer, levante e comece a vencer.",
                "A cada desafio, uma oportunidade de brilhar.",
                "A vida é uma dança, e você é o coreógrafo da sua história.",
                "Acredite, o impossível é apenas uma palavra que não existe no dicionário dos sonhadores."
            ],
            amigos: [
                "Em cada riso compartilhado, um laço é criado.",
                "Na jornada da vida, a amizade é luz que não se apaga.",
                "Amigos são como estrelas, mesmo longe, sempre brilham.",
                "A verdadeira amizade é um poema que nunca termina.",
                "Com amigos, a vida é uma festa, cheia de risos e histórias para contar."
            ],
            reflexao: [
                "Somos feitos de instantes, de sonhos e esperanças vibrantes.",
                "A alma cresce em cada lição, na dor, no amor e na reflexão.",
                "A vida é um livro em branco, e cada dia é uma nova página.",
                "Refletir é o primeiro passo para a transformação.",
                "A vida é um espelho, e tudo que fazemos volta para nós."
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
