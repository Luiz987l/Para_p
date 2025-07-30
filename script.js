let quantidadeDisponivel = {
    frase: {
        romantico: 5,
        motivacional: 5,
        amigos: 5,
        reflexao: 5,
        familia: 5
    },
    poema: {
        romantico: 5,
        motivacional: 5,
        amigos: 5,
        reflexao: 5,
        familia: 5
    }
};

function desativarBotoes() {
    const botao = document.getElementById("botaoGerar");
    if (botao) {
        botao.disabled = true;
        setTimeout(() => {
            botao.disabled = false;
        }, 2000);
    }
}

function atualizarContadorNaTela() {
    let total = 0;
    for (let tipo in quantidadeDisponivel) {
        for (let categoria in quantidadeDisponivel[tipo]) {
            total += quantidadeDisponivel[tipo][categoria];
        }
    }
    document.getElementById("contadorMensagem").innerText = `Mensagens restantes: ${total}`;
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
                "Acredite em você, porque ninguém pode fazer isso melhor que você mesmo.",
                "Cada passo, por menor que pareça, te aproxima do seu objetivo.",
                "Desistir não é uma opção para quem nasceu para vencer."
            ],
            amigos: [
                "Amigos são a família que escolhemos.",
                "Na amizade verdadeira, o tempo nunca separa.",
                "Amigos são a família que o coração escolhe.",
                "A verdadeira amizade não se mede pelo tempo, mas pela intensidade dos momentos vividos juntos.",
                "Com um amigo de verdade ao lado, até os dias difíceis se tornam mais leves."
            ],
            reflexao: [
                "A vida é feita de momentos, aproveite cada um.",
                "Pensar é o primeiro passo para mudar.",
                "Nem sempre o que perdemos era realmente nosso — às vezes, a vida apenas nos ensina a soltar.",
                "O tempo não apaga, ele revela quem realmente vale a pena.",
                "Crescer dói, mas permanecer no mesmo lugar dói ainda mais."
            ],
            familia: [
                "A família é o primeiro lugar onde aprendemos a amar e a ser amados.",
                "Mesmo nas dificuldades, a família é o porto seguro que nos acolhe.",
                "Família não é só sangue, é amor, cuidado e presença.",
                "Os laços familiares são como raízes: invisíveis, mas que sustentam tudo.",
                "Uma família unida transforma qualquer casa em um verdadeiro lar."
            ]
        },
        poema: {
            romantico: [
                "Teus olhos são abrigo, são farol,<br>Luz que me guia mesmo em temporal.<br>Quando me perco, é neles que me acho,<br>Refúgio manso, doce e sem igual.",
                "Teus lábios são poesia, versos de amor,<br>Em cada toque, sinto o calor.<br>Teu sorriso é a luz que ilumina meu ser,<br>Com você, aprendi o que é viver.",
                "Teu amor é como um sonho, doce e profundo,<br>Em cada abraço, descubro um novo mundo.<br>Teus olhos são estrelas que brilham no céu,<br>Com você, meu amor, sou sempre eu.",
                "Teu amor é como um poema, escrito com carinho,<br>Em cada verso, sinto o seu caminho.<br>Teus braços são abrigo, teu olhar é paz,<br>Com você, meu amor, tudo se faz.",
                "Teus lábios são a melodia que embala meu coração,<br>Em cada beijo, sinto a doce emoção.<br>Teu amor é a luz que ilumina meu viver,<br>Com você, meu amor, aprendi a amar e a ser."
            ],
            motivacional: [
                "Vai, sem medo, vai com fé, <br>o mundo é grande, mas teu passo é rei.<br>Se o vento bater forte, dança.<br>Dentro de ti, há um sol a brilhar.",
                "A vida é um livro em branco, <br>e você é o autor da sua história.<br>Não tenha medo de escrever, <br>não tenha medo de viver.",
                "A vida é um mar de possibilidades, <br>e você é o capitão do seu barco.<br>Navegue com coragem, enfrente as tempestades.",
                "A vida é uma dança, <br>e você é o dançarino.<br>Não tenha medo de errar, pois é assim que aprendemos a dançar.",
                "A vida é uma jornada, <br>e você é o viajante.<br>Não tenha medo de se perder, pois é assim que encontramos novos caminhos."
            ],
            amigos: [
                "Amigo é porto em mar agitado, <br>é abraço que a gente entende sem falar.<br>É riso aberto, é chão sagrado.",
                "Amizade é flor que nunca murcha, <br>é riso solto, é lágrima que enxuga.",
                "Amigo é aquele que não tem hora, <br>é quem te abraça e nunca vai embora.",
                "Amizade é laço que nunca se rompe, <br>é amor sincero, é puro calor.",
                "Amigo é aquele que ilumina até os dias mais nublados."
            ],
            reflexao: [
                "Entre o que sou e o que quero ser, <br>caminho feito rio: às vezes calmo, às vezes correnteza.",
                "A vida é um espelho que reflete o que somos.<br>O segredo está em como escolhemos ver.",
                "A vida é feita de escolhas, <br>e cada escolha é um passo.",
                "A vida é um livro em branco, <br>cada dia é uma nova página.",
                "A vida é uma dança, <br>e você é o dançarino."
            ],
            familia: [
                "Família é abraço que não se solta, <br>é raiz que sustenta e céu que abençoa.",
                "Família é onde a alma descansa, <br>é onde o medo se desfaz.",
                "Somos fios de uma mesma história, <br>tecidos em risos e lembranças.",
                "No ninho da casa pequena, <br>cabe todo o amor do mundo.",
                "Família é farol em noite escura, <br>é colo quente em dia frio."
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

    if (quantidadeDisponivel[tipo][categoria] === 0) {
        fetch('http://localhost:5000/notificar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo, categoria })
        }).then(res => console.log("Notificação enviada!"));
    }

    if (tipo === "poema") {
        document.getElementById("frase").innerHTML = mensagem;
    } else {
        document.getElementById("frase").innerText = mensagem;
    }

    atualizarContadorNaTela();
    desativarBotoes();
}

document.getElementById("tipoConteudo").addEventListener("change", atualizarContadorNaTela);
document.getElementById("categoria").addEventListener("change", atualizarContadorNaTela);

// Inicializa o contador na primeira vez
atualizarContadorNaTela();
