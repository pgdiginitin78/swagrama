# Mandatory Tailwind CSS Rules

These rules apply to every project and every coding task.

## 1. Styling requirements
- ALWAYS use Tailwind CSS utility classes for all UI styling.
- NEVER write custom CSS in external .css or .scss files.
- NEVER add inline styles using the style={{}} prop.
- NEVER use CSS-in-JS libraries for styling.
- NEVER use <style> tags or dynamically inject CSS.
- Do not introduce Bootstrap, Bulma, or other styling frameworks.

## 2. Existing project requirements
- Before making changes, inspect package.json, the Tailwind configuration, and existing project files.
- Reuse the project's installed Tailwind CSS version and existing setup.
- Do not install, upgrade, downgrade, or replace styling dependencies without a clear need.
- Do not migrate the project to another framework or styling system.
- Preserve existing functionality, layout, responsive behavior, and design.

## 3. Component styling
- Use Tailwind utilities for colors, backgrounds, spacing, typography, borders, shadows, sizing, positioning, and responsive layouts.
- Use responsive variants such as sm:, md:, lg:, and xl:.
- Use hover:, focus:, active:, disabled:, and transition utilities whenever appropriate.
- Use arbitrary Tailwind values such as bg-[#263d21] when needed.
- Use conditional Tailwind class names for dynamic states.
- Use clsx, classnames, or tailwind-merge only if already installed or genuinely needed.

## 4. Exceptions
- Do not create external CSS files for new components or features.
- Do not add new custom CSS for animations; prefer Tailwind utilities and existing animation libraries already installed in the project.
- Existing third-party libraries may require their own CSS imports. Preserve required vendor CSS if removing it would break functionality.
- If a requirement cannot reasonably be implemented with Tailwind, explain the limitation before introducing custom CSS.
- Do not remove required global styles, resets, or existing CSS dependencies without checking their impact.

## 5. Before completing any task
- Review every file changed or created.
- Check for newly introduced external CSS, SCSS, inline styles, and <style> tags.
- Replace custom styling with Tailwind utilities wherever possible.
- Run the available build or type-check commands when appropriate.
- Report any unavoidable CSS exceptions explicitly.

## 6. Priority
Tailwind CSS is the mandatory default styling system.
These rules apply to all new features, bug fixes, UI changes, responsive changes, and refactoring tasks.