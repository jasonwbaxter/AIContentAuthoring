# Keyboard Navigation & Accessibility Testing Guide

## Overview
This guide provides step-by-step instructions for testing keyboard navigation and accessibility features of the Central Bank website.

---

## Part 1: Keyboard Navigation Testing

### Test 1.1: Tab Navigation
**Objective**: Verify that all interactive elements are reachable via Tab key

**Steps**:
1. Open http://localhost:3000 in a browser
2. Press **Tab** repeatedly
3. Observe focus moving through elements:
   - Logo/home link
   - Search input
   - Language switcher links
   - Main navigation items (About, Monetary Policy, Data & Publications, News, Help)
   - All content links
   - Footer links
4. Press **Shift+Tab** to move backward

**Expected Outcome**:
- Focus moves smoothly through all interactive elements
- Focus is always visible (outline or highlight)
- No elements are skipped
- Logical tab order (left-to-right, top-to-bottom)
- No "tab traps" (ability to Tab out of any element)

---

### Test 1.2: Mega Menu Navigation (Desktop)
**Objective**: Verify mega menu keyboard interactions

**Prerequisites**:
- Must be at desktop size (≥1200px)
- Mega menu should be visible in header

**Steps**:
1. Press **Tab** until focus is on first navigation item (e.g., "About")
2. Press **Arrow Down** → Submenu items should appear
3. Press **Arrow Right** → Move to next main menu item
4. Press **Arrow Left** → Move to previous main menu item
5. Press **Escape** → Menu should close, focus returns to main menu
6. Press **Enter** → Follow the link of focused menu item

**Expected Outcome**:
- Arrow keys navigate menu items smoothly
- Escape key closes menu
- Submenu items are accessible
- Visual focus indicator is always visible
- ARIA attributes update (`aria-expanded`, `aria-hidden`)

---

### Test 1.3: Mobile Menu Navigation (Mobile)
**Objective**: Verify mobile hamburger menu keyboard interactions

**Prerequisites**:
- Must be at mobile size (<768px)
- Hamburger menu icon should be visible

**Steps**:
1. Press **Tab** until focus is on hamburger menu button
2. Press **Enter** → Menu should open, full-screen dropdown visible
3. Press **Tab** → Focus moves through menu items
4. Press **Enter** on any menu item → Navigate to that page
5. Go back to same page (open menu again)
6. Press **Escape** → Menu should close

**Expected Outcome**:
- Hamburger button is keyboard accessible
- Menu opens with Enter/Space
- All menu items are reachable via Tab
- Escape key closes menu
- Menu state persists until manually closed

---

### Test 1.4: Search Form (if implemented)
**Objective**: Verify search form keyboard accessibility

**Steps**:
1. Press **Tab** until focus is on search input
2. Type search term: "indicator"
3. Press **Enter** → Form should submit
4. Verify results display

**Expected Outcome**:
- Search input is focusable
- Text is visible while typing
- Form submits with Enter key
- Results are displayed correctly

---

### Test 1.5: Publication Filters
**Objective**: Verify filter controls are keyboard accessible

**Steps**:
1. Navigate to http://localhost:3000/data-publications/publications
2. Press **Tab** until focus is on filter controls
3. Verify filter checkboxes/dropdowns are focusable
4. Use **Arrow keys** to select filter options (if dropdown)
5. Press **Space** to toggle checkbox
6. Filters should update results

**Expected Outcome**:
- All filter controls are keyboard accessible
- Filters update publication list
- Focus remains visible on all controls
- No mouse required to filter results

---

## Part 2: ARIA Attributes & Semantic HTML

### Test 2.1: Navigation Landmarks
**Objective**: Verify navigation landmarks are properly identified

**Browser Developer Tools** (F12):
1. Open Inspector/Elements tab
2. Find `<nav>` elements in page
3. Verify each nav has a label (via aria-label or id + aria-labelledby)

**Expected**:
```html
<nav aria-label="Main navigation">
  <ul role="menu">
    <li><a href="/about" role="menuitem">About</a></li>
    <!-- more items -->
  </ul>
</nav>

<nav aria-label="Footer navigation">
  <!-- footer links -->
</nav>
```

**Screen Reader Test** (NVDA/JAWS on Windows, VoiceOver on Mac):
1. Enable screen reader
2. Navigate by landmark (press "n" in NVDA)
3. Hear: "Main navigation" and "Footer navigation"
4. All navigation sections should be announced

---

### Test 2.2: Menu Item ARIA Roles
**Objective**: Verify menu items have correct ARIA roles

**Steps**:
1. Right-click on a navigation item
2. Select "Inspect" (or press F12)
3. Look for attributes: `role="menuitem"`, `aria-expanded="true/false"`
4. Menu toggle should have `aria-haspopup="true"`

**Expected**:
```html
<a href="/about" role="menuitem" aria-expanded="false" aria-haspopup="true">
  About
</a>
```

**Screen Reader Verification**:
1. Navigate to mega menu item with Tab
2. Screen reader should announce: "About, menu button, collapsed"
3. When you expand menu: "About, menu button, expanded"

---

### Test 2.3: Button ARIA Labels
**Objective**: Verify icon buttons have accessible labels

**Hamburger Button Test**:
1. Inspect hamburger menu button
2. Verify it has `aria-label="Toggle navigation menu"` or similar
3. Screen reader should announce the button's purpose

**Search Button Test** (if present):
1. Inspect search button
2. Verify it has `aria-label="Search"` or contains text
3. Should be announced as search button

---

### Test 2.4: Heading Hierarchy
**Objective**: Verify proper heading structure

**Steps**:
1. Open page in browser (DevTools F12)
2. In Console, run:
```javascript
document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
  console.log(h.tagName, h.textContent.trim());
});
```

**Expected**:
- One H1 per page (page title)
- H2, H3 properly nested (no jumps: H1 → H3)
- Headings create meaningful outline

**Screen Reader Navigation**:
1. Enable screen reader
2. Press "h" (in NVDA) or "VO+U" (VoiceOver) to navigate by heading
3. All major sections should have headings
4. Heading hierarchy should make sense

---

### Test 2.5: Form Labels & Inputs
**Objective**: Verify form inputs have associated labels

**Data Publications Filter Test**:
1. Navigate to publications page
2. Inspect filter inputs
3. Verify `<label>` element is associated with `<input>`:
```html
<label for="filter-type">Publication Type</label>
<select id="filter-type">
  <option>All Types</option>
  <!-- options -->
</select>
```

**Screen Reader Test**:
1. Tab to filter input
2. Screen reader should announce: "Publication Type, dropdown list"
3. Should be clear what the input controls

---

## Part 3: Visual Accessibility

### Test 3.1: Color Contrast
**Objective**: Verify text has sufficient contrast ratio

**Using WebAIM Contrast Checker**:
1. Pick a text element (right-click → Inspect)
2. Get background color and text color
3. Use https://webaim.org/resources/contrastchecker/
4. Verify ratio is ≥4.5:1 for normal text

**Expected**:
- All text: ≥4.5:1 contrast (WCAG AA)
- Large text (18pt+): ≥3:1 contrast (WCAG AA)

**Automated Testing** (Chrome DevTools):
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Look for contrast issues in results

---

### Test 3.2: Focus Indicators
**Objective**: Verify focus outlines are visible

**Steps**:
1. Press **Tab** to navigate page
2. Observe focus indicator on each element:
   - Should have visible outline (≥2px)
   - Should have sufficient contrast
   - Should not be styled away (no `outline: none`)

**Inspect Focus Styles**:
1. Press Tab until focused on an element
2. DevTools → Inspector → click element
3. Look in Styles panel for `:focus` styles
4. Should see `outline`, `border`, or `box-shadow`

**Expected**:
```css
a:focus, button:focus, input:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}
```

---

### Test 3.3: Zoom & Text Scaling
**Objective**: Verify content is readable when zoomed

**Steps**:
1. Open page in browser
2. Press **Ctrl++** (Cmd++ on Mac) to zoom to 200%
3. Verify:
   - All content remains readable
   - No horizontal scrolling required
   - Layout adapts gracefully
4. Test at 150% zoom as well

**Expected**:
- Content reflows properly
- Text remains readable
- No overlapping elements
- Touch targets remain 44x44px minimum

---

### Test 3.4: No Motion Preference
**Objective**: Verify animations respect reduced motion preference

**Browser Settings** (test in each browser):

**Chrome**:
1. Open DevTools (F12)
2. Press Ctrl+Shift+P (Cmd+Shift+P)
3. Type "Rendering" → press Enter
4. Scroll to "Prefers reduced motion"
5. Select "prefers-reduced-motion"

**Firefox**:
1. In about:config page
2. Set `ui.prefersReducedMotion` = 1

**Test**:
1. With reduced motion enabled, reload page
2. Mega menu should have no slide/fade animations
3. Button clicks should have no delay
4. Content should appear instantly

**Expected**:
- No animations (instant state changes)
- No flashing (≤3 Hz)
- Smooth interactions without motion

---

## Part 4: Mobile & Touch Accessibility

### Test 4.1: Touch Target Size
**Objective**: Verify touch targets are ≥44x44px

**Inspect Elements**:
1. Right-click on button/link
2. Select Inspect
3. In Styles panel, check width and height
4. Calculate padding if needed

**Expected**:
- Buttons: ≥44x44px
- Links: ≥44x44px
- Spacing between touch targets: ≥8px

---

### Test 4.2: Mobile Menu Usability
**Objective**: Verify mobile menu is easy to use on touch devices

**Steps** (test on actual phone or mobile emulation):
1. Load page on mobile (<768px)
2. Hamburger menu is visible
3. Tap hamburger icon → Menu opens
4. Tap menu item → Navigate to page
5. Return to menu (via back button or navigation)
6. Hamburger menu should close
7. Tap outside menu → Menu closes

**Expected**:
- Menu opens with single tap
- Menu items are large enough to tap accurately
- Easy to close menu
- Smooth transitions

---

### Test 4.3: Responsive Text
**Objective**: Verify text scales properly on mobile

**Steps**:
1. Open page on mobile device
2. Read all text sections
3. Text should be:
   - At least 14px (preferably 16px+)
   - Not requiring horizontal scrolling
   - Good line spacing (1.5x+)

**Test Zoom**:
1. On mobile, zoom text to 150%
2. All text should remain readable
3. No horizontal scroll

---

## Part 5: Screen Reader Testing

### Test 5.1: NVDA (Windows)
**Download**: https://www.nvaccess.org/

**Basic Test**:
1. Download and install NVDA
2. Start NVDA and open browser
3. Navigate page with:
   - **H**: Jump to next heading
   - **N**: Jump to next navigation
   - **L**: Jump to next list
   - **B**: Jump to next button
4. Verify correct elements are announced

---

### Test 5.2: JAWS (Windows, Commercial)
**Steps**:
1. Start JAWS and open browser
2. Press **H** to list all headings
3. Press **N** to list all navigation
4. Verify proper announcements

---

### Test 5.3: VoiceOver (Mac/iOS)
**Enable**:
- Mac: Cmd+F5
- iPhone/iPad: Settings → Accessibility → VoiceOver

**Basic Test**:
1. Enable VoiceOver
2. Press VO+Right Arrow to navigate
3. Verify:
   - Page structure is announced
   - Navigation items are identified
   - Images have alt text
   - Form labels are announced

---

## Part 6: Automated Testing Tools

### Test 6.1: Chrome DevTools Accessibility Audit
**Steps**:
1. Open DevTools (F12)
2. Go to **Lighthouse** tab
3. Click **Analyze page load**
4. Wait for report
5. Review "Accessibility" section
6. Fix any reported issues

**Ideal Score**: 90+

---

### Test 6.2: axe DevTools Extension
**Install**: https://www.deque.com/axe/devtools/

**Steps**:
1. Install axe DevTools extension
2. Open DevTools (F12)
3. Go to **axe DevTools** tab
4. Click **Scan ALL of my page**
5. Review results:
   - Violations (fix these)
   - Best practices (good to implement)

---

### Test 6.3: WAVE Extension
**Install**: https://wave.webaim.org/extension/

**Steps**:
1. Install WAVE extension
2. Click WAVE icon in toolbar
3. Review report:
   - Red (errors) - fix required
   - Yellow (warnings) - review recommended
   - Green (passed) - good

---

## Part 7: Test Report Template

Use this template to document testing results:

```markdown
# Accessibility Testing Report
**Date**: [Date]
**Tester**: [Name]
**Browser**: [Chrome/Firefox/Safari]
**Device**: [Desktop/Tablet/Mobile]
**Screen Reader**: [NVDA/JAWS/VoiceOver/None]

## Keyboard Navigation
- [ ] Tab navigation works
- [ ] Arrow keys work in menus
- [ ] Escape closes menus
- [ ] Enter activates links
- [ ] Focus indicators visible
- [ ] No keyboard traps

## ARIA & Semantics
- [ ] Navigation landmarks announced
- [ ] Menu items have correct roles
- [ ] Buttons have labels
- [ ] Headings properly nested
- [ ] Form labels associated

## Visual Accessibility
- [ ] Color contrast sufficient
- [ ] Focus indicators visible
- [ ] Content readable at 200% zoom
- [ ] Responsive layout works
- [ ] Touch targets 44x44px+

## Mobile & Touch
- [ ] Mobile menu usable
- [ ] Text scales properly
- [ ] No horizontal scroll
- [ ] Touch targets accessible

## Issues Found
1. [Issue 1]
2. [Issue 2]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

## Overall Score: [Score]/100
```

---

## Additional Resources

### WCAG 2.1 Guidelines
- https://www.w3.org/WAI/WCAG21/quickref/

### WebAIM Articles
- https://webaim.org/articles/

### MDN Accessibility
- https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Testing Tools
- **WAVE**: https://wave.webaim.org/
- **axe DevTools**: https://www.deque.com/axe/devtools/
- **Lighthouse**: Built into Chrome DevTools
- **NVDA**: https://www.nvaccess.org/
- **JAWS**: https://www.freedomscientific.com/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

## Quick Checklist

**Must Pass**:
- [ ] All interactive elements keyboard accessible
- [ ] Tab navigation works correctly
- [ ] Focus indicators visible
- [ ] Color contrast ≥4.5:1
- [ ] Semantic HTML used
- [ ] ARIA roles/states correct
- [ ] Mobile menu keyboard accessible
- [ ] No keyboard traps

**Should Pass**:
- [ ] Mega menu keyboard navigation (arrow keys)
- [ ] Screen reader testing passed
- [ ] Zoom to 200% works
- [ ] Touch targets 44x44px+
- [ ] Reduced motion respected
- [ ] All headings properly nested

**Nice to Have**:
- [ ] Skip navigation links
- [ ] Focus visible with outline-offset
- [ ] Color not only indicator
- [ ] Content marked up with `<label>`
- [ ] Custom focus styles match brand

---

**Last Updated**: January 2026  
**Version**: 1.0
