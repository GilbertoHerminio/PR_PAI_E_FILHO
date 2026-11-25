$(document).ready(function() {


    

    $("#tree").fancytree({

        click: function(event, data) {

            var node = data.node;

            console.log("Código:", node.key);
            console.log("Descrição:", node.title);

            $("#itemSelecionado").val(node.key);

        }

    });


    $("#deslizar").change(function () {

        if ($(this).is(":checked")) {

            FLUIGC.toast({
                title: 'Switch',
                message: 'Opção ATIVADA!',
                type: 'success'
            });

        } else {

            FLUIGC.toast({
                title: 'Switch',
                message: 'Opção DESATIVADA!',
                type: 'warning'
            });

        }

    });





     $("#btnProcessar").click(function () {

        // Verifica se o botão está no estado PRIMARY

        if ($(this).hasClass("btn-primary")) {

            // Remove a classe PRIMARY
            // Adiciona a classe SUCCESS

            $(this).removeClass("btn-primary");
            $(this).addClass("btn-success");

            // Altera o texto do botão

            $(this).text("Processado");

            // Exibe mensagem de sucesso

            FLUIGC.toast({
                title: 'Sucesso!',
                message: 'Processado com sucesso!',
                type: 'success'
            });

        } else {

            // Remove a classe SUCCESS
            // Adiciona a classe PRIMARY

            $(this).removeClass("btn-success");
            $(this).addClass("btn-primary");

            // Altera o texto do botão

            $(this).text("Processar");

            // Exibe mensagem de retorno

            FLUIGC.toast({
                title: 'Atenção!',
                message: 'Aguardando processamento...',
                type: 'info'
            });

        }

    });

});



function fncLeuContrato(elemento) {

    if (elemento.checked) {

        FLUIGC.toast({
            title: 'Sucesso!',
            message: 'O Contrato foi lido...',
            type: 'success'
        });

    } else {

        FLUIGC.toast({
            title: 'Atenção!',
            message: 'O Contrato não foi lido...',
               type: 'warning'
        });

    }

}


function fncSideBar() {

    FLUIGC.sidebar({

        title: 'Menu Lateral',

        content: `
            <div class="fluig-style-guide">
                <h2>Menu Lateral</h2>
                <p>Sidebar aberto com sucesso!</p>
            </div>
        `,

        actions: [
            {
                label: 'Salvar',
                bind: 'data-save'
            },
            {
                label: 'Fechar',
                bind: 'data-close',
                autoClose: true
            }
        ]

    });

}




function candidatoChange(src) {

    var selectedOption = src.value;
    var complemento = '';

    if (selectedOption === "CLT") {
        complemento = 'REGIME CLT';
    }
    else if (selectedOption === "PJ") {
        complemento = 'PESSOA JURÍDICA';
    }
    else if (selectedOption === "EST") {
        complemento = 'ESTAGIÁRIO';
    }

    // Localiza o LABEL
    var label = $('#lblTipoContratacao');

    // Guarda o texto original apenas uma vez
    if (label.data('textoOriginal') === undefined) {
        label.data('textoOriginal', label.text().trim());
    }

    // Recupera o texto original
    var textoOriginal = label.data('textoOriginal');

    // Atualiza o LABEL
    label.text(textoOriginal + ' - ' + complemento);
}






function departamentoChange(src) {

    var complemento = '';

    // Obtém o texto da opção selecionada
    complemento = src.options[src.selectedIndex].text;

    // Localiza o LABEL
    var label = $('#lblTipoDepartamento');

    // Guarda o texto original apenas uma vez
    if (label.data('textoOriginal') === undefined) {
        label.data('textoOriginal', label.text().trim());
    }

    // Recupera o texto original
    var textoOriginal = label.data('textoOriginal');

    // Se não selecionou nenhum departamento
    if (src.value === '') {
        label.text(textoOriginal);
    }
    else {
        label.text(textoOriginal + ' - ' + complemento);
    }
}






function aceitaAcordoChange(src) { 

    var label = $('#lblAceitaAcordo');

    // Guarda o texto original apenas uma vez
    if (label.data('textoOriginal') === undefined) {
        label.data('textoOriginal', label.text().trim());
    }

    var textoOriginal = label.data('textoOriginal');

    // Verifica se o CHECKBOX está marcado
    if (src.checked) {
        label.text(textoOriginal + ' - ' + src.value);
    }
    else {
        label.text(textoOriginal);
    }
}



function navegarAba(src) {

    // Obtém a aba selecionada no RADIO
    var abaSelecionada = src.value;

    // Ativa a aba correspondente
    $('#componenteAbas a[href="#' + abaSelecionada + '"]').tab('show');

}



function selecionarTipo(valor, descricao) {

    $("#tipoSolicitacao").val(valor);

    $("#btnTipoSolicitacao").html(
        descricao + ' <span class="caret"></span>'
    );

}




function fncConverteValor() {

        var valor = $("#valorProduto").val();

        if (!valor) {
            $("#resultado").val(0);
            return;
        }

        // Remove pontos e substitui vírgula por ponto
        valor = valor.replace(/\./g, '').replace(',', '.');

        // Converte para número
        var resultado = parseFloat(valor);

        // Valida o resultado
        if (isNaN(resultado) || resultado < 0) {
            resultado = 0;
        }

        // Exibe o resultado
        $("#resultado").val(resultado.toFixed(2));
    }










var settings = {

    title: "Produto cadastrado com sucesso.",

    description: 'Para visualizar os detalhes acesse a <a href="https://www.exemplo.com">página do produto.</a>',

    header: 'O que você deseja fazer?',

    transitionEffect: true,

    messageType: 'success',

    links: [
        {
            description: 'Executar meu método',
            bind: 'data-run-my-method'
        },
        {
            description: 'Ir ao Fluig',
            href: 'http://www.fluig.com'
        }
    ],

    actionClose: {
        label: 'Voltar',
        bind: 'data-close-message-page'
    }

};

messagePage = FLUIGC.messagePage(settings);

 
$(document).on('click', '[data-show-message-page]', function(ev) {
    messagePage.show();
});
 
$(document).on('click', '[data-close-message-page]', function(ev) {
    messagePage.hide();
});
 
$(document).on('click', '[data-run-my-method]', function(ev) {
    alert("Started from Message Page")
});