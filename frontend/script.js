let editingUserId = null;
function getCall() {
  if (editingUserId) {
    // Update existing user
    axios
      .put(`http://localhost:3000/${editingUserId}`, {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
      })
      .then((res) => {
        console.log("User updated");
        fetchUsers();
        editingUserId = null;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // Create new user
    let username = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let myObj = {
      name: username,
      email: email,
      phone: phone,
    };

    axios
      .post("http://localhost:3000", myObj)
      .then((res) => {
        console.log(res);
        showUserOnScreen(res.data.newUserDetail);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

window.onload = function () {
  fetchUsers();
};

function fetchUsers() {
  axios
    .get("http://localhost:3000")
    .then((res) => {
      document.getElementById("listofitems").innerHTML = "";
      res.data.forEach((user) => {
        showUserOnScreen(user);
      });
      console.log(res.data, "res data");
    })
    .catch((err) => {
      console.log(err);
    });
}

function showUserOnScreen(user) {
  let parentElem = document.getElementById("listofitems");
  let childElem = document.createElement("li");
  childElem.className = "userListItem";
  childElem.textContent = `${user.name} - ${user.email} - ${user.phone}`;

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "Delete";
  deleteBtn.onclick = () => {
    parentElem.removeChild(childElem);
    axios
      .delete(`http://localhost:3000/${user.id}`)
      .then(() => {
        console.log("User deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";
  editButton.onclick = () => {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;
    editingUserId = user.id;
  };

  childElem.appendChild(deleteBtn);
  childElem.appendChild(editButton);
  parentElem.appendChild(childElem);
}
