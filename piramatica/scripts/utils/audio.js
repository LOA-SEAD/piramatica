define(function () {


    var erro = 'piramatica/audio/erro',
        acerto = 'piramatica/audio/acerto',

        dica = 'piramatica/audio/dica',
        derrota = 'piramatica/audio/derrota',
        vitoria = 'piramatica/audio/vitoria',
        selecionar = 'piramatica/audio/selecionar',
        tempoAcabando = 'piramatica/audio/tempoacabando2',

        fundo = 'piramatica/audio/fundo',

        efeitoDeErro,
        efeitoDeAcerto,

        efeitoDeDica,
        efeitoDeDerrota,
        efeitoDeVitoria,
        efeitoDeSelecionar,
        efeitoDeTempoAcabando,

        musicaFundo;


    (function () {
        if (suportaAudioElement()) {

            if (suportaWav()) {
                efeitoDeAcerto = new Audio(acerto + '.wav');
                efeitoDeErro = new Audio(erro + '.wav');
                
                efeitoDeDica = new Audio(dica + '.wav');
                efeitoDeDerrota = new Audio(derrota + '.wav');
                efeitoDeVitoria = new Audio(vitoria + '.wav');
                efeitoDeSelecionar = new Audio(selecionar + '.wav');
                efeitoDeTempoAcabando = new Audio(tempoAcabando + '.wav');

                musicaFundo = new Audio(fundo + '.wav');
                

            } else {
                efeitoDeAcerto = new Audio(acerto + '.mp3');
                efeitoDeErro = new Audio(erro + '.mp3');

                efeitoDeDica = new Audio(dica + '.mp3');
                efeitoDeDerrota = new Audio(derrota + '.mp3');
                efeitoDeVitoria = new Audio(vitoria + '.mp3');
                efeitoDeSelecionar = new Audio(selecionar + '.mp3');
                efeitoDeTempoAcabando = new Audio(tempoAcabando + '.mp3');

                musicaFundo = new Audio(fundo + '.mp3');

            }

        }
        
    }());

    function suportaAudioElement() {
        return typeof document.createElement('audio').canPlayType !== 'undefined';
    }

    function suportaWav() {
        return new Audio().canPlayType('audio/wav') !== '';
    }

    return {

        notificarErro: function () {
            if (efeitoDeErro !== undefined)
                efeitoDeErro.play();

            //return true;
        },

        notificarAcerto: function () {
			if (efeitoDeAcerto !== undefined)
                efeitoDeAcerto.play();

            //return true;
		},

        notificarDica: function () {
            if (efeitoDeDica !== undefined)
                efeitoDeDica.play();

            //return true;
        },

        notificarDerrota: function () {
            if (efeitoDeDerrota !== undefined)
                efeitoDeDerrota.play();

            //return true;
        },

        notificarVitoria: function () {
            if (efeitoDeVitoria !== undefined)
                efeitoDeVitoria.play();

            //return true;
        },

        notificarSelecionar: function () {
            if (efeitoDeSelecionar !== undefined)
                efeitoDeSelecionar.play();

            //return true;
        },

        notificarTempoAcabando: function () {
            if (efeitoDeTempoAcabando !== undefined){
                //efeitoDeTempoAcabando.load();
                efeitoDeTempoAcabando.loop = true;
                efeitoDeTempoAcabando.play();
            }

            //return true;
        },

        
        pararTempoAcabando: function () {
            if (efeitoDeTempoAcabando !== undefined){
                efeitoDeTempoAcabando.loop = false;
                efeitoDeTempoAcabando.pause();
            }

            //return true;

        },
        

        tocaBgm: function () {
            if (musicaFundo !== undefined)
                //musicaFundo.loop = true;
                musicaFundo.play();

            //return true;
        },


    };
});
