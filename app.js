document.getElementById("survey-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Gather form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const role = document.getElementById("role").value;
    const likeProgramming = document.querySelector('input[name="like-programming"]:checked').value;
    const recommend = document.getElementById("recommend").value;
    const comments = document.getElementById("comments").value;

    // Validate name (only alphabets) and age (numeric)
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Name must contain only alphabets.");
        return;
    }

    if (isNaN(age) || age <= 0) {
        alert("Please enter a valid age.");
        return;
    }

    // Convert form data to CSV format
    const csvData = [
        ["Name", "Email", "Age", "Role", "Like Programming", "Recommend", "Comments"],
        [name, email, age, role, likeProgramming, recommend, comments]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
        + csvData.map(e => e.join(",")).join("\n");

    // Create a download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "survey_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // Trigger download
    document.body.removeChild(link); // Cleanup

    alert("Thank you for your submission!");
    document.getElementById("survey-form").reset();
});
