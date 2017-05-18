$(document).ready(function () {
    var CA=0,TX=0,IL=0,NY=0,ML=0,VR=0,OH=0;
    $.ajax({
        url: "http://localhost:3000/maps",
        type: "GET",
        dataType: "json",
        success: function (response) {
        for(var i=0;i<response.length;i++)
        {
            if(response[i].state=="CA")
            {
                CA++;
            }
            else if(response[i].state=="TX")
            {
                TX++;
            }
            else  if(response[i].state=="NY")
            {
                NY++;
            }
            else  if(response[i].state=="Maryland")
            {
                ML++;
            }
            else  if(response[i].state=="IL")
            {
                IL++;
            }
            else  if(response[i].state=="Virginia")
            {
                VR++;
            }
            else  if(response[i].state=="Ohio")
            {
                OH++;
            }
        }
            Highcharts.chart('map', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'State wise distribution'
                },

                xAxis: {
                    categories: [
                        'States',
                        'Texas',
                        'New York',
                        'Ohio',
                        'Maryland',
                        'Virginia',
                        'Illinois'
                    ],
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Patients'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'California',
                    data: [CA]

                }, {
                    name: 'Texas',
                    data: [TX]
                }, {
                    name: 'New York',
                    data: [NY]

                }, {
                    name: 'Ohio',
                    data: [OH]
                },
                    {
                        name: 'Maryland',
                        data: [ML]
                    },
                    {
                        name: 'Virginia',
                        data: [VR]
                    },
                    {
                        name: 'Illinois',
                        data: [IL]




                }]
            });

        }
    });
});