{
    const allowedAreas = [
        { lat: 30.071711712194215, lon: 31.220952436284982 }, 
    ];

    const User_msg = document.getElementById('User-msg');
    const User_msg2 = document.getElementById('User-msg2');
    const Btn = document.getElementById('submitbtn');
    const Course = document.getElementById('Course');
    const status = document.getElementById('status');
    const submitbtn = document.getElementById('submitbtn');
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementsByClassName('close')[0];

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = { lat: position.coords.latitude, lon: position.coords.longitude };
                const isLocationAllowed = allowedAreas.some(area =>
                    Math.abs(userLocation.lat - area.lat) < 0.005 && Math.abs(userLocation.lon - area.lon) < 0.005
                );

                if (isLocationAllowed) {
                    Btn.removeAttribute('disabled');
                    status.removeAttribute('disabled');
                    submitbtn.removeAttribute('disabled');
                    Course.removeAttribute('disabled');
                    User_msg2.style.display = 'block';
                } else {
                    User_msg2.style.display = 'none';
                    User_msg.style.display = 'block';
                }
            },
            () => {
                modalContent.innerHTML = 'حدث خطأ اثناء محاولة الحصول علي موقعك تأكد من تفعيل الموقع من الهاتف <br> وان المتصفح يحصل علي صلاحية الموقع';
                modal.style.display = 'flex';
            }
        );
    } else {
        modalContent.innerHTML = 'Geolocation is not supported by your browser.';
        modal.style.display = 'flex';
    }

    closeModal.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

let idleTime = 0;
const maxIdleTime = 5 * 60 * 1000; 

function timerIncrement() {
    idleTime += 1000; 
    console.log(`Idle time: ${idleTime / 1000} seconds`);

    if (idleTime >= maxIdleTime) {
        window.location.href = '../index.html'; 
    }
}

function resetIdleTime() {
    idleTime = 0;
    console.log("User activity detected, resetting idle time.");
}

document.addEventListener('mousemove', resetIdleTime);
document.addEventListener('keypress', resetIdleTime);
document.addEventListener('scroll', resetIdleTime);
document.addEventListener('click', resetIdleTime);

setInterval(timerIncrement, 1000); 



