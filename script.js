const students = [
	{
		ID: 1,
		name: "Alice",
		age: 21,
		grade: "A",
		degree: "Btech",
		email: "alice@example.com",
	},
	{
		ID: 2,
		name: "Bob",
		age: 22,
		grade: "B",
		degree: "MBA",
		email: "bob@example.com",
	},
	{
		ID: 3,
		name: "Charlie",
		age: 20,
		grade: "C",
		degree: "Arts",
		email: "charlie@example.com",
	},
];

const container = document.getElementById("container");
const studentList = document.getElementById("studentList");
const studentForm = document.getElementById("studentForm");
const submitBtn = document.getElementById("submitBtn");
const searchInput = document.getElementById("searchInput");

// Function to generate the student list table
function generateStudentList(filteredStudents = students) {
	studentList.innerHTML = "";

	filteredStudents.forEach((student) => {
		const row = document.createElement("tr");
		row.innerHTML = `
		<td>${student.ID}</td>
		<td>${student.name}</td>
		<td>${student.email}</td>
		<td>${student.age}</td>
		<td>${student.grade}</td>
		<td class="last">${student.degree}</td>
		<td class="last">
		
		  <button class="editBtn" data-id="${student.ID}"></button>
		  <button class="deleteBtn" data-id="${student.ID}"></button>
		</td>
	  `;

		row.querySelector(".editBtn").addEventListener("click", editStudent);
		row.querySelector(".deleteBtn").addEventListener("click", deleteStudent);

		studentList.appendChild(row);
	});
}

// Function to reset the form
function resetForm() {
	studentForm.reset();
	submitBtn.innerText = "Add Student";
	submitBtn.style.backgroundColor = "white";
	submitBtn.style.color = "black";
}

// Function to add or edit a student
function addEditStudent(event) {
	event.preventDefault();

	const studentId = document.getElementById("studentId").value;
	const name = document.getElementById("name").value;
	const age = document.getElementById("age").value;
	const grade = document.getElementById("grade").value;
	const degree = document.getElementById("degree").value;
	const email = document.getElementById("email").value;

	if (name && age && grade && degree && email) {
		const student = {
			ID: studentId || students.length + 1,
			name,
			age,
			grade,
			degree,
			email,
		};

		if (studentId) {
			// Edit existing student
			const index = students.findIndex((s) => s.ID == studentId);
			if (index !== -1) {
				students[index] = student;
				alert("Student updated successfully.");
			}
		} else {
			// Add new student
			students.push(student);
			alert("Student added successfully.");
		}

		generateStudentList();
		resetForm();
	} else {
		alert("Please fill in all the fields.");
	}
}

// Function to delete a student
function deleteStudent(event) {
	const studentId = event.target.getAttribute("data-id");
	const index = students.findIndex((student) => student.ID == studentId);
	if (index !== -1) {
		students.splice(index, 1);
		alert("Student deleted successfully.");
		generateStudentList();
	}
}

// Function to populate the form for editing a student
function editStudent(event) {
	const studentId = event.target.getAttribute("data-id");
	const student = students.find((student) => student.ID == studentId);
	if (student) {
		document.getElementById("studentId").value = student.ID;
		document.getElementById("name").value = student.name;
		document.getElementById("age").value = student.age;
		document.getElementById("grade").value = student.grade;
		document.getElementById("degree").value = student.degree;
		document.getElementById("email").value = student.email;
		submitBtn.innerText = "Edit Student";

		submitBtn.style.backgroundColor = "black";
		submitBtn.style.color = "white";
		submitBtn.style.border = "1px solid white";
	}
}

// Function to filter the student list based on search query
function searchStudents() {
	const query = searchInput.value.toLowerCase();
	const filteredStudents = students.filter(
		(student) =>
			student.name.toLowerCase().includes(query) ||
			student.email.toLowerCase().includes(query) ||
			student.degree.toLowerCase().includes(query)
	);
	generateStudentList(filteredStudents);
}

// Event listeners
studentForm.addEventListener("submit", addEditStudent);
searchInput.addEventListener("input", searchStudents);

// Initial generation of student list
generateStudentList();
