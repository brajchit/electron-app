// imprenta espol

const storage = require('electron-json-storage');


function fillOptions($selectTag, data) {
    $(data).each(function(index, obj) {
        $('<option/>',{
            value: obj.precio,
            text : obj.nombre
        }).appendTo($selectTag);
    });
}

$(document).ready(function() {


    // Read
    storage.get('foobar', function(error, data) {
        console.log(data);
    });

    //Calcule
    $('#calcule').click(function(event) {
        var equi = parseFloat($('#equipo').val());
        var sust = parseFloat($('#sustrato').val());
        var cant = parseInt($('#cantidad').val());
        var arte = parseFloat($('#arte').val());
        var radio = $("input[type='radio'][name='opIva']:checked");
        if (radio.length > 0) {
            var iva = parseFloat(radio.val()).toFixed(2);
            console.log(iva);
        }
        if ($('#input-nPages').css('display') != "none") {
            var intNpagesBN  = parseInt($('#nPagesBN').val());
            var inputNPagesColor  = parseInt($('#nPagesColor').val());
            // var colorRadio = $("input[type='radio'][name='opColor']:checked");
            // if (colorRadio.length > 0) {
            //     var floatColor = parseFloat(colorRadio.val());
            //     console.log(floatColor);
            // }
            // Libro-Folleto formula
            // var subt = intNpagesBN + floatColor + equi;
            var subt = intNpagesBN + inputNPagesColor;
            console.log(intNpagesBN);
            console.log(subt);
        } else {
            var subt = equi + sust + arte + cant;
        }

        subt2 = parseFloat(subt).toFixed(2);
        if ($.isNumeric( subt ) && cant>0) {
            // console.log(subt);
            $('#subtotal').text(subt2);
            var iva2 = parseFloat(subt*iva).toFixed(2);
            $('#iva').text(iva2);
            var total = parseFloat((subt*iva) + subt).toFixed(2);
            console.log((subt*iva) + subt);
            $('#total').text(total);
        }else {
            $('#subtotal').text("00.00");
            $('#iva').text("00.00");
            $('#total').text("00.00");
        }
    });

    //menuvar
    $('#setup-content').hide();
    $('#setup').on('click', function(event) {
        event.preventDefault();
        $('.menu li').removeClass('active');
        $(this).parent().toggleClass('active');
        $('#home-content').hide();
        $('#setup-content').show();
    });
    $('#home').on('click', function(event) {
        event.preventDefault();
        $('.menu li').removeClass('active');
        $(this).parent().toggleClass('active');
        $('#setup-content').hide();
        $('#home-content').show();
    });

    //data
    var equipos = [
        {nombre:"Láser",       precio:.10},
        {nombre:"Offset",      precio:.15},
        {nombre:"Duplicadora", precio:.20},
        {nombre:"Fotocopiadora",   precio:.25}
    ],
    color = [
        {nombre:"Full Color", precio:00},
        {nombre:"Blanco y Negro", precio:00}
    ],
    tiroRetiro = [
        {nombre:"Tiro", precio:00},
        {nombre:"Tiro y Retiro", precio:00}
    ],
    sustratos = [
        {nombre:"Papel Bond",      precio: 0.018},
        {nombre:"Papel Periódico",      precio: 0.018},
        {nombre:"Papel Químico",      precio: 0.018},
        {nombre:"Papel Couche brillo",      precio: 0.018},
        {nombre:"Papel Couche matte",      precio: 0.018},
        {nombre:"Papel Adhesivo",      precio: 0.018},
        {nombre:"Kimberly Colores",      precio: 0.018},
        {nombre:"Cartulina Bristol",      precio: 0.018},
        {nombre:"Cartulina Marfil Lisa",      precio: 0.018},
        {nombre:"Cartulina Cartulina Hilo",      precio: 0.018},
        {nombre:"Cartulina Plegable",      precio: 0.018},
        {nombre:"Cartulina Nacarada",      precio: 0.018},
        {nombre:"Cartulina Fina",      precio: 0.018},
        {nombre:"Pergamino Especial",      precio: 0.018},
    ],
    gramaje = [
        {nombre:"48 Periódico",             precio: 00},
        {nombre:"55 Químico",               precio: 00},
        {nombre:"75 Bond",                  precio: 00},
        {nombre:"90 Bond",                  precio: 00},
        {nombre:"120 Bond",                 precio: 00},
        {nombre:"115 Couche MatteBrilloso", precio: 00},
        {nombre:"150 Bristol",              precio: 00},
        {nombre:"200 Couche MatteBrilloso", precio: 00},
        {nombre:"250 Couche Brilloso",      precio: 00},
        {nombre:"220 Marfil",               precio: 00},
        {nombre:"230 Nacaradas",            precio: 00},
        {nombre:"250 Markatto Opalina",     precio: 00},
        {nombre:"180 Plegable 0.10",        precio: 00},
        {nombre:"270 Plegable 0.12",        precio: 00},
        {nombre:"370 Plegable 0.14",        precio: 00},
    ],
    tama = [
        {nombre:" A3 ", precio:.30},
        {nombre:" A4 ", precio:.30},
        {nombre:" A5 ", precio:.30},
    ];
    artes = [
        {nombre:"Afiche",    precio:.30},
        {nombre:"Tríptico",   precio:.30},
        {nombre:"Díptico",   precio:.30},
        {nombre:"Volante",  precio:.35},
        {nombre:"Carpeta",  precio:.35},
        {nombre:"Hoja Membretada",    precio:.40},
        {nombre:"Sobres Pequeños",  precio:.45},
        {nombre:"Sobres Grandes",  precio:.45},
        {nombre:"Títulos",  precio:.45},
        {nombre:"Certificados A5 A4",  precio:.45},
        {nombre:"Empastado",  precio:.45},
        {nombre:"Especies Valoradas",  precio:.45},
        {nombre:"Tarjetas Personales",  precio:.45},
        {nombre:"Rifas",  precio:.45},
        {nombre:"Cuaderno Correspondencia",  precio:.45},
        // {nombre:"LIBRO",    precio:.55},
        // {nombre:"FOLLETO",  precio:.55}
    ];

    //Load selectors
    var $equiposSelects = $("select#equipo");
    var $colorSelects=$("select#color");
    var $tiroRetiroSelects=$("select#tiroRetiro");
    var $tamaSelects=$("select#tama");
    var $gramajeSelects=$("select#gramaje");

    var $sustratoSelects = $("select#sustrato");
    var $arteSelects = $("select#arte");
    var $ivaSelects = $("select#iva");

    fillOptions($equiposSelects, equipos);
    fillOptions($colorSelects, color);
    fillOptions($tiroRetiroSelects, tiroRetiro);
    fillOptions($tamaSelects, tama);
    fillOptions($gramajeSelects, gramaje);

    fillOptions($sustratoSelects, sustratos);
    fillOptions($arteSelects, artes);

    //Set styles selectors
    $('select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');
        // $this.parent().append('<label class="label-values" for="value">00.00</label>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options',
            'id'   : $this.attr('id')
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li/>', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        //dropdown list options
        $styledSelect.click(function(e) {
            if ($('.select-options').is(':visible')) {
                e.stopPropagation();
                $styledSelect.text($(this).text()).removeClass('active');
                $this.val($(this).attr('rel'));

                $list.hide();

            } else {
                e.stopPropagation();
                $('div.select-styled.active').each(function() {
                    $(this).removeClass('active').next('ul.select-options').hide();
                });
                $(this).toggleClass('active').next('ul.select-options').toggle();
            } //end if
        });

        //event when click on list option
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //set label values
            var precio = $(this).attr('rel');
            $this.siblings('label').text(precio);

            // cuando se escoje equipo
            if ($(this).parent().attr('id') == "equipo" && $(this).text() == "Offset") {
                $("#input-Matrices").hide();
                $("#input-Placas").show();
            }else {
                $("#input-Placas").hide();
                $("#input-Matrices").show();
            }

            // cuando es LIBRO o FOLLETO
            if ($(this).parent().attr('id') == "arte" && $(this).text() == "LIBRO" || $(this).text() == "FOLLETO" ) {
                $('#home-content').css('padding-top', '2em');
                var $labelNPagesBN = $('<label for="nPages" class="label-input">N. PAGINAS BN</label>');
                var $inputNPagesBN = $('<input id="nPagesBN" class="input-value" type="number" name="nPages" value="1" min="1" step="1">');
                var $labelNPagesColor = $('<label for="nPages" class="label-input">N. PAGINAS COLOR</label>');
                var $inputNPagesColor = $('<input id="nPagesColor" class="input-value" type="number" name="nPages" value="1" min="1" step="1">');
                $inputNPagesBN.css('margin-left', '0');
                $inputNPagesColor.css('margin-left', '0');

                var $colorOps = `<div class="radio">
                            <label>
                                <input type="radio" name="opColor" id="optionsColor1" value=".4" checked>
                                B/N
                            </label>
                        </div>
                        <div class="radio">
                            <label>
                                <input type="radio" name="opColor" id="optionsColor2" value=".2">
                                Color
                            </label>
                        </div>`;
                $("#input-nPages").empty().append($labelNPagesBN, $inputNPagesBN,$('<br>'), $labelNPagesColor, $inputNPagesColor);
                $("#input-nPages").show();
                //

            } else if ($(this).parent().attr('id') == "arte") {
                $('#home-content').css('padding-top', '3em');
                $("#input-nPages").empty().hide();
            }
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
});
