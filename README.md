# HNG Stage 1a: Advanced Todo Card (Interactive & Stateful)

## Project Overview
This project is an evolution of the Stage 0 Todo Card, transforming it from a static display into a dynamic, stateful mini-application. It demonstrates proficiency in DOM manipulation, state management, and accessible UI patterns using Vanilla JavaScript, HTML5, and CSS3.

## Key Enhancements (Stage 1a)
- **State Management:** Implemented a centralized `state` object that serves as the single source of truth for all UI components.
- **Edit Mode:** A fully functional editing interface allowing users to update titles, descriptions, priority levels, and due dates.
- **Two-Way Status Sync:** Real-time synchronization between the completion checkbox, the status dropdown control, and the visual status text.
- **Accessibility (A11y):** - Managed focus states to ensure keyboard users are never "lost" when switching between view and edit modes.
    - Utilized `aria-expanded` and `aria-controls` for the collapsible description section.
    - Used `aria-live="polite"` for dynamic time updates.
- **Responsive Design:** Optimized for devices ranging from 320px (mobile) to 1024px+ (desktop), ensuring the edit form stacks vertically on smaller screens.
- **Visual Feedback:** - Priority indicators change colors (Red/Orange/Green).
    - "In Progress" tasks feature a distinct blue glow and border.
    - "Done" tasks utilize strike-through text and muted opacity.

## Technical Design Decisions

### Timer Optimization
**Decision:** Changed the `setInterval` update frequency to 1 second (1000ms).
**Reasoning:** While the task requirement suggested a 30-60 second interval, I opted for a more frequent update to provide **immediate UI feedback**. When a user edits a due date or marks a task as done, the "Time Remaining" or "Completed" status updates instantly without a visible lag, significantly improving the perceived performance and user experience.

### State-to-UI Rendering
Instead of manual, scattered DOM updates, I implemented a `renderCard()` function. This mimics modern framework behavior by ensuring that whenever the "Brain" (state) changes, the "Body" (UI) is updated consistently.

## How to Run
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. Use the **Edit** button to modify task details.

## Known Limitations
- Data does not persist after a page refresh (Local Storage integration is planned for future stages).

## Accessibility Notes
- All form inputs are associated with `<label>` tags.
- The interactive elements are reachable via `Tab` in a logical order: Checkbox -> Status Control -> Expand Toggle -> Edit -> Delete