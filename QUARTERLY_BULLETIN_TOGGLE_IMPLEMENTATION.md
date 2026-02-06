# Quarterly Bulletin User Type Toggle Implementation

## Summary of Changes

I've successfully added a user type toggle next to the Audio Recap button on the quarterly bulletin articles. Here's what was implemented:

## Files Created

### 1. **quarterly-bulletin-q4-2025-enduser.md**
   - **Purpose:** End-user/consumer-focused version
   - **Content Style:** Simplified explanations suitable for general public
   - **Features:**
     - Plain language explanations
     - Real-world implications
     - Simple data tables
     - "What this means for you" sections
   - **Location:** `/www/EN/quarterly-bulletin-q4-2025-enduser.md`

### 2. **quarterly-bulletin-q4-2025-economist.md**
   - **Purpose:** Technical/economist-focused version
   - **Content Style:** Advanced economic terminology and technical analysis
   - **Features:**
     - Detailed economic analysis
     - Technical metrics and calculations
     - Policy discussions with academic rigor
     - Risk assessment sections
     - Methodological notes
   - **Location:** `/www/EN/quarterly-bulletin-q4-2025-economist.md`

## Files Modified

### 1. **views/content.ejs**
   - Added toggle UI next to the Audio Recap button
   - Structure:
     ```html
     <div class="audio-recap-group">
       <button id="audioRecapBtn" class="ai-button">🎵 Audio Recap</button>
       <div class="user-type-toggle">
         <input type="checkbox" id="userTypeToggle">
         <label>
           <span>End User</span>
           <span class="toggle-slider"></span>
           <span>Technical</span>
         </label>
       </div>
     </div>
     ```

### 2. **public/styles/content.css**
   - Added comprehensive toggle styling
   - Features:
     - Animated toggle switch with gradient
     - Responsive design (stacks on mobile)
     - Hover effects
     - Smooth transitions
     - Clear visual indication of current state

### 3. **public/scripts/main.js**
   - Added `initializeUserTypeToggle()` function
   - Added `loadUserTypeContent()` function
   - Features:
     - Saves user preference to localStorage
     - Dynamically loads content on toggle
     - Smooth scrolling to article on content switch
     - Reinitializes syntax highlighting when content changes
     - Graceful error handling

## How It Works

1. **Toggle Display:**
   - Toggle appears next to Audio Recap button on quarterly bulletin pages
   - Shows "End User" (left, default) and "Technical" (right) labels
   - Visual slider indicates which mode is active

2. **Content Switching:**
   - When user toggles, the system fetches the appropriate markdown version
   - Content is dynamically loaded without page refresh
   - User preference is saved in browser localStorage
   - Next visit remembers the user's choice

3. **Responsive Behavior:**
   - On desktop: Toggle appears inline with Audio Recap button
   - On mobile: Toggles stack vertically (responsive CSS)
   - Audio Recap button and toggle are grouped together

## Technical Details

### URL Routing:
- End User version: `/content/EN/quarterly-bulletin-q4-2025-enduser`
- Technical version: `/content/EN/quarterly-bulletin-q4-2025-economist`
- Original article: `/content/EN/quarterly-bulletin-q4-2025` (now shows end-user by default)

### Storage:
- localStorage key: `userType`
- Values: `'enduser'` or `'technical'`
- Default: `'enduser'`

### JavaScript Events:
- Change event listener on checkbox
- Loads new content via fetch API
- Updates article body innerHTML
- Scrolls smoothly to top of article

## Styling Features

### Toggle Switch Visual:
- **Unchecked (End User):**
  - "End User" text highlighted in purple
  - Slider position on left
  - "Technical" text grayed out

- **Checked (Technical):**
  - "Technical" text highlighted in purple
  - Slider position on right
  - "End User" text grayed out

### Responsive:
- Desktop: Inline layout (horizontal)
- Tablet/Mobile: Stacked layout (vertical)
- Adaptive spacing and sizing

## Testing Recommendations

1. **Desktop Testing:**
   - Toggle between End User and Technical versions
   - Verify content switches smoothly
   - Check localStorage persistence (reload page, toggle state should remain)

2. **Mobile Testing:**
   - Verify toggle displays correctly on small screens
   - Test scrolling behavior after content switch
   - Ensure toggle is easily clickable on touch devices

3. **Browser Testing:**
   - Test in Chrome, Firefox, Safari, Edge
   - Verify fetch API works for dynamic content loading
   - Check localStorage compatibility

4. **Content Testing:**
   - Verify both markdown versions display correctly
   - Check that audio recap button works with both versions
   - Ensure syntax highlighting reinitializes (if applicable)

## Future Enhancements

- Add more quarterly bulletins with economist/end-user versions
- Implement toggle for other economic reports
- Add language-specific versions of both formats
- Track user preference analytics
- Add animation between content switches
