# Asset guide

## Supplied files

Paths below are relative to the project root. Map them into the existing framework's asset system without changing the artwork. All covers and sample pages are rendered from the completed source PDFs; none are regenerated approximations.

| File | Size in pixels | Role |
| --- | --- | --- |
| `assets/covers/main-guide.webp` | 720 × 1008 | Primary hero cover; main offer |
| `assets/covers/free-planner.webp` | 720 × 1008 | Smaller included-bonus cover |
| `assets/covers/campaign-companion.webp` | 720 × 1008 | Separate optional-upsell section |
| `assets/previews/page-08-caption.webp` | 1080 × 1512 | Real main-guide page 8; worked caption |
| `assets/previews/page-22-graphics.webp` | 1080 × 1512 | Real main-guide page 22; fictional flyer comparison |
| `assets/previews/page-27-flow.webp` | 1080 × 1512 | Real main-guide page 27; simplified Flow teaching diagram |
| `assets/editorial/business-workspace-768.webp` | 768 × 512 | Small supporting lifestyle image |
| `assets/editorial/business-workspace-1200.webp` | 1200 × 800 | Medium supporting lifestyle image |
| `assets/editorial/business-workspace-1536.webp` | 1536 × 1024 | Large supporting lifestyle image |
| `assets/masters/*-cover.png` | 1080 × 1512 | Exact high-resolution cover renders for future derivatives |
| `assets/masters/business-workspace-original.png` | 1536 × 1024 | Original generated editorial image; retain as source |

The three covers together are approximately 152KB encoded as supplied. The main-guide and free-planner pair is approximately 114KB. These are local file sizes, not a measured browser-transfer or page-load result.

## Use the images accurately

- Use the exact main and planner cover files together in the hero. The campaign companion is a separate optional purchase, so it should not look included in the hero bundle.
- Preserve cover aspect ratios. Apply shallow perspective in CSS if useful; keep all printed titles legible and use a flat fallback.
- Keep the “digital PDF” description visible so a book-shaped treatment does not imply physical delivery.
- Put page numbers and explanatory captions beside samples. Page 27 is a simplified teaching diagram, not a screenshot of a current signed-in Flow editor.
- The two flyers on page 22 contain fictional offers. Do not reuse their prices as the ebook price or their business name as the publisher.
- A small page thumbnail will not be readable on a phone. Provide a clearly labelled larger-image link or an accessible preview dialog.
- Use the editorial photo as atmosphere, not a testimonial, author biography or proof of buyer results. Suggested alt: “Illustrative image of a small-business owner planning work at her desk.”
- Do not use the photo as a substitute for the product covers. Do not put core copy inside the image.
- Use responsive `srcset` and `sizes` or the framework equivalent for the editorial photo. Load one appropriate size, not all three.
- Retain originals but do not preload or serve the master PNG files unnecessarily. Public pages only need the optimized cover, sample and editorial assets.
- No full paid PDF is included in this starter pack. Keep the saleable files in the authorized delivery system, outside the public website.

## Suggested alt text

- Main cover: “Practical AI for Nigerian Small Businesses, 44-page illustrated PDF guide.”
- Bonus cover: “Business & Content Planner, free fillable PDF bonus.”
- Upsell cover: “The 30-Day Content Campaign, optional 21-page companion.”
- Page 8: “Sample page 8 showing a weak prompt, an improved bakery prompt and a worked caption.”
- Page 22: “Sample page 22 comparing a busy flyer with a clearer layout for a fictional cupcake offer.”
- Page 27: “Sample page 27 showing a simplified Flow workspace diagram and numbered video-creation steps.”

When a cover is purely decorative beside identical visible information, an empty alt may be more appropriate. Choose based on the actual component and avoid duplicate announcements.

## Image provenance

The editorial image was created for this project with the built-in image-generation tool on 22 October 2026. It depicts a fictional illustrative business owner. The WebP variants are resized format conversions, without compositional retouching.

Generation prompt:

> Use case: photorealistic-natural. Asset type: supporting editorial image for a premium landing page selling an illustrated AI guide for Nigerian small-business owners. Create a natural candid photograph, landscape 3:2 composition. A young adult Nigerian woman business owner working calmly at a light oak desk in a contemporary small creative workspace in Lagos. She wears an elegant ivory cotton shirt and is reviewing her laptop while making notes in a plain notebook. A few unbranded kraft delivery boxes and a smartphone sit on the desk, a small plant near the edge. Warm afternoon window light, rich forest green wall, cream and muted antique gold palette, realistic skin texture, refined magazine editorial photography. Place the woman and laptop in the right two thirds; left side has subtle uncluttered green wall and warm window-shadow texture. Crop from waist up at a medium distance, authentic lived-in business setting, no exaggerated luxury. Laptop screen turned away from viewer, notebook has only indistinct marks. No readable text, no book covers, no logos, no flags, no money, no graphs, no artificial neon or futuristic AI graphics, no watermark. The image is atmospheric illustration, not a testimonial or actual buyer.

No video, real customer image or current signed-in software screenshot was generated for this landing-page pack.
