﻿$(document).ready(function () {
    $("#PaintCategoryId").change(function () {
        $.ajax({
            type: "GET",
            url: "/Paints/GetPaintSubCategory?paintCategoryId=" + $(this).val(),
            success: function (data) {
                $("#PaintSubCategoryId").empty();
                $("#PaintSubCategoryId").append("<option>Select Paint</option>");
                $(data).each(function (i) {
                    $("#PaintSubCategoryId").append("<option value='" + data[i].PaintSubCategoryId + "'>" + data[i].Value + "</option>")
                });
                $('#PaintSubCategoryId').niceSelect('update');
            }

        });
    });


    //$("#GetPaintSubCategory").change(function () {
    //    $.ajax({
    //        type: "GET",
    //        url: "/Paints/GetPaintSubCategory?paintCategoryId=" + $(this).val(),
    //        success: function (data) {
    //            paintCat = $('#PaintCategoryId').val();
    //            $("#PaintSubCategoryId").empty();
    //            $("#PaintSubCategoryId").append("<option>Select Paint</option>");
    //            $(data).each(function (i) {
    //                $("#PaintSubCategoryId").append("<option value='" + data[i].PaintSubCategoryId + "'>" + data[i].Value + "</option>")
    //            });
    //            $('#PaintSubCategoryId').niceSelect('update');
    //        }

    //    });
    //});



    //Type Ahead implementation
    var paintColours = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('Colour'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: '/Paints/GetPaintColourLookup?query=',//%QUERY',
            replace: function (url, uriEncodedQuery) {
                url = url + $('#searchBar').val();
                var paintSubCat = $('#PaintSubCategoryId').val();
                if (paintSubCat > 0)
                    return url + '&PaintCategoryId=' + encodeURIComponent($('#PaintCategoryId').val()) + '&PaintSubCategoryId=' + encodeURIComponent(paintSubCat)
                else
                    toastr.error("Please select a paint", "Oops!");
            },
            //wildcard: '%QUERY'
        }
    });

    $('#searchBar').typeahead(
        {
            minLength: 1,
            highlight: true
        },
        {
            name: 'paintColours',
            display: 'Colour',
            source: paintColours
        });
});


