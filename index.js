let lastInputIsOperator = false;  // Переменная для отслеживания предыдущего ввода
let lastEqualPressed = false;  // Переменная для отслеживания многократного нажатия равно

function Solve(val) {
    var v = document.getElementById('res');
    const operators = ['+', '-', '/', 'x', '%', '^'];

    if (operators.includes(val)) {
        // Проверяем, не является ли предыдущий ввод оператором
        if (lastInputIsOperator) return;
        lastInputIsOperator = true;
    } else {
        lastInputIsOperator = false;
    }

    if (lastEqualPressed) {
        Clear();  // Очищаем результат, если перед этим нажимали "="
        lastEqualPressed = false;
    }

    v.value += val;
}

function Result() {
    var num1 = document.getElementById('res').value;
    try {
        // Заменяем символы для корректного вычисления
        var num2 = eval(num1.replace('x', '*').replace('^', '**'));
        document.getElementById('res').value = num2;
        lastEqualPressed = true;  // Устанавливаем флаг, что "=" был нажат
    } catch {
        document.getElementById('res').value = 'Error';
    }
}

function Clear() {
    var inp = document.getElementById('res');
    inp.value = '';
    lastInputIsOperator = false;
    lastEqualPressed = false;
}

function Back() {
    var ev = document.getElementById('res');
    ev.value = ev.value.slice(0, -1);
    lastInputIsOperator = false;  // После удаления символа можно снова вводить операторы
}

document.addEventListener('keydown', function (event) {
    const key = event.key;
    const validKeys = '0123456789+-*/.%';
    const operators = ['+', '-', '*', '/', '%', '^'];

    if (validKeys.includes(key)) {
        Solve(key === '*' ? 'x' : key);
    } else if (key === 'Enter') {
        Result();
    } else if (key === 'Backspace') {
        Back();
    } else if (key.toLowerCase() === 'c') {
        Clear();
    }
});
