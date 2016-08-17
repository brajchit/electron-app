
function fillOptions($selectTag, data) {
    $(data).each(function(index, obj) {
        $('<option/>',{
            value: obj.precio,
            text : obj.nombre
        }).appendTo($selectTag);
    });
}

$(document).ready(function() {
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

    var $equiposSelects = $("select#equipo");
    var $sustratoSelects = $("select#sustrato");
    var $arteSelects = $("select#arte");
    var $ivaSelects = $("select#iva");

    fillOptions($equiposSelects, equipos);
    fillOptions($sustratoSelects, sustratos);
    fillOptions($arteSelects, artes);
    // fillOptions($ivaSelects, iva);

    $('select').each(function() {
        $(this).on('change', function(e) {
            e.preventDefault();
            var $labelValue = $(this).siblings('label');
            $labelValue.text($(this).val());
        });
    });

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
            $('<li />', {
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
                //console.log($this.val());

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
            var precio = $(this).attr('rel');
            $this.siblings('label').text(precio);

            // cuando es LIBRO o FOLLETO
            if ($(this).parent().attr('id') == "arte" && $(this).text() == "LIBRO" || $(this).text() == "FOLLETO" ) {
                var warpArte = $('select#arte').parent();
                $('body #npag, h2.LibroFollleto, select#color').remove();
                warpArte.after('<h2 class="LibroFollleto">N. PAGINAS</h2>');
                var divLibroFolleto = $('<div class="select" id="npag"></div>');
                var inputNpag = $('<input class="input-value" type="number" min="1" step="1">');
                divLibroFolleto.append(inputNpag)
                $('.LibroFollleto').after(divLibroFolleto);


            } else if ($(this).parent().attr('id') == "arte") {
                $('body #npag, h2.LibroFollleto').remove()
            }
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
});
