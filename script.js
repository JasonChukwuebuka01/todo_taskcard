/**
 * 1. CONFIGURATION
 * We set a fixed due date. In a real app, this might come from a database.
 * Format: Year, Month (0-indexed, so 3 = April), Day, Hour, Minute
 */
const dueDate = new Date(2026, 3, 22, 23, 12);





/**
 * SELECTING ELEMENTS
 */
const timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
const timeBox = document.querySelector('[data-testid="test-todo-due-date"]');
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusText = document.querySelector('[data-testid="test-todo-status"]');
const todoCard = document.querySelector('[data-testid="test-todo-card"]');
const editbutton = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');




/**
 * This function calculates the difference between "Now" and the "Due Date"
 */
function updateTimeRemaining() {
    const now = new Date();
    const diff = dueDate - now;

    // We work with the absolute value for calculations to avoid Math.floor bugs
    const absDiff = Math.abs(diff);

    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));


    let timeText = "";

    //  THE "DUE NOW" WINDOW (Within 60 seconds of the deadline)
    if (absDiff < 60000) {
        timeText = "Due now!";
        timeRemainingElement.style.color = "var(--danger-red)";
    }


    //  THE OVERDUE LOGIC (Time is in the past)
    else if (diff < 0) {
        if (days > 0) {
            timeText = `Overdue by ${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            timeText = `Overdue by ${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            timeText = `Overdue by ${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        timeRemainingElement.style.color = "var(--danger-red)";
    }

    // 3. THE FUTURE LOGIC (Time is in the future)
    else {
        if (days > 0) {
            timeText = `Due in ${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            timeText = `Due in ${hours} hour${hours > 1 ? 's' : ''}`;
        } else {
            timeText = `Due in ${minutes} minute${minutes > 1 ? 's' : ''}`;
        }
        timeRemainingElement.style.color = "var(--primary-blue)";
    }

    timeRemainingElement.textContent = timeText;
    timeBox.textContent = `${dueDate.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    })} `;
};






/**
 * 
 * This listens for the user clicking the checkbox
 */
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        todoCard.classList.add('is-completed');
        statusText.textContent = "Done";
    } else {
        todoCard.classList.remove('is-completed');
        statusText.textContent = "Pending";
    }
});

// Run the time calculation immediately when the page loads
updateTimeRemaining();

// Update the time every minute so it stays accurate
setInterval(updateTimeRemaining, 60000);




editbutton.addEventListener('click', () => {
    alert("Edit functionality is not implemented in this demo.");
});

deleteButton.addEventListener('click', () => {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        todoCard.remove();
    }
});