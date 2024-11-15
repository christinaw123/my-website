document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const err = document.getElementById("error-message");
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");
  const clearAllBtn = document.getElementById("clear-all");
  const searchInput = document.getElementById("search-input");

  // Add Task
  addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();

      if (!taskText) {
          // Show error if input is empty
          err.style.display = "block";
          setTimeout(() => err.style.display = "none", 2000);
          return;
      }

      // Hide error message and add task
      err.style.display = "none";

      const li = document.createElement("li");
      li.classList.add("task-item");
      li.innerHTML = `
          <input type="text" value="${taskText}" disabled class="task-content" />
          <button class="edit-task">Edit</button>
          <button class="delete-task">Delete</button>
      `;
      taskList.appendChild(li);

      // Clear input
      taskInput.value = "";
  });

  // Edit and Delete Tasks
  taskList.addEventListener("click", (e) => {
      const button = e.target;
      const li = button.closest("li");

      if (button.classList.contains("edit-task")) {
          const input = li.querySelector(".task-content");
          if (input.disabled) {
              input.disabled = false;
              input.focus();
              button.textContent = "Save";
          } else {
              input.disabled = true;
              button.textContent = "Edit";
          }
      } else if (button.classList.contains("delete-task")) {
          li.remove();
      }
  });

  // Clear All Tasks
  clearAllBtn.addEventListener("click", () => {
      taskList.innerHTML = "";
  });

  // Search for Tasks
  searchInput.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
      const tasks = taskList.querySelectorAll(".task-item");

      tasks.forEach((task) => {
          const taskContent = task.querySelector(".task-content").value.toLowerCase();
          if (taskContent.includes(searchValue)) {
              task.style.display = "flex"; // Show matching tasks
          } else {
              task.style.display = "none"; // Hide non-matching tasks
          }
      });
  });
});
