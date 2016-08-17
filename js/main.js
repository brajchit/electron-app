
function fillOptions($selectTag, data) {
    $(data).each(function(index, val) {
        $('<option/>',{
            value: val,
            text : val
        }).appendTo($selectTag);
    });
}

$(document).ready(function() {

    var equipos      = ["LASER", "OFFSET", "DUPLICADORA", "FOTOCOPIA"],
        equiposVals  = [1.5, 2, 2.5, 3],
        sustrato = ["BOND", "CANVAS", "PVC", "ADESIVOS"],
        sustratoVals = [.30, .25, .40, .55],
        arte     = ["AFICHE", "VOLANTE", "CARNE", "LIBRO", "FOLLETO", "TARJETA"],
        arteVals = [.30, .25, .40, .55, .88, .35],
        iva      = ["12%", "14%"],
        ivaVals  = [.12, .14];

    var $equiposSelects = $("select#equipo");
    var $sustratoSelects = $("select#sustrato");
    var $arteSelects = $("select#arte");
    var $ivaSelects = $("select#iva");

    fillOptions($equiposSelects, equipos);
    fillOptions($sustratoSelects, sustrato);
    fillOptions($arteSelects, arte);
    fillOptions($ivaSelects, iva);

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
            'class': 'select-options'
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
            console.log($this.val());

            // cuando es LIBRO o FOLLETO
            if ($(this).text() == "LIBRO" || $(this).text() == "FOLLETO" ) {
                var warpArte = $('select#arte').parent();
                $('body #npag, h2.LibroFollleto, select#color').remove();
                warpArte.after('<h2 class="LibroFollleto">N. PAGINAS</h2><div class="select" id="npag"><input class="input-value" type="number" name="cantidad" min="1" step="1"></div>');
                var $colorSelector = $('<select/>',{
                    id: 'color'
                }).append($('<option/>',{value:'hide'}).text("-- Select --"))
                  .append($('<option/>',{value:'hide'}).text("COLOR"))
                  .append($('<option/>',{value:'hide'}).text("BN"));
                // warpArte.after($colorSelector);

            } else {
                $('body #npag, h2.LibroFollleto, select#color').remove()
            }
        });

        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    });
});
