// The "Brain" - holds the current data for the app
let state = {
    title: "Complete HNG Stage 1 Task",
    description: "Extend the Stage 0 card with interactive features like edit mode and priority levels.",
    priority: "High", // Options: Low, Medium, High
    status: "Pending", // Options: Pending, In Progress, Done
    dueDate: new Date("2026-04-17T23:59:00"),
    isEditing: false,
    isExpanded: false
};




const dueDate = new Date(2026, 3, 22, 23, 12);





/**
 * SELECTING ELEMENTS
 */
const timeRemainingElement = document.querySelector('[data-testid="test-todo-time-remaining"]');
const timeBox = document.querySelector('[data-testid="test-todo-due-date"]');
const checkbox = document.querySelector('[data-testid="test-todo-complete-toggle"]');
const statusText = document.querySelector('[data-testid="test-todo-status"]');
const statusDropdown = document.getElementById('status-control');
const todoCard = document.querySelector('[data-testid="test-todo-card"]');
const editbutton = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteButton = document.querySelector('[data-testid="test-todo-delete-button"]');

const viewMode = document.getElementById('todo-view-mode');
const editMode = document.getElementById('todo-edit-mode');

const cancelBtn = document.getElementById('cancel-btn');

const expandBtn = document.querySelector('[data-testid="test-todo-expand-toggle"]');
const descriptionContainer = document.querySelector('[data-testid="test-todo-collapsible-section"]');





function formatDueDate() {
    timeBox.textContent = dueDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}


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


    // (Time is in the past)
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

    //  (Time is in the future)
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
};









// Run the time calculation/set due date immediately when the page loads
updateTimeRemaining();
formatDueDate();

// Update the time every minute so it stays accurate
setInterval(updateTimeRemaining, 60000);


// Initialize as collapsed on page load
descriptionContainer.classList.add('collapsed');





function toggleDisplay(isEditing) {
    if (isEditing) {
        // Show Form, Hide Card
        viewMode.style.display = 'none';
        editMode.style.display = 'block';

        // Accessibility: Focus the first input when opening edit mode
        document.getElementById('edit-title').focus();
    } else {
        // Show Card, Hide Form
        viewMode.style.display = 'block';
        editMode.style.display = 'none';

        // Accessibility: Return focus to the Edit button when closing
        editbutton.focus();
    }
}






deleteButton.addEventListener('click', () => {
    alert("Delete clicked");
});


editbutton.addEventListener('click', () => toggleDisplay(true));

cancelBtn.addEventListener('click', () => toggleDisplay(false));

expandBtn.addEventListener('click', () => {

    const isCollapsed = descriptionContainer.classList.toggle('collapsed');
    expandBtn.textContent = isCollapsed ? 'Show More' : 'Show Less';
    //  Update Accessibility
    expandBtn.setAttribute('aria-expanded', !isCollapsed);
});




//This listens for the user clicking the checkbox
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        todoCard.classList.add('is-completed');
        statusText.textContent = "Done";
        statusDropdown.value = "Done";
    } else {
        todoCard.classList.remove('is-completed');
        statusText.textContent = "Pending";
        statusDropdown.value = "Pending";
    }
});



// Handle Dropdown Change
statusDropdown.addEventListener('change', () => {
    statusText.textContent = statusDropdown.value;

    // Sync the checkbox
    checkbox.checked = (statusDropdown.value === "Done");
});