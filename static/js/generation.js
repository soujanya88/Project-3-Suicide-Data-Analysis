$.ajax({
    dataType: "json",
    url: '/api/suicides_by_generation',
    data: {},
    success: function(data){
        var labels = Object.keys(data)
        var values = Object.values(data)
        var trace = {
            type: 'pie',
            labels: labels,
            values: values
        }   
        var layout = {
            title:'Suicide Rates by Generation',
            width: 600,
            height: 600
        }
        Plotly.newPlot('pie_generation', [trace], layout);
    }
});


// calls api and loads the pie chart. Uses jquery.
function loadPie() {
    $.ajax({
        dataType: "json",
        url: '/api/yearly_suicides_by_generation',
        data: {},
        success: function (data) {
            var yearData = data[$("#selectYear").find(":selected").val()];
            var labels = [], values = [];
            yearData.forEach(element => {
                labels.push(element.generation);
                values.push(element.numsuicides);
            });
            var trace = {
                type: 'pie',
                labels: labels,
                values: values
            }
            var layout = {
                title: 'Suicide Rates by Generation'
            }
            Plotly.newPlot('pie_generation', [trace], layout);

        }
    });
}

$(document).ready(function () {
    for (var i = 1997; i < 2017; ++i) {
        var option = "<option value='" + i + "'>" + i + "</option>";
        $("#selectYear").append(option);
    }
    loadPie()
    $("#selectYear").on("change", loadPie);
});
