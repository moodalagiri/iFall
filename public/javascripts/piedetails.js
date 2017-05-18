$(document).ready(function () {

    var fifty=0,sixty=0,seventy=0,eighty=0,ninty=0;

    var fifty_per=0,sixty_per=0,seventy_per=0,eighty_per=0,ninty_per=0;
    $.ajax({
        url: "http://localhost:3000/pie",
        type: "GET",
        dataType: "json",
        success: function (response) {

            for (var i = 0; i < response.length; i++) {
                if (response[i].age >= 50 && response[i].age < 60) {
                    fifty++;

                }
                else if (response[i].age >= 60 && response[i].age < 70) {
                    sixty++;
                }
                else if (response[i].age >= 70 && response[i].age < 80) {
                    seventy++;
                }
                else if (response[i].age >= 80 && response[i].age < 90) {
                    eighty++;
                }
                else {
                    ninty++;
                }
            }
            console.log("fifty" + Number(fifty));
            fifty_per = Number((fifty / response.length) * 100);
            sixty_per = (sixty / response.length) * 100;
            seventy_per = (seventy / response.length) * 100;
            eighty_per = (eighty / response.length) * 100;
            ninty_per = (ninty / response.length) * 100;

            //arr.push(fifty_per,sixty_per, seventy_per, eighty_per,ninty_per);
            //console.log(arr);

            Highcharts.chart('piechart', {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'Age distribution'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                series: [{
                    name: 'Percentage',
                    colorByPoint: true,
                    data: [{
                        name: '50-60',
                        y: fifty_per
                    }, {
                        name: '60-70',
                        y: sixty_per

                    }, {
                        name: '70-80',
                        y: seventy_per
                    }, {
                        name: '80-90',
                        y: eighty_per
                    }, {
                        name: '90+',
                        y: ninty_per

                    }]
                }]
            });

        }
        });
});