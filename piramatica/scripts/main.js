/* APLICACAO.JS
 * 
 * DATA DA CRIACAO: 17/10/2012 (Lucas)
 * ULTIMA MODIFICACAO: 21/11/2012 (Lucas)
 * 
 * DESCRICAO: gerencia a inclusao de codigo js.
 * 
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 
 */

require.config({
    paths: {
        "jquery": "./libs/jquery-1.8",
        "jquery.accessWidgetToolkit.core": "./libs/jquery.accessWidgetToolkit.core",  
		"jquery.accessWidgetToolkit.AccessButton": "./libs/jquery.accessWidgetToolkit.AccessButton"
    }
});

require(['jquery', 'aplicacao'], function ($, aplicacao) {
    
    $(document).ready(function () {
		aplicacao.iniciar();
	});
	
});