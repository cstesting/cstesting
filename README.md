# Static website for Amazon S3

A Playwright.dev-style landing page: dark theme, hero section, feature blocks, and footer. Ready for **Amazon S3 static website hosting**.

## Customize

- **Brand**: Replace "YourBrand" and "Your Product" in `index.html` with your name and tagline.
- **Colors**: Edit CSS variables in `styles.css` (e.g. `--accent`, `--bg-dark`).
- **Content**: Update feature cards, footer links, and CTA buttons in `index.html`.

## Deploy to Amazon S3

1. **Create an S3 bucket** (e.g. `your-website-bucket`) in the AWS Console.

2. **Enable static website hosting**  
   Bucket → **Properties** → **Static website hosting** → **Edit**  
   - Enable static website hosting  
   - Index document: `index.html`  
   - Error document (optional): `index.html` (for client-side routing if you add it later)

3. **Set bucket policy** so the site is publicly readable:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
       }
     ]
   }
   ```
   Replace `YOUR-BUCKET-NAME` with your bucket name.

4. **Upload files** to the bucket root:
   - `index.html`
   - `styles.css`
   - `script.js`

5. **Use the website endpoint** from **Properties** → **Static website hosting** (e.g. `http://your-bucket.s3-website-region.amazonaws.com`).

### Optional: custom domain and HTTPS

- Use **CloudFront** in front of the S3 website endpoint and attach your SSL certificate for HTTPS.
- Point your domain to the CloudFront distribution.

## Run locally

Open `index.html` in a browser, or use a simple server:

```bash
npx serve .
```

Then visit `http://localhost:3000`.
