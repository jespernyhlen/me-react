const hasNumber = myString => {
    return /\d/.test(myString);
};

const ValidateForm = (name, lastName, email, year, password) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    let nameError = '';
    let lastNameError = '';
    let yearError = '';
    let emailError = '';
    let passwordError = '';

    if (name.length < 2 || hasNumber(name)) {
        nameError = 'Ogiltigt namn';
    }

    if (lastName.length < 2 || hasNumber(lastName)) {
        lastNameError = 'Ogiltigt efternamn';
    }

    if (!expression.test(String(email).toLowerCase())) {
        emailError = 'Ogiltig e-post';
    }

    let date = new Date(year);
    let date2 = date.setFullYear(date.getFullYear() + 18);

    if (!year || date2 >= new Date()) {
        yearError = 'Du måste vara minst 18 år för att registrera dig';
    }

    if (password.length < 6) {
        passwordError = 'Ogiltigt lösenord, minst 6 tecken';
    }

    if (
        nameError ||
        lastNameError ||
        emailError ||
        passwordError ||
        yearError
    ) {
        return {
            nameError: nameError,
            lastNameError: lastNameError,
            emailError: emailError,
            passwordError: passwordError,
            yearError: yearError
        };
    }
    return true;
};

export default ValidateForm;
