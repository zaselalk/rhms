# Resident Health Monitoring System

![image](https://github.com/user-attachments/assets/a835b7aa-1899-4636-8f87-a29e480f760c)

## Developer Document

Devloper Doc : [Developer Doc](/docs)
<br>
UI Designs : [UI Designs](/docs/UIDesigns.md)

Overview

The Village-Hospital Management System is a digital platform designed to streamline healthcare services by connecting hospitals with villages through Grama Niladhari divisions. This system enables efficient patient tracking, medical record management, and village population monitoring to ensure better healthcare accessibility and organized resource distribution.

Features

Patient Registration & Tracking: Record patient details and track their medical history.
Hospital Connectivity: Connects hospitals with villages for seamless healthcare service management.
Grama Niladhari-Based Management: Organizes village populations into Grama Niladhari divisions for structured data handling.
Data Analytics & Reports: Provides insights into health trends and resource needs in villages.

Technologies Used

Backend: Node.js (Express.js)
Frontend: React (typescript) + mantine UI
Database: MySQL (sequelize)
Authentication:passport.js
Hosting & Deployment: Azure

### Contributors

- Asela Priyadarshana - User management, resident login, resident profile
- Ravindu Harshana - Dashboard, Resident Management, Household
- Ashfa Nisthar - Clinic Management, Division management
- Dilukshi Nimasha - Disease Management, Household

## Github workflow

| Merge Type       | Use for               | Notes                                      |
| ---------------- | --------------------- | ------------------------------------------ |
| **Squash**       | `feature/*` → `stage` | Clean up messy dev commits                 |
| **Rebase**       | `stage` → `beta`      | Curate commits into meaningful units       |
| **Merge commit** | `beta` → `main`       | Preserves history, makes PR diffs accurate |

=======
