const width_threshold = 480;

function drawLineChart() {
  if ($("#lineChart").length) {
    ctxLine = document.getElementById("lineChart").getContext("2d");
    optionsLine = {
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Hits"
            }
          }
        ]
      }
    };

    // Set aspect ratio based on window width
    optionsLine.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configLine = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "Buisness",
            data: [88, 68, 79, 57, 56, 55, 70],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            lineTension: 0.1
          },
          {
            label: "Politics",
            data: [33, 45, 37, 21, 55, 74, 69],
            fill: false,
            borderColor: "rgba(255,99,132,1)",
            lineTension: 0.1
          },
          {
            label: "Sport",
            data: [44, 19, 38, 46, 85, 66, 79],
            fill: false,
            borderColor: "rgba(153, 102, 255, 1)",
            lineTension: 0.1
          }
        ]
      },
      options: optionsLine
    };

    lineChart = new Chart(ctxLine, configLine);
  }
}

function drawBarChart(newData /*= [12, 19, 3, 5, 2, 3]*/, neLabels /*= ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]*/) {

  console.log(newData);

  if ($("#barChart").length) {
    ctxBar = document.getElementById("barChart").getContext("2d");

    optionsBar = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              display: true,
              labelString: "Hits"
            }
          }
        ]
      }
    };

    optionsBar.maintainAspectRatio =
      $(window).width() < width_threshold ? false : true;

    configBar = {
      type: "bar",
      data: {
        labels: neLabels,
        datasets: [
          {
            label: "# Scoring",
            //data: [12, 19, 3, 5, 2, 3],
            data: newData,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: optionsBar
    };

    barChart = new Chart(ctxBar, configBar);
  }
}

function drawPieChart(newData) {


  ammounts = [];
  keys = [];

  for(const [key, value] of Object.entries(newData["word_count"]) )
  {
    ammounts.push(value);
    keys.push(key);
  }


  console.log(keys);
  console.log(ammounts);

 /* // УХ Я НАГОВНОКРОКОДИЛ
  let newNames = [];

  for(let i = 0; i < 5; i++){
    newNames.push(keys[i]);
  }
*/

  if ($("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: ammounts,
            backgroundColor: [
              window.chartColors.purple,
              window.chartColors.green,
              window.chartColors.blue,
              window.chartColors.red,
              window.chartColors.orange
            ],
            label: "Storage"
          }
        ],
        labels:  keys /*newNames*/
      },
      options: optionsPie
    };

    pieChart = new Chart(ctxPie, configPie);
  }
}

function updateChartOptions() {
  if ($(window).width() < width_threshold) {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = false;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = false;
    }
  } else {
    if (optionsLine) {
      optionsLine.maintainAspectRatio = true;
    }
    if (optionsBar) {
      optionsBar.maintainAspectRatio = true;
    }
  }
}

function updateLineChart() {
  if (lineChart) {
    lineChart.options = optionsLine;
    lineChart.update();
  }
}

function updateBarChart() {
  if (barChart) {
    barChart.options = optionsBar;
    barChart.update();
  }
}

function reloadPage() {
  setTimeout(function() {
    window.location.reload();
  }); // Reload the page so that charts will display correctly
}

function drawCalendar() {
  if ($("#calendar").length) {
    $("#calendar").fullCalendar({
      height: 400,
      events: [
        {
          title: "Meeting",
          start: "2018-09-1",
          end: "2018-09-2"
        },
        {
          title: "Marketing trip",
          start: "2018-09-6",
          end: "2018-09-8"
        },
        {
          title: "Follow up",
          start: "2018-10-12"
        },
        {
          title: "Team",
          start: "2018-10-17"
        },
        {
          title: "Company Trip",
          start: "2018-10-25",
		  end: "2018-10-27"
        },
        {
          title: "Review",
          start: "2018-11-12"
        },
        {
          title: "Plan",
          start: "2018-11-18"
        }
      ],
      eventColor: "rgba(54, 162, 235, 0.4)"
    });
  }
}

// MY CODE
function GetStarterData() {
  return fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(jsonData => {
        // Делайте что-то с полученными данными
        //console.log(jsonData);
        return jsonData;
      })
      .catch(error => {
        console.error(error);
        return null; // или как-то иначе обрабатывайте ошибку
      });
}

GetStarterData().then(data =>
{

  let obj = {}

  for(const [key, value] of Object.entries(data) )
  {
    if(key != "word_count")
    {
      obj[key] = value;
    }
  }

  //  charts.drawBarChart(obj);
  const keys = Object.keys(obj);

  // УХ Я НАГОВНОКРОКОДИЛ
  let newLables = [];

  for(let i = 0; i < 5; i++){
    newLables.push(keys[i]);
  }


  console.log(newLables)

  let values = [];

  for(let i = 0; i < 5; i++){
    values.push(obj[keys[i]]["scoring"])
  }

  console.log(values);

  drawBarChart(values, newLables);

  drawPieChart(data);

  //return obj;
});

/*function GetJson()
{
  fetch('http://127.0.0.1:5000/search')
      .then(function(response) {
        // Проверка статуса ответа
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Возврат JSON-данных
        return response.json();
      })
      .then(function(data) {
        // Обработка полученных данных
        console.log('Response from server:', data);
      })
      .catch(function(error) {
        // Обработка ошибок
        console.error('Fetch error:', error);
      });
}*/

function downloadJSON(data, filename) {
  // Преобразуем данные в JSON строку
  var json = JSON.stringify(data);

  // Создаем новый Blob объект
  var blob = new Blob([json], { type: "application/json" });

  // Создаем ссылку на Blob объект
  var url = URL.createObjectURL(blob);

  // Создаем ссылку для скачивания
  var a = document.createElement("a");
  a.href = url;
  a.download = filename;

  // Добавляем ссылку на страницу и эмулируем клик
  document.body.appendChild(a);
  a.click();

  // Удаляем ссылку после завершения скачивания
  document.body.removeChild(a);

  // Освобождаем ресурсы Blob
  URL.revokeObjectURL(url);
}


function PostURL(event)
{

  if(event.key == 'Enter')
  {
  //  window.location.href = 'InProgressPage.html';
    var data = { URL: document.getElementById("search").value };

    var spinWrapper = document.querySelector(".spin-wrapper");
    spinWrapper.style.opacity = 1;
    spinWrapper.style.pointerEvents = "auto";

    fetch('http://127.0.0.1:5000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse response JSON
          return response.json();
        })
        .then(function(data) {
          // Access parsed JSON data
          console.log('Response from server:', data);
          // Do something with the data, for example:
          console.log('Json:', data);
          spinWrapper.style.opacity = 0;
          spinWrapper.style.pointerEvents = "none";


          let keys = [];
          for(let [key, value] of Object.entries(data["word_count"]) )
          {
            keys.push(key+"  "+value + "\n");
          }
          let pos = ""
          if(data["scoring"]<0.48){
            pos = "Positive"
          }else if(data["scoring"]>0.52){
            pos = "Negative"
          }else{
            pos = "Neutral"
          }


          document.getElementById("#label1").innerHTML ="The content of last 10 posts: "+pos;
          document.getElementById("#label2").innerHTML ="The last 5 most mentioned Persons and the number of mentions:";
          document.getElementById("#label3").innerHTML = keys;
          // document.getElementById("#label1").innerHTML = JSON.stringify(data);
          // JSON.stringify(data)

          // downloadJSON(data, "dataByHref.json");

         /* window.location.href = "./output.html";

          var output = document.getElementById("label1");
          if (output) {
            console.log(data);
            // If the label element is found, update its innerHTML
            output.innerHTML = "NEW CONTENT"; // Replace "NEW CONTENT" with whatever you want to rewrite the label with
          } else {
            console.error("Label element not found!");
          }

          window.location.href = "./output.html";

*/
        })
        .catch(function(error) {
          console.error('Fetch error:', error);
        });
      // console.log("Hello");
  }


}

/*export {reloadPage, updateBarChart, updateLineChart, updateChartOptions, drawPieChart, drawLineChart, drawBarChart};*/
