function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
}

function verifyCode() {
    const correctCode = "123456"; // الرمز الصحيح للتحقق
    const enteredCode = document.getElementById('verification-code').value;

    if (enteredCode === "") {
        alert("Please enter the verification code.");
    } else if (enteredCode === correctCode) {
        window.location.href = "../new/beforeAsses.html"; // إعادة التوجيه إلى صفحة beforeAsses
    } else {
        window.location.href = "../access/accessdenied.html"; // إعادة التوجيه إلى صفحة accessdenied
    }
}

        // التحقق من حالة التحقق عند تحميل الصفحة
        window.onload = function() {
            if (localStorage.getItem('verified') === 'true') {
                window.location.href = "../new/beforeAsses.html"; // إعادة التوجيه إلى صفحة beforeAsses إذا كان المستخدم قد تم التحقق منه بالفعل
            }
        }