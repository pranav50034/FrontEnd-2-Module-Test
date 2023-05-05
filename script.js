const searchBar = document.getElementById("searchBar");
const tableBody = document.getElementById("tableBody");
const url =
   "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
const normieSection = document.getElementById("normieTable");
const genderSection = document.getElementById("genderTable");
const maleTable = document.getElementById("maleTableBody");
const femaleTable = document.getElementById("femaleTableBody");

async function fetchData() {
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const promise = await fetch(url);
   const response = await promise.json();

   response.forEach((element) => {
      const row = createRow(element);
      tableBody.appendChild(row);
   });
}

function createRow(element) {
   const row = document.createElement("tr");

   const idTab = document.createElement("td");
   idTab.textContent = element.id;
   row.appendChild(idTab);

   const nameTab = document.createElement("td");
   nameTab.className = "nameTab";
   const icon = document.createElement("img");
   icon.src = element.img_src;
   icon.className = "icon";
   icon.style.borderRadius = "50%";
   icon.style.border = "1px solid black";
   nameTab.appendChild(icon);
   const nameSpan = document.createElement("span");
   nameSpan.innerText = element.first_name + " " + element.last_name;
   nameTab.appendChild(nameSpan);
   row.appendChild(nameTab);

   const genderTab = document.createElement("td");
   genderTab.innerText = element.gender;
   row.appendChild(genderTab);

   const classTab = document.createElement("td");
   classTab.innerText = element.class;
   row.appendChild(classTab);

   const marksTab = document.createElement("td");
   marksTab.innerText = element.marks;
   row.appendChild(marksTab);

   const passingTab = document.createElement("td");
   if (element.passing === true) {
      passingTab.innerText = "Passed";
   } else {
      passingTab.innerText = "Failed";
   }

   row.appendChild(passingTab);

   const emailTab = document.createElement("td");
   emailTab.innerText = element.email;
   row.appendChild(emailTab);

   return row;
}

async function searchUser(e) {
   e.preventDefault();
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const searchString = searchBar.value.toLowerCase();
   if (searchString === "") {
      alert("Please enter valid student details");
      tableBody.innerHTML = "";
      fetchData();
      return;
   }

   const promise = await fetch(url);
   const response = await promise.json();
   tableBody.innerHTML = "";

   response.forEach((element) => {
      if (
         element.first_name.toLowerCase().includes(searchString) ||
         element.last_name.toLowerCase().includes(searchString) ||
         element.email.toLowerCase().includes(searchString)
      ) {
         console.log();
         const row = createRow(element);
         tableBody.appendChild(row);
         searchBar.value = "";
      }
   });
   if (tableBody.innerHTML === "") {
      alert("NO STUDENT FOUND");
      fetchData();

      searchBar.value = "";
   }
}

async function sortAsc(e) {
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const promise = await fetch(url);
   const response = await promise.json();
   tableBody.innerHTML = "";

   const sortedData = response.sort((a, b) => {
      const firstNameA = a.first_name.toUpperCase();
      const firstNameB = b.first_name.toUpperCase();
      if (firstNameA < firstNameB) {
         return -1;
      }
      if (firstNameA > firstNameB) {
         return 1;
      }
      return 0;
   });
   sortedData.forEach((element) => {
      const row = createRow(element);
      tableBody.appendChild(row);
   });
}

async function sortDsc(e) {
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const promise = await fetch(url);
   const response = await promise.json();
   tableBody.innerHTML = "";

   const sortedData = response.sort((a, b) => {
      const firstNameA = a.first_name.toUpperCase();
      const firstNameB = b.first_name.toUpperCase();
      if (firstNameA > firstNameB) {
         return -1;
      }
      if (firstNameA < firstNameB) {
         return 1;
      }
      return 0;
   });
   sortedData.forEach((element) => {
      const row = createRow(element);
      tableBody.appendChild(row);
   });
}

async function sortMarks(e) {
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const promise = await fetch(url);
   const response = await promise.json();
   tableBody.innerHTML = "";

   const sortedData = response.sort((a, b) => {
      const marksA = a.marks;
      const marksB = b.marks;
      if (marksA < marksB) {
         return -1;
      }
      if (marksA > marksB) {
         return 1;
      }
      return 0;
   });
   sortedData.forEach((element) => {
      const row = createRow(element);
      tableBody.appendChild(row);
   });
}

async function sortPass(e) {
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const promise = await fetch(url);
   const response = await promise.json();
   tableBody.innerHTML = "";

   response.forEach((element) => {
      if (element.passing === true) {
         const row = createRow(element);
         tableBody.appendChild(row);
      }
   });
}

async function sortClass(e) {
   normieSection.style.display = "flex";
   genderSection.style.display = "none";
   const promise = await fetch(url);
   const response = await promise.json();
   tableBody.innerHTML = "";

   const sortedData = response.sort((a, b) => {
      const classA = a.class;
      const classB = b.class;
      if (classA < classB) {
         return -1;
      }
      if (classA > classB) {
         return 1;
      }
      return 0;
   });
   sortedData.forEach((element) => {
      const row = createRow(element);
      tableBody.appendChild(row);
   });
}

async function sortGender(e) {
   normieSection.style.display = "none";
   // console.log(normieSection.style);
   genderSection.style.display = "flex";
   // console.log(genderSection.style);
   const promise = await fetch(url);
   const response = await promise.json();
   femaleTable.innerHTML = "";
   maleTable.innerHTML = "";
   response.forEach((element) => {
      if (element.gender === "Male") {
         const row = createRow(element);
         maleTable.appendChild(row);
      } else if (element.gender === "Female") {
         const row = createRow(element);
         femaleTable.appendChild(row);
      }
   });
}
