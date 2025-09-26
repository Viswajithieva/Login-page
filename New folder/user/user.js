// Sample user data
let users = [
  { name: "Arun", email: "arun@example.com", initials: "AR", phone: "9876543210", role: "Admin", status: "Active", title: "Manager" },
  { name: "Ravi", email: "ravi@example.com", initials: "RV", phone: "9876541111", role: "User", status: "Inactive", title: "Developer" },
];

const rowsPerPage = 10;
let currentPage = 1;

const tableBody = document.getElementById("userTableBody");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

function renderTable() {
  let filteredUsers = users.filter(user => {
    const searchValue = searchInput.value.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);

    const matchesStatus =
      statusFilter.value === "all" || user.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  currentPage = Math.min(currentPage, totalPages);

  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(start, end);

  tableBody.innerHTML = "";
  paginatedUsers.forEach((user, index) => {
    const row = `<tr>
      <td>${start + index + 1}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.initials}</td>
      <td>${user.phone}</td>
      <td>${user.role}</td>
      <td class="${user.status === "Active" ? "status-active" : "status-inactive"}">${user.status}</td>
      <td>${user.title}</td>
      <td><button onclick="deleteUser(${start + index})">Delete</button></td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

{/*Delete user*/}

function deleteUser(index) {
  users.splice(index, 1);
  renderTable();
}

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderTable();
});

statusFilter.addEventListener("change", () => {
  currentPage = 1;
  renderTable();
});

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  renderTable();
});

{/*Modal handling*/}

const modal = document.getElementById("userModal");
const addUserBtn = document.getElementById("addUserBtn");
const closeModal = document.getElementById("closeModal");
const userForm = document.getElementById("userForm");

addUserBtn.onclick = () => (modal.style.display = "block");
closeModal.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};

{/*Add new user*/}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newUser = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    initials: document.getElementById("initials").value,
    phone: document.getElementById("phone").value,
    role: document.getElementById("role").value,
    status: document.getElementById("status").value,
    title: document.getElementById("title").value,
  };

  users.push(newUser);
  userForm.reset();
  modal.style.display = "none";
  renderTable();
});

renderTable();
