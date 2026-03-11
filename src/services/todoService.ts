// =============================================================================
// todoService.ts — Helper functions for managing todos
// =============================================================================
// Think of this file as a toolbox. Each function is a small tool that
// does ONE job with todos (add, delete, toggle, edit, filter).
//
// Important: these functions do NOT use Vue at all. They only work with
// plain data (arrays and objects). That means we can test them easily
// without starting the whole app.
//
// Most functions return a NEW copy instead of changing the original.
// It's like making a photocopy of a list and changing the copy,
// so the original stays safe.
// =============================================================================

import type { Todo } from "@/types/todo";

/**
 * Create a random unique ID (like a license plate for a todo).
 *
 * We need this so every todo has its own identity, even if two todos
 * have the same title.
 */
function uuid(): string {
  let id = "";
  for (let i = 0; i < 32; i++) {
    // Pick a random number between 0 and 15
    const random = (Math.random() * 16) | 0;

    // Add dashes at specific positions to look like a real UUID
    if (i === 8 || i === 12 || i === 16 || i === 20) id += "-";

    // Build the ID character by character using hexadecimal (0-9, a-f)
    id += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }
  return id;
}

/**
 * Make a brand-new todo item.
 *
 * It starts as "not completed" and gets its own unique ID automatically.
 *
 * @param title - The text the user typed for this todo.
 * @returns A fresh todo object, ready to be added to the list.
 */
export function createTodo(title: string): Todo {
  return {
    id: uuid(),
    title: title,
    completed: false,
  };
}

/**
 * Add a new todo to the end of the list.
 *
 * We don't change the original list — we make a copy with the new todo
 * added at the end (like photocopying a grocery list and writing one
 * more item on the copy).
 *
 * @param todos - The current list of todos.
 * @param title - The text for the new todo.
 * @returns A new array that has all the old todos PLUS the new one.
 */
export function addTodo(todos: Todo[], title: string): Todo[] {
  return [...todos, createTodo(title)];
}

/**
 * Remove a todo from the list.
 *
 * We keep every todo that is NOT the one we want to delete.
 * (Like crossing an item off a list and rewriting the rest.)
 *
 * @param todos        - The current list of todos.
 * @param todoToDelete - The exact todo object we want to remove.
 * @returns A new array without the deleted todo.
 */
export function deleteTodo(todos: Todo[], todoToDelete: Todo): Todo[] {
  return todos.filter((t) => t !== todoToDelete);
}

/**
 * Mark a todo as done or not done.
 *
 * Returns a copy of the todo with the new completed value.
 * (The original todo is not changed.)
 *
 * @param todo      - The todo to update.
 * @param completed - true = done, false = not done.
 * @returns A new todo object with the updated status.
 */
export function toggleTodo(todo: Todo, completed: boolean): Todo {
  return { ...todo, completed: completed };
}

/**
 * Change the title text of a todo.
 *
 * Returns a copy with the new title — original stays the same.
 *
 * @param todo     - The todo to update.
 * @param newTitle - The new text for this todo.
 * @returns A new todo object with the updated title.
 */
export function editTodo(todo: Todo, newTitle: string): Todo {
  return { ...todo, title: newTitle };
}

/**
 * Remove all completed todos from the list.
 *
 * Should keep only the todos that are NOT completed.
 *
 * @param todos - The current list of todos.
 * @returns A new array with only the non-completed todos.
 */
export function deleteCompleted(todos: Todo[]): Todo[] {
  // 🐛 BUG: Can you spot what's wrong here?
  // Hint: filter keeps items where the condition is TRUE.
  // We want to KEEP the ones that are NOT completed…
  return todos.filter((todo) => !todo.completed);
}

/**
 * Get only the active (not-yet-done) todos.
 *
 * Filters out anything that has completed === true.
 *
 * @param todos - The full list of todos.
 * @returns A new array containing only the active todos.
 */
export function getActiveTodos(todos: Todo[]): Todo[] {
  return todos.filter((todo) => !todo.completed);
}

/**
 * Get only the completed (done) todos.
 *
 * Filters out anything that has completed === false.
 *
 * @param todos - The full list of todos.
 * @returns A new array containing only the completed todos.
 */
export function getCompletedTodos(todos: Todo[]): Todo[] {
  return todos.filter((todo) => todo.completed);
}

