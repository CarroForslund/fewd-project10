'use strict'

// Get employees from API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob',
  dataType: 'json',
  error: function() {
    console.error("Couldn't get random users from API");
  },
  success: function(data) {
    const employees = data.results;
    console.log(employees);
    displayEmployees(employees);
  },
});

// Create employee card for each employee and add to employees div
function displayEmployees(employeeArray){

  function capitalizeWords(string) {
    return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  const employeesDiv = document.getElementById('employees');

  // for each (employee of employeeArray){
  for (let i = 0; i < employeeArray.length; i++){

    // Variables
    const employee = employeeArray[i];
    console.log(employee);
    const portrait = employee.picture.large;
    const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
    const email = employee.email;
    const city = capitalizeWords(employee.location.city);

    // Employee Card
    const employeeCard = document.createElement('div');
    employeeCard.className = 'employee-card';
    employeesDiv.appendChild(employeeCard);

    // Employee Portrait
    const employeePortrait = document.createElement('img');
    employeePortrait.className = 'portrait';
    employeePortrait.src = portrait;
    employeePortrait.alt = 'Portrait of ' + name;
    employeeCard.appendChild(employeePortrait);

    // Details Div
    const employeeDetails = document.createElement('div');
    employeeDetails.className = 'details';
    employeeCard.appendChild(employeeDetails);

    // Employee Name
    const employeeName = document.createElement('h2');
    employeeName.innerHTML = name;
    employeeDetails.appendChild(employeeName);

    // Employee email
    const employeeEmail = document.createElement('p');
    employeeEmail.innerHTML = email;
    employeeDetails.appendChild(employeeEmail);

    // Employee City
    const employeeCity = document.createElement('p');
    employeeCity.innerHTML = city;
    employeeDetails.appendChild(employeeCity);

    employeeCard.addEventListener('click', function(){
      console.log('Hello ' + name);
    });

  }

}
