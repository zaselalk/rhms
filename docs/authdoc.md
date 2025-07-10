## User Authentication
 - Mainly there are two types of users in our system
    - Staff users
    - Resident User
    - Super admin

**Staff Users**: Users that having higher permission to manage the system, they got the permission according to the permission assign to them when the account is created, 
which can be altered later on.

**Resident User** : This type of users, only have the permission for their own account, some fields also limited to view/alter.

### Permission Table 

#### User
- User management only available for `super_admin`

#### Role
- Role management only available for `super_admin`

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

#### Clinic Session
Permission String | Description
------------------|-------------
`clinic-session:create` | Able to create new Clinic
`clinic-session:view` | Able to view indivitual Clinic
`clinic-session:edit` | Able to edit Clinic information
`clinic-session:delete` | delete the Clinic data
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
