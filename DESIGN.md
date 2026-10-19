# Profile visual integration

Sources: modern-ai-design-system, tokens/web.json (light), tokens/radius.json, web/components.css (.ds-bento-item, .ds-badge, .ds-terminal), docs/guides/glass-and-motion-adoption.md.

Opaque content cards, 20/24px corners, 16px grid gaps, semantic light roles. The SVGs adapt component geometry for GitHub rather than loading React/CSS. Project illustrations are conceptual; timer data is an example. No scripts, external fonts, animation, or foreignObject in SVG. Native README text and links remain available.

Rebuild: node scripts/build-art.cjs
Refresh tokens from a local design-system checkout: node scripts/build-art.cjs /path/to/ui-design-system

The checked-in token snapshot makes a clean clone independently rebuildable. Theme choice is fixed light for this profile. GitHub shell theme remains a browser/account preference.
