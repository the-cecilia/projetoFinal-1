// --- Elementos DOM ---
const telaSplash = document.getElementById('tela-splash'),
      telaConfiguracoes = document.getElementById('tela-configuracoes'),
      telaCreditos = document.getElementById('tela-creditos'),
      telaDificuldade = document.getElementById('tela-dificuldade'),
      telaJogo = document.getElementById('tela-jogo'),
      telaFimDeJogo = document.getElementById('tela-fim-de-jogo'),
      telaVitoria = document.getElementById('tela-vitoria'), // Nova tela de vitória
      modalEvento = document.getElementById('modal-evento');

const telaTransicaoDia = document.getElementById('tela-transicao-dia');
const displayTransicaoDia = document.getElementById('display-transicao-dia');
const sobreposicaoModalResultado = document.getElementById('sobreposicao-modal-resultado');

const modalDiarioAcoes = document.getElementById('modal-diario-acoes');
const botaoAbrirDiario = document.getElementById('botao-abrir-diario');
const botaoFecharDiario = document.getElementById('botao-fechar-diario');
const botaoDiarioAnterior = document.getElementById('botao-diario-anterior');
const botaoDiarioProximo = document.getElementById('botao-diario-proximo');
const botaoDiarioFimDia = document.getElementById('botao-diario-fim-dia');

const paginasDiario = {
    distribuicao: document.getElementById('pagina-diario-distribuicao'),
    expedicao: document.getElementById('pagina-diario-expedicao'),
    fimDia: document.getElementById('pagina-diario-fim-dia')
};
const diarioDistNumDia = document.getElementById('diario-dist-num-dia');
const diarioDistComida = document.getElementById('diario-dist-comida');
const diarioDistAgua = document.getElementById('diario-dist-agua');
const containerPersonagensDistDiario = document.getElementById('container-personagens-dist-diario');
const diarioExpNumDia = document.getElementById('diario-exp-num-dia');
const containerPersonagensExpDiario = document.getElementById('container-personagens-exp-diario');
const diarioFimNumDia = document.getElementById('diario-fim-num-dia');

const botaoIniciar = document.getElementById('botao-iniciar'),
      botaoConfiguracoes = document.getElementById('botao-configuracoes'),
      botaoCreditos = document.getElementById('botao-creditos'),
      botoesVoltarSplash = document.querySelectorAll('.voltar-para-splash'),
      botaoVoltarSplashDificuldade = document.getElementById('voltar-splash-da-dificuldade'),
      botoesDificuldade = document.querySelectorAll('.botao-dificuldade'),
      botaoReiniciarJogo = document.getElementById('botao-reiniciar-jogo'),
      botaoJogarNovamenteVitoria = document.getElementById('botao-jogar-novamente-vitoria'); // Novo botão

const displayContadorDias = document.getElementById('contador-dias'),
      displayContadorComida = document.getElementById('contador-comida'),
      displayContadorAgua = document.getElementById('contador-agua'),
      displayPersonagens = document.getElementById('display-personagens'),
      displayListaInventario = document.getElementById('lista-inventario'),
      displayLogEventos = document.getElementById('log-eventos');
const displayTituloEvento = document.getElementById('titulo-evento'),
      displayDescricaoEvento = document.getElementById('descricao-evento'),
      displayEscolhasEvento = document.getElementById('escolhas-evento'),
      placeholderImagemEvento = document.getElementById('placeholder-imagem-evento');

const displayTituloResultado = document.getElementById('titulo-resultado'),
      displayTextoResultado = document.getElementById('texto-resultado'),
      botaoContinuarResultado = document.getElementById('botao-continuar-resultado');

const displayContagemFinalDias = document.getElementById('contagem-final-dias'),
      displayMensagemFimJogo = document.getElementById('mensagem-fim-de-jogo');
// Novos displays para a tela de vitória
const displayMensagemVitoria = document.getElementById('mensagem-vitoria'),
      displayContagemFinalDiasVitoria = document.getElementById('contagem-final-dias-vitoria');


// --- Estado e Configuração do Jogo ---
let estadoJogo = {};

const DIAS_PARA_VENCER = 20; // CONDIÇÃO DE VITÓRIA
const DIAS_PARA_MORRER_FOME_SEDE = 5;
const MORAL_INICIAL = 80;
const MUDANCA_MORAL_FOME_SEDE = -5;
const MUDANCA_MORAL_DOENTE_FERIDO = -3;
const MUDANCA_MORAL_MORTE_FAMILIA = -25;
const MUDANCA_MORAL_ALIMENTADO_HIDRATADO_BAIXO = 7;
const MUDANCA_MORAL_EXP_SUCESSO = 12;
const MUDANCA_MORAL_EXP_FALHA = -8;
const MUDANCA_MORAL_AJUDOU_ESTRANHO = 10;
const MUDANCA_MORAL_ROUBADO = -15;
const MUDANCA_MORAL_IGNOROU_APELO = -5;
const MORAL_MAXIMA = 100;
const MORAL_MINIMA = 0;
const PERSONAGENS_INICIAIS = [
    { id: 'ted', nome: 'Ted (Pai)', vivo: true, diasSemComida: 0, diasSemAgua: 0, status: 'Saudável', moral: MORAL_INICIAL, emExpedicao: false },
    { id: 'dolores', nome: 'Dolores (Mãe)', vivo: true, diasSemComida: 0, diasSemAgua: 0, status: 'Saudável', moral: MORAL_INICIAL, emExpedicao: false },
    { id: 'timmy', nome: 'Timmy (Filho)', vivo: true, diasSemComida: 0, diasSemAgua: 0, status: 'Saudável', moral: MORAL_INICIAL, emExpedicao: false },
    { id: 'maryjane', nome: 'Mary Jane (Filha)', vivo: true, diasSemComida: 0, diasSemAgua: 0, status: 'Saudável', moral: MORAL_INICIAL, emExpedicao: false }
];
const TODOS_ITENS_POSSIVEIS = ['Machado', 'Rádio Portátil', 'Kit Médico', 'Mapa da Região', 'Lanterna', 'Fita Adesiva', 'Sementes Misteriosas', 'Remédio Duvidoso', 'Pé de Cabra', 'Munição (3)'];
const NUM_ITENS_INICIAIS = 3;
const ITENS_TROCAVEIS = ['Machado', 'Rádio Portátil', 'Kit Médico', 'Mapa da Região', 'Lanterna', 'Fita Adesiva', 'Pé de Cabra', 'Munição (3)'];

// --- Definições de Eventos ---
const eventos = [
    {
        id: 'barulho_estranho', titulo: 'Barulho Estranho Lá Fora',
        descricao: 'Você ouve um barulho arranhando a porta do abrigo. Parece ser algo grande. O que fazer?',
        urlImagem: 'https://placehold.co/350x180/4A3B31/FF6B6B?text=BARULHO+SUSPEITO+NA+PORTA&font=specialelite',
        requerMembroNoAbrigo: true,
        escolhas: [
            { texto: 'Investigar com Cuidado', acao: () => {
                let tituloResultado = 'Investigação'; let textoResultado = ''; const chanceAleatoria = Math.random();
                const investigador = estadoJogo.personagens.find(p => p.vivo && !p.emExpedicao);
                if (!investigador) { mostrarMensagemResultado("Ninguém para Investigar", "Todos estão fora ou incapacitados."); return;}

                if (chanceAleatoria < 0.3) {
                    investigador.status = 'Levemente Ferido';
                    atualizarMoralPersonagem(investigador.id, MUDANCA_MORAL_DOENTE_FERIDO - 5);
                    registrarAtividadeEvento(`${investigador.nome} se machucou ao investigar.`);
                    tituloResultado = 'Perigo!'; textoResultado = `${investigador.nome} encontrou algo hostil e se feriu levemente.`;
                } else if (chanceAleatoria < 0.7) {
                    const comidaEncontrada = Math.floor(Math.random() * 2) + 1; estadoJogo.comida += comidaEncontrada;
                    registrarAtividadeEvento(`Encontraram ${comidaEncontrada} de comida!`);
                    tituloResultado = 'Sorte!'; textoResultado = `Vocês encontraram ${comidaEncontrada} unidades de comida!`;
                    estadoJogo.personagens.filter(p => p.vivo && !p.emExpedicao).forEach(p => atualizarMoralPersonagem(p.id, 5));
                } else {
                    registrarAtividadeEvento('A investigação não revelou nada.');
                    tituloResultado = 'Nada Encontrado'; textoResultado = 'O barulho era apenas o vento, ou a criatura foi embora.';
                }
                mostrarMensagemResultado(tituloResultado, textoResultado);
            }},
            { texto: 'Ignorar e Reforçar a Porta', acao: () => {
                registrarAtividadeEvento('Decidiram ignorar o barulho e reforçar a porta.');
                mostrarMensagemResultado('Precaução', 'Vocês reforçaram a porta. A noite passou em silêncio.');
            }}
        ]
    },
    {
        id: 'sinal_radio', titulo: 'Sinal de Rádio Fraco',
        descricao: 'O rádio capta um sinal fraco e intermitente.',
        urlImagem: 'https://placehold.co/350x180/5A5A5A/B0B0B0?text=SINAL+DE+RADIO+CHIANDO&font=specialelite',
        condicao: () => estadoJogo.inventario.includes('Rádio Portátil') && estadoJogo.personagens.some(p => p.vivo && !p.emExpedicao),
         escolhas: [
            { texto: 'Tentar Sintonizar Melhor', acao: () => {
                let tituloResultado = 'Sintonizando...'; let textoResultado = '';
                if (Math.random() < 0.5) {
                    registrarAtividadeEvento('O sinal se perdeu. Apenas estática.');
                    tituloResultado = 'Sinal Perdido'; textoResultado = 'O sinal desapareceu. Apenas estática.';
                } else {
                    const comidaEncontrada = Math.floor(Math.random() * 2) + 1; estadoJogo.comida += comidaEncontrada;
                    registrarAtividadeEvento(`A transmissão deu uma dica! Encontraram ${comidaEncontrada} de comida.`);
                    tituloResultado = 'Dica Valiosa!'; textoResultado = `A transmissão mencionou um local seguro e encontraram ${comidaEncontrada} de comida!`;
                    atualizarMoralTodosAbrigo(3);
                }
                mostrarMensagemResultado(tituloResultado, textoResultado);
            }},
            { texto: 'Desligar para Economizar Bateria', acao: () => {
                registrarAtividadeEvento('Rádio desligado para economizar energia.');
                mostrarMensagemResultado('Economizando Energia', 'Vocês desligaram o rádio.');
            }}
        ]
    },
    {
        id: 'membro_doente', titulo: 'Alguém Não Parece Bem',
        descricao: () => {
            const membrosPotencialmenteDoentes = estadoJogo.personagens.filter(p => p.vivo && !p.emExpedicao && p.status === 'Saudável');
            if (membrosPotencialmenteDoentes.length > 0) {
                const membroDoente = membrosPotencialmenteDoentes[Math.floor(Math.random() * membrosPotencialmenteDoentes.length)];
                estadoJogo.marcadoDoenteTemporariamente = membroDoente.id;
                return `${membroDoente.nome} acordou se sentindo mal, tossindo e com febre.`;
            }
            estadoJogo.marcadoDoenteTemporariamente = null;
            return 'Um dos membros no abrigo parece estar ficando doente.';
        },
        urlImagem: 'https://placehold.co/350x180/C0392B/FADBD8?text=FEBRE+E+TOSSE&font=specialelite',
        condicao: () => estadoJogo.personagens.some(p => p.vivo && !p.emExpedicao && p.status === 'Saudável') && Math.random() < 0.15,
        escolhas: [
             { texto: 'Usar Kit Médico (se disponível)', acao: () => {
                let tituloResultado = 'Tratamento'; let textoResultado = '';
                const membroDoente = estadoJogo.personagens.find(p => p.id === estadoJogo.marcadoDoenteTemporariamente && p.vivo && !p.emExpedicao);
                if(!membroDoente) {mostrarMensagemResultado("Erro", "Membro doente não encontrado no abrigo."); return;}
                if (estadoJogo.inventario.includes('Kit Médico')) {
                    estadoJogo.inventario.splice(estadoJogo.inventario.indexOf('Kit Médico'), 1);
                    membroDoente.status = 'Saudável';
                    atualizarMoralPersonagem(membroDoente.id, 15);
                    tituloResultado = 'Recuperado!'; textoResultado = `${membroDoente.nome} usou o Kit Médico e se sente melhor.`;
                    registrarAtividadeEvento(`${membroDoente.nome} foi tratado com o kit médico e recuperou.`);
                } else {
                    membroDoente.status = 'Doente';
                    atualizarMoralPersonagem(membroDoente.id, MUDANCA_MORAL_DOENTE_FERIDO);
                    tituloResultado = 'Sem Kit Médico'; textoResultado = `Não há Kit Médico. ${membroDoente.nome} continua doente.`;
                     registrarAtividadeEvento(`${membroDoente.nome} está doente, sem kit médico.`);
                }
                estadoJogo.marcadoDoenteTemporariamente = null;
                mostrarMensagemResultado(tituloResultado, textoResultado);
            }},
            { texto: 'Apenas Descanso e Água', acao: () => {
                const membroDoente = estadoJogo.personagens.find(p => p.id === estadoJogo.marcadoDoenteTemporariamente && p.vivo && !p.emExpedicao);
                if(!membroDoente) {mostrarMensagemResultado("Erro", "Membro doente não encontrado no abrigo."); return;}
                membroDoente.status = 'Doente';
                atualizarMoralPersonagem(membroDoente.id, MUDANCA_MORAL_DOENTE_FERIDO);
                estadoJogo.marcadoDoenteTemporariamente = null;
                registrarAtividadeEvento(`${membroDoente.nome} está descansando para tentar se recuperar.`);
                mostrarMensagemResultado('Descansando', `${membroDoente.nome} está descansando. Esperemos que melhore.`);
            }}
        ]
    },
    {
        id: 'batida_urgente',
        titulo: 'Batidas Urgentes na Porta!',
        descricao: 'Alguém está batendo desesperadamente na porta do abrigo. O som é apressado e um pouco assustador.',
        urlImagem: 'https://placehold.co/350x180/7A4E3A/F0D0C0?text=BATIDAS+FORTES+NA+PORTA!&font=specialelite',
        requerMembroNoAbrigo: true,
        escolhas: [
            {
                texto: 'Abrir com Cautela (se tiver Machado ou Pé de Cabra)',
                condicao: () => estadoJogo.inventario.includes('Machado') || estadoJogo.inventario.includes('Pé de Cabra'),
                acao: () => {
                    const rand = Math.random();
                    let tituloResultado = "Porta Aberta...";
                    let textoResultado = "";
                    if (rand < 0.4) {
                        const itemParaDar = ITENS_TROCAVEIS[Math.floor(Math.random() * ITENS_TROCAVEIS.length)];
                        const comidaNecessaria = Math.floor(Math.random() * 3) + 2;
                        if (estadoJogo.inventario.includes(itemParaDar) && estadoJogo.comida >= comidaNecessaria) {
                            estadoJogo.inventario.splice(estadoJogo.inventario.indexOf(itemParaDar), 1);
                            estadoJogo.comida -= comidaNecessaria;
                            const novoItem = (itemParaDar === 'Kit Médico') ? 'Munição (3)' : 'Kit Médico';
                            estadoJogo.inventario.push(novoItem);
                            textoResultado = `Um comerciante esfarrapado! Vocês trocaram ${itemParaDar} e ${comidaNecessaria} comida por ${novoItem}.`;
                            registrarAtividadeEvento(`Troca feita: ${itemParaDar} + ${comidaNecessaria} comida por ${novoItem}.`);
                            atualizarMoralTodosAbrigo(3);
                        } else {
                            textoResultado = "Era um comerciante, mas vocês não tinham o que ele queria ou o que oferecer em troca.";
                            registrarAtividadeEvento("Comerciante foi embora, sem troca.");
                            atualizarMoralTodosAbrigo(-2);
                        }
                    } else if (rand < 0.7) {
                        tituloResultado = "Emboscada!";
                        textoResultado = "Eram bandidos! Eles levaram alguns suprimentos antes de fugirem.";
                        const comidaPerdida = Math.min(estadoJogo.comida, Math.floor(Math.random() * 5) + 1);
                        const aguaPerdida = Math.min(estadoJogo.agua, Math.floor(Math.random() * 5) + 1);
                        estadoJogo.comida -= comidaPerdida;
                        estadoJogo.agua -= aguaPerdida;
                        registrarAtividadeEvento(`Bandidos levaram ${comidaPerdida} comida e ${aguaPerdida} água!`);
                        const defensor = estadoJogo.personagens.find(p => p.vivo && !p.emExpedicao);
                        if (defensor && Math.random() < 0.3) {
                            defensor.status = "Levemente Ferido";
                            textoResultado += ` ${defensor.nome} tentou resistir e se feriu.`;
                            atualizarMoralPersonagem(defensor.id, MUDANCA_MORAL_DOENTE_FERIDO);
                        }
                        atualizarMoralTodosAbrigo(MUDANCA_MORAL_ROUBADO);
                    } else {
                        textoResultado = "Uma pessoa assustada e faminta. Implorou por ajuda.";
                        registrarAtividadeEvento("Pessoa desesperada na porta.");
                        atualizarMoralTodosAbrigo(-3);
                    }
                    mostrarMensagemResultado(tituloResultado, textoResultado);
                }
            },
            {
                texto: 'Abrir a Porta Sem Cautela',
                acao: () => {
                    const rand = Math.random();
                     let tituloResultado = "Porta Aberta...";
                    let textoResultado = "";
                    if (rand < 0.2) {
                        textoResultado = "Um comerciante. Ele parecia desconfiado pela sua falta de cautela e ofereceu uma troca ruim.";
                        registrarAtividadeEvento("Comerciante desconfiado, troca ruim ou sem troca.");
                        atualizarMoralTodosAbrigo(-4);
                    } else if (rand < 0.8) {
                        tituloResultado = "EMBOSCADA!";
                        textoResultado = "ERAM BANDIDOS! Invadiram rapidamente e levaram MUITOS suprimentos.";
                        const comidaPerdida = Math.min(estadoJogo.comida, Math.floor(Math.random() * 7) + 3);
                        const aguaPerdida = Math.min(estadoJogo.agua, Math.floor(Math.random() * 7) + 3);
                        estadoJogo.comida -= comidaPerdida;
                        estadoJogo.agua -= aguaPerdida;
                        registrarAtividadeEvento(`Bandidos levaram ${comidaPerdida} comida e ${aguaPerdida} água! ATAQUE SURPRESA!`);
                        estadoJogo.personagens.filter(p => p.vivo && !p.emExpedicao).forEach(char => {
                            if (Math.random() < 0.5) {
                                char.status = "Levemente Ferido";
                                registrarAtividadeEvento(`${char.nome} se feriu na confusão.`);
                                atualizarMoralPersonagem(char.id, MUDANCA_MORAL_DOENTE_FERIDO - 5);
                            }
                        });
                        atualizarMoralTodosAbrigo(MUDANCA_MORAL_ROUBADO - 10);
                    } else {
                        tituloResultado = "Um Amigo?";
                        textoResultado = "Um sobrevivente solitário e amigável! Deu a vocês 1 Kit Médico como agradecimento por abrir.";
                        estadoJogo.inventario.push("Kit Médico");
                        registrarAtividadeEvento("Sobrevivente amigável deu um Kit Médico.");
                        atualizarMoralTodosAbrigo(MUDANCA_MORAL_AJUDOU_ESTRANHO + 5);
                    }
                    mostrarMensagemResultado(tituloResultado, textoResultado);
                }
            },
            {
                texto: 'Gritar para Irem Embora',
                acao: () => {
                    registrarAtividadeEvento("Gritaram para as batidas na porta pararem.");
                    if (Math.random() < 0.6) {
                        mostrarMensagemResultado('Silêncio...', 'As batidas pararam. Seja lá quem fosse, parece que se foi.');
                    } else {
                        mostrarMensagemResultado('Insistência!', 'As batidas continuam por um tempo, mais altas, depois param. Assustador.');
                        atualizarMoralTodosAbrigo(-3);
                    }
                }
            },
            {
                texto: 'Ignorar Completamente',
                acao: () => {
                    registrarAtividadeEvento("Ignoraram as batidas na porta.");
                    mostrarMensagemResultado('Ignorados', 'Vocês ficaram em silêncio. Eventualmente, as batidas cessaram.');
                    atualizarMoralTodosAbrigo(MUDANCA_MORAL_IGNOROU_APELO);
                }
            }
        ]
    },
    {
        id: 'batida_suave_apelo',
        titulo: 'Voz Fraca na Porta',
        descricao: 'Você ouve batidas leves e uma voz fraca do lado de fora, pedindo por um pouco de água.',
        urlImagem: 'https://placehold.co/350x180/B0A090/4A3B2A?text=Alguem+pede+agua...&font=specialelite',
        requerMembroNoAbrigo: true,
        escolhas: [
            {
                texto: 'Dar 1 Água (se tiver)',
                condicao: () => estadoJogo.agua > 0,
                acao: () => {
                    estadoJogo.agua--;
                    registrarAtividadeEvento("Deram 1 unidade de água para o estranho.");
                    if (Math.random() < 0.3) {
                        const itensTrocaveisFiltrados = ITENS_TROCAVEIS.filter(i => !i.includes("Kit") && !i.includes("Munição"));
                        const novoItem = itensTrocaveisFiltrados.length > 0 ? itensTrocaveisFiltrados[Math.floor(Math.random() * itensTrocaveisFiltrados.length)] : "um item simples";
                        estadoJogo.inventario.push(novoItem);
                        mostrarMensagemResultado('Boa Ação Recompensada', 'O estranho agradeceu e, em troca, deixou um(a) '+ novoItem +' velho(a) que encontrou. Pode ser útil.');
                        atualizarMoralTodosAbrigo(MUDANCA_MORAL_AJUDOU_ESTRANHO + 5);
                    } else {
                        mostrarMensagemResultado('Agradecimento', 'O estranho agradeceu profusamente e seguiu caminho. Vocês se sentem um pouco melhor.');
                        atualizarMoralTodosAbrigo(MUDANCA_MORAL_AJUDOU_ESTRANHO);
                    }
                }
            },
            {
                texto: 'Recusar Ajuda',
                acao: () => {
                    registrarAtividadeEvento("Recusaram ajuda ao estranho na porta.");
                    mostrarMensagemResultado('Coração Apertado', 'A voz se afastou em silêncio. Uma decisão difícil, mas necessária?');
                    atualizarMoralTodosAbrigo(MUDANCA_MORAL_IGNOROU_APELO - 3);
                }
            }
        ]
    }
];

// --- Lógica Central do Jogo ---
function mostrarTela(idTela) {
    [telaSplash, telaConfiguracoes, telaCreditos, telaDificuldade, telaJogo,
     telaFimDeJogo, telaVitoria, modalEvento, sobreposicaoModalResultado, telaTransicaoDia, modalDiarioAcoes].forEach(t => {
        if (t) t.classList.add('oculto');
    });
    const telaParaMostrar = document.getElementById(idTela);
    if (telaParaMostrar) telaParaMostrar.classList.remove('oculto');
    estadoJogo.telaAtual = idTela;
}

function inicializarJogo(dificuldade) {
    const personagensIniciaisCopia = JSON.parse(JSON.stringify(PERSONAGENS_INICIAIS));

    estadoJogo = {
        telaAtual: 'tela-jogo',
        dia: 0,
        comida: 0,
        agua: 0,
        personagens: personagensIniciaisCopia.map(p => ({...p, moral: MORAL_INICIAL, emExpedicao: false})),
        inventario: [],
        fimDeJogo: false,
        eventoAtual: null,
        marcadoDoenteTemporariamente: null,
        idPersonagemExpedicao: null,
        diaRetornoExpedicao: null,
        duracaoExpedicaoDias: Math.floor(Math.random() * 3) + 2,
        dificuldade: dificuldade,
        indicePaginaAtualDiario: 0,
        ordemPaginasDiario: ['distribuicao', 'expedicao', 'fimDia'],
        selecoesTemporariasDiario: {
            distribuicao: {},
            expedicao: null
        }
    };

    switch (dificuldade) {
        case 'facil':
            estadoJogo.comida = 25;
            estadoJogo.agua = 25;
            estadoJogo.duracaoExpedicaoDias = Math.floor(Math.random() * 2) + 2;
            break;
        case 'medio':
            estadoJogo.comida = 18;
            estadoJogo.agua = 18;
            break;
        case 'dificil':
            estadoJogo.comida = 12;
            estadoJogo.agua = 12;
            estadoJogo.duracaoExpedicaoDias = Math.floor(Math.random() * 2) + 3;
            break;
    }

    const itensEmbaralhados = [...TODOS_ITENS_POSSIVEIS].sort(() => 0.5 - Math.random());
    estadoJogo.inventario = itensEmbaralhados.slice(0, NUM_ITENS_INICIAIS);

    displayLogEventos.innerHTML = '<p>O abrigo está selado. Prepare-se para o primeiro dia.</p>';
    botaoAbrirDiario.textContent = estadoJogo.dia === 0 ? "Iniciar Abrigo 📖" : "Diário 📖";
    botaoAbrirDiario.disabled = false;
    mostrarTela('tela-jogo');
    atualizarInterface();
}

function atualizarMoralPersonagem(idPersonagem, mudanca) {
    const personagem = estadoJogo.personagens.find(p => p.id === idPersonagem);
    if (personagem && personagem.vivo) {
        personagem.moral = Math.max(MORAL_MINIMA, Math.min(MORAL_MAXIMA, personagem.moral + mudanca));
    }
}

function atualizarMoralTodosAbrigo(mudanca) {
    estadoJogo.personagens.forEach(personagem => {
        if (personagem.vivo && !personagem.emExpedicao) {
            atualizarMoralPersonagem(personagem.id, mudanca);
        }
    });
}

function atualizarInterface() {
    displayContadorDias.textContent = estadoJogo.dia > 0 ? estadoJogo.dia : '-';
    displayContadorComida.textContent = estadoJogo.comida;
    displayContadorAgua.textContent = estadoJogo.agua;

    displayPersonagens.innerHTML = '';
    estadoJogo.personagens.forEach(personagem => {
        const divPersonagem = document.createElement('div');
        divPersonagem.className = 'cartao-personagem';
        if (!personagem.vivo) divPersonagem.classList.add('morto');
        else if (personagem.emExpedicao) divPersonagem.classList.add('em-expedicao');

        // Lógica para classes de status semânticas
        let classeStatus = 'status-saudavel';
        if (personagem.status === 'Doente') classeStatus = 'status-doente';
        else if (personagem.status === 'Levemente Ferido') classeStatus = 'status-ferido-leve';
        else if (personagem.status === 'Gravemente Ferido') classeStatus = 'status-ferido-grave';

        // Lógica para classes de moral semânticas
        let classeMoral = 'moral-alta';
        if (personagem.moral < 30) classeMoral = 'moral-critica';
        else if (personagem.moral < 50) classeMoral = 'moral-baixa';
        else if (personagem.moral < 70) classeMoral = 'moral-media';

        divPersonagem.innerHTML = `
            <h4>${personagem.nome} ${personagem.emExpedicao ? `(Em Expedição - Ret. Dia ${estadoJogo.diaRetornoExpedicao})` : ""}</h4>
            <p>Status: <span class="${classeStatus}">${personagem.status}</span></p>
            <p>Moral: <span class="${classeMoral}">${personagem.moral}/100</span></p>
            ${personagem.vivo && !personagem.emExpedicao ? `<p>Dias s/ Comida: ${personagem.diasSemComida}</p><p>Dias s/ Água: ${personagem.diasSemAgua}</p>` : ''}
            ${!personagem.vivo ? `<p class="status-morto">MORREU</p>` : ''}
        `;
        displayPersonagens.appendChild(divPersonagem);
    });

    displayListaInventario.innerHTML = estadoJogo.inventario.length > 0
        ? estadoJogo.inventario.map(item => `<li>- ${item}</li>`).join('')
        : '<li>Nenhum item.</li>';
}

function registrarAtividadeEvento(mensagem) {
    const p = document.createElement('p');
    const prefixoDia = estadoJogo.dia > 0 ? `Dia ${estadoJogo.dia}: ` : `Abrigo: `;
    p.textContent = prefixoDia + mensagem;

    if (displayLogEventos.firstChild) {
        displayLogEventos.insertBefore(p, displayLogEventos.firstChild);
    } else {
        displayLogEventos.appendChild(p);
    }
    while (displayLogEventos.children.length > 35) {
        displayLogEventos.removeChild(displayLogEventos.lastChild);
    }
}

function mostrarVisualTransicaoDia(numDia, callback) {
    displayTransicaoDia.textContent = `Dia ${numDia}`;
    telaTransicaoDia.classList.remove('oculto');
    setTimeout(() => {
        telaTransicaoDia.classList.add('oculto');
        if (callback) callback();
    }, 1800);
}

function processarConsequenciasInicioDia() {
    if (estadoJogo.fimDeJogo) return false;
    if (estadoJogo.dia === 0) return true;

    registrarAtividadeEvento(`Avaliando consequências da noite.`);
    let alguemEstavaVivo = estadoJogo.personagens.some(p => p.vivo);

    estadoJogo.personagens.forEach(personagem => {
        if (personagem.vivo && !personagem.emExpedicao) {
            if (personagem.diasSemComida >= DIAS_PARA_MORRER_FOME_SEDE) {
                personagem.vivo = false; personagem.status = 'Morto (Fome)';
                registrarAtividadeEvento(`${personagem.nome} MORREU de FOME.`);
                atualizarMoralTodosAbrigo(MUDANCA_MORAL_MORTE_FAMILIA);
            } else if (personagem.diasSemAgua >= DIAS_PARA_MORRER_FOME_SEDE) {
                personagem.vivo = false; personagem.status = 'Morto (Sede)';
                registrarAtividadeEvento(`${personagem.nome} MORREU de SEDE.`);
                atualizarMoralTodosAbrigo(MUDANCA_MORAL_MORTE_FAMILIA);
            }

            if (personagem.vivo && (personagem.status === 'Doente' || personagem.status === 'Levemente Ferido')) {
                if (Math.random() < 0.10) {
                    personagem.status = 'Saudável';
                    atualizarMoralPersonagem(personagem.id, 10);
                    registrarAtividadeEvento(`${personagem.nome} acordou se sentindo melhor!`);
                } else {
                    registrarAtividadeEvento(`${personagem.nome} continua ${personagem.status.toLowerCase()}.`);
                }
            }
        }
    });

    atualizarInterface();

    const personagensVivos = estadoJogo.personagens.filter(p => p.vivo).length;
    if (personagensVivos === 0 && alguemEstavaVivo) {
        estadoJogo.fimDeJogo = true;
        displayContagemFinalDias.textContent = estadoJogo.dia;
        displayMensagemFimJogo.textContent = "Todos pereceram. A esperança se foi.";
        botaoAbrirDiario.disabled = true;
        mostrarTela('tela-fim-de-jogo');
        return false;
    }
    return true;
}


// --- Lógica do Diário ---

function abrirDiarioAcoes() {
    if (estadoJogo.fimDeJogo) return;
    estadoJogo.indicePaginaAtualDiario = 0;
    estadoJogo.selecoesTemporariasDiario = { distribuicao: {}, expedicao: null };

    preencherPaginaDistribuicaoDiario();
    preencherPaginaExpedicaoDiario();
    diarioFimNumDia.textContent = estadoJogo.dia === 0 ? 1 : estadoJogo.dia;

    atualizarNavegacaoDiario();
    modalDiarioAcoes.classList.remove('oculto');
    mostrarPaginaDiario(estadoJogo.ordemPaginasDiario[estadoJogo.indicePaginaAtualDiario]);
    botaoAbrirDiario.textContent = "Diário 📖";
}

function mostrarPaginaDiario(idPagina) {
    Object.values(paginasDiario).forEach(pagina => pagina.classList.remove('pagina-ativa'));
    if (paginasDiario[idPagina]) {
        paginasDiario[idPagina].classList.add('pagina-ativa');
    }
}

function atualizarNavegacaoDiario() {
    const idPaginaAtual = estadoJogo.ordemPaginasDiario[estadoJogo.indicePaginaAtualDiario];
    const ePrimeiraPagina = estadoJogo.indicePaginaAtualDiario === 0;
    const eUltimaPagina = estadoJogo.indicePaginaAtualDiario === estadoJogo.ordemPaginasDiario.length - 1;

    botaoDiarioAnterior.disabled = ePrimeiraPagina;
    botaoDiarioProximo.disabled = eUltimaPagina;

    botaoDiarioProximo.classList.toggle('oculto', idPaginaAtual === 'fimDia');
    botaoDiarioFimDia.classList.toggle('oculto', idPaginaAtual !== 'fimDia');

    if (idPaginaAtual === 'distribuicao' || idPaginaAtual === 'expedicao') {
        botaoDiarioProximo.textContent = "Confirmar e Próximo >>";
    } else {
        botaoDiarioProximo.textContent = "Próxima Página >>";
    }
}

function preencherPaginaDistribuicaoDiario() {
    diarioDistNumDia.textContent = estadoJogo.dia === 0 ? 1 : estadoJogo.dia;
    diarioDistComida.textContent = estadoJogo.comida;
    diarioDistAgua.textContent = estadoJogo.agua;
    containerPersonagensDistDiario.innerHTML = '';
    estadoJogo.personagens.forEach(personagem => {
        if (!personagem.vivo || personagem.emExpedicao) return;
        const divPersonagem = document.createElement('div');
        divPersonagem.className = 'cartao-dist-personagem';
        divPersonagem.innerHTML = `
            <h4>${personagem.nome} <span>(${personagem.status}, M:${personagem.moral}, C:${personagem.diasSemComida}, A:${personagem.diasSemAgua})</span></h4>
            <label>
                <input type="checkbox" id="diario-alimentar-${personagem.id}" class="form-checkbox" ${estadoJogo.comida === 0 ? 'disabled' : ''}>
                <span>Comida (1)</span>
            </label>
            <label>
                <input type="checkbox" id="diario-agua-${personagem.id}" class="form-checkbox" ${estadoJogo.agua === 0 ? 'disabled' : ''}>
                <span>Água (1)</span>
            </label>
        `;
        containerPersonagensDistDiario.appendChild(divPersonagem);
    });
}

function salvarSelecoesDistribuicaoDiario() {
    estadoJogo.selecoesTemporariasDiario.distribuicao = {};
    estadoJogo.personagens.forEach(personagem => {
        if (!personagem.vivo || personagem.emExpedicao) return;
        const checkboxComida = document.getElementById(`diario-alimentar-${personagem.id}`);
        const checkboxAgua = document.getElementById(`diario-agua-${personagem.id}`);
        estadoJogo.selecoesTemporariasDiario.distribuicao[personagem.id] = {
            comida: checkboxComida ? checkboxComida.checked : false,
            agua: checkboxAgua ? checkboxAgua.checked : false
        };
    });
}

function preencherPaginaExpedicaoDiario() {
    diarioExpNumDia.textContent = estadoJogo.dia === 0 ? 1 : estadoJogo.dia;
    containerPersonagensExpDiario.innerHTML = '';
    const disponiveisParaExpedicao = estadoJogo.personagens.filter(p => p.vivo && !p.emExpedicao);

    if (disponiveisParaExpedicao.length === 0) {
         containerPersonagensExpDiario.innerHTML = '<p>Ninguém disponível para expedição.</p>';
         estadoJogo.selecoesTemporariasDiario.expedicao = null;
         return;
    }

    disponiveisParaExpedicao.forEach(personagem => {
        const divPersonagem = document.createElement('div');
        divPersonagem.className = 'cartao-exp-personagem';
        divPersonagem.innerHTML = `
            <label>
                <input type="radio" name="diario-expedicao-personagem" value="${personagem.id}" class="form-radio">
                <span>${personagem.nome} (Status: ${personagem.status}, Moral: ${personagem.moral})</span>
            </label>
        `;
        containerPersonagensExpDiario.appendChild(divPersonagem);
    });
     const divNinguem = document.createElement('div');
     divNinguem.className = 'cartao-exp-personagem';
     divNinguem.innerHTML = `
        <label>
            <input type="radio" name="diario-expedicao-personagem" value="none" class="form-radio" checked>
            <span>Não enviar ninguém desta vez.</span>
        </label>
    `;
    containerPersonagensExpDiario.appendChild(divNinguem);
}

function salvarSelecaoExpedicaoDiario() {
    const radioSelecionado = document.querySelector('input[name="diario-expedicao-personagem"]:checked');
    if (radioSelecionado && radioSelecionado.value !== "none") {
        estadoJogo.selecoesTemporariasDiario.expedicao = radioSelecionado.value;
    } else {
        estadoJogo.selecoesTemporariasDiario.expedicao = null;
    }
}


// --- Progressão do Dia e Manipulação de Eventos ---

function aplicarDistribuicao() {
    registrarAtividadeEvento("Distribuição de suprimentos (Diário):");
    let comidaConsumidaNestaRodada = 0;
    let aguaConsumidaNestaRodada = 0;
    const selecoes = estadoJogo.selecoesTemporariasDiario.distribuicao;

    Object.keys(selecoes).forEach(idPersonagem => {
        const personagem = estadoJogo.personagens.find(p => p.id === idPersonagem);
        if (!personagem || !personagem.vivo || personagem.emExpedicao) return;

        const vaiAlimentar = selecoes[idPersonagem].comida;
        const vaiDarAgua = selecoes[idPersonagem].agua;

        if (vaiAlimentar && (estadoJogo.comida - comidaConsumidaNestaRodada > 0)) {
            comidaConsumidaNestaRodada++;
            if (personagem.diasSemComida > 2) atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_ALIMENTADO_HIDRATADO_BAIXO + 5);
            personagem.diasSemComida = 0;
            registrarAtividadeEvento(`  - ${personagem.nome} comeu.`);
        } else {
            personagem.diasSemComida++;
            if (personagem.diasSemComida > 1) atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_FOME_SEDE);
            if (vaiAlimentar) registrarAtividadeEvento(`  - Tentativa de alimentar ${personagem.nome}, mas SEM COMIDA SUFICIENTE!`);
        }

        if (vaiDarAgua && (estadoJogo.agua - aguaConsumidaNestaRodada > 0)) {
            aguaConsumidaNestaRodada++;
             if (personagem.diasSemAgua > 2) atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_ALIMENTADO_HIDRATADO_BAIXO + 5);
            personagem.diasSemAgua = 0;
            registrarAtividadeEvento(`  - ${personagem.nome} bebeu.`);
        } else {
            personagem.diasSemAgua++;
            if (personagem.diasSemAgua > 1) atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_FOME_SEDE);
            if(vaiDarAgua) registrarAtividadeEvento(`  - Tentativa de dar água a ${personagem.nome}, mas SEM ÁGUA SUFICIENTE!`);
        }
    });
    estadoJogo.comida -= comidaConsumidaNestaRodada;
    estadoJogo.agua -= aguaConsumidaNestaRodada;
}

function iniciarExpedicao() {
    const idPersonagem = estadoJogo.selecoesTemporariasDiario.expedicao;
    if (idPersonagem) {
        const personagem = estadoJogo.personagens.find(p => p.id === idPersonagem);
        if (personagem && personagem.vivo && !personagem.emExpedicao) {
            personagem.emExpedicao = true;
            estadoJogo.idPersonagemExpedicao = idPersonagem;
            const diaAtualParaExpedicao = estadoJogo.dia === 0 ? 1 : estadoJogo.dia;
            estadoJogo.diaRetornoExpedicao = diaAtualParaExpedicao + estadoJogo.duracaoExpedicaoDias;
            registrarAtividadeEvento(`${personagem.nome} partiu em uma expedição! Retorna no dia ${estadoJogo.diaRetornoExpedicao}.`);
        }
    } else {
        registrarAtividadeEvento("Ninguém foi enviado em expedição neste dia.");
    }
}

function avancarParaProximoDia() {
    modalDiarioAcoes.classList.add('oculto');
    botaoAbrirDiario.disabled = true;

    aplicarDistribuicao();
    iniciarExpedicao();

    if (estadoJogo.dia === 0 && displayLogEventos.querySelector('p')?.textContent.includes("Prepare-se")) {
        displayLogEventos.innerHTML = '';
    }

    if (estadoJogo.dia === 0) {
        estadoJogo.dia = 1;
    } else {
        estadoJogo.dia++;
    }

    // LÓGICA DE VITÓRIA
    if (estadoJogo.dia > DIAS_PARA_VENCER && !estadoJogo.fimDeJogo) {
        estadoJogo.fimDeJogo = true;
        displayMensagemVitoria.textContent = "Contra todas as probabilidades, você e sua família sobreviveram ao pior do apocalipse. Um novo começo os aguarda.";
        displayContagemFinalDiasVitoria.textContent = estadoJogo.dia - 1;
        mostrarTela('tela-vitoria');
        return; // Termina a função aqui para mostrar a tela de vitória
    }

    const jogoPodeContinuar = processarConsequenciasInicioDia();
    if (!jogoPodeContinuar) {
        atualizarInterface();
        return;
    }

    registrarAtividadeEvento(`--- Início do Dia ${estadoJogo.dia} ---`);
    atualizarInterface();

    mostrarVisualTransicaoDia(estadoJogo.dia, () => {
        if (estadoJogo.idPersonagemExpedicao && estadoJogo.dia >= estadoJogo.diaRetornoExpedicao) {
            lidarComRetornoExpedicao();
        } else {
            dispararEventoAleatorio();
        }
    });
}

function lidarComRetornoExpedicao() {
    const personagem = estadoJogo.personagens.find(p => p.id === estadoJogo.idPersonagemExpedicao);
    if (!personagem) {
        registrarAtividadeEvento("O personagem em expedição desapareceu misteriosamente...");
        estadoJogo.idPersonagemExpedicao = null;
        dispararEventoAleatorio();
        return;
    }

    personagem.emExpedicao = false;
    let tituloResultado = `${personagem.nome} Retornou!`;
    let textoResultado = `${personagem.nome} está de volta da expedição. `;
    const sorte = Math.random();

    if (!personagem.vivo) {
        textoResultado += ` Infelizmente, não sobreviveu à jornada.`;
        atualizarMoralTodosAbrigo(MUDANCA_MORAL_MORTE_FAMILIA);
    } else if (sorte < 0.2) {
        textoResultado += `A expedição foi perigosa. Voltou de mãos vazias e ${personagem.status === 'Saudável' ? 'levemente ferido(a)' : 'mais ferido(a)'}.`;
        personagem.status = 'Levemente Ferido';
        atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_EXP_FALHA - 5);
        registrarAtividadeEvento(`${personagem.nome} retornou ferido e sem nada.`);
    } else if (sorte < 0.5) {
        textoResultado += `Não encontrou nada de útil desta vez.`;
        atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_EXP_FALHA / 2);
        registrarAtividadeEvento(`${personagem.nome} retornou sem nada.`);
    } else {
        const comidaEncontrada = Math.floor(Math.random() * 4) + 1;
        const aguaEncontrada = Math.floor(Math.random() * 4) + 1;
        estadoJogo.comida += comidaEncontrada; estadoJogo.agua += aguaEncontrada;
        textoResultado += `Sucesso! Encontrou ${comidaEncontrada} de comida e ${aguaEncontrada} de água.`;
        atualizarMoralPersonagem(personagem.id, MUDANCA_MORAL_EXP_SUCESSO);
        atualizarMoralTodosAbrigo(3);
        registrarAtividadeEvento(`${personagem.nome} retornou com ${comidaEncontrada} comida e ${aguaEncontrada} água.`);

        if (Math.random() < 0.3) {
            const potenciaisItensNovos = TODOS_ITENS_POSSIVEIS.filter(item => !estadoJogo.inventario.includes(item));
            if (potenciaisItensNovos.length > 0) {
                const novoItem = potenciaisItensNovos[Math.floor(Math.random() * potenciaisItensNovos.length)];
                estadoJogo.inventario.push(novoItem);
                textoResultado += ` E também: ${novoItem}!`;
                registrarAtividadeEvento(`${personagem.nome} também encontrou ${novoItem}.`);
                atualizarMoralPersonagem(personagem.id, 7);
            }
        }
    }
    estadoJogo.idPersonagemExpedicao = null;
    mostrarMensagemResultado(tituloResultado, textoResultado, dispararEventoAleatorio);
}

function dispararEventoAleatorio() {
    if (estadoJogo.fimDeJogo) {
        botaoAbrirDiario.disabled = true;
        return;
    }
    mostrarTela('tela-jogo');
    botaoAbrirDiario.disabled = false;

    const eventosDisponiveis = eventos.filter(evento => {
        let condicaoSatisfeita = typeof evento.condicao === 'function' ? evento.condicao() : true;
        if (evento.requerMembroNoAbrigo && !estadoJogo.personagens.some(p => p.vivo && !p.emExpedicao)) {
            condicaoSatisfeita = false;
        }
        return condicaoSatisfeita;
    });

    if (eventosDisponiveis.length === 0 || Math.random() < 0.20) {
        registrarAtividadeEvento("Um dia tranquilo... talvez tranquilo demais.");
        mostrarMensagemResultado('Dia Calmo', 'Nada de extraordinário aconteceu hoje.', habilitarDiario);
        return;
    }

    estadoJogo.eventoAtual = eventosDisponiveis[Math.floor(Math.random() * eventosDisponiveis.length)];
    displayTituloEvento.textContent = estadoJogo.eventoAtual.titulo;
    displayDescricaoEvento.textContent = typeof estadoJogo.eventoAtual.descricao === 'function' ? estadoJogo.eventoAtual.descricao() : estadoJogo.eventoAtual.descricao;
    placeholderImagemEvento.innerHTML = estadoJogo.eventoAtual.urlImagem
        ? `<img src="${estadoJogo.eventoAtual.urlImagem}" alt="[Imagem do Evento: ${estadoJogo.eventoAtual.titulo}]" onerror="this.onerror=null; this.parentElement.textContent='[Imagem do Evento: ${estadoJogo.eventoAtual.titulo}]';">`
        : '[Placeholder Imagem do Evento]';
    displayEscolhasEvento.innerHTML = '';
    estadoJogo.eventoAtual.escolhas.forEach(escolha => {
        const botao = document.createElement('button');
        botao.textContent = escolha.texto;
        botao.className = 'botao-escolha-evento';
        botao.disabled = (typeof escolha.condicao === 'function' && !escolha.condicao());
        botao.onclick = () => {
            modalEvento.classList.add('oculto');
            escolha.acao();
        };
        displayEscolhasEvento.appendChild(botao);
    });
    modalEvento.classList.remove('oculto');
}


function mostrarMensagemResultado(titulo, texto, proximaAcaoCallback = habilitarDiario) {
    displayTituloResultado.textContent = titulo;
    displayTextoResultado.textContent = texto;
    atualizarInterface();

    if (estadoJogo.fimDeJogo) {
        botaoAbrirDiario.disabled = true;
    }

    sobreposicaoModalResultado.classList.remove('oculto');
    callbackResultadoAtual = proximaAcaoCallback;
}

let callbackResultadoAtual = habilitarDiario;

function habilitarDiario() {
    botaoAbrirDiario.disabled = estadoJogo.fimDeJogo;
    if (!estadoJogo.fimDeJogo) {
        mostrarTela('tela-jogo');
        atualizarInterface();
    } else {
        // Se o jogo acabou, mas não foi por vitória, mostra a tela de fim de jogo.
        // A lógica de vitória já trata de mostrar a tela correta.
        if (estadoJogo.telaAtual !== 'tela-vitoria') {
           mostrarTela('tela-fim-de-jogo');
        }
    }
}


// --- Listeners de Eventos ---
botaoIniciar.addEventListener('click', () => mostrarTela('tela-dificuldade'));
botaoConfiguracoes.addEventListener('click', () => mostrarTela('tela-configuracoes'));
botaoCreditos.addEventListener('click', () => mostrarTela('tela-creditos'));
botoesVoltarSplash.forEach(b => b.addEventListener('click', () => mostrarTela('tela-splash')));
botaoVoltarSplashDificuldade.addEventListener('click', () => mostrarTela('tela-splash'));
botoesDificuldade.forEach(b => b.addEventListener('click', () => inicializarJogo(b.dataset.difficulty)));
botaoReiniciarJogo.addEventListener('click', () => { mostrarTela('tela-splash'); });
botaoJogarNovamenteVitoria.addEventListener('click', () => { mostrarTela('tela-splash'); }); // Evento para o novo botão
botaoAbrirDiario.addEventListener('click', abrirDiarioAcoes);
botaoFecharDiario.addEventListener('click', () => {
    modalDiarioAcoes.classList.add('oculto');
    botaoAbrirDiario.disabled = false;
});

botaoDiarioAnterior.addEventListener('click', () => {
    if (estadoJogo.indicePaginaAtualDiario > 0) {
        estadoJogo.indicePaginaAtualDiario--;
        mostrarPaginaDiario(estadoJogo.ordemPaginasDiario[estadoJogo.indicePaginaAtualDiario]);
        atualizarNavegacaoDiario();
    }
});

botaoDiarioProximo.addEventListener('click', () => {
    const idPaginaAtual = estadoJogo.ordemPaginasDiario[estadoJogo.indicePaginaAtualDiario];
    if (idPaginaAtual === 'distribuicao') {
        salvarSelecoesDistribuicaoDiario();
    } else if (idPaginaAtual === 'expedicao') {
        salvarSelecaoExpedicaoDiario();
    }

    if (estadoJogo.indicePaginaAtualDiario < estadoJogo.ordemPaginasDiario.length - 1) {
        estadoJogo.indicePaginaAtualDiario++;
        if (estadoJogo.ordemPaginasDiario[estadoJogo.indicePaginaAtualDiario] === 'expedicao' &&
            !estadoJogo.personagens.some(p => p.vivo && !p.emExpedicao)) {
             if (estadoJogo.indicePaginaAtualDiario < estadoJogo.ordemPaginasDiario.length - 1) {
                estadoJogo.indicePaginaAtualDiario++;
             }
        }
        mostrarPaginaDiario(estadoJogo.ordemPaginasDiario[estadoJogo.indicePaginaAtualDiario]);
        atualizarNavegacaoDiario();
    }
});

botaoDiarioFimDia.addEventListener('click', avancarParaProximoDia);

botaoContinuarResultado.addEventListener('click', () => {
    sobreposicaoModalResultado.classList.add('oculto');
    if (typeof callbackResultadoAtual === 'function') {
        callbackResultadoAtual();
    } else {
        habilitarDiario();
    }
});

// Inicializar o jogo na tela de splash
mostrarTela('tela-splash');
atualizarInterface();