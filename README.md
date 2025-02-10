# Job Pricing Calculator

The **Job Pricing Calculator** is a modern, full-featured web application designed to generate detailed IT service and equipment quotes for businesses. It integrates product selection, service add-ons, job detail inputs, scheduling, and PDF quote generation—with embedded logos and a unique QR code. The system also supports CSV logging and email notifications for scheduling and quoting.

---

## Features

- **Product & Service Selection:**  
  Browse and select from a dynamic list of products (loaded from a JSON catalog) and choose from various service add-ons (extra networking, software imaging, onsite installation, etc.).

- **Detailed Job Configuration:**  
  Specify job details including job complexity, service type, environment, technician travel, optional technician hours, travel time, building accessibility, and emergency surcharges.

- **Clear Form Button:**  
  Easily reset the entire form with a single click so users can start fresh.

- **Responsive & User-Friendly Form:**  
  - A large email input with the placeholder: "paste your email here for a quote"  
  - Quantity fields that accept any numerical value  
  - Optional fields for technician hours

- **PDF Quote Generation:**  
  Generates a professional PDF quote with:
  - Embedded logos (Officeworks and Geeks2U) from the `public/assets/` folder  
  - A detailed breakdown of products, service add-ons, and job details  
  - A unique QR code generated based on the quote summary

- **CSV Logging:**  
  View a CSV log of all generated quotes via the dedicated "View CSV Data" button.

- **Email Notifications:**  
  Scheduling a job and emailing a quote both trigger an email notification to `troy.latter@unisys.com`.

- **Chatbot ("e-Troy"):**  
  A floating chatbot (renamed to "e-Troy") assists users with product queries and helps complete the form.

---

## File Structure

