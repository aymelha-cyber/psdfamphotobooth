// CAMERA SETUP
const startCameraBtn = document.getElementById('start-camera-btn');
const video = document.getElementById('camera-stream');

startCameraBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        startCameraBtn.style.display = 'none'; // Kamera açılınca butonu gizle
    } catch (error) {
        alert("Camera access denied or not available. Please allow camera permissions.");
        console.error("Camera error:", error);
    }
});

// ADD STICKERS & TEXT (Hearts, Date, Name)
const addHeartBtn = document.getElementById('add-heart-btn');
const addTextBtn = document.getElementById('add-text-btn');
const customTextInput = document.getElementById('custom-text-input');
const stickersArea = document.getElementById('stickers-area');

addHeartBtn.addEventListener('click', () => {
    createDraggableElement('💖');
});

addTextBtn.addEventListener('click', () => {
    const textValue = customTextInput.value;
    if (textValue.trim() !== "") {
        createDraggableElement(textValue);
        customTextInput.value = ''; // Input'u temizle
    }
});

// MAKE STICKERS DRAGGABLE
function createDraggableElement(content) {
    const el = document.createElement('div');
    el.classList.add('draggable-sticker');
    el.innerText = content;
    stickersArea.appendChild(el);
    dragElement(el);
}

function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    // Mouse Events (Desktop)
    elmnt.onmousedown = dragMouseDown;
    
    // Touch Events (Mobile)
    elmnt.ontouchstart = dragTouchStart;

    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function dragTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementTouchDrag;
    }

    function elementTouchDrag(e) {
        e.preventDefault();
        const touch = e.touches[0];
        pos1 = pos3 - touch.clientX;
        pos2 = pos4 - touch.clientY;
        pos3 = touch.clientX;
        pos4 = touch.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}
