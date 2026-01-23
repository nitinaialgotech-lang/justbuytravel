# SEO Quick Reference Guide

## 🚀 Quick Start

Your website now has complete dynamic SEO! Here's what you need to know:

### ✅ What's Done
- ✨ **All pages have dynamic SEO metadata**
- 📝 **Blog posts get SEO from WordPress API**
- 🏨 **Hotel pages get SEO from your API**
- 🌍 **17 destination pages with custom SEO**
- 🗺️ **Dynamic sitemap that updates daily**
- 📊 **Rich snippets with structured data**

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `app/utils/seo.js` | Main SEO utility functions |
| `app/utils/destinationMetadata.js` | Destination SEO config |
| `app/blog/[slug]/page.js` | Dynamic blog routes |
| `app/hotel/[slug]/page.js` | Dynamic hotel routes |
| `app/sitemap.js` | Auto-updating sitemap |

---

## 🔗 URL Structure

### Blogs (Dynamic from API)
```
/blog/[slug]
Example: /blog/best-hotels-in-dubai
```
- Slug comes from WordPress
- Metadata auto-generated from post

### Hotels (Dynamic from API)
```
/hotel/[slug]?id=[place_id]
Example: /hotel/grand-plaza?id=ChIJ123
```
- Metadata auto-generated from hotel data

### Destinations (Custom SEO)
```
/[destination]
Example: /dubai, /paris, /tokyo
```
- Pre-configured SEO in destinationMetadata.js

---

## 🛠️ Common Tasks

### Add a New Blog Post
✅ **Automatic!** Just publish in WordPress
- Post appears at `/blog/[your-slug]`
- SEO metadata pulled from WordPress
- Automatically added to sitemap

### Add a New Destination Page

1. Add to `app/utils/destinationMetadata.js`:
```javascript
'new-city': {
    title: 'City Name Travel Guide: ...',
    description: 'Discover the best of City Name...',
    keywords: 'city travel, city hotels, visit city',
    image: '/path/to/image.jpg',
}
```

2. Create `app/new-city/page.js`:
```javascript
import { generateDestinationMetadata, generateBreadcrumbStructuredData } from '@/app/utils/seo'
import { getDestinationMetadata } from '@/app/utils/destinationMetadata'

const destination = 'new-city';
const customData = getDestinationMetadata(destination);
export const metadata = generateDestinationMetadata(destination, customData);

export default function page() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'City Name', path: '/new-city' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            <YourBannerComponent />
        </>
    )
}
```

3. Add to sitemap array in `app/sitemap.js`

### Add a New Static Page

```javascript
import { generateBreadcrumbStructuredData } from '@/app/utils/seo';

export const metadata = {
    title: "Page Title - Just Buy Travel",
    description: "Your page description here (150-160 chars)",
    keywords: "keyword1, keyword2, keyword3",
    openGraph: {
        title: "Page Title",
        description: "Description for social media",
        type: "website",
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/your-page`,
    },
};

export default function YourPage() {
    const breadcrumbData = generateBreadcrumbStructuredData([
        { name: 'Home', path: '/' },
        { name: 'Your Page', path: '/your-page' }
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
            />
            {/* Your content */}
        </>
    );
}
```

---

## ⚙️ Configuration

### Environment Variables (.env.local)
```env
NEXT_PUBLIC_SITE_URL=https://justbuytravel.com
NEXT_PUBLIC_BASE_PATH=/justbuytravel_next/demo
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=your_key
```

### Update Social Media (app/layout.js)
```javascript
// Line 113-117
"sameAs": [
  "https://www.facebook.com/yourpage",
  "https://www.twitter.com/yourhandle",
  "https://www.instagram.com/yourprofile"
]
```

---

## 🎯 SEO Best Practices

### Titles
- ✅ Keep under 60 characters
- ✅ Include main keyword
- ❌ Don't stuff keywords

### Descriptions
- ✅ 150-160 characters
- ✅ Include call-to-action
- ✅ Make it compelling

### Images
- ✅ Add descriptive alt text
- ✅ Use 1200x630px for OG images
- ✅ Optimize file sizes

---

## 📊 Testing & Validation

### Test Your SEO
1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test any page for structured data

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Test Open Graph tags

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Test Twitter cards

### View Your Sitemap
- URL: `https://justbuytravel.com/sitemap.xml`
- Updates daily with new blogs

---

## 🚨 Troubleshooting

### Blog metadata not showing
- ✓ Check WordPress API is working
- ✓ Verify post has title and excerpt
- ✓ Check featured image is set

### Hotel page SEO not working
- ✓ Verify hotel API returns data
- ✓ Check place_id in URL
- ✓ Test with hotel detail API

### Page not in sitemap
- ✓ Check page is added to sitemap.js
- ✓ Wait 24 hours for revalidation
- ✓ Manually revalidate if needed

### Social media preview wrong
- ✓ Clear social media cache
- ✓ Check OG tags in page source
- ✓ Use debugger tools above

---

## 📱 Mobile Testing
- All pages are mobile-optimized
- Viewport meta tag included
- Responsive images

---

## 🎉 Next Steps

### Immediate (Do Now)
1. ✓ Test a few pages with validation tools
2. ✓ Submit sitemap to Google Search Console
3. ✓ Update social media links in layout.js

### Short Term (This Week)
1. ✓ Add Google Analytics
2. ✓ Set up Search Console monitoring
3. ✓ Test blog post SEO

### Long Term (Ongoing)
1. ✓ Publish regular blog content
2. ✓ Monitor keyword rankings
3. ✓ Update destination metadata seasonally
4. ✓ Add more destinations

---

## 💡 Pro Tips

1. **Blog Posts:** Write compelling titles and excerpts in WordPress - they become your SEO metadata!

2. **Images:** Always add alt text and use descriptive filenames

3. **Internal Links:** Link between related pages to improve SEO

4. **Fresh Content:** Update blog regularly - Google loves fresh content

5. **Mobile First:** Test on mobile devices - most traffic is mobile

6. **Page Speed:** Keep images optimized and pages fast

---

## 📞 Need Help?

1. Check the full guide: `SEO_IMPLEMENTATION_GUIDE.md`
2. Review utility functions: `app/utils/seo.js`
3. Test with online validators
4. Check Next.js metadata docs

---

## ✅ SEO Checklist

- [x] Dynamic metadata on all pages
- [x] Blog posts from API
- [x] Hotel pages from API  
- [x] Destination pages
- [x] Sitemap with blogs
- [x] Structured data
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Breadcrumbs
- [x] Mobile optimized
- [ ] Submit to Search Console (Do this!)
- [ ] Add Google Analytics (Do this!)
- [ ] Monitor rankings (Ongoing)

---

**Remember:** SEO is a marathon, not a sprint. Keep creating great content and the rankings will come! 🚀
