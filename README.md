# Travel Management System Backend

## Overview
The Travel Management System Backend is a robust Laravel-based solution designed to streamline corporate travel. It handles everything from secure user authentication to dynamic trip management, expense reporting, and policy enforcement. Integrated with top travel APIs, the app enables smooth bookings for flights, hotels, and car rentals while ensuring secure payment processing and real-time notifications.

## Key Features
- **User & Role Management:** Secure multi-role authentication (e.g., Admin, Employee) with tailored access controls.
- **Trip Management:** Create, modify, and track trips with real-time updates and detailed itineraries.
- **Expense Reporting:** Automated tracking and comprehensive reporting of travel expenses.
- **Policy Enforcement:** Define and enforce company travel policies with built-in approval workflows.
- **External API Integrations:** Seamless connections to leading travel booking APIs for flights, hotels, and car rentals.
- **Payment Processing:** Secure payment gateway integrations for efficient transaction handling.
- **Notifications & Alerts:** Real-time email and in-app notifications keep users informed.
- **Analytics & Reporting:** Advanced data insights to optimize travel budgets and company policies.

## Tailwind CSS Setup
For a modern and responsive frontend, the project uses Tailwind CSS alongside Vite. Set up your development environment with the following commands:

```bash
npm install -D tailwind postcss autoprefixer vite
npx tailwindcss init
npm i tailwindcss-animate
npm run dev
