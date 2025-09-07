# Stake Assessment – Ionic + Angular App

This project was developed as a rapid prototype using **Ionic + Angular**.  
You can run it locally with:

```bash
npm install
ionic serve
```

## Preface
The goal of this app was to replicate the provided designs in Figma while maintaining clean architecture and enough flexibility for future refactoring. The project was built under time constraints, so decisions leaned toward pragmatism and speed, with some areas left open for improvement.

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
- Created a mock JSON database in `assets/mock.json` with instruments, quotes, and holdings.
- Considered using MockAPI but opted for local JSON due to time constraints.
- Built a **DataComposerService** to merge JSON data into view models (**InstrumentVM, PositionVM, etc.**).

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

## Pending Work & Approach

Due to the 4h time cap, I didn’t implement the **automatic addition of the recently purchased stock with animation** (as shown in the Figma prototype).

**How I would handle this:**
- **For the challenge (quick approach):** Use Angular signals to update the UI state immediately when the BUY flow completes.
- **For production (scalable approach):** Dispatch an NgRx action on purchase success.  
  - The effect would update the store with the new holding.  
  - Selectors would provide the updated holdings to the home view.  
  - This ensures consistency across the app and instant reflection of the new data.

**Animation of recently added item:**
- I would trigger a CSS animation on the newly inserted card (e.g. `@keyframes fadeInUp` with transform + opacity).  
- One way is to use the @for block with track item.id, detect the newly added item, and apply a temporary highlight class (glow, bounce, slide-in) that auto-removes after the animation completes
- Alternative: use Angular’s `@angular/animations` with `transition(':enter', [...])` to animate list insertions.

**Top-down notification animation:**
- The Figma video shows a banner/toast sliding from the top.  
- Ionic’s [`ToastController`](https://ionicframework.com/docs/api/toast) supports `position: 'top'`.  
- With `enterAnimation` you can override defaults and have it slide down from above.  
- Example:  

```ts
this.toastController.create({
  message: 'Stock added successfully',
  duration: 2000,
  position: 'top',
  cssClass: 'custom-toast' // style with transform/animation
}).then(toast => toast.present());
```

## Other Pending Improvements
- 🔸 **Card swiper**: Currently implemented with SCSS scroll snapping. With more time, it should use **Swiper.js** for smoother interaction and pagination.
- 🔸 **Buy button**: Swipe animation works but could be improved with a custom gesture or a library like `ngx-slide-to-act`.
- 🔸 **Models**: Data models could use foreign keys for cleaner joins between instruments, quotes, and holdings.
- 🔸 **Modals**: Should support dismissal on backdrop tap.
- 🔸 **Searchbar**: Could be improved with API-backed search.
- 🔸 **Testing**: No tests included; Jest would be the natural choice for unit tests.
- 🔸 **Spacing**: Some paddings/margins are hardcoded. Ideally, all layout spacing should reference tokens.
- 🔸 **Accessibility**: ARIA attributes and keyboard navigation need improvements.
- 🔸 **Clickable elements**: Add distinct hover/focus styles for buttons, cards, and links to improve usability and accessibility.  
- 🔸 **Styling consistency**: Some colors are hardcoded; should be fully tokenized. The toast should have the right opacity. The cards should follow the max-width defined on Figma. I couldn't download the exact font and went for a similar one that I found on Google Fonts (Inter).
- 🔸 **Centralised error handling**: Should be managed via a global error service and HTTP interceptor, surfacing user-friendly messages through a shared toast. 
- 🔸 **Separate services for API calls or delegation to NgRx effects**: Right now all data is fetched through a single DataComposer. A cleaner approach would split it into dedicated services (Instruments, Quotes, Holdings), with the composer/facade combining them for UI. In a production setup I’d move this orchestration into NgRx (actions/effects/selectors) for scalability and instant cross-screen updates.

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







