// Userlist data array for filling in info box
var userListData = [];
// var fs = require('fs');
// var multer = require('multer');
// var upload = multer({ dest: 'uploads/'});

// DOM Ready =================================
$(document).ready(() => {
	// Populate the user table on initial page load
	populateTable();
});

// Username link click
$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

// Add User button click
$('#btnAddUser').on('click', addUser);

// Delete User link click
$('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

// Functions ==================================

// Fill table with data
function populateTable() {

	// Empty content string
	var tableContent = '';

	// jQuery AJAX call for JSON
	$.getJSON( '/users/userlist', (data) => {
		// Stick our user data array into a userlist variable in the global object
		userListData = data;
		// For each item in our JSON, add a table row and cells to the content string
		$.each(data, (i,val) => {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowuser" rel="' + val.username + '">' + val.username + '</a></td>';
			tableContent += '<td>' + val.email + '</td>';
			tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + val._id + '">delete</a></td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#userList table tbody').html(tableContent);
	});
};

// Show User Info
function showUserInfo(e) {
	// Prevent Link from Firing
	e.preventDefault();

	// Retrieve username from link rel attribute
	var thisUserName = $(this).attr('rel');

	// Get Index of object based on id value
	var arrayPosition = userListData.map((arrayItem) => {
		return arrayItem.username;
	}).indexOf(thisUserName);

	// Get our User Object
	var thisUserObject = userListData[arrayPosition];

	// Populate Info Box
	$('#userInfoName').text(thisUserObject.fullname);
	$('#userInfoAge').text(thisUserObject.age);
	$('#userInfoGender').text(thisUserObject.gender);
	$('#userInfoLocation').text(thisUserObject.location);
	$('#userInfoImage').html('<img src="' + thisUserObject.image + '" />');
};

// Add User
function addUser(e) {
	e.preventDefault();

	// Super basic validation - increase errorCount variable if any fields are blank
	var errorCount = 0;
	$('#addUser input').each((index, val) => {
		if(val === '') {errorCount++; }
	});

	// Check and make sure errorCount's still at zero
	if(errorCount === 0) {

		// If it is, compile all user info into one object
		console.log($('called addUser inside global.js'));
		var newUser = {
			'username': $('#addUser fieldset input#inputUserName').val(),
			'email': $('#addUser fieldset input#inputUserEmail').val(),
			'fullname': $('#addUser fieldset input#inputUserFullname').val(),
			'age': $('#addUser fieldset input#inputUserAge').val(),
			'location': $('#addUser fieldset input#inputUserLocation').val(),
			'gender': $('#addUser fieldset input#inputUserGender').val(),
			'image': $('#addUser fieldset input#inputUserImage').val()
		}

		// Use AJAX to post the object to our adduser service
		$.ajax({
			type: 'POST',
			data: newUser,
			url: '/users/adduser',
			dataType: 'JSON'
		}).done((response) => {

			// Check for successful (blank) response
			if (response.msg === '') {
				// Clear form inputs
				$('#addUser fieldset input').val('');

				// Update the table
				populateTable();
			}
			else{
				// If something goes wrong, alert the err message that our service returned
				alert('Error: ' + response.msg);
			}
		});
	}
	else {
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}
};

// Delete User
function deleteUser (e) {
	e.preventDefault();

	// Pop up a confirmation dialog
	var confirmation = confirm('Are you sure you want to delete this user?');

	// Check and make sure the user confirmed
	if (confirmation === true) {

		// If they did, do our delete
		$.ajax({
			type: 'DELETE',
			url: '/users/deleteuser/' + $(this).attr('rel')
		}).done( (resp) => {

			// Check for a successful (blank) response
			if(resp.msg === '') {
			}else{
				alert('Error: ' + resp.msg);
			}
			// Update the table
			populateTable();
		})
	}
}



















