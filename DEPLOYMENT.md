# Netlify Deployment Guide

## Steps to Deploy and Activate Forms

### 1. Deploy to Netlify

**Option A: Drag and Drop (Easiest)**

1. Go to [netlify.com](https://netlify.com)
2. Sign in to your account
3. Drag the entire `PupCleanUp` folder to the deploy area
4. Wait for deployment to complete

**Option B: Connect GitHub Repository**

1. Push your code to GitHub
2. Go to Netlify dashboard
3. Click "New site from Git"
4. Connect your GitHub repository
5. Deploy

### 2. Verify Form Detection

After deployment:

1. Go to your Netlify dashboard
2. Click on your site
3. Go to "Forms" tab
4. You should see "client-onboarding" form listed
5. If not visible, check the "Deploys" tab for any build errors

### 3. Test Form Submission

1. Visit your deployed site
2. Go to the client onboarding page
3. Fill out and submit the form
4. Check the Forms tab in Netlify dashboard for submissions

### 4. Configure Form Notifications

1. In Netlify dashboard, go to Forms
2. Click on "client-onboarding" form
3. Go to "Settings & usage"
4. Configure email notifications
5. Add webhook URLs if needed

## Troubleshooting

### Form Not Detected

- Ensure `data-netlify="true"` is present
- Check that form has a `name` attribute
- Verify the form is in a static HTML file
- Check for JavaScript errors in browser console

### Form Submissions Not Working

- Verify form action points to correct URL
- Check that all required fields have `name` attributes
- Ensure form validation isn't preventing submission
- Check Netlify function logs for errors

### Common Issues

- **Missing form name**: Add `name="client-onboarding"` to form tag
- **JavaScript preventing submission**: Ensure form validation allows submission
- **Missing required fields**: All form fields need proper `name` attributes
- **Build errors**: Check Netlify build logs for deployment issues

## Files Created for Netlify

- `forms.html` - Static form for Netlify detection
- `netlify.toml` - Netlify configuration
- `_redirects` - URL redirects and routing
- `thank-you.html` - Success page after form submission
