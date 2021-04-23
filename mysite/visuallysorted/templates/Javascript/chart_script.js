var g_array = []
var g_sorted_array = []
const timer = ms => new Promise(res => setTimeout(res, ms))
var ctx = document.getElementById('myChart');
M.AutoInit();
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


async function sort_n_sleep(){
    console.log("In sort_n_sleep")
    for(var i=0; i<g_sorted_array.length; i++) {
        //console.log("Now processing");
        //console.log(g_sorted_array[i]);
        addData(myChart,g_sorted_array[i],g_sorted_array[i]);
        await timer (100);
    }
    M.toast({html: 'Sorting Completed!'})
}


function initiate_sorting(){
    algo_name = document.getElementById('dropdown').value
    var url = "http://localhost:8000/sort/?sort=" + algo_name + "&ary=" + g_array.toString()
    console.log("Call Sorting Algo- "+url)

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
                console.log("Recieved Sorted Array !");
                g_sorted_array = data['sorted_array']
                sort_n_sleep();
            });

        }
    )
    .catch(function (err) {
        console.log('Fetch Error :-S', err);
    });
}


function update_dd_text(text, key){
    document.getElementById('dropdown').innerHTML = text + '<i class="material-icons right">arrow_drop_down</i>'
    document.getElementById('dropdown').value = key
}

$("#array_length").change(function () {
    createRandomArray();     
 })

 $("#play").click(function () {
    initiate_sorting();
 })