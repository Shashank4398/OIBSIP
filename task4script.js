// Sample user database (normally you would use a database)
let users = [];

// Register function
document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let username = document.getElementById("registerUsername").value;
  let password = document.getElementById("registerPassword").value;

  // Check if username already exists
  if (users.some(user => user.username === username)) {
    document.getElementById("registrationError").innerText = "Username already exists!";
  } else {
    // Store user securely (in real scenarios, use proper password hashing)
    users.push({ username: username, password: password });
    alert("Registration successful!");
    document.getElementById("registrationForm").reset();
    document.getElementById("registrationError").innerText = "";
  }
});

// Login function
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let username = document.getElementById("loginUsername").value;
  let password = document.getElementById("loginPassword").value;

  // Check if user exists and password matches
  let user = users.find(user => user.username === username && user.password === password);
  if (user) {
    alert("Login successful!");
    window.location.href = "secure.html"; // Redirect to secured page
  } else {
    document.getElementById("loginError").innerText = "Invalid username or password!";
  }
});
