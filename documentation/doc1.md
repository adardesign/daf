Here is the updated Technical Documentation and Product Requirement Document (PRD). This version incorporates the new "All Programs" sidebar widget, the authentication flows, and the settings/notification system.

***

# 📘 Limmud Yomi (Daily Learning) - Technical PRD v2.0

## 1. Project Overview
**Product Name:** Limmud Yomi
**Core Value:** A unified dashboard for Jewish daily learning tracks (Daf Yomi, Rambam, etc.) that leverages gamification (streaks) to increase user retention.
**Key Feature:** A "Dual-Layer" streak system that tracks general consistency alongside specific program progress.

## 2. Technology Stack
**Core Framework:**
*   **Frontend:** Next.js 16 (App Router), React 19, TypeScript.
*   **Styling:** Tailwind CSS, `shadcn/ui` (Radix Primitives), `lucide-react` (Icons).
*   **State:** TanStack Query v5 (Server state management).
*   **Backend/Auth:** Supabase (Postgres, Auth, Edge Functions).
*   **Testing:** Vitest, React Testing Library, MSWv2.

---

## 3. UI/UX Component Architecture

### 3.1 Global Navigation
*   **Header:**
    *   **Logo:** "Limmud Yomi" (Right aligned).
    *   **Global Streak Badge:** Pill component (Flame Icon + Count).
    *   **User Avatar:**
        *   **Logged Out:** "Sign In" button (Ghost variant).
        *   **Logged In:** Avatar image. Clicking opens a **Dropdown Menu**:
            *   *Profile*
            *   *Settings*
            *   *Logout*

### 3.2 Program Selector (Top Tabs)
*   **Component:** `ProgramTabs` (Scrollable Horizontal List).
*   **Behavior:** Acts as the primary navigation controller.
*   **State:** Updates URL query param `?program=daf-yomi`.
*   **Options:**
    1.  **Daf Yomi** (Purple/Blue)
    2.  **Rambam Yomi** (Green)
    3.  **Chok L'Yisrael** (Purple)
    4.  **Tanach Yomi** (Gray/Teal)
    5.  **Mishnah Yomi** (Orange)

### 3.3 Left Sidebar (Gamification & Stats)
The sidebar is now composed of three distinct cards:

**Card A: General Streak (רצף כללי)**
*   **Purpose:** The "Master" stat. Increments if *any* learning is done today.
*   **Visual:** Large Orange Flame.
*   **Metrics:** Current Streak, Longest Streak, Total Days Learned.

**Card B: Context-Aware Program Streak**
*   **Purpose:** Shows stats specific to the *currently selected* tab.
*   **Dynamic Content:**
    *   If Tab = **Daf Yomi**: Shows Blue Book Icon, "Daf Yomi Streak".
    *   If Tab = **Rambam**: Shows Green Scroll Icon, "Rambam Streak".
*   **Metrics:** Current Program Streak, Total Pages/Chapters learned in this program.

**Card C: All Programs Summary (כל התוכניות) [NEW]**
*   **Purpose:** A quick-glance leaderboard of the user's progress across other tracks without needing to switch tabs.
*   **Layout:** Vertical list of rows.
*   **Row Component:**
    *   **Icon:** Program specific icon (color-coded).
    *   **Label:** Program Name (e.g., "Rambam Yomi").
    *   **Stat:** Current Streak count (e.g., "🔥 5").
*   **Interaction:** Clicking a row acts as a shortcut, switching the Main View to that program.

### 3.4 Main Content Area
*   **Header:** Date (Hebrew/Gregorian) + Tractate/Chapter Name + Unit Number.
*   **Viewer:**
    *   **PDF/Image Mode:** For Daf Yomi (Amud A/B).
    *   **Text Mode:** For Rambam/Tanach (HTML rendered text with adjustable font size).
*   **Action:** "Mark as Learned" (Green Button).
    *   *Optimistic UI:* Instantly updates streaks in Sidebar Cards A, B, and C.

---

## 4. Authentication & User Accounts

### 4.1 Login / Sign Up Flow
*   **Provider:** Supabase Auth.
*   **Methods:**
    *   **OAuth:** Google (Primary), Apple (Secondary).
    *   **Magic Link:** Passwordless email login (preferred for ease of use).
*   **UI:**
    *   **Modal:** Triggered if a guest tries to click "Mark as Learned".
    *   **Page:** `/login` for direct access.
    *   **Design:** Clean card centered on screen. "Welcome to Limmud Yomi. Track your Torah learning daily."

### 4.2 Account Dropdown
Accessible via the Avatar in the top left.
*   **Profile:** View user details (Name, Email, Join Date).
*   **Settings:** Link to `/settings`.
*   **Logout:** Clears Supabase session and redirects to home.

---

## 5. Settings Page (`/settings`)

**Layout:** A dedicated page with a sidebar for categories: "General", "Notifications", "Display".

### 5.1 Notifications (התראות)
*   **Goal:** Remind users to keep their streak alive.
*   **UI Elements:**
    *   **Master Toggle:** "Enable Daily Reminders" (Switch).
    *   **Time Picker:** "Send reminder at:" (e.g., 08:00 PM).
    *   **Frequency:**
        *   [ ] Daily
        *   [ ] Only if I haven't learned by [Time] (Smart Reminder).
    *   **Channels:**
        *   **Email:** Uses Supabase Edge Function + Resend/SendGrid.
        *   **Push:** Uses Web Push API (Service Workers).
*   **Database Schema:** Stored in `user_preferences` table.

### 5.2 Display (תצוגה)
*   **Theme:** Light / Dark / System (using `next-themes`).
*   **Text Size:** Slider for text-based learning (Rambam/Tanach).
*   **Language:** Interface language (Hebrew/English).

---

## 6. Data Schema (Supabase)

### `profiles` (Public User Data)
*   `id` (uuid, references auth.users)
*   `username` (text)
*   `avatar_url` (text)
*   `timezone` (text) - Critical for accurate notification timing.

### `user_preferences`
*   `user_id` (uuid, PK)
*   `email_notifications` (boolean)
*   `push_notifications` (boolean)
*   `reminder_time` (time) - Default '20:00'.
*   `smart_reminder` (boolean) - If true, check `daily_logs` before sending.

### `program_stats` (Materialized View or Table)
*To avoid expensive calculations on every page load, we update this table via triggers.*
*   `user_id` (uuid)
*   `program_id` (uuid)
*   `current_streak` (int)
*   `last_learned_date` (date)

---

## 7. User Stories

### Story 1: The "Quick Glance" User
**As** a user who primarily learns Daf Yomi but occasionally does Rambam,
**I want** to see my Rambam streak in the sidebar while I am on the Daf Yomi page,
**So that** I am reminded if I am falling behind on my secondary goals without clicking away.
*   **Acceptance Criteria:**
    *   The "All Programs" card is visible in the sidebar.
    *   The Rambam row shows my current streak (e.g., "0" or "5").
    *   Clicking the Rambam row switches the main content to Rambam.

### Story 2: Smart Notifications
**As** a busy professional,
**I want** to receive a notification at 9 PM *only* if I haven't marked my daily learning yet,
**So that** I don't get annoyed by unnecessary emails but still save my streak.
*   **Acceptance Criteria:**
    *   User goes to Settings > Notifications.
    *   Enables "Smart Reminder" and sets time to 21:00.
    *   **Backend Logic:** Cron job runs at 21:00 user time. Checks `user_progress` for today's date. If record exists -> Skip. If missing -> Send Notification.

### Story 3: Guest to Registered Conversion
**As** a guest user,
**I want** to browse the content freely, but be prompted to login when I try to track progress,
**So that** I understand the value of creating an account.
*   **Acceptance Criteria:**
    *   Guest can view Daf Yomi content.
    *   Guest clicks "Mark as Learned".
    *   **Action:** A Login Dialog appears: "Save your progress and build your streak! Sign in to continue."
    *   After login, the action is automatically completed (no need to click again).

### Story 4: Changing Display Settings
**As** an elderly user,
**I want** to increase the font size of the Rambam text,
**So that** I can read it comfortably without straining my eyes.
*   **Acceptance Criteria:**
    *   Settings page has a "Font Size" slider.
    *   Changing the slider updates the preview immediately.
    *   This setting persists across sessions (saved in `user_preferences` or `localStorage`).

---

## 8. Implementation Roadmap

1.  **Phase 1: Core Structure**
    *   Setup Next.js 16 + Supabase.
    *   Implement Layout, Sidebar (Static), and Program Tabs.
2.  **Phase 2: Content & Database**
    *   Populate `daily_content` table.
    *   Build the PDF Viewer and Text Viewer components.
3.  **Phase 3: Auth & Progress**
    *   Implement Supabase Auth.
    *   Build "Mark as Learned" logic.
    *   Implement Streak Calculation logic (SQL Functions).
4.  **Phase 4: Settings & Polish**
    *   Build Settings Page.
    *   Implement Notification Cron Jobs (Supabase Edge Functions).
    *   Final UI Polish (Animations, Dark Mode).