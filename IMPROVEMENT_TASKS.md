# Project Improvement Task List: Akademia Poliglotki

This document outlines the concrete tasks required to enhance the platform's technical foundation, user experience, and strategic growth potential.

---

### Tier 1: Foundational & Technical Excellence (High Priority)

These tasks are critical for the platform's long-term stability, performance, and search engine visibility.

-   [x] Task 1: Implement a Robust Testing Strategy
    -   [ ] 1.1: Install and configure **Vitest** and **React Testing Library**.
    -   [ ] 1.2: Write unit tests for all components in `src/components/ui/`.
    -   [ ] 1.3: Write integration tests for the course booking flow (`BookingSystem.jsx`).
    -   [ ] 1.4: Write an integration test for the language level test (`LanguageLevelTest.jsx`).
    -   [ ] 1.5: Add a `test` script to `package.json` to run all tests.

-   [x] Task 2: Enhance SEO with Server-Side Rendering (SSR)
    -   [ ] 2.1: Install **Next.js** and its required dependencies.
    -   [ ] 2.2: Restructure the project from the Vite `src` directory to the Next.js `app` directory structure.
    -   [ ] 2.3: Convert all pages in `src/pages` to Next.js pages with file-based routing.
    -   [ ] 2.4: Refactor the `AppRouter.jsx` logic into Next.js layouts and pages.
    -   [ ] 2.5: Ensure all styles and components work correctly after the migration.

-   **[ ] Task 3: Add `sitemap.xml` and `robots.txt`**
    -   [ ] 3.1: Create a `robots.txt` file in the `public` directory allowing all crawlers.
    -   [ ] 3.2: If migrated to Next.js, install and configure `next-sitemap` to auto-generate the sitemap during the build process.
    -   [ ] 3.3: If not migrating, create a script to manually generate a `sitemap.xml` from the routes in `AppRouter.jsx`.

---

### Tier 2: User Experience & Conversion Rate Optimization (Medium Priority)

These tasks focus on making the platform more engaging and effective at turning visitors into customers.

-   **[ ] Task 4: Implement "See How It Works" Modal**
    -   [ ] 4.1: Create a new component: `HowItWorksModal.jsx`.
    -   [ ] 4.2: Design the modal content (e.g., 3 steps with icons/graphics).
    -   [ ] 4.3: Add state management to the `HomePage.jsx` to control the modal's visibility.
    -   [ ] 4.4: Trigger the modal on-click from the "Zobacz jak to działa" button.

-   **[ ] Task 5: Create Individual Course Pages**
    -   [ ] 5.1: Create a dynamic route for individual language pages (e.g., `/kursy/[language]`).
    -   [ ] 5.2: Create a data source (e.g., a JSON file or object) containing content for each language (description, teachers, testimonials).
    -   [ ] 5.3: Build the dynamic page template to render the content based on the language parameter.
    -   [ ] 5.4: Update all links in the Footer and other relevant components to point to the new specific language pages.

-   **[ ] Task 6: Add User Authentication & Student Dashboard**
    -   [ ] 6.1: Choose and integrate an authentication provider (e.g., Firebase Auth, Auth0, Clerk).
    -   [ ] 6.2: Add "Login" and "Logout" buttons to the main navigation.
    -   [ ] 6.3: Create a protected route for `/dashboard`.
    -   [ ] 6.4: Design and build the `Dashboard.jsx` page to display user-specific information (e.g., upcoming lessons).

---

### Tier 3: Content & Strategic Growth (Long-Term)

These tasks are focused on building the brand and scaling business operations.

-   **[ ] Task 7: Develop and Execute a Content Plan**
    -   [ ] 7.1: Research and define a list of 12 target keywords for blog posts.
    -   [ ] 7.2: Create a 3-month content calendar, assigning one blog post topic per week.
    -   [ ] 7.3: Write and publish the first four blog posts.

-   **[ ] Task 8: Integrate a CRM for Lead Management**
    -   [ ] 8.1: Select a CRM provider (e.g., HubSpot, Mailchimp).
    -   [ ] 8.2: Replace the `EmailJS` functionality in `ContactForm.jsx` and `Newsletter.jsx` with API calls to the chosen CRM.
    -   [ ] 8.3: Set up a basic automated email "welcome" sequence in the CRM for new newsletter subscribers.
