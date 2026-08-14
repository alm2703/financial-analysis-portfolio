# Financial Analysis & Modeling Portfolio

A restrained, research-led portfolio for practical work in financial analysis, modeling, FP&A, data analysis, and AI-assisted finance workflows.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Adding a project

Create one Markdown file in `content/projects/`. The filename becomes the URL slug.

```md
---
title: Company Name
number: 04
subtitle: Sector or market
status: Planned
year: 2026
description: One-sentence project summary.
topics: Business Model, Forecast, Valuation
---

## Executive Summary

Write the case study here.
```

The project will appear automatically on the home page and in the project library. Use the same structure as `content/projects/ally-financial.md` for a full case study.

## Adding an analysis note

Create a Markdown file in `content/analysis/` with `title`, `date`, `category`, and `description` in its front matter.

## Supporting files

- Models: `public/models/`
- Data: `public/data/`
- Images: `public/images/`

## Build

```bash
npm run build
```

Git and deployment are intentionally not configured yet.
