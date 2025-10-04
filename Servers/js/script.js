// // Инициализация карты
//         var map = new mapgl.Map('container', {
//             center: [55.31878, 25.23584],
//             zoom: 13,
//             key: '783e0858-39de-4c83-a72c-bc2858c795be',
//             style: 'c080bb6a-8134-4993-93a1-5b4d8c36a59b'
//         });
        
//         var marker = new mapgl.Marker(map, {
//             coordinates: [55.31878, 25.23584],
//         });

//         // Переменные для модальных окон
//         var authModal = document.getElementById('authModal');
//         var registerModal = document.getElementById('registerModal');
//         var authButton = document.getElementById('authButton');
//         var closeBtns = document.querySelectorAll('.close, .close-register');
//         var registerLink = document.getElementById('registerLink');
//         var backToLoginBtn = document.getElementById('backToLogin');

//         // Функция для проверки зарегистрированного пользователя
//         function checkUserRegistration(login, password) {
//             var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
//             // Ищем пользователя по email/логину
//             var user = registeredUsers.find(function(user) {
//                 return user.email === login && user.password === password;
//             });
            
//             return user; // Возвращаем пользователя если найден, иначе undefined
//         }

//         // Функция для сохранения зарегистрированного пользователя
//         function saveRegisteredUser(userData) {
//             var registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            
//             // Проверяем, нет ли уже пользователя с таким email
//             var existingUser = registeredUsers.find(function(user) {
//                 return user.email === userData.email;
//             });
            
//             if (existingUser) {
//                 return false; // Пользователь уже существует
//             }
            
//             registeredUsers.push(userData);
//             localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
//             return true; // Пользователь успешно сохранен
//         }

//         // Открыть модальное окно авторизации
//         authButton.addEventListener('click', function() {
//             authModal.style.display = 'flex';
//             resetUserTypeSelection();
//         });

//         // Переход к регистрации
//         registerLink.addEventListener('click', function(e) {
//             e.preventDefault();
//             authModal.style.display = 'none';
//             registerModal.style.display = 'flex';
//         });

//         // Возврат к авторизации
//         backToLoginBtn.addEventListener('click', function() {
//             registerModal.style.display = 'none';
//             authModal.style.display = 'flex';
//         });

//         // Закрытие модальных окон
//         closeBtns.forEach(function(btn) {
//             btn.addEventListener('click', function() {
//                 authModal.style.display = 'none';
//                 registerModal.style.display = 'none';
//                 resetUserTypeSelection();
//             });
//         });

//         // Закрыть при клике вне окна
//         window.addEventListener('click', function(event) {
//             if (event.target === authModal) {
//                 authModal.style.display = 'none';
//                 resetUserTypeSelection();
//             }
//             if (event.target === registerModal) {
//                 registerModal.style.display = 'none';
//                 resetUserTypeSelection();
//             }
//         });

//         // Логика для авторизации
//         var selectedUserType = null;
//         var userTypeOptions = document.querySelectorAll('.user-type-option');
//         var submitBtn = document.getElementById('submitBtn');

//         // Выбор типа пользователя
//         userTypeOptions.forEach(function(option) {
//             option.addEventListener('click', function() {
//                 userTypeOptions.forEach(function(opt) {
//                     opt.classList.remove('selected');
//                 });
//                 this.classList.add('selected');
//                 selectedUserType = this.getAttribute('data-type');
//                 document.getElementById('userTypeError').style.display = 'none';
//             });
//         });

//         function resetUserTypeSelection() {
//             userTypeOptions.forEach(function(opt) {
//                 opt.classList.remove('selected');
//             });
//             selectedUserType = null;
//             document.getElementById('userTypeError').style.display = 'none';
//         }

//         function redirectToUserPage(userType) {
//             if (userType === 'invalid') {
//                 window.location.href = 'invalid.html';
//             } else if (userType === 'volunteer') {
//                 window.location.href = 'volonter.html';
//             }
//         }

//         // Обработка формы авторизации С ПРОВЕРКОЙ РЕГИСТРАЦИИ
//         document.getElementById('authForm').addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             var login = document.getElementById('login').value;
//             var password = document.getElementById('password').value;
//             var isValid = true;

//             document.getElementById('loginError').style.display = 'none';
//             document.getElementById('passwordError').style.display = 'none';
//             document.getElementById('userTypeError').style.display = 'none';
//             document.getElementById('successMessage').style.display = 'none';

//             // Базовая валидация
//             if (!login) {
//                 document.getElementById('loginError').textContent = 'Введите email или логин';
//                 document.getElementById('loginError').style.display = 'block';
//                 isValid = false;
//             }

//             if (!password) {
//                 document.getElementById('passwordError').textContent = 'Введите пароль';
//                 document.getElementById('passwordError').style.display = 'block';
//                 isValid = false;
//             }

//             if (!selectedUserType) {
//                 document.getElementById('userTypeError').textContent = 'Выберите тип пользователя';
//                 document.getElementById('userTypeError').style.display = 'block';
//                 isValid = false;
//             }

//             if (isValid) {
//                 // ПРОВЕРКА РЕГИСТРАЦИИ
//                 var registeredUser = checkUserRegistration(login, password);
                
//                 if (registeredUser) {
//                     // Пользователь найден - успешная авторизация
//                     document.getElementById('successMessage').textContent = 'Успешная авторизация! Переход через 2 секунды...';
//                     document.getElementById('successMessage').style.display = 'block';
//                     document.getElementById('authForm').reset();

//                     console.log('Пользователь авторизован:', registeredUser);
                    
//                     setTimeout(function() {
//                         authModal.style.display = 'none';
//                         redirectToUserPage(selectedUserType);
//                     }, 2000);
//                 } else {
//                     // Пользователь не найден
//                     document.getElementById('loginError').textContent = 'Неверный логин или пароль, либо пользователь не зарегистрирован';
//                     document.getElementById('loginError').style.display = 'block';
//                 }
//             }
//         });

//         // Обработка формы регистрации
//         document.getElementById('registerForm').addEventListener('submit', function(e) {
//             e.preventDefault();
            
//             var firstName = document.getElementById('firstName').value;
//             var lastName = document.getElementById('lastName').value;
//             var email = document.getElementById('email').value;
//             var district = document.getElementById('district').value;
//             var password = document.getElementById('regPassword').value;
//             var healthCategories = [];
            
//             // Собираем выбранные категории здоровья
//             if (document.getElementById('mobility').checked) healthCategories.push('mobility');
//             if (document.getElementById('vision').checked) healthCategories.push('vision');
//             if (document.getElementById('hearing').checked) healthCategories.push('hearing');
//             if (document.getElementById('mute').checked) healthCategories.push('mute');
            
//             var isValid = true;

//             // Сброс ошибок
//             document.getElementById('firstNameError').style.display = 'none';
//             document.getElementById('lastNameError').style.display = 'none';
//             document.getElementById('emailError').style.display = 'none';
//             document.getElementById('districtError').style.display = 'none';
//             document.getElementById('regPasswordError').style.display = 'none';
//             document.getElementById('healthError').style.display = 'none';
//             document.getElementById('regSuccessMessage').style.display = 'none';

//             // Валидация
//             if (!firstName) {
//                 document.getElementById('firstNameError').textContent = 'Введите имя';
//                 document.getElementById('firstNameError').style.display = 'block';
//                 isValid = false;
//             }

//             if (!lastName) {
//                 document.getElementById('lastNameError').textContent = 'Введите фамилию';
//                 document.getElementById('lastNameError').style.display = 'block';
//                 isValid = false;
//             }

//             if (!email) {
//                 document.getElementById('emailError').textContent = 'Введите email';
//                 document.getElementById('emailError').style.display = 'block';
//                 isValid = false;
//             }

//             if (!district) {
//                 document.getElementById('districtError').textContent = 'Введите район';
//                 document.getElementById('districtError').style.display = 'block';
//                 isValid = false;
//             }

//             if (!password) {
//                 document.getElementById('regPasswordError').textContent = 'Введите пароль';
//                 document.getElementById('regPasswordError').style.display = 'block';
//                 isValid = false;
//             } else if (password.length < 6) {
//                 document.getElementById('regPasswordError').textContent = 'Пароль должен содержать минимум 6 символов';
//                 document.getElementById('regPasswordError').style.display = 'block';
//                 isValid = false;
//             }

//             if (healthCategories.length === 0) {
//                 document.getElementById('healthError').textContent = 'Выберите хотя бы одну категорию здоровья';
//                 document.getElementById('healthError').style.display = 'block';
//                 isValid = false;
//             }

//             if (isValid) {
//                 // Сохраняем данные регистрации
//                 var userData = {
//                     firstName: firstName,
//                     lastName: lastName,
//                     email: email,
//                     district: district,
//                     password: password,
//                     healthCategories: healthCategories,
//                     timestamp: new Date().toISOString()
//                 };
                
//                 // Сохраняем в localStorage как зарегистрированного пользователя
//                 var isSaved = saveRegisteredUser(userData);
                
//                 if (isSaved) {
//                     document.getElementById('regSuccessMessage').textContent = 'Регистрация успешна! Возврат к авторизации...';
//                     document.getElementById('regSuccessMessage').style.display = 'block';
//                     document.getElementById('registerForm').reset();

//                     console.log('Пользователь зарегистрирован:', userData);

//                     // Закрываем регистрацию и открываем авторизацию через 2 секунды
//                     setTimeout(function() {
//                         registerModal.style.display = 'none';
//                         authModal.style.display = 'flex';
//                     }, 2000);
//                 } else {
//                     document.getElementById('emailError').textContent = 'Пользователь с таким email уже зарегистрирован';
//                     document.getElementById('emailError').style.display = 'block';
//                 }
//             }
//         });