# Stake Assessment – Ionic + Angular App

This project was developed as a rapid prototype using **Ionic + Angular**.  
You can run it locally with:

```bash
npm install
ionic serve
```

## Preface
(see tags: **v1** contains all work completed within the 4h timeframe; **v2** adds the animation for the recently purchased stock).

The app uses Angular signals to manage UI state for purchases: when a buy is made, the new position is added to the in-memory state (not persisted to disk). In production, this would be handled by posting to an API endpoint.

## Work Completed

### 🔹 Initial setup
- Bootstrapped an Ionic + Angular project.
- Configured routing and layout with **ion-tabs** as the navigation foundation.

### 🔹 Component creation
Created reusable components:
- **st-card** → card container with full, mini, and tile variants.
- **st-instrument** → renders instruments (Stock/ETF/etc.) in row, row-simple, and tile layouts.
- **st-order-sheet** → modal form for buy orders.

### 🔹 Styles and design system
- Extracted all styles from the Figma manually (no dev access).
- Built SCSS partials for:
  - **Tokens** → colors, spacing, radii.
  - **Typography** → heading/body/label/link styles.
  - **Mixins** → helpers for cards, shadows, layout utilities.

This simplified layout: most text styles were applied via predefined classes.

### 🔹 Icons and assets
- Downloaded all required icons as **SVG + PNG** from Figma.
- Placed in `assets/icons`, ready for reuse across components.

### 🔹 Data layer
- Used the provided JSON files for instrument pricing and details.
- Created models for positions and a type for `InstrumentType` (can be `stock`, `etf`, or `otc`).
- Built a **DataComposerService** to merge data into view models.

### 🔹 App functionality

#### Invest page (Dashboard)
- Displays holdings list.
- Shows total equity.
- Includes Trending Stocks as a card swiper.

#### Discover page
- Features a styled **ion-searchbar** with cancel action.
- Lists instruments, with *“Most traded of all time”* card.

#### Order sheet modal
- Opens from any instrument.
- Allows mock purchase input.
- On confirmation, dismisses modal and shows success toast.

#### Navigation
- Implemented with **ion-tabs**.
- Custom icons in tab bar with active/inactive coloring.

#### Toasts
- Show confirmation messages (“X successfully purchased”).

### 🔹 Buy button
- Implemented a swipe button using the following reference: [Ionic slide button article on Medium](https://jsantacl.medium.com/ionic-slide-button-component-part-1-e61711648492)

---

## Pending Improvements
- 🔸 **Card swiper**: Currently implemented with SCSS scroll snapping. With more time, it should use **Swiper.js** for smoother interaction and pagination.
- 🔸 **Buy button**: Swipe animation works but could be improved with a custom gesture or a library.
- 🔸 **Modals**: Should support dismissal on backdrop tap.
- 🔸 **Searchbar**: Would implement API-backed search.
- 🔸 **Testing**: No tests included; Jest would be the natural choice for unit tests.
- 🔸 **Accessibility**: ARIA attributes and keyboard navigation need improvements.
- 🔸 **Clickable elements**: Add distinct hover/focus styles for buttons, cards, and links to improve usability and accessibility.  
- 🔸 **Styling consistency**: I couldn't download the exact font and went for a similar one that I found on Google Fonts (Inter). The styles should match the Figma with a higher precision.
- 🔸 **Centralised error handling**: Should be managed via a global error service and HTTP interceptor, surfacing user-friendly messages through a shared toast. 
- 🔸 **Separate services for API calls or delegation to NgRx effects**: Right now all data is fetched through a single DataComposer. A cleaner approach would split it into dedicated services, with the composer/facade combining them for UI. In a production setup I’d move this orchestration into NgRx (actions/effects/selectors) for scalability and instant cross-screen updates.

---

## How to Run

- Clone the repo
- Install dependencies:

```bash
npm install
```

- Start the dev server:

```bash
ionic serve
```







