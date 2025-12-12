# Seesaw Simulation Challenge

A visually accurate, physics-based seesaw simulation built with pure JavaScript, HTML, and CSS. This project focuses on realistic torque mechanics, state persistence, and responsive UI design without external libraries.

## Live Demo
[Click here to play the simulation](https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME/)
*(Please replace the link above after deployment)*

## 🛠️ Features
- **Accurate Physics Engine:** Calculates net torque (`Weight × Distance`) to determine tilt angle.
- **Dynamic Visualization:** Objects are rendered with weight-based sizing and color scaling (HSL).
- **Trigonometric Precision:** Solves the foreshortening issue on the tilted plank using cosine correction.
- **State Persistence:** Game state survives page reloads via `localStorage`.
- **Responsive Dashboard:** Info panels adapt to Mobile, Tablet, and Desktop screens using CSS Grid.
- **Bonus:** Full reset functionality to clear the simulation.

---

## Thought Process & Design Decisions

### 1. Visual Feedback System (UX)
Instead of just displaying numbers, I wanted the user to *feel* the weight visually.
- **Dynamic Sizing:** Heavier boxes are physically larger (`20px + weight * 2`).
- **Color Coding:** I used the **HSL** color model to programmatically darken heavier weights. This allows for infinite scalability compared to hardcoded RGB arrays.

### 2. The "Clean Code" Refactoring
Initially, box styles were inline in JavaScript. To adhere to **Separation of Concerns**, I moved static styles (borders, positioning) to `style.css`.
- **Challenge:** The boxes lost their styling initially.
- **Solution:** I utilized `box.classList.add('box')` immediately after element creation to link the JS object with the CSS class.

### 3. Edge Case: The Pivot Point
I identified a logical edge case: *What happens if a user clicks exactly on the center (250px)?*
- **Logic:** Standard `else` logic would treat it as the "Right Side". However, physically, weight on the pivot generates **0 Torque**.
- **Decision:** I implemented a 3-state logic (`Left`, `Right`, `Pivot`). Weights placed exactly on the pivot are visually rendered but excluded from the torque calculation sum.

### 4. Visual Scale (Grid Lines)
To help users judge distance, I needed grid lines on the plank.
- **Decision:** Instead of polluting the DOM with empty `<div>` tags for lines, I used a CSS `repeating-linear-gradient`. This achieved the visual scale with a single line of CSS code, optimizing performance.

---

## Trade-offs & Limitations

### 1. Mobile Responsiveness vs. Physics Accuracy
- **Trade-off:** While the UI panels are fully responsive (using CSS Grid), the seesaw plank has a fixed width of `500px` (via `min-width`).
- **Reasoning:** The project requirement specified a "fixed length" plank. Scaling the plank down for mobile would alter the torque calculations and require complex coordinate mapping logic. I prioritized **physics accuracy** and strict adherence to the requirements over a fluid mobile layout for the simulation component, accepting horizontal scrolling on small screens as a necessary trade-off.

### 2. The Foreshortening Problem (Coordinate System)
- **Challenge:** When the plank tilts, its visual width on the screen shrinks. Clicking the visual "end" of a tilted plank would mistakenly place the box closer to the center.
- **Solution:** I implemented a coordinate transformation system. By measuring the visual distance from the center and dividing it by `Math.cos(Angle)`, I calculated the *actual* physical position on the plank surface.
  - *Formula:* `ActualPos = VisualPos / cos(θ)`

### 3. Event Target Consistency
- **Observation:** Interactive elements (boxes) placed on the plank are technically children of the plank. Clicking on them triggers the parent's event listener via bubbling.
- **Decision:** To avoid any ambiguity about which element is being targeted (the box or the plank) and to prevent potential bugs I applied `pointer-events: none` to all boxes. This ensures they are treated as non-interactive visual layers, and the mouse event always originates directly from the `.plank` element itself.

### 4. Debugging Highlight: UI Glitch
- **Issue:** During testing, the tilt angle display showed corrupted values like `-19.80.0` (double decimals).
- **Diagnosis:** I realized the initial static text `0.0` was placed *outside* the target `<span>` tag in HTML. When JavaScript updated the inner text, the old static value persisted next to the new one.
- **Fix:** Restructured the HTML to keep the initial value inside the `<span>` tag, ensuring clean data overwrites on every update.

---

## AI Usage Declaration
As per the challenge guidelines, AI tools (Gemini) acted as a "Pair Programmer" and technical consultant for specific implementation details:

1.  **Visual Styling:**
    - Suggested using **HSL** for mathematical color darkening based on weight.
    - Provided the CSS `repeating-linear-gradient` syntax for the plank's grid lines to avoid DOM clutter.
    - Provided the CSS logic for creating the triangle pivot using `border` properties.
2.  **Debugging & Syntax:**
    - Assisted in diagnosing a `JSON.parse` error in the Local Storage initialization logic.
    - Helped identify the `pointer-events: none` solution to prevent stacked boxes from blocking click events on the plank.

---

## How to Run Locally
1. Clone the repository.
2. Open `index.html` in any modern web browser.
3. No build steps or `npm install` required.