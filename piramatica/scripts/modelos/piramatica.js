/* PIRAMATICA.JS
 *
 * Data de criacao: 13/11/2012 (Lucas)
 * Ultima modificacao: 27/10/2014 (Valério)
 *
 * DESCRICAO: declaracao de metodos utilizados durante o jogo. Este arquivo
 * contem a descricao das regras aplicadas a este, como a verificacao se duas
 * cartas selecionadas sao pares correspondentes.
 *
 * peca_{seu numero}_{o resultado da soma de seu numero com o numero de seu par}
 *
 * Exemplo: 'peca_2_10' e 'peca_8_10' sao pares, pois 2 +8 = 10
 *
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 */
define(['./pecas','utils/audio'], function (GrupoPecas, audio) {

    /*   ======= CONSTANTES FUNDAMENTAIS ========
    *    A alteracao destas constantes influencia sobre o modelo do jogo.
    *   Edite-as a fim de alterar a dificuldade ou pontuacao atribuida a uma
    *   partida individual
    */
    
    var CONST = {
        PONTUACAO: {
            RESPOSTA_CORRETA: 3,
            RESPOSTA_INCORRETA: -4,
            DICA: -5,
            TEMPO_RESTANTE: 1,

            VITORIA: 50,
            DERROTA: 0,

            JOG_CAFE_LEITE: 5,
            JOG_MEDIA: 7,
            JOG_NINJA: 12,
            JOG_INSANO: 15
        },

        TEMPO: {
            CAFE_LEITE: 200,
            MEDIA: 300,
            NINJA: 400,
            INSANO: 500
        }
    }
    // PRONTO! PODE PARAR DE EDITAR A PARTIR DAQUI

    //atributos e metodos privados
    var tempoRestante, estaJogando = false, pontuacao, fingir 
    , tempoFlag = false
    ;

    // armazena todos os metodos que manipulam e exibem informacoes para o
    // usuario dentro da div #painel
    var PAtualizar = {

        // Insere pontuacao atual dentro da div de id igual a "mesa-pontos"
        Pontuacao: function() {

            if (pontuacao < -CONST.PONTUACAO.DICA) {
                $('#mesa-dica').fadeOut('slow');
            } else {
                $('#mesa-dica').fadeIn('slow');
            }


            $('#mesa-pontos').html(pontuacao);
        },

        /*
        * Calcula, a partir de um valor inteiro (que representa o tempo restante
        * em segundos), um formato de tempo mais amigavel ao jogador:
        * "X minutos e Y segundos". Ao final, insere essa informacao na div
        * de id igual a "painel-tempo"
        */
        Tempo: function() {
            var TmpMin, TmpSeg, TextoExibido = '';

            TmpMin = ~~(tempoRestante /60);
            TmpSeg = ~~((tempoRestante /60 -TmpMin) *60);

            if(TmpMin)             TextoExibido = TmpMin.toString() + ' minutos';
            if(TmpMin && TmpSeg) TextoExibido += ' e ';
            if(TmpSeg)             TextoExibido += TmpSeg.toString() + ' segundos';
            /*
            if(!TmpMin && (TmpSeg <= 10)){
                if(!tempoFlag){
                    tempoFlag = true;
                    audio.notificarTempoAcabando();
                }
            }
            */

            $("#painel-tempo").html(TextoExibido);
        },

        /*
         * Verifica quais valores ainda devem ser descobertos e os exibe
         * na div de id igual a "painel-pecas".
         */
        SomasRestantes: function() {

            var estaNaTela = new Array();
            var i, pulaInsercao;

            $("#painel-pecas").html('');

            $('.mesa-peca').each(function() {
                var valorPeca = parseInt($(this).data("pattern").split("_")[2]);
                i = 0;
                pulaInsercao = false;

                while(!pulaInsercao && i < estaNaTela.length) {
                    if(valorPeca == estaNaTela[i])
                        pulaInsercao = true;

                    i++;
                }

                if(!pulaInsercao) {
                    $("#painel-pecas").append(valorPeca +' ');
                    estaNaTela.push(valorPeca);
                }
            });
        }
    }

    //GrupoPecas.Auxiliar: new Array(), // JAA ESTA AQUI! Vem de GrupoPecas do arquivo pecas.js
    GrupoPecas.Principal = new Array();
    GrupoPecas.JaInseridos = new Array();
    GrupoPecas.NumPecas = 0;

    function PIniciarJogo(pDificuldade) {
        var ContPecas;    //    auxiliar ao contar as pecas dos grupos

        console.log('Jogo iniciado! Dificuldade selecionada: ' +pDificuldade);

        if(estaJogando) {
            console.log('Erro: chamada do método PIniciarJogo(pDificuldade) em um jogo já iniciado.');
            return;
        }

        if(pDificuldade == 'CAFE_LEITE') {
            pontuacao = CONST.PONTUACAO.JOG_CAFE_LEITE;
            tempoRestante = CONST.TEMPO.CAFE_LEITE;
            GrupoPecas.NumPecas = 6;
        }
        else if(pDificuldade == 'MEDIA') {
            pontuacao = CONST.PONTUACAO.JOG_MEDIA;
            tempoRestante = CONST.TEMPO.MEDIA;
            GrupoPecas.NumPecas = 10;
        }
        else if(pDificuldade == 'NINJA') {
            pontuacao = CONST.PONTUACAO.JOG_NINJA;
            tempoRestante = CONST.TEMPO.NINJA;
            GrupoPecas.NumPecas = 28;
        }
        else {    //    pDificuldade == 'INSANO'
            pontuacao = CONST.PONTUACAO.JOG_INSANO;
            GrupoPecas.NumPecas = 36;
            tempoRestante = CONST.TEMPO.INSANO;
        }

        while(GrupoPecas.Principal.pop());

        for(ContPecas = 0; ContPecas < GrupoPecas.Auxiliar.length/2; ContPecas++) {
            GrupoPecas.JaInseridos[ContPecas] = false;
        }

        for (ContPecas = 0; ContPecas < GrupoPecas.NumPecas; ContPecas++) {
            var auxiliar = parseInt(parseInt(Math.random() *1000) %GrupoPecas.Auxiliar.length/2);

            if(!GrupoPecas.JaInseridos[auxiliar]) {
                GrupoPecas.Principal[ContPecas] = GrupoPecas.Auxiliar[2 *auxiliar];
                GrupoPecas.JaInseridos[auxiliar] = true;
                ContPecas++;
                GrupoPecas.Principal[ContPecas] = GrupoPecas.Auxiliar[2 *auxiliar +1];
            }
            else ContPecas--;
        }

        for(var i = 0; i < 100; i++)
            GrupoPecas.Principal.sort(PShuffle);

        //    NumPecas ee decrementado em um, pois ja existe um elemento mesa-peca inserido no template
        for(i = 0; i < GrupoPecas.NumPecas -1; i++)
            $(".mesa-peca:first-child").clone().appendTo("#mesa");

        var estaNaTela = [], entI = 0;

        var alignX = 0, alignY = 0;

        //Inicializa cada peca
        $("#mesa").children().each(function(index) {
            //Alinha as pecas

            var tmpPosX = 10;
            if(pDificuldade == 'NINJA')
                tmpPosX = 10;
            else if(pDificuldade == 'MEDIA')
                tmpPosX = 100;
            else if(pDificuldade == 'CAFE_LEITE')
                tmpPosX = 100;

            $(this).css({
                "margin-top" : alignY *$(this).height() +alignY *3 +tmpPosX,
                "margin-left"  : alignX *$(this).width() +(6 -alignY) *$(this).width() /2 +alignX *3 +75
            });

            if(alignX) alignX--;
            else {
                alignY++;
                alignX = alignY;
            }

            var pattern = GrupoPecas.Principal.pop();

            //Aplica o padrão
            $(this).find(".formula").addClass(pattern);

            //Junto o padrão
            $(this).attr("data-pattern",pattern);

            var valorPeca = parseInt($(this).data("pattern").split("_")[2]);
            var i2 = 0;
            var pulaInsercao = false;

            while(i2 < entI) {
                if(valorPeca == estaNaTela[i2]) {
                    pulaInsercao = true;
                    i2 = entI;
                }

                i2++;
            }

            if(!pulaInsercao) {
                $("#info").append(valorPeca +' ');
                estaNaTela[entI++] = valorPeca;
            }

            $(this).click(PSelecionarPeca);
        });

        estaJogando = true;

        PAtualizar.SomasRestantes();
        PAtualizar.Tempo();

        PAtualizar.Pontuacao();

        setTimeout(PClock, 1000);
    }

    function PClock() {
        if(!estaJogando) {
            return 1;
        }

        if(!--tempoRestante) {
            PExibirDerrota();
            return 1;
        }

        if(tempoRestante <= 10){
            if(tempoRestante < 0){
                audio.pararTempoAcabando();

            } else{
                audio.notificarTempoAcabando();
            }
        }

        PAtualizar.Tempo();
        setTimeout(PClock, 1000);
        return 0;
    }

    /*
     * Chamado quando uma peca e clicada pelo botao esquerdo do mouse.
     * Se duas pecas estao selecioadas, nao faz nada. Se ha uma unica peca
     * selecionada e o click foi sobre ela mesma, ela perde a selecao.
     * Por fim, quando uma peca ja esta selecionada e ha o click sobre outra,
     * aguarda 0,7 segundos e verifica se estas duas sao pares.
     */
    function PSelecionarPeca() {
        var $peca = $(this);
        var marcadas = $('.mesa-peca-selecionada').length

        // o jogador clicou sobre uma mesma peca duas vezes, remove selecao dessa peca.
        if ( $peca.hasClass('mesa-peca-selecionada') )
        {
            $peca.removeClass('mesa-peca-selecionada');
            return this;
        }
        
        // Duas ou mais pecas ja foram selecionadas, impede selecao de uma terceira.
        if ( marcadas < 2 )
        {        
            $peca.addClass('mesa-peca-selecionada');
            marcadas++;

            if(!fingir)
            {
                audio.notificarSelecionar();

                // se duas pecas foram selecionadas e nao estamos fingindo, verifica se elas sao pares corretos.
                if ( marcadas == 2)
                {
                    setTimeout(PVerificaPar, 500);
                }
            }
        }


        return this;
    }

    function PVerificaPar() {
        var pecas = $(".mesa-peca-selecionada");

        var $pecaA = pecas.eq(0).data("pattern"); // $pecaA = peca-
        var $pecaB = pecas.eq(1).data("pattern");

        var soma1      = parseInt($pecaA.split("_")[1]);
        var soma2      = parseInt($pecaB.split("_")[1]);
        var resultado1 = parseInt($pecaA.split("_")[2]);
        var resultado2 = parseInt($pecaB.split("_")[2]);

        if (soma1 +soma2 != resultado1 && soma1 +soma2 != resultado2){
            pecas.removeClass("mesa-peca-selecionada");
            pontuacao += CONST.PONTUACAO.RESPOSTA_INCORRETA;
            audio.notificarErro();

            if (pontuacao < 0) {
            PExibirDerrota();
            return 1;
        }

        }
        else {
            pontuacao += CONST.PONTUACAO.RESPOSTA_CORRETA;
            pecas.removeClass("mesa-peca-selecionada").addClass("mesa-peca-removida");
            audio.notificarAcerto();

            $('.mesa-peca-removida').bind("webkitTransitionEnd", PVerificaVitoria);
            $('.mesa-peca-removida').bind("transitionend", PVerificaVitoria);
        }

        PAtualizar.Pontuacao();
    }

    function PVerificaVitoria() {
        $(".mesa-peca-removida").remove();
        var $pecas = $('.mesa-peca');

        if($pecas.length) {
            PAtualizar.SomasRestantes();
            return 1;
        }

        pontuacao += tempoRestante *CONST.PONTUACAO.TEMPO_RESTANTE;
        pontuacao += CONST.PONTUACAO.VITORIA;

        PPararJogo();
        PExibirVitoria();

        console.log('Vitória! Meus parabéns!');
        return 0;
    }

    function PExibirVitoria() {
        PPararJogo();
        audio.notificarVitoria();
        $('#final-pontos').html(pontuacao ? pontuacao : 'Zero');
        $('#camadaJogo').hide();

        $('#camadaVitoria').fadeIn(300);
        console.log('Camada vitoria aparece!');
    }

    function PExibirDerrota() {
        PPararJogo();
        audio.notificarDerrota();
        $('#final-pontos').html(pontuacao ? pontuacao : 'Zero');
        $('#camadaJogo').hide();

        $('#camadaDerrota').fadeIn(300);
        console.log('Camada vitoria aparece!');
    }

    function PPararJogo() {
        console.log('Fim do jogo! Até mais...');
        estaJogando = false;
        audio.pararTempoAcabando();

        return;
    }

    function PShuffle() {
        return 0.5 -Math.random();
    }

    function PObterPontuacao() {
        var tmpPont = pontuacao;
        if(!estaJogando) {
            console.log('Erro: PObterPontuacao chamada sem que o jogo esteja iniciado.');
            return -1;
        }

        return tmpPont;
    }

    function PDica () {
        audio.notificarDica();
        if ( (pontuacao + CONST.PONTUACAO.DICA) < 0 ) {
            return false;
        }

        
        pontuacao += CONST.PONTUACAO.DICA;
        PAtualizar.Pontuacao();

        // recebe todas as pecas no jogo
        var $pecas = $("#mesa").children();

        // a partir daqui, o jogo esta fingindo selecionar pecas, PVerificarPar() nunca ee executado.
        fingir = true;


        // pega uma peca randomica do vetor $pecas
        var $peca = $pecas.eq(Math.floor(Math.random() * $pecas.length));

        $pecas.each(function(index, element) {
            var $pecaA = $peca.eq(0).data("pattern");
            var $pecaB = $(this).data("pattern");

            // Nao ee a mesma peca.
            if ($pecaA != $pecaB)
            {
                var soma1      = parseInt($pecaA.split("_")[1]);
                var soma2      = parseInt($pecaB.split("_")[1]);
                var resultado1 = parseInt($pecaA.split("_")[2]);
                var resultado2 = parseInt($pecaB.split("_")[2]);

                // sao pares possiveis
                if (soma1 +soma2 == resultado1 || soma1 +soma2 == resultado2) {
                    $peca.click();
                    $(element).click();

                    setTimeout(function() { $('.mesa-peca-selecionada').removeClass('mesa-peca-selecionada'); fingir = false }, 2000);

                    return false;
                }
            }
        });

        return true;
    }

    //    Metodos publicos. Estes sao retornados para APLICACAO.JS
    return {
        IniciarJogo:    PIniciarJogo,
        FinalizarJogo:  PPararJogo,
        ObterPontuacao: PObterPontuacao,
        Dica:           PDica
    };
});
