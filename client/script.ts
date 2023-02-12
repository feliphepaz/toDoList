import axios from "axios";

const list = document.querySelector(".list");
const createInput = document.querySelector(".create");

interface taskProps {
  completed: number;
  createdAt: string;
  id: number;
  message: string;
  updateAt: string;
}

// Get list
async function getList() {
  let completeButtons: Array<HTMLElement> = [];
  let deleteButtons: Array<HTMLElement> = [];

  const response = await axios.get("http://localhost:8080/list");
  const { data } = response;
  if (response.status === 200) {
    data.forEach((item: taskProps) => {
      // Create elements
      let li = document.createElement("li");
      let span = document.createElement("span");
      let p = document.createElement("p");
      let button = document.createElement("button");

      // Set text to elements
      p.innerText = item.message;
      button.innerText = "X";

      // Set attribute to elements
      span.setAttribute("data-task", item.message);

      // Set id to elements
      span.id = item.id.toString();
      button.id = item.id.toString();

      // Add buttons in array
      completeButtons.push(span);
      deleteButtons.push(button);

      // Add tasks in list
      li.appendChild(span);
      li.appendChild(p);
      li.appendChild(button);
      list?.appendChild(li);

      // Styling complete tasks
      if (item.completed) {
        span.classList.add("completed");
      }
    });

    completeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!button.classList.contains("completed")) {
          completeTask(button.dataset.task, 1, +button.id);
          button.classList.add("completed");
        }
      });
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        deleteTask(+button.id);
      });
    });
  }
}

getList();

// Create task
createInput?.addEventListener("keypress", (e: KeyboardEventInit) => {
  const input = createInput as HTMLInputElement;
  if (e.key === "Enter") {
    createTask(input.value);
  }
});

async function createTask(message: string) {
  const response = await axios.post("http://localhost:8080/list/register", {
    message,
  });
  if (response.status === 200) {
    window.location.reload();
  }
}

// Complete task
async function completeTask(
  message: string | undefined,
  completed: number,
  id: number
) {
  await axios.put("http://localhost:8080/list/edit", {
    message,
    completed,
    id,
  });
}

// Delete task
async function deleteTask(id: number) {
  const response = await axios.put("http://localhost:8080/list/delete", {
    id,
  });
  if (response.status === 200) {
    window.location.reload();
  }
}
