# Playwright Test Automation for Funda

## Overview

This project is an automated test suite for the Funda platform using Playwright. It follows best practices such as the **Page Object Model (POM)** and **environment-based configuration** to ensure secure and scalable testing.

## Project Structure

```
funda/                  # Root project directory
│── .github/            # (Optional) GitHub workflows or issue templates      
│── playwright-report/  # Playwright test reports
│── src/                # Source code
│   ├── page-objects/   # Page Object Model (POM) files
│   │   ├── BasePage.js
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── AccountPage.js
│   ├── utils/          # Utility functions
│   │   ├── logger.js   # Logging with Winston
│   │   ├── test-config.js # Test configuration (loads env variables)
│── tests/              # Test files
│   ├── smoke-tests/
│   │   ├── authentication.spec.js
│   │   ├── example.spec.js
│── .env                # Environment variables (ignored in Git)
│── .env.example        # Example env file (without real credentials)
│── .gitignore          # Files and folders to ignore in Git
│── package.json        # Node.js dependencies
│── package-lock.json   # Lockfile for npm dependencies
│── playwright.config.js # Playwright test configuration
│── README.md           # Project documentation
```
---

## Pre-Installation Steps

Before setting up the project, ensure you have Node.js and npm installed:

1️⃣ Install [Node.js](https://nodejs.org/en/) LTS version


2️⃣ Verify Node.js installation:
```sh
node -v
```
3️⃣ Verify npm installation:
```sh
npm -v
```
Once Node.js and npm are installed, proceed to the installation steps below.


---

## ️ Installation & Setup

### **1. Clone the Repository**

```sh
git clone https://github.com/viramurachova/funda.git
cd funda
```

### **2. Install Dependencies**

```sh
npm install
npm install dotenv
npm install winston
```

- **`dotenv`**: Loads environment variables from a `.env` file.
- **`winston`**: Logger for structured logging.

### **3. Configure Environment Variables**

Copy the example `.env.example` file and create your own `.env` file:

```sh
cp .env.example .env
```
Example `.env`:

```dotenv
USER_AGENT=
LOGIN_EMAIL=
LOGIN_PASSWORD=
```
Edit the `.env` file and add your credentials (never commit this file to Git!).

---

##  Configuration

### **Playwright Configuration (`playwright.config.js`)**

- Defines test settings such as base URL, browser type, retries, and parallel execution.
- Includes a **User-Agent** override for simulating different devices.

Example snippet:

```js
export default defineConfig({
  use: {
    baseURL: 'https://www.funda.nl/en',
    userAgent: process.env.USER_AGENT || 'default-user-agent',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } },
    },
  ],
});
```

---

##  Handling Secure Information

### **Best Practices**

1. **Use Environment Variables** (`.env`) for sensitive data like credentials.
2. **Never Commit `.env` to Git** – it should be in `.gitignore`.
3. **Use `.env.example` to show required variables without exposing actual values.**
4. **Access environment variables dynamically in tests**:

```js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.funda.nl/',
  testUserEmail: process.env.LOGIN_EMAIL,
  testUserPassword: process.env.LOGIN_PASSWORD,
};
```

---

##  Handling Robot Detection on Funda Website

### **Why is this needed?**
The **Funda** website employs **robot detection** mechanisms to prevent automated interactions. One common detection method is checking the **User-Agent** string. By default, Playwright uses a headless browser configuration, which can trigger anti-bot defenses.

### **How do we bypass robot detection?**
To avoid detection, we **override the default Playwright User-Agent** with a realistic browser User-Agent string.

### **Implementation Breakdown**

#### **1️⃣ `.env.example` & `.env` Files**
- The `USER_AGENT` is defined here and can be modified **without changing the code**.
- The `.env.example` file is committed to the repository, showing which environment variables are required.
- The `.env` file (containing real values) is ignored in `.gitignore` to **protect sensitive data**.

```plaintext
USER_AGENT=***
```

#### **2️⃣ `test-config.js` (Loading User-Agent from `.env`)**

```js
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.funda.nl/',
  userAgent: process.env.USER_AGENT || 'default-user-agent',
};
```

#### **3️⃣ `playwright.config.js` (Passing User-Agent to Playwright)**

```js
export default defineConfig({
  use: {
    baseURL: 'https://www.funda.nl/en',
    userAgent: process.env.USER_AGENT || 'default-user-agent',
  },
});
```

#### **4️⃣ Applying the User-Agent in a Custom Browser Context (`test-config.js`)**

```js
export const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      userAgent: config.userAgent,
    });
    const page = await context.newPage();
    await use(page);
  },
});
```
## Why Should All Three Approaches Be Used?

Each approach plays a specific role in ensuring that our test automation runs smoothly while bypassing Funda’s robot detection. While some projects might rely on just one method, using all three together provides a robust and flexible solution:

### Breakdown of Each Approach:

-  **.env** → Keeps the User-Agent configurable without modifying the code.


-  **test-config.js** → Ensures the User-Agent applies dynamically to all browser sessions.


- **playwright.config.js** → Sets a default value for all tests.

### Best Practice Justification:

 - **Using only .env + test-config.js**

 Loses global configuration benefits from playwright.config.js

- **Using only .env + playwright.config.js**

 Loses flexibility in modifying headers dynamically

- **Using only playwright.config.js**

 Loses the ability to update the User-Agent easily without modifying code

#### By combining all three, we achieve a configurable, flexible, and scalable solution for handling Funda’s robot detection effectively.

## Running Tests

### **Run All Tests**

```sh
npx playwright test
```

### **Run in UI Mode**

```sh
npx playwright test --ui
```

### **Run a Specific Test File**

```sh
npx playwright test tests/smoke-tests/authentication.spec.js
```

---

##  Logging & Reporting

- **Logging:** Winston is used for structured logging (`logger.js`).
- **Test Reports:** Playwright generates HTML reports after execution.

To view reports:

```sh
npx playwright show-report
```

---

### ✅ **You're all set! Happy testing! 🚀**

This project is for internal testing purposes and follows company policies on security and privacy.

---

