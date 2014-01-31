var jsCliente = {};

jsCliente.start = function(){jsCliente.eventos();};
jsCliente.mask = function(){
    $("#gdata").mask('00/00/0000');
    $("#ghorario").mask('00:00:00');
    $("#gentradahotel").mask('00/00/0000');
    $("#gquantidade").mask('000');
    $("#gsaidahotel").mask('00/00/0000');
};

jsCliente.eventos = function(){
jsCliente.getlista();
    $('#gSalvar').click(function(){jsCliente.salvar();});
};
jsCliente.informe = function(msg) {
    $("#msg").text(msg);
    $("#dialog").dialog({with : 300, height: 150,
        modal: true, buttons: {
            Ok: function() {
                $("#dialog").dialog("close");
                $("#btVoltar").click();
            }
        }
    });
};

jsCliente.ajax = function(obj, funcao, v) {
    var view = v == null ? 'view/vCliente.php' : v;
    var data = {'obj': obj, 'action': funcao};
    var retorno;
    $.ajax({type: "POST", url: view, dataType: "json", data: data, async: false,
        success: function(json) {
            retorno = json;
        },
        error: function() {
            retorno = null;
        }
    });
    return retorno;
};

jsCliente.getDoForm = function(){
    var obj = new Object();
        obj.id          = $("#grupoId").val();
        obj.nome        = $("#gnome").val();
        obj.quantidade  = $("#gquantidade").val();
        obj.guiaId      = $("#gguia").val();
        obj.voo         = $("#gvoo").val();
        obj.dtVoo       = $("#gdata").val();
        obj.hrVoo       = $("#ghorario").val();
        obj.hotelId     = $("#gnomehotel").val();
        obj.hotEntrada  = $("#gentradahotel").val();
        obj.hotSaida    = $("#gsaidahotel").val();
        obj.obsReserva  = $("#gdescricaoreserva").val();
        obj.programacao = $("#gprogramacao").val();
   
   return obj;
};

jsCliente.setDoForm = function(obj){
    $("#grupoId").val(obj.id);
    $("#gnome").val(obj.nome);
    $("#gquantidade").val(obj.quantidade);
    $("#gguia").val(obj.guiaId);
    $("#gvoo").val(obj.voo);
    $("#gdata").val(obj.dtVoo);
    $("#ghorario").val(obj.hrVoo);
    $("#gnomehotel").val(obj.hotelId);
    $("#gentradahotel").val(obj.hotEntrada);
    $("#gsaidahotel").val(obj.hotSaida);
    $("#gdescricaoreserva").val(obj.obsReserva);
    $("#gprogramacao").val(obj.programacao);
};

jsCliente.getlista = function(){
    var json = jsCliente.ajax('','fetchAll');
    
    main.listarNaTable($('#listaGrupo'),json.data,true);
    jsCliente.eventosDaTable();
    //jsCliente.paginacao();
};

jsCliente.salvar = function(){
    var obj = this.getDoForm();
    console.info(obj);
    if(obj.id ==""){
        var fun = 'insert';
    }else{
        fun = 'update';
    }
    var json = jsCliente.ajax(obj,fun); //!= null ? jsCliente.confirmacao(fun,1):jsCliente.confirmacao(fun,2) //alert("REGISTRADO COM SUCESSO!"): alert("ERRO AO GRAVAR");    
    
    $("#GrupoNovoEditar").modal('hide');
    jsCliente.getlista();
    $("#infoText").text(json.message);
    $("#infoModal").modal();
};

jsCliente.confirmacao = function (a,b){
    if(a =="update"){
        if(b==1){
            var msg = "REGISTRO EDITADO COM SUCESSO!";
        }else{msg = "ERRO AO EDITAR REGISTRO!";}
    }else{
        if(b==1){
            msg = "REGISTRADO COM SUCESSO!";
        }else{msg = "ERRO AO REGISTRAR!";}
    }
    $("#infoText").text(msg);
    $("#infoModal").modal();
}

jsCliente.editar = function(id){
    var obj = new Object();
        obj.id = id;
    var json = jsCliente.ajax(obj,'buscaid');
    jsCliente.setDoForm(json.data[0]);
    $("#titulo").text('Editar Cadastro');
    $("#GrupoNovoEditar").modal();
    jsCliente.mask();
};

jsCliente.eventosDaTable = function(){
    $('#listaGrupo tr').each(function() {
    var codigo;
    $('td', $(this)).each(function(index, item) {            
        if(index === 0){codigo=$(item).text();}
    });            
    $(this).click(function(){jsCliente.editar(codigo);}).css('cursor','pointer');
    });
};
jsCliente.guia = function (){
    var json = jsCliente.ajax('','getGuia');
    fo
}

jsCliente.paginacao = function(){
    $("table") 
        .tablesorter({
          dateFormat: 'uk',
          headers: {
            0: {
              sorter: false
            },
            5: {
              sorter: false
            }
          }
        }) 
        .tablesorterPager({container: $("#pager")});
}
jsCliente.start();


