## User Authentication
 - Mainly there are two types of users in our system
    - Staff users
    - Resident User

**Staff Users**: Users that having higher permission to manage the system, they got the permission according to the permission assign to them when the account is created, 
which can be altered later on.

**Resident User** : This type of users, only have the permission for their own account, some fields also limited to view/alter.

### Permission Table 

#### User
Permission String | Description
------------------|-------------
`user:view` | Able to view all users including indivitual users
`user:edit` | Able to edit user information including password
`user:delete`| Able to delete users
`user:create` | Able to add new staff user to the system. <br> **Note: Only When the user adding he able to assign any role for any other user.**
---

#### Role
Permission String | Description
------------------|-------------
`role:create` | Able to create new role
`role:delete` | Able to delete excting role
---

#### Dashboard
Permission String | Description
------------------|-------------
`dashboard:view` | View dashboard
---

#### Disease
Permission String | Description
------------------|-------------
`disease:create` | Able to create new disease
`disease:view` | Able to view indivitual disease data
`disease:edit` | Able to edit disease information
`disease:delete` | delete the disease data
---

#### HouseHold
Permission String | Description
------------------|-------------
`household:create` | Able to create new household
`household:view` | Able to view indivitual household
`household:edit` | Able to edit household information
`household:delete` | delete the household data
---


#### Residents
Permission String | Description
------------------|-------------
`resident:create` | Able to create new Resident 
`resident:view` | Able to view indivitual Resident
`resident:edit` | Able to edit Resident information
`resident:delete` | delete the Resident data
---

#### Clinic
Permission String | Description
------------------|-------------
`clinic:create` | Able to create new Clinic
`clinic:view` | Able to view indivitual Clinic
`clinic:edit` | Able to edit Clinic information
`clinic:delete` | delete the Clinic data
---

#### Division 
Permission String | Description
------------------|-------------
`clinic:create` | Able to create new Division 
`clinic:delete` | delete the Clinic Division
---




- If the login resident is owner of the specific house that owner should be able to manage that household, but in order to improve the data integrity and improve the privacy if that residents have separate account,
they can control whether the house owner able to view and edit their personal health data.
- 
