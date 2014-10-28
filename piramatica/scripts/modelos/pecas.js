/* PECAS.JS
 * 
 * Descricao: define as possiveis IDs aplicadas as pecas que podem ser inseridas
 * em um jogo. Todas as pecas seguem o seguinte padrao:
 * 
 * peca_{seu resultado parcial}_{o resultado da soma de seu numero com o numero de seu par}
 * 
 * Exemplo: 'peca_2_10' e 'peca_8_10' sao pares, pois 2+8 = 10
 * 
 * ================================
 * Data de criacao: 17/10/2012 (Lucas)
 * Ultima modificacao: 23/10/2014 (Valério)
 * 
 */
define([], function() {

    var l_cafe_leite,
        l_medio,
        l_ninja,
        l_insano,
        levels;

    l_cafe_leite = [
        'peca_2_10', 'peca_8_10',
        'peca_30_20', 'peca_-10_20',
        'peca_42_30', 'peca_-12_30',
    ];

    l_medio = [
        'peca_5_10', 'peca_5_10_2',
        'peca_22_20', 'peca_-2_20',
        'peca_50_30', 'peca_-20_30',
        'peca_16_49', 'peca_33_49',
        'peca_100_121', 'peca_21_121',
    ];

    l_ninja = [
        'peca_6_10', 'peca_4_10',
        'peca_9_10', 'peca_1_10',
        'peca_3_10', 'peca_7_10',
        'peca_22_20', 'peca_-2_20',
        'peca_28_20', 'peca_-8_20',
        'peca_50_30', 'peca_-20_30',
        'peca_36_30', 'peca_-6_30',
        'peca_15_30', 'peca_15_30_2',
        'peca_70_49', 'peca_-21_49',
        'peca_56_49', 'peca_-7_49',
        'peca_169_121', 'peca_-48_121',
        'peca_101_121', 'peca_20_121',
        'peca_225_625', 'peca_400_625',
        'peca_290_625', 'peca_335_625',
    ];

    l_insano = [

    ];

    levels = [l_cafe_leite, l_medio, l_ninja, l_insano];

    return {
        levels : levels
    }
});