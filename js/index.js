let block1 = document.getElementById('block-1');
let block2 = document.getElementById('block-2');
let block3 = document.getElementById('block-3');
let block4 = document.getElementById('block-4');
let block5 = document.getElementById('block-5');
let block6 = document.getElementById('block-6');
let btnSubmit = document.getElementById('btnSubmit');
let btnColorRed = document.getElementById('btnColorRed');
let btnColorGreen = document.getElementById('btnColorGreen');
let btnColorBlack = document.getElementById('btnColorBlack');
let inputUserText = document.getElementById('inputUserText');
let btnClearText = document.getElementById('btnClearText');
let a = 12, b = 6, c = 16;

function loadColor() {
    document.cookie.split(';').map(item => {
        if (item.includes('_blockColor')) {
            block3.style.color = item.substring(item.indexOf('=') + 1, item.length);
        }    
    });
};

function loadText() {
    document.cookie.split(';').map(item => {
        if (item.includes('_savedText')) {
            inputUserText.value = item.substring(item.indexOf('=') + 1, item.length);
        }
    });
};

let task1 = () => {
    let tmp = block4.outerHTML;
    block4.innerHTML = block5.outerHTML;
    block5.innerHTML = tmp;
};

let task2 = () => {
    let p = (a + b + c) / 2;
    let s = Math.sqrt(p*(p-a)*(p-b)*(p-c));
    block3.firstElementChild.getElementsByTagName('p')[0]
        .innerHTML += '<p>The area of the triangle is: ' + s + '</p>';
}

let task3 = () => {
    let cookies = document.cookie.split(';').filter(item => {
        return /num\d+=\d+/.test(item.trim());
    });
    if (cookies.length > 0) {
        block3.firstElementChild.getElementsByTagName('form')[0].style.display = 'none';
        alert(document.cookie + '\nCookies will be deleted after pressing "Ok" button');
        cookies.map(item => {
            document.cookie = 'num' + item.substring(item.indexOf('m') + 1, item.indexOf('=')) + '=;';
        });
        alert("Cookies were deleted!");
        location.reload();
    }

    btnSubmit.onclick = () => {
        let numbers = document.getElementsByClassName('num');
        let arr = [];
        let expiresAttrib = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toUTCString();
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i].value !== '') {
                let num = Number(numbers[i].value);
                let cookieString = 'num' + i + '=' + num + ';expires=' + expiresAttrib + ';path=/';
                document.cookie = cookieString;
                arr.push(num);
            }
        }
        alert('Min value: ' + arr.reduce((a,b)=>Math.min(a,b), Infinity));
    }
};

let task4 = () => {
    let expiresAttrib = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toUTCString();
    btnColorRed.onclick = () => {
        document.cookie = '_blockColor=red;expires=' + expiresAttrib + ';path=/';
        loadColor();
    }
    btnColorGreen.onclick = () => {
        document.cookie = '_blockColor=green;expires=' + expiresAttrib + ';path=/';
        loadColor();
    }
    btnColorBlack.onclick = () => {
        document.cookie = '_blockColor=black;expires=' + expiresAttrib + ';path=/';
        loadColor();
    }
};

let task5 = () => {
    window.addEventListener('load', event => {
        alert('load event completed');
    });    
};

let task6 = () => {
    let expiresAttrib = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toUTCString();
    inputUserText.oninput = () => {
        document.cookie = '_savedText=' + inputUserText.value + ';expires=' + expiresAttrib + ';path=/';
    }
    btnClearText.onclick = () => {
        inputUserText.value = '';
        document.cookie = '_savedText=;';
    }
};

loadColor();
loadText();
task1();
task2();
task3();
task4();
// task5();
task6();
