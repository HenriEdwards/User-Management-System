# Credential Management Web App

This is a web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) to address the credential management needs of Cool Tech. 
This project aims to be a centralized system to manage login details across multiple continents, languages, and websites. 
The application supports various types of credentials, including login details for WordPress sites, servers, financial accounts, and more.

## Features

The Credential Management Web App offers the following features:

- User Authentication: Users can register and log in to the application securely.
- User Roles: Different user roles are available to ensure proper access control and permissions management.
- Organizational Units (OU): The following five OUs are defined within Cool Tech:
  - News Management
  - Software Reviews
  - Hardware Reviews
  - Opinion Publishing
- Access Control: All employees within a division have access to their respective division's credential repository.

## Database 
The database Users_DB, uses 4 collection:
- credentials, fields: (_id, division id(used to link to a specific division), credentials list)
- divisions, fields: (_id, division name, OU id (used to link to a specific OU))
- ous, fields: (_id, OU name)
- users, fields: (_id, username, password, role, divisions ids list (to link user to a specific division), OUs ids list (to link user to a specific OU))

- Express uses mongoose models/schemas to interact with the database.

- 44 Divisions, 11 divisions for each OU, Sample data used
- All divisions has a credential repo added/connected, although some doesn't have any credentials(doesnt matter)

## Security

- JWT enabled, password encryption enabled
- Permission control through the web app
- PORT, MongoDB database url connection, JWT secret token stored in .env

## Usage

To use the app locally.
Navigate to the backend & frontend via a terminal and type in both. 'npm install'
Then in the frontend via terminal type 'npm run dev', and then backend 'npm run dev'

## Testing information

- Access granted to any ip address for MongoDB

Sample users

Admin
username: 'henri'
password: 'justlogin'

Management
username: 'jack'
password: 'superpassword'

Normal
username: 'james'
password: 'test123'