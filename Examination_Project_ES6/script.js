// reg expression
const firstRegExp = new RegExp("^[A-Za-z]{3,}$");
const lastRegExp = new RegExp("^[A-Za-z]+\\s[A-Za-z]+$");
const emailRegExp = new RegExp(
  "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
);
const passwordRegExp = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d])[A-Za-z\\d!@#$%^&*()_+\\-=]{8,}$"
);
/*******************************************************************************************************************/
// start of selectors of all pages
//selectors for first page (signup page)
const firstPage = $(".first-full-container");
// selector for second page (login page)
const secondPage = $(".second-full-container");
// selector for third page (start exam page)
const thirdPage = $(".third-full-container");
// selector for fourth page (exam page)
const fourthPage = $(".fourth-full-container");
// selector for fifth page grade (result page)
const fifthPage = $(".fifth-full-container");
//selector for timeout page
const timeoutPage = $(".timeout-full-container");
// end of selectors of all pages
/*******************************************************************************************************************/
// start of selectors for first page signup page
// selectors for first name input and error span and error message
const firstName = $("input[name='FirstName']");
const firstNameSpan = $("#firstNameSpan");
const firstNameMessage =
  "First Name should be at least 3 alphapetical characters and no numbers";
// selectors for last name input and error span and error message
const lastName = $("input[name='LastName']");
const lastNameSpan = $("#lastNameSpan");
const lastNameMessage = "Last Name should be two words with space in betweeen";
// selectors for email input and error span and error message
const email = $("input[name='Email']");
const emailSpan = $("#emailSpan");
const emailMessage = "Invalid Email should be as example@Example.com";
// selectors for password input and error span and error message
const password = $("input[name='Password']");
const passwordSpan = $("#passwordSpan");
const passwordMessage =
  "password should contain at least one uppercase , one lowercase , one special char , one number";
//selectors for reConfirm password input and error span and error message
const rePassword = $("input[name='Re-enter-password']");
const rePasswordSpan = $("#rePasswordSpan");
const rePasswordMessage = "Don't match the entered password";
//selector for signup button
const signUp = $("#signUpButton");
//selectors for form and signup button
const form = $("#SignUpForm");
// end of selectors for first page signup
/*******************************************************************************************************************/
// start of selectors for second page(login page)
// selectors for login email input
const loginEmail = $("input[name='loginEmail']");
const loginEmailSpan = $("#loginEmailSpan");
const loginEmailMessage = "Invalid Email should be as example@Example.com";
// selectors for login password input
const loginPassword = $("input[name='loginPassword']");
const loginPasswordSpan = $("#loginPasswordSpan");
const loginPasswordMessage =
  "password should contain at least one uppercase , one lowercase , one special char , one number";
const signInButton = $("#signInButton");
let userEmail = localStorage.email;
let userPassword = localStorage.password;
//sign in anchor in signup page selector
const signIn = $(".link-style");
/*******************************************************************************************************************/
// password hide and show icon
let passwordEye = $(".password .fa-eye-slash");
/*******************************************************************************************************************/
// selectors for image transition in third page start exam page
const startExam = document.getElementById("startExam");
const startExamImg = document.getElementById("startExamImg");
const startExamButton = $("#startExam");
/*******************************************************************************************************************/
//selectors for fourth page (questions page)
const loadingDiv = $(".loading");
const errorDiv = $(".error-message");
const errorPara = $(".error-message p");
let array = [];
let counter = 1;
const prevButton = $(".arrow-left");
const nextButton = $(".arrow-right");
const clockStart = $(".clockStart");
const clock = $(".clock i");
const timeRunSpan = $(".timeRun");
const timeoutMsg = $("#timeoutResult");
let count_time = 0;
const submitAnswerButton = $(".submit-answer");
/*******************************************************************************************************************/
// selectors for fifth page
const failImage = $("#finalResultImg");
const gradeMessage = $("#finalResultGrade");
const gradeGreetingMessage = $("#finalResultGreeting");
let interval = "";
///
/*******************************************************************************************************************/
///////////////////////////////////end of all selectors//////////////////////////////////////////////////////////////

/*******************************************first page logic*************************************************/
/**
 * validateInput: it is a dynamic function for validating all inputs
 * @param {*} input
 * @param {*} regex
 * @param {*} errorSpan
 * @param {*} errorMessage
 * @returns  boolean
 */
function validateInput(input, regex, errorSpan, errorMessage) {
  /// for validating that input value match regular expression
  if (!regex.test(input.val()) && input.val() !== "") {
    errorSpan.css("visibility", "visible").text(errorMessage);
    errorSpan.removeClass("span-shake");
    setTimeout(function () {
      errorSpan.addClass("span-shake");
    }, 5);
    return false;
  }
  /// for making the input reqired can't be submitted empty
  else if (input.val() === "") {
    errorSpan.css("visibility", "visible").text("This field is required.");
    errorSpan.removeClass("span-shake");
    setTimeout(function () {
      errorSpan.addClass("span-shake");
    }, 5);

    return false;
  }
  /// in case of valid input value
  else if (regex.test(input.val())) {
    errorSpan.css("visibility", "hidden").text("");
    return true;
  }
}
/// event of click on sign up button
signUp.on("click", function (e) {
  let valid = true;
  e.preventDefault();
  //check validity for input 1 which is first name
  if (!validateInput(firstName, firstRegExp, firstNameSpan, firstNameMessage)) {
    valid = false;
  }

  //check validity for input 2 which is last name
  if (!validateInput(lastName, lastRegExp, lastNameSpan, lastNameMessage)) {
    valid = false;
  }
  //check validity for input 3 which is email address
  if (!validateInput(email, emailRegExp, emailSpan, emailMessage)) {
    valid = false;
  }
  //check validity for input 4 which is password
  if (!validateInput(password, passwordRegExp, passwordSpan, passwordMessage)) {
    valid = false;
  }
  //check validity for input 5 which is re-password
  if (rePassword.val() !== password.val() && rePassword.val() !== "") {
    rePasswordSpan.css("visibility", "visible").text(rePasswordMessage);
    rePasswordSpan.removeClass("span-shake");
    setTimeout(function () {
      rePasswordSpan.addClass("span-shake");
    }, 5);

    valid = false;
  } else if (rePassword.val() === "") {
    rePasswordSpan.css("visibility", "visible").text("This field is required");
    rePasswordSpan.removeClass("span-shake");
    setTimeout(function () {
      rePasswordSpan.addClass("span-shake");
    }, 5);

    valid = false;
  } else if (rePassword.val() === password.val()) {
    rePasswordSpan.css("visibility", "hidden").text("");
  }
  /// if all inputs are valid we will hide page of sign-up and show login page and save in local storage what we have done
  if (valid) {
    firstPage.hide();
    secondPage.css("display", "flex");
    localStorage.setItem("email", email.val());
    localStorage.setItem("password", password.val());
    localStorage.setItem("firstName", firstName.val());
    localStorage.setItem("lastName", lastName.val());
    loginEmail.val(localStorage.getItem("email"));
    loginPassword.val(localStorage.getItem("password"));
  }
});
/// icon show and hide for password
passwordEye.on("click", function () {
  if ($(this).hasClass("fa-eye-slash")) {
    $(this).removeClass("fa-eye-slash");
    $(this).addClass("fa-eye");
    $(this.previousSibling).attr("type", "text");
  } else {
    $(this).removeClass("fa-eye");
    $(this).addClass("fa-eye-slash");
    $(this.previousSibling).attr("type", "password");
  }
});
//signin first page
signIn.on("click", function () {
  if (window.localStorage.getItem("email")) {
    firstPage.hide();
    secondPage.css("display", "flex");
    loginEmail.val(localStorage.getItem("email"));
    loginPassword.val(localStorage.getItem("password"));
  }
});
/*******************************************end offirst page logic*************************************************/

/*******************************************second page logic*************************************************/
signInButton.on("click", function (e) {
  e.preventDefault();
  let valid2 = true;
  if (
    !validateInput(loginEmail, emailRegExp, loginEmailSpan, loginEmailMessage)
  ) {
    valid2 = false;
  }
  if (
    !validateInput(
      loginPassword,
      passwordRegExp,
      loginPasswordSpan,
      loginPasswordMessage
    )
  ) {
    valid2 = false;
  }
  if (valid2) {
    userEmail = localStorage.email;
    userPassword = localStorage.password;
    if (
      loginEmail.val() === userEmail &&
      loginPassword.val() === userPassword
    ) {
      loginEmailSpan.css("visibility", "hidden");
      loginEmailSpan.css("visibility", "hidden");
      secondPage.hide();
      thirdPage.css("display", "flex");
    } else {
      if (loginEmail.val() !== userEmail) {
        loginEmailSpan.css("visibility", "visible").text("email is not found");
        loginEmailSpan.removeClass("span-shake");
        setTimeout(function () {
          loginEmailSpan.addClass("span-shake");
        }, 5);
      }
      if (loginPassword.val() !== userPassword) {
        loginPasswordSpan
          .css("visibility", "visible")
          .text("password is not found");
        loginPasswordSpan.removeClass("span-shake");
        setTimeout(function () {
          loginPasswordSpan.addClass("span-shake");
        }, 5);
      }
    }
  }
});
/*******************************************end of second page logic*************************************************/

/*******************************************third page logic*************************************************/
// image transition for start exam button

startExam.addEventListener("mouseover", function () {
  startExamImg.style.backgroundImage = "url(images/sad.jpg)";
});
startExam.addEventListener("mouseout", function () {
  startExamImg.style.backgroundImage = "url(images/happy.jpg)";
});

startExamButton.on("click", function () {
  thirdPage.hide();
  GetData();
  fourthPage.css("display", "flex");
  interval = setInterval(function () {
    clockStart.text(formatTime(count_time));
    count_time++;
  }, 1000);
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    checkTime(minutes, second);
    return `${
      minutes < 10 ? "0" + minutes : minutes
    }:${second < 10 ? "0" + second : second}`;
  }
});
/*******************************************end of third page logic*************************************************/

/*******************************************fourth page logic*************************************************/
/**
 * GetData : it is a synchronous function that make the getting of data from api
 * @returns void
 */
async function GetData() {
  loadingDiv.css("display", "flex");
  $(".questions").hide();
  $(".list").hide();
  errorDiv.hide();
  try {
    let resp = await fetch("response.json");
    if (!resp.ok) {
      throw new Error(`error! Status: ${resp.status}`);
    }
    let questions = await resp.json();
    // check if the json is empty
    if (questions.length === 0) {
      loadingDiv.css("display", "none");
      errorDiv.css("display", "flex");
      errorPara.text("Data Not Found :(");
      return;
    }
    // here the data received successfully
    questions.sort(() => Math.random() - 0.5);
    array = questions.slice(0, 5);
    loadingDiv.css("display", "none");
    errorDiv.hide();
    fourthPage.css("display", "flex");
    $(".questions").css("display", "flex");
    $(".list").css("display", "flex");
  } catch (error) {
    // catch the error
    loadingDiv.css("display", "none");
    errorDiv.css("display", "flex");
    errorPara.text(`an error occured : ${error.message}`);
  }
  questionCreation(array);
}
/**
 * questionCreation : it is a function that create a div for each question and append it to the exam page
 * @param {[{}]} array
 */
function questionCreation(array) {
  // create a div for each question,answer and append them
  array.forEach((question, i) => {
    let questionDiv = $("<div></div>");
    questionDiv.addClass(`question q-${i + 1} p-2 mb-3 fs-5 `);
    questionDiv.html(
      `<span class='visibleSpan'>${question.head}</span><i class="p-1 bi bi-flag"></i>`
    );
    questionDiv.insertBefore(".questions .slide");
    let answerContainer = $(`<div class='answer-container ca-${i + 1}'></div>`);
    console.log(question.answer);
    question.options.forEach(function (answer) {
      let answerButton = $(
        `<button class='text-start a-${
          i + 1
        } answer p-2 mb-2'><p class="fs-6 p-0 m-0">${answer}</p></button>`
      );
      answerContainer.append(answerButton);
      // marking for answered choice
      answerButton.on("click", function (e) {
        let answers = $(`.questions .a-${i + 1}`);
        answers.removeClass("active-answer");
        $(this).addClass("active-answer");
        localStorage.setItem(`question${i + 1}`, $(this.children).text());
      });
    });
    answerContainer.insertAfter(questionDiv);
    // functionality of flag
    let flag = questionDiv.children().last();
    flag.on("click", function () {
      let listFlagged = $(`<div class="question p-2 ps-3 mb-3 fs-5 ">
        <span class="visibleSpan f-${i + 1}" id="flaggedQuestion">Question${
        i + 1
      }</span><i class="text-danger bi bi-trash"></i></div>`);
      if (!$(".list #flaggedQuestion").hasClass(`f-${i + 1}`)) {
        $(".list").append(listFlagged);
        listFlagged
          .children()
          .first()
          .on("click", function () {
            counter = i + 1;
            console.log(counter);
            check(counter);
            showHide(counter);
          });
        listFlagged
          .children()
          .last()
          .on("click", function () {
            this.parentElement.remove();
          });
      }
    });
  });
  // to add the first question initially
  showHide(1);
}
/**
 * checkTime : a function that check the time and if time near to end it hide the exam page and show the timeout page
 * @param {number} minutes
 * @param {number} second
 */
function checkTime(minutes, second) {
  if (minutes === 2) {
    clockStart.css("color", "#5f0f0f");
    clock.css("animation", "shake-img 1s 60");
    timeRunSpan.css("color", "#5f0f0f");
    timeRunSpan.text("Hurry up, the time is running!!");
  }
  if (minutes === 3) {
    clearInterval(interval);
    fourthPage.hide();
    timeoutPage.css("display", "flex");
    timeoutMsg.text(
      `Sorry ${localStorage.firstName} ${localStorage.lastName}, the time is out.`
    );
    setTimeout(function () {
      timeoutPage.hide();
      fifthPage.css("display", "flex");
      let grade = calculateGrade();
      finalResult(grade);
      emptyLocalAnswer();
    }, 5000);
  }
}

/**
 * check the value of counter to decide to disable the prev or the next or no one
 * @param {number} c
 * @returns void
 */
function check(c) {
  if (c === 1) {
    nextButton.removeAttr("disabled");
    nextButton.removeClass("disabled");
    prevButton.attr("disabled", "true");
    prevButton.addClass("disabled");
  }
  if (c === 5) {
    prevButton.removeAttr("disabled");
    prevButton.removeClass("disabled");
    nextButton.attr("disabled", "true");
    nextButton.addClass("disabled");
  }
  if (c !== 5 && c !== 1) {
    prevButton.removeAttr("disabled");
    prevButton.removeClass("disabled");
    nextButton.removeAttr("disabled");
    nextButton.removeClass("disabled");
  }
}

if (counter === 1) {
  prevButton.attr("disabled", "true");
  prevButton.addClass("disabled");
}
// functionality for prev button
prevButton.on("click", function () {
  counter--;
  if (counter > 0) {
    nextButton.removeAttr("disabled");
    nextButton.removeClass("disabled");
    showHide(counter);
    if (counter === 1) {
      counter = 1;
      prevButton.attr("disabled", "true");
      prevButton.addClass("disabled");
    }
  }
});
// functionality for next button
nextButton.on("click", function () {
  counter++;
  if (counter <= 5) {
    prevButton.removeAttr("disabled");
    prevButton.removeClass("disabled");
    showHide(counter);
    if (counter === 5) {
      counter = 5;
      nextButton.attr("disabled", "true");
      nextButton.addClass("disabled");
    }
  }
});
/**
 * showHide : a dynamic function to loop between questions using it
 * @param {number} index
 */
function showHide(index) {
  $(".questions .question").hide();
  $(".questions .answer-container").hide();
  $(`.q-${index}`).css("display", "flex");
  $(`.ca-${index}`).css("display", "flex");
  $(".number").text(`${counter} out of 5`);
}
// functionality for submitanswer button
submitAnswerButton.on("click", function () {
  clearInterval(interval);
  fourthPage.hide();
  fifthPage.css("display", "flex");
  let grade = calculateGrade();
  finalResult(grade);
  emptyLocalAnswer();
});
/*******************************************end of fourth page logic*************************************************/

/*******************************************fifth page logic*************************************************/
/////////////////////////////// start of grade calculation////////////////////////////////////
/**
 * calculateGrade :  a function to calculate the grade and return the grade
 * @returns number
 */
function calculateGrade() {
  let grade = 0;
  for (let i = 0; i < 5; i++) {
    if (localStorage[`question${i + 1}`] === array[i].answer) {
      grade += 20;
    }
  }
  return grade;
}
/**
 * finalResult :  a function to decide either the student succeed or failed and display his grade
 * @param {number} grade
 * @returns void
 */
function finalResult(grade) {
  if (grade < 50) {
    failImage.css("background-image", "url(./images/fail.jpg)");
    gradeMessage.html(
      `Your Grade is <span style='color:red;'>${grade}%</span>`
    );
    gradeGreetingMessage.text(
      `Sorry ${localStorage.firstName} ${localStorage.lastName}, you failed in this quiz `
    );
  } else {
    gradeMessage.html(
      `Your Grade is <span style='color:green;'>${grade}%</span>`
    );
    gradeGreetingMessage.text(
      `Congratulations ${localStorage.firstName} ${localStorage.lastName} !`
    );
  }
}
/**
 * emptyLocalAnswer : a function to empty local storage after the exam end
 * @returns void
 */
function emptyLocalAnswer() {
  for (let i = 0; i < 5; i++) {
    localStorage[`question${i + 1}`] = "";
  }
}

/*******************************************end of fifth page logic*************************************************/
