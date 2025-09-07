# Simple Todo App

The Simple ToDo App lets you quickly add tasks with an optional due date, mark them complete, and remove them when you’re done. New items are created through a clean modal form with real-time validation powered by a reusable FormValidator class. Each task renders with an accessible checkbox and a user-friendly “Due:” date label when provided. A live counter summarizes progress by showing how many tasks are completed out of the total.

## Functionality

This is a lightweight, client-side To-Do app I built with vanilla JavaScript modules. I can add tasks through a simple modal form, optionally set a due date, mark items complete with a checkbox, and delete them when I’m done. Each task is rendered from a <template> so the UI stays consistent, and I pair the checkbox id with the label for so it’s accessible.

Under the hood, each todo is an object { id, name, date, completed } (IDs via uuidv4). The Todo class clones the template, fills in the name, formats the date into a “Due: MMM DD, YYYY” label when provided, wires the checkbox to update completed, and handles delete. The form is validated by a reusable FormValidator class that shows inline errors, disables/enables the submit button, and exposes resetValidation() so the form clears and the button resets any time I open/close the popup or submit.

index.js is the glue: it opens/closes the modal, reads form values, normalizes the date, creates a Todo, appends it to the list, and calls resetValidation() for a clean slate. The structure keeps responsibilities separated (Todo UI, form validation, page orchestration), which makes it easy to extend later with things like a progress counter, filters, edit-in-place, or localStorage persistence.

## Technology

Give a description of the technologies and techniques used. Pictures, GIFs, or screenshots that detail the project features are recommended.

## Deployment

This project is deployed on GitHub Pages:

- [ADD LINK HERE](https://stevie-j-93.github.io/se_project_todo-app/)
