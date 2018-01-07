'use strict'
// Variables
let employees = null;

// Get employees from API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob',
  dataType: 'json',
  error: function() {
    console.error("Couldn't get random users from API");
  },
  success: function(data) {
    employees = data.results;
    displayEmployees();
  },
});

// Create employee card for each employee and add to employees div
function displayEmployees(){

  const employeesDiv = document.getElementById('employees');

  // for each (employee of employeeArray){
  for (let i = 0; i < employees.length; i++){

    // Variables
    const employee = employees[i];
    const employeeNumber = i;
    const portrait = employee.picture.large;
    const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
    const email = employee.email;
    const city = capitalizeWords(employee.location.city);
    const phone = employee.cell;
    const address = capitalizeWords(employee.location.street) + ', ' + employee.location.postcode;
    const birthday = employee.dob.substr(5, 2) + '/' + employee.dob.substr(8, 2) + '/' + employee.dob.substr(2, 2);
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
      displayEmployee(employeeNumber);
    });
  }
}

function displayEmployee(employeeNumber){

  console.log(employees[employeeNumber]);
  console.log(employeeNumber);

  // Variables
  const employee = employees[employeeNumber];

  const portrait = employee.picture.large;
  const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
  const email = employee.email;
  const city = capitalizeWords(employee.location.city);
  const phone = employee.cell;
  const address = capitalizeWords(employee.location.street) + ', ' + capitalizeWords(employee.location.city) + ' ' + employee.location.postcode;
  const birthday = 'Birthday: ' + employee.dob.substr(5, 2) + '/' + employee.dob.substr(8, 2) + '/' + employee.dob.substr(2, 2);

  const main = document.getElementById('main');

  //Create and display overlay div
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  main.appendChild(overlay);

  overlay.addEventListener('click', function(event){
    if (event.target !== this) {
      return;
    }
    else {
      overlay.remove();
    }
  });

  //Create and display the employee detailed card
  const hr = document.createElement('hr');
  const employeeCard = document.createElement('div');
  employeeCard.className = 'employee-card';
  overlay.appendChild(employeeCard);

  //Create close button
  const close = document.createElement('p');
  close.className = 'close-button';
  close.innerHTML = '&times;';
  close.addEventListener('click', function(){
    overlay.remove();
  });
  employeeCard.appendChild(close);

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

  employeeCard.appendChild(hr);

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

  //Create back and forvard buttons
  const previous = document.createElement('span');
  previous.className = 'browse-button';
  previous.innerHTML = '&lsaquo;'
  employeeCard.appendChild(previous);
  previous.addEventListener('click', function(){
    if ((employeeNumber - 1) < 0){
      overlay.remove();
      displayEmployee(employees.length -1);
    }
    else{
      overlay.remove();
      displayEmployee(employeeNumber - 1);
    }

  });

  const next = document.createElement('span');
  next.className = 'browse-button';
  next.innerHTML = '&rsaquo;'
  employeeCard.appendChild(next);
  next.addEventListener('click', function(){
    if ((employeeNumber + 1) > employees.length - 1){
      overlay.remove();
      displayEmployee(0);
    }
    else{
      overlay.remove();
      displayEmployee(employeeNumber + 1);

    }
  });

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
