# 🛒 Vanilla JS E-Commerce Application

A lightweight, fully responsive, and dynamic single-page e-commerce interface built using **Vanilla JavaScript**, **Bootstrap 5**, and **FakeStoreAPI**. This project demonstrates asynchronous data fetching, UI rendering, and comprehensive client-side state management for shopping cart operations.

🔗 **Live Demo:** [Deploy Your Link Via GitHub Pages Here]

## ✨ Features

- **Asynchronous Data Fetching:** Dynamically retrieves product catalogs and product categories from a RESTful API (`FakeStoreAPI`).
- **Category-Based Filtering:** Seamlessly filters products on the fly without page reloads.
- **State-Managed Shopping Cart:** - Dynamic add-to-cart injection.
  - Multi-item grouping with real-time reactive counter updates (Increment / Decrement).
  - Accurate subtotal and cumulative price calculation.
  - Complete cart clearing and simulated checkout handling.
- **Professional Toast Notifications:** Interactive transactional user feedback powered by `AlertifyJS`.
- **Responsive Web Design:** Fully optimized layout for mobile, tablet, and desktop viewports via Bootstrap grid and explicit CSS media queries.

## 🛠️ Tech Stack

- **Core:** HTML5, CSS3, JavaScript (ES6+)
- **UI Framework:** Bootstrap v5.3.3
- **Third-Party Libraries:** AlertifyJS (v1.13.1)
- **Data Source:** FakeStoreAPI REST Endpoint

## 📁 Project Structure

```text
├── index.html          # Main Application Entry Point
└── App/
    ├── Css/
    │   └── style.css   # Encapsulated Component Styles
    ├── Js/
    │   └── app.js      # Core Logic & State Operations
    └── img/            # Static Promotional Image Assets
```
