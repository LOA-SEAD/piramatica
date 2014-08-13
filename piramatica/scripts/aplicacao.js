/* APLICACAO.JS
 * 
 * Data de criacao: 13/11/2012 (Lucas)
 * Ultima modificacao: 21/11/2012 (Lucas)
 * 
 * DESCRICAO: Este arquivo e chamado por main.js durante o carregamento
 * o codigo pelo require. Funciona como codigo inicial. Define comportamentos
 * de botoes.
 * 
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 
 */
define(['jquery', 'modelos/piramatica', 'text!visualizacoes/layout.html', 'text!visualizacoes/peca.html', './utils/audio', 'jquery.accessWidgetToolkit.AccessButton'],
    function ($, piramatica, layout, pecas, audio) {
        
        function criarLayout() {
            $('body').append(layout);
            configAmbiente();
        }
	
        //	defini regras basicas de interacao usuario-jogo
        function configAmbiente() {
            //	Definindo acoes realizadas no evento 'click' do mouse sobre determinados elementos
            $("#menu-jogar")
            .accessButton({
                accessibleLabel: "Iniciar jogo"
            })
            .data("accessButton")
            .clickOrActivate(function () {
                $('#camadaMenu').hide();
                $('#camadaIntro').fadeIn();

                return false;
            });

            $("#menu-sobre")
            .accessButton({
                accessibleLabel: "Sobre o projeto"
            })
            .data("accessButton")
            .clickOrActivate(function () {
                $('#camadaMenu').hide();
                $('#camadaSobre').fadeIn(300);

                return false;
            });

            $('button#sobre-voltar')
            .accessButton({
                accessibleLabel: 'Voltar'
            })
            .data('accessButton')
            .clickOrActivate(function () {
                $('#camadaSobre').hide();
                $('#camadaMenu').fadeIn(300);

                return false;
            });
		
            $('#intro-voltar')
            .accessButton({
                accessibleLabel: 'Voltar'
            })
            .data('accessButton')
            .clickOrActivate(function () {
                $('#camadaIntro').hide();
                $('#camadaMenu').fadeIn(300);

                return false;
            });	
		
            $('#intro-jogar')
            .accessButton({
                accessibleLabel: 'Jogar'
            })
            .data('accessButton')
            .clickOrActivate(function () {
                // Verificando qual dificuldade foi escolhida atraves dos
                // radioboxes. Padrao: FACIL
                var dificuldade = 'FACIL';
                if($('#rad1')[0].checked) dificuldade = 'FACIL';
                if($('#rad2')[0].checked) dificuldade = 'NORMAL';
                if($('#rad3')[0].checked) dificuldade = 'DIFICIL';

                $('#camadaIntro').hide();
                $('#camadaJogo').fadeIn(300);
                $('#aTop')[0].click();
                
				// Isso esta destruindo o jogo, quando jogado pelo IE?
				// VERIFICAR!!!
                $('#mesa').html(pecas);
			
                piramatica.IniciarJogo(dificuldade);
                return false;
            });

            $('#mesa-dica')
            .accessButton({
                accessibleLabel: 'Dica'
            })
            .data('accessButton')
            .clickOrActivate(function () {
                piramatica.Dica();
            });
		
            $('#mesa-voltar')
            .accessButton({
                accessibleLabel: 'Voltar'
            })
            .data('accessButton')
            .clickOrActivate(function () {
                $('#camadaJogo').hide();
                $('#camadaMenu').fadeIn(300);
			
                piramatica.FinalizarJogo();
                return false;
            });
		
			// Quando as telas de vitoria ou derrota estao sendo mostradas e o usuario clicar sobre qualquer coisa, destrui-las
            $(document).click(function () {

                if($('#camadaVitoria').is(':visible') || $('#camadaDerrota').is(':visible')) {

                    $('#camadaDerrota').hide();
                    $('#camadaVitoria').hide();
                    $('#camadaMenu').fadeIn(300);
                    
                    console.log('Camada derrota e vitoria escondidos');
                }
            });
            //	Fim das descricoes de eventos 'click' do mouse
		
            //	Inicia a pagina com fadeIn sobre o menu
            $('#camadaMenu').hide();
            $('#camadaMenu').fadeIn(1000);
        }
        // fim do metodo configAmbiente

        return {

            iniciar: function () {
                criarLayout();
            }

        };
    });
