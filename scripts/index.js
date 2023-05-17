
let scene = document.getElementById('scene');
let parallaxInstance = new Parallax(scene);

const inptName = document.querySelector('.input-name');
const inptUsname = document.querySelector('.input-username');
const inptMail = document.querySelector('.input-email');
const inptPasswd = document.querySelector('.input-password');
const inptRepPasswd = document.querySelector('.input-reppassword');
const checkBtn = document.querySelector('.form__check__box');
const submitBtn = document.querySelector('.btn');
const form = document.querySelector('.formValid');
const fields = form.querySelectorAll('.form__input');
const leftContainer = document.querySelector('.container-left');
let goodform = false;
let windowOpen;

window.onload = function () {
    inptName.onkeydown = (event) => {
        let letter = parseInt(event.key);
        if (!isNaN(letter)) {
            return false
        }
    }

    function login() {
        document.querySelector('.form__container__title').textContent = 'Log in to the system';
        document.querySelector('.name').style.display = 'none';
        inptName.style.display = 'none';
        document.querySelector('.email').style.display = 'none';
        inptMail.style.display = 'none';
        document.querySelector('.password').style.display = 'none';
        inptRepPasswd.style.display = 'none';
        document.querySelector('.checking').style.display = 'none';
        submitBtn.textContent = 'Sign In';
        document.querySelector('.form__link').style.display = 'none';
        for (let i = 0; i < fields.length; i++) {
            fields[i].value = '';
        }
        validationSign();
    }

    inptUsname.onkeydown = (event) => {
        let sym = event.key;
        const str = '.,:;/%^*+`~=#$^&!><|"()[]{}\''
        if (true === str.includes(sym)) {
            return false
        }
    }
    checkBtn.onclick = () => {
        checkBtn.checked ? alert('Cогласен') : alert('Не согласен');
    }

    window.onclick = (e) => {
        if (e.target.classList.contains('filded')) {
            e.target.classList.remove('filded');
            e.target.value = '';
        }
        if (e.target.classList.contains('pass')) {
            e.target.setAttribute('type', 'password')
        }
        if (e.target.classList.contains('input-email')) {
            e.target.setAttribute('type', 'email')
        }
    }
    let removeValidation = function () {
        let errors = form.querySelectorAll('.error')
        inptPasswd.setAttribute('type', 'password')
        inptRepPasswd.setAttribute('type', 'password')
        for (let i = 0; i < errors.length; i++) {
            errors[i].remove()
            fields[i].classList.remove('filded')
        }
    }

    function openClose() {
        windowOpen = window.open("", "", "width=250, height=250");
        windowOpen.document.write(`"<p>Добро пожаловать, ${inptUsname.value}!</p>"`);
    }

    let validationSign = function () {
        window.addEventListener('click', (e) => {
            if (e.target.textContent === 'Sign In') {
                if (!inptUsname.value || !inptPasswd.value || inptUsname.value === "заполните..." || inptPasswd.value === "заполните..." ) {
                    inptUsname.classList.toggle('filded')
                    inptPasswd.classList.toggle('filded')
                } else {
                    openClose();
                    document.querySelector('.name').style.display = 'unset';
                    inptName.style.display = 'unset';
                    document.querySelector('.email').style.display = 'unset';
                    inptMail.style.display = 'unset';
                    document.querySelector('.password').style.display = 'unset';
                    inptRepPasswd.style.display = 'unset';
                    document.querySelector('.checking').style.display = 'unset';
                    submitBtn.textContent = 'Sign Up';
                    document.querySelector('.form__link').style.display = 'unset';
                    form.reset();
                    form.removeEventListener('submit', fn);
                }
            }
        })
    }

    function fn(e){
        e.preventDefault();
        for (let i = 0; i < fields.length; i++) {
            removeValidation();
            if (!fields[i].value || fields[i].value === "заполните...") {
                fields[i].classList.add('filded')
                if (fields[i].getAttribute('type') === 'email') {
                    fields[i].setAttribute('type', 'text');
                }
                fields[i].value = "заполните...";
            } else if (!checkBtn.checked) {
                alert('Confirm consent')
                return false
            } else if (inptPasswd.value !== inptRepPasswd.value) {
                let error = document.createElement('div');
                error.className = 'error'
                error.style.color = '#DD3142'
                error.textContent = 'пароли не совпадают'
                inptPasswd.parentElement.insertBefore(error, inptPasswd)
                inptRepPasswd.parentElement.insertBefore(error, inptRepPasswd)
                inptPasswd.classList.add('filded');
                inptRepPasswd.classList.add('filded');
            } else if (inptPasswd.value.length < 8) {
                let error = document.createElement('div')
                error.className = 'error'
                error.style.color = '#DD3142'
                error.innerHTML = 'не менее восьми символов, пожалуйста...'
                inptPasswd.parentElement.insertBefore(error, inptPasswd)
                inptPasswd.classList.add('filded');
            } else if (inptRepPasswd.value.length < 8) {
                let error = document.createElement('div')
                error.className = 'error'
                error.style.color = '#DD3142'
                error.innerHTML = 'не менее восьми символов, пожалуйста...'
                inptRepPasswd.parentElement.insertBefore(error, inptPasswd)
                inptRepPasswd.classList.add('filded');
            } else {
                goodform = true;
            }
        }
        if (goodform) {
            let popup = document.createElement('div');
            popup.classList.add('popup');
            popup.setAttribute('style', "color: white; background-color: black; position: absolute; " +
                "opacity: .85; display: flex; flex-direction: column;\n" +
                "    align-items: end; top: 0; left: 0; width: 100%; height: 100%");
            popup.setAttribute('id', 'pop');
            leftContainer.append(popup);
            let popupText = document.createElement('div');
            popupText.classList.add('popupText');
            popupText.setAttribute('style', "color: #DD3142; width: 425px; position: absolute; top: 235px;" +
                "text-align: center; font-size: 20px; z-index: 1");
            popupText.setAttribute('id', 'popTxt');
            popupText.innerText = 'На вашу почту выслана ссылка, перейдите по ней, чтобы завершить регистрацию';
            form.append(popupText);
            let btnOk = document.createElement('div')
            btnOk.classList.add('btnOk');
            btnOk.setAttribute('style', "color: white; background: #DD3142; width: 100px; height: 40px; " +
                "padding-top: 15px; position: absolute; top: 300px; left: 160px; text-align: center; font-size: 20px; z-index: 1; transition: .3s;");
            btnOk.innerText = 'OK';
            btnOk.setAttribute('id', 'ok')
            form.append(btnOk);
        }
    }

    form.addEventListener('submit', fn);
    window.addEventListener('click', (e) => {
        if (e.target === document.querySelector('.btnOk')) {
            document.getElementById('pop').remove()
            document.getElementById('popTxt').remove()
            document.getElementById('ok').remove()
            login();
            goodform = false;
        }
        if(e.target === document.querySelector('.form__link')){
            login();
        }
    })
}
console.log('New message!');