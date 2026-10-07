# CTX9 internal product style guide

Status: shared Impression internal application system for v8.

## Scope

This guide is canonical for Impression's authenticated application and CTX9-owned internal applications. It does not govern public Impression pages, the public `ctx9.com` site, GitLab, or Grafana.

## Standing visual contract

- One semantic light theme and one semantic dark theme. Applications select the theme with `:root` and `.dark` or `[data-theme='dark']`.
- CTX9 applications may default to dark. They do not define a separate CTX9 palette.
- The dark page canvas remains true black `#000`. The light theme uses Impression's warm neutral application tokens.
- Information-dense layouts with deliberate whitespace, not decorative nested cards.
- Minimal copy. No eyebrows, all-caps interface labels, light-gray subtitle rails, or em dashes.
- Thin neutral borders define structure. Surfaces remain close to black.
- Links, focus, selection, and primary actions use the shared Impression semantic tokens. Green, amber, and red communicate real state.
- Controls expose visible hover, focus, selected, disabled, loading, empty, warning, success, and error states.
- Geist Sans 1.5.1 is the interface face. The `font-mono` utility maps to Inter, matching Impression's existing Tailwind contract. Both fonts are self-hosted. Host font bindings take precedence so importing shared CSS does not change Impression's selected fonts.

## Layout

- Product content uses a compact top bar and a readable maximum width where the task permits it.
- Dense tables may scroll horizontally; ordinary pages must not.
- Pages remain vertically scrollable. A dialog scrolls internally only when taller than the viewport.
- Authentication uses the shared two-column `AuthShell` on desktop and one focused column on mobile. Authenticated products use `ApplicationLayout`, with product switching and product-local navigation in the collapsible left sidebar. Its top bar always shows the complete route breadcrumb. Ancestors are links and the current page is plain text.
- Prefer section boundaries and aligned rows over card grids. A bordered panel exists only when content needs a distinct interaction or security boundary.

## Controls

- Standard app buttons are 36px high; compact buttons are 32px and auth buttons are 40px. App fields default to
  40px and auth fields to 36px. Select the component's variants rather than
  recreating these dimensions at call sites. Auto-height fields retain their
  content-driven sizing.
- Labels remain visible. Placeholder text does not replace a label.
- Checkbox and Switch reject `className` and `style` in their props. Checkbox
  appearance uses its `variant` and `interaction` choices; Switch owns its
  established on/off appearance. Put placement classes on the containing row.
- ColorPicker owns its trigger, palette swatches, selected indicator and hex
  field. `value` is color data, not a style override. Use `layer="raised"`
  for the established raised trigger and `insideModal` for non-portal placement.
  Its props reject `className` and `style`; products own the chosen value.
- Focus uses a high-contrast neutral ring and never relies on color alone.
- Destructive actions are visually restrained until the confirmation boundary.
- Recovery material, secrets metadata, and artifact identifiers use the shared `font-mono` utility and selectable wrapping.
- Standard actions use `Button`. Its `loading` and `loadingLabel` props own the loading state.
- CTX9 primary application actions select `effect="funkyStable"` for the
  established bordered, high-contrast action in both themes. Secondary and
  navigation actions keep their own variants. This does not change Impression's
  existing Button defaults or recipes.
- Animations, including spinners, pulses, and glow effects, are supported. The component owns the effect; there is no animation prohibition based on browser repaint cost.
- Impression's existing animated actions use `FunkyLoaderButton`. Its typed
  `isLoading` and `gradient` options preserve the existing icon, hover gradient,
  disabled behavior, and link composition. The component owns this appearance;
  call sites do not recreate the loader or gradient classes.
- Loader presets own the existing compact, large, recovery, paired-action,
  fixed-width and form-action recipes. They apply after the loader's defaults;
  ordinary Button presets are not loader presets. Choose `width` for standard
  full/fit/growing placement rather than duplicating width classes.
- Grouped loader actions use `groupStart`, `groupEnd`, `groupChevron` or
  `groupChevronCompact`. Their shared border, corner and hover recipes stay
  in the component. `roundIcon`, `accentIcon` and `accentCardIcon` own the
  corresponding standalone icon recipes.
- Tooltip-backed loader actions select `shape="medium"` for their existing
  rounded default. `groupAction`, `groupActionStart` and `groupActionMiddle`
  retain the standard loader padding used by generation menus. They are not
  interchangeable with the narrower scheduling presets.
- Composer send uses the loader's `composerSend` preset. Compact content
  actions use `contentAction` and `selection="active"` when selected;
  this preset also owns its existing disabled cursor and opacity.
- Primary tooltip icons use Button's `primaryTooltipIcon` preset and
  `state="selected"` where selected. Tooltip behavior stays local.
- Content icon actions use `contentIcon`; external content links use
  `contentLink` or `contentLinkCompact`. These own the existing rounded
  dimensions, padding and 200ms color transition. Dropdown actions use
  `dropdownAction`, which owns their full width and row alignment.
- Navigational rows are one full-width link with pointer, hover, and focus states. Do not add a second title link, chevron, or generic Open button inside the row.
- Editor icons use `compactIcon`, optionally with `tone="draftNavigation"`.
  Preview controls use `previewIcon` and `state="highlighted"` after copying.
  Minor actions, media controls, dismissals and filters select `minorAction`,
  `mediaIcon`, `overlayDismiss`, `filterToggle` or `compactToggle`. Selected
  recipes and hover cursor choices belong to Button, not caller classes.
- Filter and selection triggers use `filterCompact`, `filterTrigger`,
  `filterIcon`, `selectorTrigger`, `selectorIcon` or `selectorFlags`. Choose
  `width="full"` on a filter trigger for its existing growing layout.
  Inline actions use `inlineAction` or `inlineRoomy`; navigation rows use
  `navigationOption`. The animated loader has its own matching inline presets.
- Editor rail controls use `railIcon` or `railFunkyIcon`, with
  `state="brandActive"` for the established solid-blue active treatment.
  `density="rail"` owns the important 28px sizing override used by cloned
  editor actions without changing their original size recipes. Ordinary
  usages and action-list compositions do not inject appearance classes.
- Compact generation chips use `inlineGenerate`. Shimmer actions use
  `shimmerAction`, with `state="shimmerLoading"` while their existing spinner
  and gradient animation run. The tooltip composition owns its timing and
  motion; Button owns its colors, padding, corners and loading hover treatment.
- Workspace-switch choices use `preset="workspaceOption"`. Impression's
  sidebar uses `sidebarMenu`, `sidebarSettings` and `sidebarUpload` presets
  with `sidebar="expanded"` or `sidebar="collapsed"`. Choose
  `state="sidebarSelected"` or `state="sidebarDragging"` for their existing
  selected and upload states; do not recreate those appearance recipes.
- Table drag handles, row menus, endpoint pagination and cell links use the
  `tableDrag`, `tableMenu`, `tableFirstPage`, `tableLastPage` and `tableCell`
  presets. Calendar navigation, captions and years use their corresponding
  presets, with `calendarCurrent` for the current year. Timezone triggers own
  their existing fixed width. Product positioning stays local.
- Date-time triggers use `dateTimeTrigger`, `dateTimeSchedule`,
  `dateTimeScheduleJoined`, `dateTimeMenu`, `dateTimeMenuCompact`,
  `dateTimeRangeStart` or `dateTimeRangeEnd`. These own the existing joined
  corners, menu density, borders, typography and hover precedence. Empty and
  intended dates select `dateTimeEmpty` and `dateTimeIntended`; product date
  selection, scheduling mutations and calendar state stay local.
- Side navigation tabs select `sideTab`, their expanded/collapsed sidebar
  choice and selected state. Narrow editor actions use `editorNarrowIcon`;
  readability selects `readabilityActive`. Panel choices select `panelTrigger`
  or `navigationOption` with `panelActive`/`panelIdle`.
- Carousel indicators and arrows use `carouselIndicator` and
  `carouselNavigation`. Command rows use `commandOption` and
  `commandSelected`; product slide state and command behavior remain local.
- Animated upgrade actions use loader-owned `upgradeCompact`, `upgradePanel`,
  `upgradeIcon` or `upgradeNavigation`. These preserve their established
  blue recipe and spinner, rather than recreating them through caller classes.
- Connection actions select `platformLink` with a typed neutral, sky, red,
  indigo or pink `palette`. Products map their domain identifiers to those
  choices; they do not pass background or hover recipes. Loader navigation
  actions use `navigationAccent` or `navigationNeutral`, with the corresponding
  icon preset when collapsed. Products retain activation and availability
  behavior, including a cursor-only unavailable state where already used.
- Chat actions use the `threadNew`, `threadMenu`, `threadSuggestion` and
  `composerDraft` presets. Thread markers and external placement can remain
  local, but sizing, padding, hover and menu-reveal styling stay in Button.
- Assistant icon actions select the `assistantIcon`, `assistantScroll`,
  `assistantSend`, `assistantMenu`, `assistantEdit` and `assistantModal`
  presets. Attachments use `attachmentAdd` and `attachmentRemove`;
  recording selects `composerMic` or `composerMicRecording`. These preserve
  the existing recipes. Framework markers and external placement stay local.
- Tabs use the existing `compact`, `settings`, `subtle` and `sidebar`
  variants. Choose trigger `gap="tight"` or `gap="standard"` for icon
  spacing. TabsContent owns `surface` and `mainPanel` appearance; its
  `padding` and `layout` choices cover padded, growing and active-fill
  panels. Product navigation state stays local.

The runtime variables, controls, typed data table, feedback states, Auth composition, sidebar, account menu, responsive layout, and style policy live in `@ctx9/ui`. Next applications inject their link implementation through `NavigationProvider`, so internal navigation uses the Next router without adding a Next dependency to the package.

Import `@ctx9/ui/styles.css` once before product styles. The compiled stylesheet
includes Tailwind 3 Preflight, so standalone products have the same control
reset as Impression. Products do not add a second reset or copy shared control
rules. The application skip link is hidden outside keyboard focus and stays
out of the sidebar/content grid.

Call sites may supply placement and product-specific geometry. Colors, backgrounds, borders, radius, padding, typography, hover, focus, selected, disabled, and standard control dimensions belong to component variants. The package style check enforces this boundary.

When checking `@impression/public-ui`, the same policy covers its priority
actions, theme selector, and tooltip triggers as well as buttons, fields,
alerts, and tooltip content. Public styling remains in that package, not in
the shared internal runtime.

Run `ctx9-ui-style-check src --exceptions ui-style-exceptions.json` in each consumer. The checker resolves aliases and namespace imports from `@ctx9/ui`, follows local class constants, and rejects appearance classes, inline appearance, unresolved recipes, and opaque prop spreads. Nested object spreads and quoted or computed appearance keys are checked too. Select a typed variant, size, or preset instead of feeding a recipe through `className`.

Add `--package @impression/public-ui` to check public controls with the same
engine. Repeat `--package` for other component packages; `@ctx9/ui` always stays
in scope. This adds the public Button, FunkyLoaderButton, CTAActionButton,
fields, and form controls without adding a public-package runtime dependency.
Public component types separately forbid all call-site `className` and `style`
props. The programmatic API accepts `{ packages, exceptions }` as its third
argument. Add `--project <tsconfig.json>` when a consumer uses typed controller
fields or adapter props. TypeScript must prove that a spread has no usable
`className` or `style` property. Unknown, `any`, indexed, and unresolved props
still fail; literal appearance keys remain forbidden. Keep the consumer's
typecheck in CI alongside this check. The programmatic API accepts the same
consumer `program` in its options.

With a current TypeScript program, the checker can inspect a parameter whose
class choices are a finite string-literal union. Every choice still receives
the normal appearance check. This supports narrowly typed framework markers
and placement without accepting unrestricted strings, `any`, or appearance
hidden in one union branch.

The optional exceptions file is a JSON array. Each entry names one exact repository-relative file and component, a reason of `framework-adapter`, `control-composition`, or `feature-geometry`, and a written explanation. Do not exempt whole source roots. Public-specific design rules remain in Impression; the shared engine owns the control-appearance boundary.

## Sidebar and account menu

- Desktop navigation is a fixed 246px left sidebar. The CTX9 grid mark and name open All apps in the fixed Secrets, Publisher, Testimonials order; product-local links sit below it without icons. Retired products and the headless Platform control plane are not app destinations.
- Mobile navigation is an off-canvas drawer with an explicit open button, close button, backdrop, Escape handling, and focus-visible controls.
- The footer trigger uses a 40px round avatar, current tenant, and user name. Its menu is 270px wide and follows Impression's space/brand switcher hierarchy.
- The account menu contains current and switchable tenants, an optional product-settings action, Tenant and account settings, and Sign out. Do not add product settings until the product has a real settings page.
- Keep `Tenant and account settings` on one line. The menu may grow wider to preserve the label.
- Detail-page titles use `PageHeading`'s icon-only parent chevron. Do not add visible `Back` actions or put parent navigation on the right.
- Tenant and account settings opens in the current app. Its near-full-viewport dialog uses a left tab rail for Tenant, Access, capability-backed Provisioning, and Account security. The dialog uses one 300ms opacity and scale transition and disables scale motion for reduced-motion users.
- Route and tab changes keep the shell and useful cached content mounted. Loading indicators may animate without replacing useful content.
