# HVG 2026 Single-Page Redesign Plan

## Summary

Refactor the current `multi-route + dark tech` HVG workshop site into a `single-page anchor-based + light academic editorial` experience. The homepage should permanently present the workshop title `Human-Centric Video Generation` and the subtitle `Advancing controllable, realistic, and physically plausible human video synthesis for the ICPR 2026 research community.` Beneath the hero area, add a prominent sticky tab navigation for four sections: `OVERVIEW`, `INSTRUCTIONS FOR AUTHORS`, `COMMITTEE`, and `WORKSHOP SCHEDULE`. The overall visual style should follow a light academic publication interface, and a fixed side `Back to top` button should be added for fast upward navigation.

## Key Changes

### 1. Information Architecture

- Convert the public site into a single-page homepage.
- The homepage structure should be:
  - Hero
  - Sticky tab navigation
  - OVERVIEW
  - INSTRUCTIONS FOR AUTHORS
  - COMMITTEE
  - WORKSHOP SCHEDULE
  - Footer
- The current public multi-route flow should no longer be the main navigation model.
- Existing routes such as `/schedule`, `/submission`, and `/committee` should be reduced to compatibility entrypoints that redirect or link users back to the corresponding homepage anchors.

### 2. Visual Direction

- Adopt a `paper-like academic + modern minimalist` visual system.
- Use the following palette as the main design basis:
  - Background: `#FAFAFA` or `#FFFFFF`
  - Primary: `#2563EB`
  - Secondary section surface: `#F1F5F9`
  - Accent: `#D97706`
  - Main text: `#1E293B`
- Remove the current large dark-gradient hero treatment.
- Replace it with:
  - a light editorial-style hero
  - generous whitespace
  - subtle blue light gradients
  - thin borders
  - restrained shadows
- Keep the UI fully in English.
- Keep implementation notes and non-obvious code comments in Chinese.

### 3. Hero and Sticky Tabs

- The top of the page must show:
  - `Human-Centric Video Generation`
  - `Advancing controllable, realistic, and physically plausible human video synthesis for the ICPR 2026 research community.`
- The tab bar under the hero should use anchor navigation instead of route navigation.
- Tabs must be shown in uppercase English:
  - `OVERVIEW`
  - `INSTRUCTIONS FOR AUTHORS`
  - `COMMITTEE`
  - `WORKSHOP SCHEDULE`
- The tab bar should be sticky after scrolling into content.
- The current section should be highlighted while scrolling.
- Add a fixed side button for smooth scrolling back to the top.

### 4. OVERVIEW Section

- Use the provided `page4.png` content as the source for the overview body.
- Present the workshop scope and topics in a polished academic-summary layout.
- This section should explain:
  - workshop motivation
  - the three technical pillars
  - the detailed topic list
  - the expected workshop format and community value
- The content should remain fully in English.

### 5. INSTRUCTIONS FOR AUTHORS Section

- This section should include the following subsections:
  - `Submission Guidelines`
  - `Page Limits`
  - `Submission System`
  - `Acknowledgement`
- `Submission Guidelines` and `Page Limits` can initially be drafted from the currently known ICPR / LNCS / review-policy information until final source wording is provided.
- `Submission System` must include the sentence explaining that papers are submitted through Microsoft CMT.
- The phrase `the Microsoft CMT submission system` should be visually highlighted and clickable, linking to the workshop's actual submission URL.
- The following CMT acknowledgment must remain visible as plain text and must not be modified:

  `The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.`

- Existing submission-related content such as review policy, diversity, and ethics can be retained below the main author instructions as secondary information cards if desired, but the acknowledgment must stay clearly visible in the section.

### 6. COMMITTEE Section

- Use the contents from `page6.png` and `page7.png`.
- Show the committee in a publication-style directory layout.
- Preserve the member names, affiliations, emails, and extended bios.
- Replace the current shortened homepage-style summaries with fuller text blocks where appropriate.
- Keep the shared workshop contact visible in or near this section if still needed.

### 7. WORKSHOP SCHEDULE Section

- Use the `日程安排.png` content specifically related to HVG.
- Emphasize that HVG belongs to the `Friday, 21 August 2026` morning workshop block.
- Clearly display:
  - `Friday, 21 August 2026`
  - `morning workshops 8:30-12:30`
  - `HVG`
- Present the program information in a clean schedule snapshot layout consistent with the academic editorial style.

### 8. Content and Data Model Updates

- Centralize the new single-page content in `lib/workshop-content.ts`.
- Replace route-driven highlight content with single-page tab metadata.
- Extend content structures to support:
  - tab definitions
  - overview long-form content
  - author instruction content
  - CMT submission link
  - CMT acknowledgment text
  - WORKSHOP SCHEDULE snapshot
  - committee long-form bios
- Committee people data should support long paragraphs rather than only short summaries.

## Public Interfaces / Behavior

- The public site becomes a single-page anchored experience.
- The visible top navigation and section tabs should point to homepage anchors rather than route pages.
- The `INSTRUCTIONS FOR AUTHORS` section must visibly contain the Microsoft CMT acknowledgment as plain text.
- The Microsoft CMT submission phrase must link to the workshop submission URL.
- A fixed `Back to top` control must appear after scrolling and return users smoothly to the top of the page.

## Test Plan

- Verify the homepage renders:
  - the workshop title
  - the subtitle
  - the four uppercase tabs
- Verify tab links scroll to the correct anchored sections.
- Verify the sticky tab bar highlights the active section while scrolling.
- Verify the fixed `Back to top` button appears after scrolling and returns to top correctly.
- Verify the `INSTRUCTIONS FOR AUTHORS` section contains:
  - `Submission Guidelines`
  - `Page Limits`
  - `Submission System`
  - `Acknowledgement`
- Verify `the Microsoft CMT submission system` renders as a clickable link.
- Verify the CMT acknowledgment text appears exactly and remains visible.
- Verify the `COMMITTEE` section renders at least one long bio entry from the provided materials.
- Verify the `WORKSHOP SCHEDULE` section renders the HVG Friday morning workshop information.
- Run:
  - `npm test`
  - `npm run lint`
  - `npm run build`

## Assumptions

- The public experience should move back from multi-route navigation to a single-page tab-and-anchor model.
- The workshop already has or will have a CMT submission URL that can be wired into the highlighted CMT link.
- `Submission Guidelines` and `Page Limits` may be drafted first from current workshop information and replaced later with finalized wording.
- The Microsoft CMT acknowledgment must remain verbatim and visible on the website.
- The site should preserve English UI copy while keeping Chinese implementation commentary in code where needed.
