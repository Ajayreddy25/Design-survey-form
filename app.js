document.getElementById("surveyForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const errorText = document.getElementById("errorText");
    const nameField = document.getElementById("name");
    const ageField = document.getElementById("age");

    const name = nameField.value;
    const age = ageField.value;
    const nameRegex = /^[A-Za-z ]+$/;

    if (!name.match(nameRegex)) {
        showError(nameField, errorText, "Name should only contain English alphabets and spaces");
        return;
    }
    if (isNaN(age) || age < 1 || age > 150) {
        showError(ageField, errorText, "Age should be between 1 and 150");
        return;
    }

    clearError(nameField, ageField, errorText);
    successMessage(errorText, "Submitted Successfully");

    const formData = new FormData(event.target);
    const csvContent = convertToCSV(Object.fromEntries(formData.entries()));
    downloadCSV(csvContent, "survey_data.csv");

    setTimeout(() => document.getElementById("surveyForm").reset(), 2000);
});

function showError(field, errorText, message) {
    field.classList.add("error");
    errorText.textContent = message;
    errorText.classList.add("errorText");
}

function clearError(...fields) {
    fields.forEach(field => field.classList.remove("error"));
    const errorText = document.getElementById("errorText");
    errorText.textContent = "";
    errorText.classList.remove("errorText");
}

function successMessage(errorText, message) {
    errorText.textContent = message;
    errorText.classList.add("successText");
}

function convertToCSV(obj) {
    const header = Object.keys(obj).join(",") + "\n";
    const values = Object.values(obj).join(",") + "\n";
    return header + values;
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

