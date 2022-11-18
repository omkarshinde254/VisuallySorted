var g_array = []
var g_sorted_array = []
var g_color_array = []
var resertFlag = false
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

function addData(chart, label, data, idx1=null, idx2=null) {
    //console.log("Repopulating Chart data using: "+JSON.stringify(g_array))
    removeData(chart)
    chart.data.labels = label;
    chart.data.datasets[0].data = data;
    clr = new Array(data.length)
    clr[idx1] = '#1982c4'
    clr[idx2] = '#ff595e'
    chart.data.datasets[0].backgroundColor = clr
    chart.update();
}

function resetArray(){
    resertFlag = true
    console.log("Setting reset flag to -> ", resertFlag)
    addData(myChart, g_array, g_array)
}

function resetArray_afterSort(chart){
    chart.data.datasets[0].backgroundColor = []
    chart.update();
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
        console.log("Reset flag--> ", resertFlag)
        if (resertFlag == true){
            break
        }
        //console.log("Now processing");
        //console.log(g_sorted_array[i]);
        addData(myChart,g_sorted_array[i][0],g_sorted_array[i][0], g_sorted_array[i][1][0], g_sorted_array[i][1][1]);
        await timer (50);
    }

    if (resertFlag == true){
        resertFlag = false
        M.toast({html: 'Sorting Aborted!'})
    }
    else {
        M.toast({html: 'Sorting Completed!'})
    }
    resetArray_afterSort(myChart)
}


function initiate_sorting(){
    algo_name = document.getElementById('dropdown').value
    //console.log(algo_name);
    if ( !algo_name){
        M.toast({html: 'Please select a sorting algorithm!'})
        return;
    }
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
                g_color_array = data['sorted_array']
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
 