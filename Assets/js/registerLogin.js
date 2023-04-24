function Validator(options) {
    // hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElrment = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.text(inputElement.value);
        if(errorMessage) {
            errorElrment.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }else{
            errorElrment.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    // Lấy element của form validate
    var formElement = document.querySelector(options.form);
    if(formElement) {
        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector);
            if(inputElement) { 
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function() {
                    validate(inputElement, rule);
                }

                // Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function() {
                    var errorElrment = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElrment.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
    }
 }

// định nghi rules
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        text: function(value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này!!!'
        }
    };
}

Validator.isEmail = function(selector, message) {
      return {
        selector: selector,
        text: function(value) {
            // Email hợp lệ
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là Email!!!';
        }
    };
}

Validator.isPassword = function(selector, min, message) {
      return {
        selector: selector,
        text: function(value) {
            // password hợp lệ: 1 chữ cái viết hoa and ít nhất 12 ký tự
            var regex = /^(?=.*\d)(?=.*[A-Z])/;
            return regex.test(value) && value.length >= min ? undefined : message || `Ít nhất một số và một chữ cái viết hoa tồn tại trong mật khẩu và độ dài tối thiểu ${min} ký tự!!!`;
        }
    };
}
Validator.isConfirmed = function(selector, getConfirValue, message) {
      return {
        selector: selector,
        text: function(value) {
            return value === getConfirValue() ? undefined : message || 'Giá trị nhập vào không chính xác!!!'
        }
    };

}


// đăng nhập

// const ListAccount = [
//     {
//         username: "admin",
//         password: "123456A"
//     },
//     {
//         username: "hung",
//         password: "123"
//     },
//     {
//         username: "huy",
//         password: "HUy123"
//     }
// ]
// kiểm tra trong localStorage có biến token hay ko
// let isLogin = !!localStorage.getItem('token');

// function CheckLogin() {
//     if (isLogin) {
//         window.location.href = '/index.html';
//     }
// }
// function Login() {
//     let username = document.getElementById("fullname").value
//     let password = document.getElementById("password").value
//     let checkLogin = ListAccount.some(value => value.username === username && value.password === password)
//     if (checkLogin) {
//         localStorage.setItem("token", username)
//         isLogin = true
//         CheckLogin()
//     }else {
//         alert("đăng nhập không thành công")
//     }
// }

// đăng ký 

let apiUser = "http://localhost:3000/user";

function getUser(callback) {
    fetch(apiUser).then(function (res) {
       return res.json().then(callback); 
    });
}

function sigup() {
    alert("Đăng ký thành công")
    handleCreatefonrm();
}

function createUser(data) {
    fetch(apiUser, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(function(res) {
        return res.json();
    });

}

function handleCreatefonrm() {
    let username = document.getElementById("fullname").value;
    let password = document.getElementById("fullpassword").value;
    let user = {
        username: fullname.value,
        password: fullpassword.value,
    };
    
    createUser(user);
}



// đăng nhập 2 dung api
let apiUser2 = "http://localhost:3000/user";

function getUser2(callback) {
    fetch(apiUser2).then(function (res) {
       return res.json().then(callback); 
    });
}
function Login() {
    getUser2(hanldeLogin);
}

function hanldeLogin(data) {
    let username = document.getElementById("fullname").value;
    let password = document.getElementById("password").value;
    console.log(data);
    data.forEach(data => {
        if(data.username == username && data.password == password) { 
            alert("Đăng nhập thành công");
            window.location.href = "./index.html";
        }
    });
}