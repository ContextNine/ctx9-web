# Source provenance

Reference repository: Impression

The October 21 managed-file review exposed a primary Button contrast defect:
the dark recipe overrode the semantic primary background with black while
retaining dark primary foreground text. The 9.3.2 correction uses the semantic
background/foreground pair in both themes. Hover, loading and explicit presets
retain their owned recipes. This intentionally corrects the transferred default.

Matt's October 21 Notenv screenshot review authorizes consistent Button
icon/text gaps, compact account actions, lighter navigation typography and
DataTable spacing, row rules and hover/focus feedback. DataTable's optional
heading shares the existing control toolbar. Nested controls no longer trigger
row navigation. These requested refinements revise the shared defaults; they
are not an unchanged-pixel comparison with the original extraction.

The public `@ctx9/identity` authority is extracted from Platform's `packages/auth/src/index.ts` at `a1abd16`. Its passkey verification, OAuth field mappings, token/cookie policy and rate limiting are reused. Database event writes, membership resolution and enrollment/recovery authorization are injected by each installation. Private Platform provisioning, catalogs and data migrations remain in Platform. The extraction is a public Apache-2.0 package authorized by Matt's October 16 implementation request; independent identity acceptance is tracked separately from package publication.

The Notenv editor redesign adds InfoTooltip and PageHeading's `info`
text as new compositions of the existing shared Button and Tooltip. Matt's
October 7 direction moves introductory descriptions beside headings. Account
actions place the icon and wrapping label directly in the menu's two-column
grid, correcting the extra wrapper that previously stacked them. These are
requested behavior changes, rather than claims of unchanged source parity.

The October 7 remaining-ownership pass uses Impression's working sources at
`36aeae3e4c86aed9f963a1b3150c211595910fa0`: Chart, Sidebar, use-mobile,
Command, ScrollArea, Sheet and the two `packages/ui/src/assistant-*` controls.
Native elements, default recipes, chart payload formatting, responsive behavior,
cookie persistence and keyboard toggling are retained. Existing caller recipes
become typed choices. Chart supports both class-based and attribute-based dark
themes. The source uses local shared dependencies, never runtime Impression
imports. Product upload state and sample-dashboard compositions remain in
Impression outside its generic UI directory.

Matt's October 7 scope change prioritizes complete CTX9 adoption and focused
acceptance over exhaustive Impression screenshot matrices. Unused transitional
copies may be retired once import/type checks pass. Their recorded pixel
differences remain deferred, not accepted, in Impression's
`.agents/plans/phase-3-shared-ui-consolidation-2026-09-23/progress-2026-10-07.md`.
Impression's final appearance pass is separate from shared-package/CTX9 release
acceptance; preserve all existing animations.

The Toast and Resizable ownership pass retains Impression's working source at
`371819b9a`, with hashes in its `feedback-retained-source.json` artifact.
Existing Toast variants, viewport and action/close recipes become an owned
contract without caller appearance overrides. ToastBody owns the existing
title/description grid. Resizable group and handle defaults keep their current
native library behavior and optional grip. Product toast state, scheduling,
undo callbacks and assistant content stay local. Impression installs the
unpublished archive from shared source `bebad871`. Its full check, 21 integration
tests and isolated installation pass under Node 22. All 92 installed-archive
native comparisons match computed styles, geometry, native attributes, refs,
callbacks, toast state and sampled motion across both widths and themes.
Eighty-eight full-fixture screenshots match exactly; four toast states differ
by 1–75 pixels and remain unaccepted. All 460 Resizable and assistant-composition
section comparisons match pixels exactly, without masks or tolerance. The
unused local Resizable copy is removed; the local Toast copy remains pending
appearance acceptance. Product AST across six consumer files remains exact
after imports, formatting and the equivalent native ToastBody div are accounted
for. Host and package CSS are byte-identical, including host CSS after unused
Resizable removal. Capture corrections address the native timer's pause/resume
history, an incorrect floating-point subtraction assertion and the existing
grain texture asset, without changing production behavior. Complete-page,
real-service and release acceptance remain required.

The Collapsible and Alert pass retains Impression's working source at
`d06286428`, with hashes in its `disclosure-retained-source.json` artifact.
Existing settings, grouped-post, sidebar and chat-disclosure recipes become
owned presets. The native grouped-post trigger and count span retain their
original markup and typography. Chat state and scroll-lock callbacks stay in
Impression. FormDisclosure's existing motion/layout choices now feed the
Collapsible content variant; its unused content-class override is removed.
Alert's existing success, destructive and default variants are unchanged.
Impression installs the unpublished archive from shared source `3f0247a`.
The full package check, 21 integration tests and isolated archive installation
pass. All 768 native case/state comparisons match computed styles, geometry,
native attributes, refs and sampled callbacks across both widths and themes.
Twelve full-fixture screenshots retain edge-pixel differences and remain
unaccepted. An unchanged-source control also differs by 11–40 pixels despite
identical classes and recorded rendering properties. Disabling GPU acceleration
does not remove the differences. These diagnostics do not accept the migration.
The Alert and autoform-error sections match exactly in all 120 states, without
masks or tolerance. Host CSS is byte-identical; shared CSS adds 18 selectors
without changing or removing existing effective declarations. FormDisclosure's
other compiled component dependencies are byte-identical to the prior archive.
Complete-page and release acceptance remain separate gates.

The Badge extraction retains Impression's working source at `7da69f91d`,
with hashes in its `badge-retained-source.json` comparison artifact. Standard
round badges and compact source-link badges retain their distinct DOM and
defaults. Counts, filter states, table/metric labels, status typography and
selection pills become owned choices. Existing hover precedence and 10/11px
typography stay unchanged. Impression installs the archive from shared source
`27149cb`. Its full package check, 21 integration tests and isolated install
pass. All 452 installed-archive browser comparisons match computed styles,
geometry, native attributes, refs and sampled callbacks at both widths in both
themes. Of these, 433 screenshots match exactly; nineteen retain small edge-pixel
differences and remain unaccepted. A repeated fresh-render check of one focused
case matches exactly but does not accept the full matrix. Host CSS is byte-identical;
package CSS adds 38 selectors without changing existing effective declarations.
Impression's unused local badge copies remain until appearance acceptance.
Complete-page, real-service and publication acceptance remain separate gates.

The Table extraction retains Impression's working source at `bff247b34`,
with hashes in `.cache/dist/table-extraction-20261007/retained-source.json`.
Settings, analytics, grouped/selected rows and empty-cell recipes become typed
choices. Existing defaults and native table elements remain unchanged.
Impression's nine consumer files use these choices. Its installed-archive
comparison passes 45 configurations at both widths in both themes through
default, hover, selected, dragging and focused states. All 900 case/state
comparisons match pixels, computed styles, geometry, attributes, refs and sampled
callbacks. Product logic and selection predicates remain unchanged. The host
CSS is byte-identical; package CSS adds selectors and regroups backdrop-filter
declarations without changing existing effective declarations. The unused
local Table copy is removed. The repeated post-removal comparison also passes
all 900 case/state comparisons; types and style enforcement pass. Complete-page
acceptance remains a separate gate.
The Avatar pass retains Impression's working source at `17168442e`, with
per-file hashes in its comparison artifacts. Sizes, comment/thread borders,
attachment crop and fallback typography become typed choices. AvatarIcon's
initials behavior and 56px default stay unchanged. Public blog and social-preview
recipes remain in Impression, not in the internal package. Installed-archive
browser checks and complete-page acceptance are separate gates.
The Calendar Card pass retains Impression's working source at `36294becb`,
with per-file hashes in its comparison artifacts. Generic tile variants own
the existing palette/status surfaces, selection precedence and fading.
The one-shot blue border pulse keeps the original keyframes and duration.
Compact dashed/info Button variants retain the two original native button
recipes rather than adding standard Button typography or disabled styling.
Platform/status mappings, drag-and-drop and creation/navigation callbacks
remain product-owned. Browser and complete-page acceptance remain separate.

The integration-card ownership pass retains Impression's working source at
`47f1e9f37`, with per-file hashes in its comparison artifacts. Card owns the
existing integration root and detail inset/label/value recipes; Badge owns
the active/idle connection treatments and fit width. OAuth data, callbacks
and public marketing recipes remain outside the shared package. Existing
component defaults stay unchanged. Installed-archive browser and complete-page
acceptance remain separate gates.

Implementation authority: Impression `master` at `ccc4fd09d4f3f5eee0adb501f145c4ceb5d51e41` for the v8 migration baseline. Each later package release records the exact source commit used.

Structural sidebar reference: shadcn/ui `dashboard-01` at `b9938d94635fca7a4560449713b0b1ba87d77bc6` (MIT).

The pre-v8 package used a shadcn `base-nova` snapshot and CTX9-only dark adaptations. Version 8 replaces that component contract with Impression's internal application components and Tailwind 3 implementation.

`@ctx9/ui` never imports Impression at build or runtime. Source moves are reviewed and recorded against the exact Impression commit, then owned and released from this repository.

The Card recipe extraction retains Impression's current working sources at
`b0a395d46`, with file hashes in its consumer artifacts. Existing stretch-card,
preview-height, editor-surface and integration-section recipes become typed
choices. The original 45/65 ghost opacity tokens are preserved as written,
not repaired during extraction. Public marketing recipes and domain color
mappings stay outside the shared runtime. Defaults remain unchanged;
installed-archive and browser acceptance are still required. The browser check
caught an integration-heading line-height change. Its original final `text-sm`
recipe removes the earlier `leading-tight` token during class merging, so the
shared size preserves that result instead of retaining the earlier leading.

The Skeleton and Separator ownership pass retains Impression's working source
at `dfcc6e204`, with per-file hashes in the consumer artifacts. Existing corner,
subdued/inverse color and toggle-hover recipes become typed choices. Defaults,
pulse animation, Radix orientation, decorative behavior and refs stay unchanged.
Installed-archive rendering and complete-page acceptance remain separate gates.

The Tooltip, Popover and ContextMenu ownership pass retains the current
Impression working sources at `9863a3a52`, with individual source hashes in
the consumer verification artifacts. Tooltip owns recurring action, details,
layer, inset and width recipes. Popover owns its existing caller recipes in
both outer and inner class positions without changing motion or autofocus
policy. ContextMenu's existing recipes are unchanged. Native installed-archive
and complete-page comparisons remain separate acceptance gates.

The AlertDialog ownership migration uses Impression `ee5fd7680`,
`apps/next/src/components/ui/alert-dialog.tsx`, and its three internal
analytics, onboarding and deletion consumers. Their existing default recipes
and Radix behavior remain unchanged. The shared contract rejects caller
class/style overrides throughout the dialog; style enforcement also covers
its header, footer, title, description, overlay and trigger. Full consumer-page
acceptance remains separate from component comparisons.

The shared `Ctx9Mark` is the original six-cell vector served by `ctx9.com/tenants/ctx9/icons/favicon.svg`. The package embeds the mark so internal products make no runtime request to the public site.
Its five neutral cells inherit the shared foreground for light/dark contrast;
the existing yellow accent cell and vector geometry stay unchanged. The
published favicon asset remains the original vector.

| CTX9 surface                           | Impression reference                                                                                                      | Classification | Notes                                                                                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| light, dark, mono, and semantic tokens | `tooling/tailwind/colors.css`                                                                                             | aligned        | Internal light and dark tokens retained; public marketing-only tokens remain outside this package                                            |
| reusable layout/control recipes        | `apps/next/src/components/styles/common.tsx`                                                                              | aligned        | Product and social recipes remain in Impression; reusable internal recipes move with their components                                        |
| class merging                          | generic `cn` usage across UI                                                                                              | rewritten      | Small typed `clsx` plus `tailwind-merge` utility                                                                                             |
| input/label/textarea direction         | `apps/next/src/components/aceternity/input.tsx`, `label.tsx`, `text-area.tsx`                                             | adapted        | Existing glow and field behavior retained through component-owned effects and shape variants                                                 |
| buttons and control variants           | `apps/next/src/components/ui/button.tsx`, `components/aceternity/input.tsx`, `components/aceternity/text-area.tsx`        | aligned        | Typed internal variants and light/dark behavior retained; public and product-specific effects excluded                                       |
| checkbox                               | `apps/next/src/components/ui/checkbox.tsx`                                                                                | adapted        | Radix behavior retained through a direct dependency                                                                                          |
| dialogs and form system                | `apps/next/src/components/ui/dialog.tsx`, `alert-dialog.tsx`, `form.tsx`                                                  | adapted        | Next-specific imports removed; accessibility relationships retained                                                                          |
| date/time controls                     | Impression calendar/date/time component family identified by style guide                                                  | rewritten      | Product-neutral calendar, time, timezone, date-time, and range compositions                                                                  |
| errors                                 | Impression public and internal error patterns                                                                             | rewritten      | Public marketing shell excluded; compact operational states added                                                                            |
| overlays and command                   | Impression Radix and command-menu component family                                                                        | aligned        | Popover, tooltip, dropdown, and command variants retain shared internal light/dark behavior                                                  |
| data display                           | Impression tabs, table, scroll, badge, card, and separator component family                                               | aligned        | Typed appearance and spacing variants move into the package                                                                                  |
| application shells                     | Impression `sidebar.tsx`, `brand-switch-dropdown.tsx`, `common.tsx`; shadcn `dashboard-01` sidebar and nav-user structure | adapted        | Shared responsive CTX9 sidebar, tenant/account footer menu, Auth shell, keyboard toggle, and mobile drawer                                   |
| tenant and account settings            | Impression `apps/next/src/components/settings/settings-dialog.tsx`                                                        | adapted        | Near-full-viewport dialog, left tab rail, and discrete opacity/scale motion; CTX9 tokens and product-neutral tabs replace Impression content |
| retained CTX9 compositions             | Current `@ctx9/ui` application navigation, settings, date/time, and error components                                      | retained       | Retained only where active consumers need them; styling is rewritten against the shared Impression contract                                  |

The MultipleSelector port uses Impression `06967d08d`, `apps/next/src/components/ui/multiple-selector.tsx`. Its selection/search behavior and existing option normalization are retained. The linked-account height and shared pill background become typed variants; remove/clear actions are private appearance-owned buttons. Nested input and command appearance overrides are not part of the new contract. Impression's call sites remain unmigrated until visual verification.

The Button comparison uses Impression `01dd4e76d`, `apps/next/src/components/ui/button.tsx`. Its existing `typography="tiny"` variant stays at 11px. Changing it to `text-xs` would alter live outreach actions, so the migration preserves that existing size rather than applying a design change.

The interaction comparison also preserves Impression's `focus:dark:` and `hover:dark:` modifier order and onboarding dark-mode important flags. Normalizing those strings changed focus/hover colors when combined with the retained host stylesheet. The shared recipes keep the source class contracts unchanged.

The internal Button migration also exposes Impression's app-only and auth-only
prop types for product-owned tooltip, carousel and sidebar wrappers. They derive
from the shared control props and narrow the surface and variant choices. This
changes declarations only; Button rendering, defaults and recipes stay unchanged.

The sidebar presets extract Impression `b7a9ceb45` workspace choices, menu,
settings and upload actions. They preserve the existing expanded/collapsed
alignment, selected background and upload drag styling. The presets do not
change Button defaults or own product navigation and upload behavior.

The chat action presets extract Impression `726be8a4d` recipes from
`components/assistant-ui/thread-list.tsx`, `thread.tsx` and the outreach
reply composer. They preserve thread-row hover, overflow-menu reveal,
suggestion layout and draft-action colors. Framework markers and product
behavior remain local; the presets do not change Button defaults.

The assistant icon presets extract Impression `4b06e50bc` recipes from its
tooltip icon wrapper, thread, attachment, modal and live chat components.
Ten recipes match 40 normalized markup comparisons, including disabled and
open/closed states. The product wrapper now limits its class prop to existing
framework markers and placement; appearance uses shared presets. This is
focused extraction evidence, not tooltip-interaction or whole-page acceptance.

The tooltip action presets extract Impression `dfb02d632` loader-wrapper,
generation-group, composer-send, content-action and primary-tooltip-icon
recipes. Eight loader configurations and selected/unselected primary icons
match 36 normalized markup comparisons, including loading and disabled
states. The medium corner choice uses the common shape map instead of a
private wrapper class; existing shape choices and defaults are unchanged.
Tooltip timing, focus behavior, gradients and spinners are retained. Native
browser and full-consumer checks remain separate acceptance gates.

The content-action presets extract Impression `1dc419a93` repeated
tooltip-button recipes from idea, template and creator-post actions and
external content links. The three recipes retain the existing 32px, 28px
and 24px dimensions and 200ms color transition. They do not change Button
defaults or the local tooltip's timing and behavior.

The remaining tooltip-button recipes extract Impression `209d94e65` editor,
media, filter, dismissal and preview actions. Typed selected states preserve
the existing brand, pink and copied-state colors; hover cursors and emphasis
remain component-owned. The small corner choice uses the common shape map.
Standard and compact post-menu density stays product-owned and selects shared
Button dimensions instead of passing class strings. All 46 configurations
match 184 normalized markup comparisons, including disabled and both icon
families. This is source-level extraction evidence, not installed-archive,
native interaction or complete-page appearance acceptance.

The menu/rail presets extract Impression `fdc4c2fa6` filter, platform and format
trigger recipes, inline actions, assistant cancellation and editor rail icons.
The rail density retains the important sizing classes previously injected by
the action list. Shimmer's solid-blue recipe and loading hover overrides move
into Button; its existing spinner, direction timer and gradient motion stay in
the tooltip composition. All 29 configurations match 62 normalized markup
comparisons against retained installed controls, including disabled and loader
states. Archive, native animation and complete-page checks remain separate.

The navigation-control presets extract Impression `e55603266` table, calendar,
timezone, carousel, side-tab, editor-command and upgrade-action recipes.
Thirty-five configurations match 80 normalized markup comparisons against the
retained installed `4cbcce9` controls. This includes selected, disabled and
loading output. Table drag activators retain the existing Mouse, Touch and
Keyboard sensor handlers through explicit props. Product geometry and behavior
remain local. Native interactions and complete pages require separate checks.

The connection/navigation extraction uses Impression `989e35e48` platform-link
colors and post-creation button recipes. Five product-neutral palettes and four
expanded/collapsed accent/neutral loader presets match 54 normalized markup
comparisons across 19 configurations, including disabled and loading states.
Products retain domain mappings and activation behavior. The cursor-only
unavailable action remains enabled in the DOM, as in the original composition.
Archive, native interaction and complete-page acceptance remain separate gates.

The date-time trigger extraction uses Impression `931872c9c`,
`components/datetime/date-time-picker.tsx`, its scheduling wrapper and calendar
range callers. Seven presets retain eleven existing trigger configurations,
including intended-date tone and borders, compact menu rows, joined corners
and the original final hover precedence. Forty-four closed-markup comparisons
match date presence and disabled states against retained installed controls.
Calendar selection, time editing and product scheduling remain local. Archive,
native behavior and complete-page acceptance remain separate gates.

The ColorPicker port uses Impression `36b7ad8cd`,
`apps/next/src/components/ui/color-picker.tsx`, with the existing 5.6.1
react-colorful dependency. The raised trigger's z-index becomes a typed layer;
private swatches consume color values without accepting caller styling.
Default presets, empty-value fallback, selected indicator, hex field ref and
blur, disabled trigger and modal/portal behavior stay unchanged. Twelve closed
markup comparisons match six configurations against the retained local source.
Open-picker, installed archive and complete-page checks remain required.

Auth fields retain Impression's separate default-height and auto-height recipes,
including the inactive `dark:placeholder-text-mono-600` token and existing
`focus-visible:ring-[1px]` utility. Combining the height recipes or repairing the
placeholder token would restyle existing auth fields rather than extract them.

Checkbox recipes match Impression's current `a0ff86dae` source in
`apps/next/src/components/styles/common.tsx`. The browser comparison caught
missing indeterminate black/white colors and unchecked, checked, and
indeterminate hover rules in the draft. These source recipes are restored,
including the existing `/12` hover token, without normalizing their meaning.

The animated action port uses Impression `dce669e84`,
`apps/next/src/components/buttons/funky-loader-button.tsx` and
`components/aceternity/bottom-gradient.tsx`. It keeps the existing loader icon,
gradient colors, hover treatment, and link/disabled composition. Only the typed
gradient choices are retained; arbitrary gradient class overrides are not part
of the shared contract. This port is
unpublished and does not accept consumer appearance parity by itself.

The loader's growing-row width includes Impression's existing `w-full flex-1`
composition from data-integration actions. The width variant owns both classes,
so paired actions do not pass a width override through `className`. Loading,
gradient, surface and default-width behavior remain unchanged.

The loader's presets extract the remaining existing Impression action recipes
from auth recovery, onboarding, billing, form actions and settings. They apply
after the loader's private padding and font defaults. The earlier inherited
Button presets could be overwritten by those defaults; loaders now expose
only their own presets. Default loader output remains unchanged. Product
workflows and public-marketing recipes stay outside the shared package.

The grouped loader presets extract Impression `20d550bca` recipes from its
generation dropdown, queue/scheduling actions and post-type header action.
Seven presets preserve 28 normalized markup comparisons, including 14
loading spinners. These are focused extraction checks, not complete page
or browser appearance acceptance.

The animated action comparison also caught a draft auth recipe mismatch. Auth
buttons retain Impression's `common-public.tsx` recipe, including its 40px
height, `border-input`, and shadow treatment. The earlier generic 36px auth
adaptation was not appearance-equivalent.

Checkbox and Switch now reject consumer `className` and `style` props in their
types and ignore those overrides at runtime. All 49 existing Impression usages
across 24 source files already follow that contract. The archived port passes
298 browser comparisons with no pixel or computed-style differences. The
stricter implementation also preserves the DOM across all 23 control cases,
apart from attribute and class ordering. Full Impression typechecking passes
against both the installed archive and the stricter compiled declarations.
Complete migrated-page acceptance remains separate.

The shimmer action extraction uses Impression `754aa61fa`,
`components/marketing/marketing-ui/shimmer-and-border-button.tsx`, and its
active internal billing settings, pro-feature toast and pricing consumers.
Fourteen markup comparisons preserve both pricing surfaces and all five
existing shimmer recipes, including disabled states and the checkout marker's
DOM location. The recurring Inter-backed mono typography becomes the default.
Rotating radial highlights, the direction timer, hover scale and gradient
animation are retained. Public pricing owns its renderer in Impression's
public package; there is no public-package import in this shared runtime.
Native animation, installed archive and complete-page acceptance stay separate.
The package also owns Impression's `shimmer 2s linear infinite` keyframes so
the effect remains animated without a host application stylesheet.

Form and NumberSelect are extracted from Impression's local controls at
`9707a83ff38fae1f92e33de1de257af1e3502d32`. Form's recurring caller recipes
become typed choices; public forms remain in `@impression/public-ui`.
NumberSelect retains its callbacks, input parsing and drag listeners, including
existing event propagation. Private navigation buttons consume a shared preset
and the input consumes a typed dragging state. Existing defaults and animations
are unchanged. Installed-archive and native browser comparisons remain distinct
from whole-page acceptance.

## Font provenance

The Dialog ownership pass retains Impression `af6c8a2d3`. Existing settings
and pricing dimensions, manual-publish gaps, raised overlays and attachment
trigger appearance move into typed choices. Ordinary defaults stay unchanged.
Public extension-install typography and its full-screen renderer move to
`@impression/public-ui`; the internal package no longer owns Tiempos headings.
Product dismissal, focus callbacks and pointer coordinates stay local.
Installed-archive and native comparisons remain required before acceptance.

The Select and DropdownMenu ownership pass retains Impression `e3ef84f0d`.
Select owns the existing week-start, sidebar and table-height recipes and
time-control focus choices without changing its defaults. DropdownMenu's
workspace preset retains both sidebar switchers' original corner, hover,
typography and expanded/collapsed/sheet recipes. Selection and workspace
switching remain product behavior. Archive and browser acceptance are separate
from complete-page verification.

The field ownership migration uses Impression `45b51955a`. Input owns the
existing onboarding, sidebar and measured-title recipes. Textarea owns the
onboarding and reply-composer recipes, including the transparent highlight
overlay state. Label's contrast and sidebar tones retain their existing colors.
The field Label variant also retains the original `text-sm` override's removal
of `leading-none`; colors alone would not preserve that label's line height.
Auth textarea callers explicitly retain the Aceternity wrapper's auto-resize
default; the shared app textarea default remains unchanged. Product measurement,
highlighting and editing behavior stay in Impression. Installed-archive and
browser checks remain separate from complete-page acceptance.

The package vendors normal variable fonts for standalone consumers. They are emitted inside `@ctx9/ui`; production makes no third-party font request. Font utilities first consume the host's `--font-geist-sans` and `--font-inter` bindings, preserving Impression's existing font selection when the stylesheets are combined. Standalone applications use the package's self-hosted defaults.

| File                                  | Upstream package                                                                                                                                  | License                                                                       | SHA-256                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `geist-sans-variable.woff2`           | `geist@1.5.1`, `dist/fonts/geist-sans/Geist-Variable.woff2`, matching Impression's lockfile                                                       | SIL Open Font License, copied as `dist/fonts/licenses/geist-ofl.txt`          | `46525b05bbf4527d263f8624ca7024c7d0dce3c64430267d30c31c6dd3821e4d` |
| `inter-normal-variable.ttf`           | Impression `35c1d4f85f1b637b363b5c245c4dbd5b17539fd9`, `apps/next/public/fonts/inter/normal-variable.ttf`                                         | SIL Open Font License, copied as `dist/fonts/licenses/inter-ofl.txt`          | `29160a80ff49ddcab2c97711247e08b1fab27a484a329ce8b813d820dc559031` |
| `jetbrains-mono-latin-variable.woff2` | `@fontsource-variable/jetbrains-mono@5.3.0`, Latin normal variable subset, retained from shared source `9081c77a0d8eec6db95e87d2ef1c9f0391930029` | SIL Open Font License, copied as `dist/fonts/licenses/jetbrains-mono-ofl.txt` | `18be452724bfdc236c074ca94a249a7f41a86752c7d04ab258ce9ed5651f6a7e` |

The implementation is reviewed against this mapping before publication. `scripts/check-provenance.ts` verifies all three retained font hashes and OFL files. It inventories each public package's declared runtime, optional and peer dependencies and checks that package's actual installed metadata against the approved license set. This covers direct dependency metadata; it is not an exhaustive transitive-license or copied-code ownership review.

The standalone v8 foundation includes Tailwind 3 Preflight and Impression's
semantic base border color. CTX9 compositions own their primary action effect
through `funkyStable`; Impression's Button recipes and defaults remain unchanged.
The direct AlertDialog, DropdownMenu and Popover dependencies now use the
versions already included by Impression's `radix-ui@1.4.3`. This removes the
mixed old wrapper/new primitive graph without introducing a new version line.

The Publisher pilot adds semantic Badge success/warning choices and a metadata
Sheet variant with bordered header/footer choices. These are active consumer
compositions using the shared tokens, not compatibility exports. Existing
Impression Badge and Sheet defaults are unchanged.

The Notenv pilot adds generic code-field and transparent overlay
Textarea presets, semantic InlineStatus tones, and a compact notice Popover.
These consume the shared theme tokens. The product still owns syntax
highlighting, gutter geometry, protected-data handling and autosave. Existing
Impression field, feedback and Popover defaults are unchanged.

The pre-v8 Toaster's static loading-dot override was introduced under the
retired no-spinner guide. Removing that override restores Sonner's native
animated loader, also used by Impression's current Toaster. Other toast
appearance and theme adoption still need their own Impression comparisons.

The Tabs presets extract the active Impression `8b501f147` recipes from space
settings, campaign navigation, the admin sidebar and compact inspiration tabs.
Existing Tabs defaults and keyboard behavior remain unchanged. The compact
trigger retains the source's 11px typography; changing it to 12px would restyle
the existing control. Consumer migration still requires browser comparison.

The Tabs migration also extracts Impression `20d550bca` main-panel,
campaign growing-panel, table padding and icon-gap recipes. Eleven layouts
match 22 normalized markup comparisons against the retained local Tabs.
Defaults and Radix behavior stay unchanged. Keyboard, rendered-property and
pixel comparisons remain separate acceptance checks.

The CSS compiler is aligned to Impression `25e5df778`: PostCSS 8.5.18 and
Autoprefixer 10.4.22, with its resolved Browserslist and browser-data versions.
The explicit browser targets match Next 15's modern-browser defaults. The
shared build does not import Next. Its default and color transition lists keep
Impression's emitted WebKit aliases in the same order, preserving the existing
computed properties when both stylesheets are loaded.

## October 2026 CRM and navigation refresh

Matt approved replacing the Impression checkbox appearance with a compact neutral design on 2026-10-21, using Verascient Platform as the visual reference. The Radix-backed implementation uses existing package tokens and Lucide icons. This is an intentional appearance change, superseding the earlier checkbox pixel-preservation baseline. The `brand` and `blackWhite` variants are removed; consumers select the default neutral checkbox or the purpose-specific `dailyGoal`. Sidebar group, child and disclosure buttons extend existing Button recipes.

Impression sidebar/CRM browser review, 2026-10-21: approved profile identity uses 18px semibold names and quiet headlines, supplied by shared Input presets.
