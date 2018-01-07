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
    displayEmployees(employees);
  },
});

// Create employee card for each employee and add to employees div
function displayEmployees(employeeArray){

  const employeesDiv = document.getElementById('employees');

  // for each (employee of employeeArray){
  for (let i = 0; i < employeeArray.length; i++){

    // Variables
    const employee = employeeArray[i];

    const portrait = employee.picture.large;
    const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
    const email = employee.email;
    const city = capitalizeWords(employee.location.city);
    const phone = employee.cell;
    const address = capitalizeWords(employee.location.street) + ', ' + employee.location.postcode;
    const birthday = employee.dob.substr(5, 2) + '/' + employee.dob.substr(8, 2) + '/' + employee.dob.substr(2, 2);

    // const employee = {
    //   portrait  : employee.picture.large,
    //   name      :
    // }

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

    // Employee Email
    const employeeEmail = document.createElement('p');
    employeeEmail.innerHTML = email;
    employeeDetails.appendChild(employeeEmail);

    // Employee City
    const employeeCity = document.createElement('p');
    employeeCity.innerHTML = city;
    employeeDetails.appendChild(employeeCity);

    // Display more detailed employee info on click
    employeeCard.addEventListener('click', function(){
      displayEmployee(employee);
    });
  }
}

function displayEmployee(employee){
  // Variables
  const portrait = employee.picture.large;
  const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
  const email = employee.email;
  const city = capitalizeWords(employee.location.city);
  const phone = employee.cell;
  const address = capitalizeWords(employee.location.street) + ', ' + employee.location.city + ' ' + employee.location.postcode;
  const birthday = employee.dob.substr(5, 2) + '/' + employee.dob.substr(8, 2) + '/' + employee.dob.substr(2, 2);

  const main = document.getElementById('main');

  //Create and display overlay div
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  main.appendChild(overlay);

  overlay.addEventListener('click', function(){
    overlay.remove();
  });

  //Create and display the employee detailed card
  const hr = document.createElement('hr');
  const employeeCard = document.createElement('div');
  employeeCard.className = 'employee-card';
  overlay.appendChild(employeeCard);

  // Employee Portrait
  const employeePortrait = document.createElement('img');
  employeePortrait.className = 'portrait';
  employeePortrait.src = portrait;
  employeePortrait.alt = 'Portrait of ' + name;
  employeeCard.appendChild(employeePortrait);

  // Employee Name
  const employeeName = document.createElement('h2');
  employeeName.innerHTML = name;
  employeeCard.appendChild(employeeName);

  // Employee Email
  const employeeEmail = document.createElement('p');
  employeeEmail.innerHTML = email;
  employeeCard.appendChild(employeeEmail);

  // Employee City
  const employeeCity = document.createElement('p');
  employeeCity.innerHTML = city;
  employeeCard.appendChild(employeeCity);

  // Employee Phone
  const employeePhone = document.createElement('p');
  employeePhone.innerHTML = phone;
  employeeCard.appendChild(employeePhone);

  // Employee Address
  const employeeAddress = document.createElement('p');
  employeeAddress.innerHTML = address;
  employeeCard.appendChild(employeeAddress);

  // Employee Birthday
  const employeeBirthday = document.createElement('p');
  employeeBirthday.innerHTML = birthday;
  employeeCard.appendChild(employeeBirthday);

  //Create close button
  const close = document.createElement('span');
  close.className = 'close-card';
  close.innerHTML = '&times;';
  close.addEventListener('click', function(){
    overlay.remove();
  });
  employeeCard.appendChild(close);

  //Create back and forvard buttons

}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function capitalizeWords(string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// function createAndAppendNode(element, attribute, setting, parentNode){
//   const newNode = document.createElement(`'#{element}'`);
//   newNode.attribute = setting;
//   parentNode.appendChild(newNode);
// }
