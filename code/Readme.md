# Cyber Threat Monitoring System for India's CII

This repository contains the codebase for a **Real-Time Cyber Threat Monitoring System** aimed at protecting India's Critical Information Infrastructure (CII). It utilizes in-house machine learning models and web scraping to monitor, classify, and respond to potential cyber threats.

## Project Structure

1. **Threat Monitoring System:** Backend responsible for scraping, analyzing, and classifying potential cyber threats.
2. **Web Application:** Frontend and backend components for user interaction, providing a dashboard and reporting interface for monitoring threats.

## Key Achievements

- [x] **Task 1:** Developed a real-time threat detection engine that monitors over **100,000 sources**, including forums, news platforms, and social media.
- [x] **Task 2:** Implemented a machine learning-powered threat classification system with **95% accuracy** in identifying potential risks.
- [x] **Task 3:** Deployed a secure, in-house infrastructure to ensure **100% data sovereignty** and fast response times.
- [x] **Task 4:** Built an interactive dashboard that provides real-time threat alerts and comprehensive reports for stakeholders.

## Technology Stack

This project leverages the following technologies:
<!-- TODO: Update and append ML and backend tech stack here -->
- **[Next.js](https://nextjs.org/):** A powerful framework for building server-rendered React applications.
- **[Typescript](https://www.typescriptlang.org/):** Enhances JavaScript with type safety, reducing bugs and improving code maintainability.
- **[Node.js](https://nodejs.org/en):** Backend runtime built on Chrome's V8 JavaScript engine, optimized for scalability and speed.
- **[MongoDB](https://www.mongodb.com/):** NoSQL database used to store threat data, enabling flexible and scalable data management.
- **[RTK (Redux Toolkit)](https://redux-toolkit.js.org/):** State management library for React, ensuring efficient data flow across the app.
- **[NextUI](https://nextui.org/):** A library for sleek and responsive UI components, ensuring a polished user experience.
- **[Tailwind CSS](https://tailwindcss.com/):** Utility-first CSS framework, enabling rapid UI design and development.
- **[Nodemailer](https://www.npmjs.com/package/nodemailer):** Allows the system to send automated email alerts for critical threat updates.
- **[JWT](https://jwt.io/):** Used for secure authentication, ensuring only authorized users have access to sensitive threat data.
- **[Langchain](https://python.langchain.com/v0.2/docs/introduction/):** Framework for utilizing large language models to aid in threat analysis and classification.

## Key Features

- **Real-Time Threat Detection:** Monitors multiple data sources, including social media and forums, to identify potential threats in real time.
- **Automated Threat Classification:** Uses machine learning to categorize threats (e.g., malware, phishing, ransomware) and flag critical issues.
- **In-House Deployment:** Ensures data privacy and national security by hosting models and data processing servers locally.
- **Comprehensive Reporting Dashboard:** Offers a user-friendly interface for stakeholders to view real-time threat alerts, threat history, and detailed reports.

## Local Setup Instructions

Follow these steps to run the project locally.

### 1. Clone the Repository

<!-- TODO: Changes to make here  -->
```bash
git clone https://github.com/avneets2103/SIH_INTERNAL_Round_2_HackSmiths
cd SIH_INTERNAL_Round_2_HackSmiths
```
### 2. Run the Website
#### 2.1 . Backend
Follow these steps to set up and run the backend locally:

1. **Install Dependencies**

   Once you are inside the backend directory, install the necessary dependencies:

   ```bash
   cd Website/Backend
   npm install
   ```

2. **Configure Environment Variables**

   Obtain the .env file containing the necessary environment variables from a secure source or create your own. Ensure that it includes the following variables:
   <!-- TODO: Add the env file here -->
   ```bash
   
   ```
   Place this .env file in the root directory of the backend project.

3. **Start the Server**

   To start the server, run the following command:

   ```bash
   npm run dev
   ```   
   This will start the server on port 4000 and you can access it by visiting http://localhost:4000 in your web browser.

#### 2.2 . Frontend
1. **Install Dependencies**

   Once you are inside the backend directory, install the necessary dependencies:

   ```bash
   cd Website/Frontend
   npm install
   ```

2. **Start the Server**

   To start the server, run the following command:

   ```bash
   npm run dev
   ```   
   This will start the server on port 3000 and you can access it by visiting http://localhost:3000 in your web browser.


<!-- TODO: Local setup of python server here -->
### 3. Run the Python server
```bash
cd PythonServer
pip install -r requirements.txt
python api.py
```
The backend will run on port 4000.
Create an .env file with the following content:
<!-- TODO: Add the env file here -->
```

```
