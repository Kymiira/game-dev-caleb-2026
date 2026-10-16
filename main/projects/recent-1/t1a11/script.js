document.getElementById('analyzeBtn').addEventListener('click', function() {
    let text = document.getElementById('emojiInput').value;
    
    let stringLength = text.length;
    
    let emojiArray = Array.from(text);
    let arrayLength = emojiArray.length;
    
    let arrayString = emojiArray.toString();

    let output = '<b>Input:</b> ' + text + '<br>' +
                 '<b>Standard String .length:</b> ' + stringLength + ' (counts UTF-16 code units)<br>' +
                 '<b>Array.from() Length:</b> ' + arrayLength + ' (correctly counts emojis/ZWJ)<br>' +
                 '<b>Array.from() entries:</b><br>';
                 
    for (let i = 0; i < emojiArray.length; i++) {
        output += '&nbsp;&nbsp;Index ' + i + ': ' + emojiArray[i] + '<br>';
    }
    
    output += '<b>toString() result:</b> ' + arrayString;

    document.getElementById('emojiDiv').innerHTML = output;
});

document.getElementById('methodsBtn').addEventListener('click', function() {
    let raw = document.getElementById('numbersInput').value;
    let nums = raw.split(',').map(n => parseFloat(n.trim()));

    let evens = nums.filter(n => n % 2 === 0);
    
    let multiplied = nums.map(n => n * 10);

    let sum = nums.reduce((total, current) => total + current, 0);

    let html = '<b>Original:</b> ' + nums.join(', ') + '<br>' +
               '<b>.filter() (Evens):</b> ' + evens.join(', ') + '<br>' +
               '<b>.map() (* 10):</b> ' + multiplied.join(', ') + '<br>' +
               '<b>.reduce() (Sum):</b> ' + sum;

    document.getElementById('methodsOutput').innerHTML = html;
});


document.getElementById('spreadBtn').addEventListener('click', function() {
    let arr1 = document.getElementById('array1Input').value.split(',').map(s => s.trim());
    let arr2 = document.getElementById('array2Input').value.split(',').map(s => s.trim());

    let combined = [...arr1, 'orange', ...arr2, 'fig'];

    let html = '<b>Array 1:</b> [' + arr1.join(', ') + ']<br>' +
               '<b>Array 2:</b> [' + arr2.join(', ') + ']<br>' +
               '<b>Combined using [...arr1, "orange", ...arr2, "fig"]:</b><br>' +
               '[' + combined.join(', ') + ']';

    document.getElementById('spreadOutput').innerHTML = html;
});


document.getElementById('gridBtn').addEventListener('click', function() {
    let matrix = [
        ['[0,0]', '[0,1]', '[0,2]'],
        ['[1,0]', '[1,1]', '[1,2]'],
        ['[2,0]', '[2,1]', '[2,2]']
    ];

    let html = '<b>Matrix Structure (Nested Loops):</b><br>';
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            html += matrix[row][col] + '&nbsp;&nbsp;';
        }
        html += '<br>';
    }

    document.getElementById('gridOutput').innerHTML = html;
});