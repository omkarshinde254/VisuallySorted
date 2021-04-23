var g_array = []
var ctx = document.getElementById('myChart');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            data: []
        }]
    },
    options: {
        animation: {
            duration: 0
        },
        maintainAspectRatio: false,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            yAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false,
                }
            }]
        },
        legend: {
            display: false
        },
    }
});

function removeData(chart) {
    //console.log("Removing CHart Data")
    chart.data.labels = [];
    chart.data.datasets[0].data = [];
    chart.update();
}

function addData(chart, label, data) {
    //console.log("Repopulating Chart data using: "+JSON.stringify(g_array))
    removeData(chart)
    chart.data.labels = label;
    chart.data.datasets[0].data = data;
    chart.update();
}

function resetArray(){
    addData(myChart, g_array, g_array)
}

function createRandomArray() {
    array_length = document.getElementById('array_length').value
    var q = 'array_length='+array_length;
    var url = "http://localhost:8000/createRandomArray/?" + q

    fetch(url)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {
                    console.log(data);
                    g_array = data["array"]
                    addData(myChart,data["array"],data["array"])
                });

            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
createRandomArray()

$("#array_length").change(function () {
    createRandomArray();     
 })