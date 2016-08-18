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
            var intNpages  = parseInt($('#nPages').val());
            var colorRadio = $("input[type='radio'][name='opColor']:checked");
            if (colorRadio.length > 0) {
                var floatColor = parseFloat(colorRadio.val());
                console.log(floatColor);
            }
            // Libro-Folleto formula
            var subt = intNpages + floatColor + equi;
            console.log(intNpages);
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
        {nombre:"Lazer",       precio:.10},
        {nombre:"OFFSET",      precio:.15},
        {nombre:"DUPLICADORA", precio:.20},
        {nombre:"FOTOCOPIA",   precio:.25}
    ],
    sustratos = [
        {nombre:"BOND",      precio:.20},
        {nombre:"CANVAS",    precio:.25},
        {nombre:"PVC",       precio:.30},
        {nombre:"ADESIVOS",  precio:.35}
    ],
    artes = [
        {nombre:"AFICHE",   precio:.30},
        {nombre:"VOLANTE",  precio:.35},
        {nombre:"CARNE",    precio:.40},
        {nombre:"TARJETA",  precio:.45},
        {nombre:"LIBRO",    precio:.55},
        {nombre:"FOLLETO",  precio:.55}
    ];

    //Load selectors
    var $equiposSelects = $("select#equipo");
    var $sustratoSelects = $("select#sustrato");
    var $arteSelects = $("select#arte");
    var $ivaSelects = $("select#iva");

    fillOptions($equiposSelects, equipos);
    fillOptions($sustratoSelects, sustratos);
    fillOptions($arteSelects, artes);

    //Set styles selectors
    $('select').each(function() {
        var $this = $(this),
            numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');
        $this.parent().append('<label class="label-values" for="value">00.00</label>');

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

            // cuando es LIBRO o FOLLETO
            if ($(this).parent().attr('id') == "arte" && $(this).text() == "LIBRO" || $(this).text() == "FOLLETO" ) {
                $('#home-content').css('padding-top', '2em');
                var $labelNPages = $('<label for="nPages" class="label-input">N. PAGINAS</label>');
                var $inputNPages = $('<input id="nPages" class="input-value" type="number" name="nPages" value="1" min="1" step="1">');
                $inputNPages.css('margin-left', '0');

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
                $("#input-nPages").empty().append($colorOps, $labelNPages, $inputNPages);
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
