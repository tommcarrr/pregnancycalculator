document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('dueDateForm').addEventListener('submit', function(event) {
        event.preventDefault();
        calculate();
    });

    // Check if there's a due date in the query string
    const urlParams = new URLSearchParams(window.location.search);
    const dueDate = urlParams.get('dueDate');
    if (dueDate) {
        document.getElementById('dueDate').value = dueDate;
        calculate();
    }
});

function calculate() {
    const dueDateInput = document.getElementById('dueDate').value;
    if (!dueDateInput) {
        alert('Please enter a due date.');
        return;
    }

    // Update URL with query string
    window.history.replaceState(null, null, "?dueDate=" + dueDateInput);

    const dueDate = new Date(dueDateInput);
    const currentDate = new Date();
    const oneWeekDuration = 1000 * 60 * 60 * 24 * 7;

    // Assuming a full-term pregnancy is about 40 weeks
    const pregnancyDuration = 40;

    // Calculate weeks elapsed
    const weeksElapsed = Math.floor((currentDate - dueDate) / oneWeekDuration) + pregnancyDuration;

    // Calculate remaining weeks
    const weeksRemaining = pregnancyDuration - weeksElapsed;

    // Update the result on the page
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `You are currently <strong>${weeksElapsed}</strong> weeks pregnant. <br>There are approximately <strong>${weeksRemaining}</strong> weeks until your due date.`;

    // Generate the NHS link based on the week range
    const nhsLinkElement = document.getElementById('nhsLink');
    const nhs2LinkElement = document.getElementById('nhsLink2');
    nhsLinkElement.style.display = 'block';
    nhs2LinkElement.style.display = 'block';
    let weekRange = '';
    let trimester = '';

    if (weeksElapsed >= 1 && weeksElapsed <= 12) {
        weekRange = '1-to-12';
        trimester = '1st';
    } else if (weeksElapsed >= 13 && weeksElapsed <= 27) {
        weekRange = '13-to-27';
        trimester = '2nd';
    } else if (weeksElapsed >= 28) {
        weekRange = '28-to-40';
        trimester = '3rd';
    }

    if (weekRange) {
        nhsLinkElement.href = `https://www.nhs.uk/pregnancy/week-by-week/${weekRange}/${weeksElapsed}-weeks/`;
    } else {
        nhsLinkElement.style.display = 'none';
    }

    if (trimester) {
        nhs2LinkElement.href = `https://www.nhs.uk/start-for-life/pregnancy/week-by-week-guide-to-pregnancy/${trimester}-trimester/week-${weeksElapsed}/`;
    } else {
        nhs2LinkElement.style.display = 'none';
    }
}