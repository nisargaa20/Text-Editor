function formatDoc(cmd, value = null) {
    if (cmd === 'fontSize' || cmd === 'foreColor') {
        document.execCommand(cmd, false, value);
    } else {
        document.execCommand(cmd);
    }
}


function createTextBox() {
    const textBox = document.createElement('div');
    textBox.classList.add('text-box');
    textBox.contentEditable = true;
    textBox.style.left = '50px';
    textBox.style.top = '50px';
    textBox.innerHTML = 'Edit me';

    document.body.appendChild(textBox);

    textBox.onmousedown = function(event) {
        dragMouseDown(event, textBox);
    };

    textBox.addEventListener('dblclick', function () {
        textBox.contentEditable = true;
        textBox.focus();
    });

    textBox.addEventListener('blur', function () {
        textBox.contentEditable = false;
    });

    document.getElementById('content').addEventListener('input', function() {
        textBox.innerHTML = this.innerHTML;
    });
}

function dragMouseDown(event, element) {
    event.preventDefault();
    let pos3 = event.clientX;
    let pos4 = event.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = function(e) {
        elementDrag(e, element);
    };

    function elementDrag(e, element) {
        e.preventDefault();
        let pos1 = pos3 - e.clientX;
        let pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.getElementById('content').addEventListener('mouseenter', function () {
    const a = this.querySelectorAll('a');
    a.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.closest('#content').setAttribute('contenteditable', false);
            item.target = '_blank';
        });
        item.addEventListener('mouseleave', function () {
            this.closest('#content').setAttribute('contenteditable', true);
        });
    });
});

const showCode = document.getElementById('show-code');
let active = false;

showCode.addEventListener('click', function () {
    showCode.dataset.active = !active;
    active = !active;
    if (active) {
        document.getElementById('content').textContent = document.getElementById('content').innerHTML;
        document.getElementById('content').setAttribute('contenteditable', false);
    } else {
        document.getElementById('content').innerHTML = document.getElementById('content').textContent;
        document.getElementById('content').setAttribute('contenteditable', true);
    }
});