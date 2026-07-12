# Karma Credit (.in)

Static HTML blog for **creditkarma.in** — an independent India finance blog (not a clone of creditkarma.com).

## Project Structure

```
creiditkarma/
├── index.html              # Homepage
├── about.html
├── contact.html
├── privacy-policy.html
├── disclaimer.html
├── robots.txt
├── sitemap.xml
├── css/style.css
├── js/main.js
└── blog/
    ├── index.html          # Blog listing
    └── *.html              # 10 article pages
```

## Local Preview

Open `index.html` in a browser, or run a local server:

```powershell
cd "C:\Users\DHARMENDAR\OneDrive\Desktop\creiditkarma"
python -m http.server 8080
```

Then visit: http://localhost:8080

## Deploy to Hosting (cPanel / Shared Hosting)

1. Upload all files to your domain's `public_html` folder (or `www` root).
2. Ensure `index.html` is at the root so `creditkarma.in` loads the homepage.
3. Point your domain DNS A record to your hosting server IP.
4. Enable HTTPS (Let's Encrypt via cPanel).
5. Submit `https://www.creditkarma.in/sitemap.xml` in Google Search Console.

## SEO Checklist

- [x] Unique title and meta description per page
- [x] Canonical URLs
- [x] Open Graph tags on key pages
- [x] Article schema on blog posts
- [x] sitemap.xml and robots.txt
- [x] Internal linking between related articles
- [x] Mobile-responsive layout
- [ ] Add Google Analytics (optional)
- [ ] Submit to Google Search Console after launch

## Important Legal Note

This site includes a disclaimer that it is **not affiliated** with Intuit Credit Karma (creditkarma.com). All article content is original and for educational purposes only.

## Adding New Blog Posts

1. Copy any existing file from `blog/` as a template.
2. Update title, meta description, canonical URL, and article content.
3. Add a card to `blog/index.html` and `index.html`.
4. Add the URL to `sitemap.xml`.

## Contact Form

The contact form is static (no backend). To make it work, connect to:
- Formspree, Netlify Forms, or
- A PHP mail script on your hosting
