var elements = document.querySelectorAll(".themeDiv");
elements.forEach(function(element) {
    element.style.backgroundColor = "#FF0000";
});

function ShowGraph() {
    var elements = document.querySelectorAll(".themeDiv");
    elements.forEach(function(element) {
        element.style.backgroundColor = "#FFFFFF";
    });
    console.log("asbhjgeuaegbugebuaw");
}

function DrawGistograph(){
    var canvas = document.getElementById('myChart');
    var ctx = canvas.getContext('2d');

    // Задаем данные для графика (здесь просто пример)
    var data = [40, 20, 30, 40, 50, 30, 20, 20];

    // Отрисовываем график
    drawChart(data, ctx, canvas);
}

function drawChart(data, ctx, canvas)
{
    var barWidth = 30;
    var startX = 300 - data.length * 20;
    var startY = 350;

    // Очищаем холст перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем столбцы графика
    for (var i = 0; i < data.length; i++) {
        var height = data[i];
        ctx.fillStyle = 'blue';
        ctx.fillRect(startX, startY - height, barWidth, height);

        // Перемещаем начальные координаты для следующего столбца
        startX += barWidth + 10;
    }

}