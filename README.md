# 👶 Baby Food Recipe Generator

An intelligent, AI-powered React application that generates safe, age-appropriate baby food recipes using Groq's high-performance language models. This app combines cutting-edge artificial intelligence with pediatric nutrition expertise to help parents confidently prepare healthy meals for their babies and toddlers.

**Status**: ✅ Production Ready | **Latest**: v1.0 | **License**: MIT

---

## 📑 Table of Contents

- [⚡ Quick Start (2 Minutes)](#⚡-quick-start-2-minutes)
- [🎯 Overview](#🎯-overview)
- [🌟 Key Features](#🌟-key-features)
- [📋 Age Guidelines](#📋-age-guidelines)
- [🚀 Getting Started](#🚀-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [🔧 Configuration](#🔧-configuration)
  - [Environment Variables](#-environment-variables)
  - [Vercel Deployment](#-configuration-in-vercel)
- [📁 Project Structure](#📁-project-structure)
- [🎮 How to Use](#🎮-how-to-use)
- [🛠️ Technical Architecture](#🛠️-technical-architecture)
- [⚙️ AI Model Fallback System](#⚙️-ai-model-fallback-system)
- [📊 Groq API Information](#📊-groq-api-information)
- [🌐 Browser Compatibility](#🌐-browser-compatibility)
- [❌ Known Limitations](#❌-known-limitations)
- [❓ FAQ](#❓-faq)
- [🚨 Troubleshooting](#🚨-troubleshooting)
- [🔐 Security & Privacy](#🔐-security--privacy)
- [🎨 Customization Guide](#🎨-customization-guide)
- [👨‍⚖️ Legal Disclaimer](#👨‍⚖️-legal-disclaimer)
- [🤝 Contributing](#🤝-contributing)
- [📚 Resources](#📚-resources)

---

## ⚡ Quick Start (2 Minutes)

Get the app running locally in just 2 minutes:

```bash
# 1. Clone repository
git clone <your-repo-url>
cd baby-recipe-generator
npm install

# 2. Get Groq API key (free)
# Visit https://console.groq.com and create an account

# 3. Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_PRIMARY_MODEL=mixtral-8x7b-32768
NEXT_PUBLIC_BACKUP_MODEL_1=llama-3.1-70b-versatile
NEXT_PUBLIC_BACKUP_MODEL_2=llama-3.1-8b-instant
EOF

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000 in your browser
```

✅ **Done!** You're now ready to generate baby recipes.

---

## 🎯 Overview

The Baby Food Recipe Generator uses advanced artificial intelligence to create nutritious, safe, and age-appropriate recipes tailored specifically to your baby's developmental stage. Simply enter the ingredients you have on hand, select your baby's age, and the AI will generate 10 unique recipe ideas designed for your little one.

### Who Is This For?

- 👶 Parents introducing their babies to solid foods (6+ months)
- 🧒 Parents of toddlers (12+ months) looking for nutritious meal ideas
- 👨‍👩‍👧 Families wanting ingredient-based meal planning for their children
- 🏥 Pediatric professionals recommending nutrition resources to parents

### What Makes It Special

- **Age-Specific Safety**: Automatically validates ingredients against your child's age-specific needs
- **Allergen Intelligence**: Identifies common allergens and prompts for parent acknowledgment
- **Personalized Recipes**: Uses only YOUR ingredients—no substitutions, no surprises
- **Step-by-Step Guidance**: Interactive cooking instructions designed for busy parents
- **AI-Powered Creativity**: Generates diverse recipes each time, preventing meal fatigue

---

## 🌟 Key Features

| Feature | Description | Benefit |
|---------|-------------|---------|
| 🤖 **AI Recipe Generation** | Advanced language models create 10 unique recipes per request | Never run out of meal ideas |
| 🔍 **Age-Specific Safety** | Automatically checks ingredients against safety guidelines for 6mo-6yr | Peace of mind knowing foods are safe |
| ⚠️ **Allergen Detection** | Identifies 8 common allergens and requires parent acknowledgment | Prevent accidental allergic reactions |
| 🔄 **Smart Fallback System** | Automatically switches between 3 AI models if one becomes unavailable | Reliable, always-working app |
| 📱 **Interactive Cooking Mode** | Step-by-step instructions with progress tracking and timers | Less stress, more focus on your baby |
| 🌿 **Spice Identification** | Highlights 19 common spices and flavor profiles | Know exactly what's in the meal |
| 📏 **Portion Sizing** | Automatically calculates portions based on servings needed | Perfect amounts for your family |
| ⏱️ **Time Estimation** | Shows prep time, cook time, and total time for each recipe | Plan your day better |
| 🥗 **Nutritional Info** | Estimated calorie content for each recipe | Track nutrition easily |
| 📱 **Fully Responsive** | Works perfectly on phones, tablets, and desktops | Use it anywhere in the kitchen |
| ✅ **Real-time Validation** | Instant feedback as you input ingredients | Catch issues before generating recipes |
| 🔐 **Privacy First** | No data storage, no tracking, completely private | Your family's data is safe |

---

## 📋 Age Guidelines

The app is designed for babies and toddlers from 6 months to 6+ years:

| Age Group | Stage | Safety Considerations | Texture |
|-----------|-------|----------------------|---------|
| **6-11 months** | Introduction phase | Strictest - avoid honey, nuts, choking hazards | Smooth, soft, mashed |
| **12-23 months** | Expanding variety | Still careful - avoid hard/chunky foods | Soft mashed, small pieces |
| **24-35 months** | Growing appetite | More flexibility - introduce varied textures | Soft, choppy, mashable |
| **36-71 months** | Independent eating | Minor restrictions - focus on raw foods | Most textures okay |
| **72+ months** | Young child | Standard precautions on raw eggs/meat/fish | Varied, age-appropriate |

**Note**: These are guidelines only. Always consult your pediatrician about your specific baby's readiness.

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org)
- **npm** or **yarn** package manager (comes with Node.js)
- **Groq API Key** (free) - [Get it here](https://console.groq.com)
- **Git** for cloning the repository
- **Code Editor** (VS Code recommended)
- **10 minutes** of setup time

### Installation

#### Step 1: Clone the Repository

```bash
git clone <your-repo-url>
cd baby-recipe-generator
```

#### Step 2: Install Dependencies

```bash
npm install
# or if you use yarn
yarn install
```

This installs all required packages (React, Next.js, Tailwind CSS, Lucide icons, etc.)

#### Step 3: Get Your Groq API Key

1. Go to https://console.groq.com
2. Click "Sign Up" (or "Sign In" if you have an account)
3. Verify your email
4. Navigate to "API Keys" section
5. Click "Create New API Key"
6. Copy the key (keep it private!)

#### Step 4: Create Environment Variables File

Create a `.env.local` file in your project root:

```bash
touch .env.local
```

Add these variables to `.env.local`:

```
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
NEXT_PUBLIC_PRIMARY_MODEL=mixtral-8x7b-32768
NEXT_PUBLIC_BACKUP_MODEL_1=llama-3.1-70b-versatile
NEXT_PUBLIC_BACKUP_MODEL_2=llama-3.1-8b-instant
```

**⚠️ Important**: Never commit `.env.local` to version control. Add it to `.gitignore`:

```bash
echo ".env.local" >> .gitignore
```

#### Step 5: Run the Development Server

```bash
npm run dev
# or
yarn dev
```

You'll see:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

#### Step 6: Open in Your Browser

Navigate to **http://localhost:3000** and start generating recipes!

---

## 🔧 Configuration

### 📋 Environment Variables

All environment variables use the `NEXT_PUBLIC_` prefix because they're accessed from the browser.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_GROQ_API_KEY` | ✅ **Required** | None | Your Groq API key for AI access. Get it at https://console.groq.com |
| `NEXT_PUBLIC_PRIMARY_MODEL` | ❌ Optional | `mixtral-8x7b-32768` | Primary AI model (fastest & balanced) |
| `NEXT_PUBLIC_BACKUP_MODEL_1` | ❌ Optional | `llama-3.1-70b-versatile` | First fallback (highest quality) |
| `NEXT_PUBLIC_BACKUP_MODEL_2` | ❌ Optional | `llama-3.1-8b-instant` | Second fallback (fastest) |

#### What Each Model Offers

| Model | Speed | Quality | Use Case | Cost |
|-------|-------|---------|----------|------|
| **mixtral-8x7b-32768** ⭐ Recommended | ⚡ Fast | ✅ Good | Best for most users | Balanced |
| **llama-3.1-70b-versatile** | 🐢 Slower | ✨ Excellent | Maximum quality recipes | Higher |
| **llama-3.1-8b-instant** | ⚡⚡ Fastest | ✅ Decent | Emergency fallback | Lowest |

### 🔧 Configuration in Vercel

#### Step-by-Step Vercel Setup

**1. Connect Your Repository**

- Go to https://vercel.com
- Click "New Project"
- Select your GitHub repository
- Click "Import"

**2. Add Environment Variables**

- In the Vercel dashboard, go to **Settings** → **Environment Variables**
- Add each variable for all environments (Production, Preview, Development)

**3. Set Your Variables**

```
Name: NEXT_PUBLIC_GROQ_API_KEY
Value: your_groq_api_key_here
Environments: All (Production, Preview, Development)

Name: NEXT_PUBLIC_PRIMARY_MODEL
Value: mixtral-8x7b-32768
Environments: All

Name: NEXT_PUBLIC_BACKUP_MODEL_1
Value: llama-3.1-70b-versatile
Environments: All

Name: NEXT_PUBLIC_BACKUP_MODEL_2
Value: llama-3.1-8b-instant
Environments: All
```

**4. Deploy**

- Click "Deploy"
- Vercel automatically builds and deploys your app
- Your app will be live in 30-60 seconds!

**5. Access Your App**

Vercel provides a URL like: `https://your-app-name.vercel.app`

#### Updating Models Without Redeploying

One powerful feature: Change AI models directly in Vercel without touching code!

1. Go to **Settings** → **Environment Variables** in Vercel
2. Update model names (e.g., swap `NEXT_PUBLIC_PRIMARY_MODEL` to a different model)
3. Click "Save"
4. Vercel automatically redeploys with new models
5. Your app uses the new models on next page load

This allows you to A/B test models, switch providers, or respond to performance issues instantly!

---

## 📁 Project Structure

```
baby-recipe-generator/
├── app/
│   ├── page.tsx              # Main React component (recipe generator)
│   ├── layout.tsx            # App layout & metadata
│   └── globals.css           # Global styles
├── public/                   # Static assets (favicon, images)
├── .env.local               # Environment variables (LOCAL ONLY)
├── .env.example             # Template for env variables
├── .gitignore              # Files to exclude from git
├── package.json            # Dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
└── README.md              # This file!
```

### Key Files Explained

- **`app/page.tsx`**: The main recipe generator component. Contains all UI, state management, and API logic.
- **`.env.local`**: Your private API keys and configuration (never commit this!)
- **`package.json`**: Lists all dependencies and available npm scripts
- **`tailwind.config.js`**: Customizes Tailwind CSS styling

---

## 🎮 How to Use

### Basic Workflow

```
1. Enter Ingredients
   ↓
2. Select Your Baby's Age
   ↓
3. Choose Number of Servings
   ↓
4. Click "Generate Recipes"
   ↓
5. Review Allergen Warnings (if any)
   ↓
6. Acknowledge Allergens (if any)
   ↓
7. View 10 AI-Generated Recipes
   ↓
8. Select a Recipe
   ↓
9. Follow Step-by-Step Instructions
   ↓
10. Enjoy with Your Baby!
```

### Detailed Usage Guide

**Step 1: Enter Ingredients**
- Type ingredients separated by commas
- Example: `chicken breast, carrots, sweet potato, broccoli`
- Use common food names for better results
- At least 2-3 ingredients recommended

**Step 2: Select Baby's Age**
- Use the slider to select exact age in months
- 6-11 months: Introduction phase
- 12-23 months: Expanding variety
- 24+ months: Growing appetite
- 72+ months: More independence

**Step 3: Choose Servings**
- Select how many servings you need
- Recipes adjust portion sizes accordingly
- 1-2 servings typical for babies

**Step 4: Generate Recipes**
- Click "Generate Recipes"
- App validates ingredients for safety
- Takes 10-30 seconds depending on connection

**Step 5: Review Allergen Warnings**
- If allergens detected, review the popup
- Learn which ingredients contain allergens
- Educational information provided

**Step 6: Acknowledge & Continue**
- Click "Yes, Continue" if you've discussed with pediatrician
- Or "No, Go Back" to modify ingredients

**Step 7: View Generated Recipes**
- 10 unique recipes appear as cards
- See prep time, cook time, calories
- Review ingredients and spices used

**Step 8: Select & Start Cooking**
- Click "Start Cooking" on any recipe
- Interactive cooking mode activates

**Step 9: Follow Instructions**
- Read each step carefully
- Check off completed steps
- Use timer for cooking times

**Step 10: Serve & Enjoy**
- Follow food safety guidelines
- Supervise your baby while eating
- Watch for any reactions

---

## 🛠️ Technical Architecture

### Tech Stack

```
Frontend
├── React 18+              # UI library
├── Next.js 13+            # React framework
├── TypeScript             # Type safety
├── Tailwind CSS           # Styling
└── Lucide React           # Icons

Backend / Services
├── Groq API               # AI recipe generation
└── OpenAI-compatible endpoints

Deployment
└── Vercel                 # Hosting & CDN

State Management
└── React Hooks (useState) # Local state only
```

### Component Architecture

```
RecipeGenerator (Main Component)
│
├── State Management
│   ├── ingredients (string)
│   ├── ageMonths (number)
│   ├── servings (number)
│   ├── recipes (array)
│   ├── selectedRecipe (object)
│   ├── currentStep (number)
│   ├── completedSteps (array)
│   ├── loading (boolean)
│   ├── error (string)
│   ├── allergenWarnings (array)
│   ├── showAllergenPrompt (boolean)
│   └── acknowledgedAllergens (array)
│
├── Validation Functions
│   ├── getAgeGroup()          # Maps months to age group
│   ├── getAgeLabel()          # Formats age for display
│   ├── validateIngredients()  # Checks safety
│   ├── detectAllergens()      # Finds allergens
│   └── identifySpices()       # Detects spices
│
├── AI Integration
│   ├── generateRecipes()      # Main recipe generation
│   ├── continueWithRecipeGeneration()  # Handles allergen flow
│   ├── Model Fallback Chain   # Tries models in order
│   └── Groq API Call          # HTTP request to Groq
│
└── UI Sections
    ├── Input Form             # Ingredients, age, servings
    ├── Allergen Warning Modal # Allergen prompt
    ├── Recipe Grid            # Display recipes
    └── Cooking Instructions   # Step-by-step guide
```

### Data Flow

```
User Input
    ↓
Validation Layer
    ├─ Check ingredients for safety ✓
    ├─ Detect allergens ✓
    └─ Require acknowledgment ⚠️
    ↓
AI Processing
    ├─ Try Primary Model (Mixtral 8x7b)
    ├─ On Failure → Try Backup Model 1 (Llama 70b)
    └─ On Failure → Try Backup Model 2 (Llama 8b)
    ↓
Response Parsing
    └─ Parse AI response into recipe objects
    ↓
Display
    └─ Show 10 recipes in grid format
    ↓
User Selection
    └─ Display step-by-step instructions
```

### API Integration

**Endpoint**: `https://api.groq.com/openai/v1/chat/completions`

**Method**: POST

**Headers**:
```json
{
  "Authorization": "Bearer YOUR_GROQ_API_KEY",
  "Content-Type": "application/json"
}
```

**Request Body**:
```json
{
  "model": "mixtral-8x7b-32768",
  "messages": [
    {
      "role": "system",
      "content": "You are a pediatric nutrition expert..."
    },
    {
      "role": "user",
      "content": "Create recipes for a 12-month-old with chicken, carrots, and broccoli..."
    }
  ]
}
```

---

## ⚙️ AI Model Fallback System

The recipe generator includes intelligent fallback protection to ensure reliability:

### How It Works

```
Request Initiated
    ↓
Try Primary Model (NEXT_PUBLIC_PRIMARY_MODEL)
    ├─ Success? → Return recipes ✅
    └─ Failure? → Try Backup 1
    ↓
Try Backup Model 1 (NEXT_PUBLIC_BACKUP_MODEL_1)
    ├─ Success? → Return recipes ✅
    └─ Failure? → Try Backup 2
    ↓
Try Backup Model 2 (NEXT_PUBLIC_BACKUP_MODEL_2)
    ├─ Success? → Return recipes ✅
    └─ Failure? → Show error message ❌
```

### Benefits

- **Reliability**: App stays working even if one model fails
- **Transparency**: Console logs show which model is being used
- **Flexibility**: Easy to swap models or add more backups
- **Performance**: Can A/B test different models
- **Resilience**: Handles Groq API rate limits gracefully

### Console Logging

Open your browser's Developer Tools (F12) to see:
```
🔄 Trying model: mixtral-8x7b-32768
✅ Recipe generation successful!
```

---

## 📊 Groq API Information

### What is Groq?

Groq is a company that provides fast, high-performance inference for large language models. Their API offers access to popular open-source models at competitive pricing.

**Benefits of Using Groq**:
- ⚡ Extremely fast inference (compared to OpenAI)
- 💰 Cost-effective pricing
- 🔓 Open-source models available
- 🚀 Reliable uptime and performance
- 📊 Good for real-time applications

### Pricing

**Groq API Pricing** (as of Oct 2025):

| Model | Cost (per 1M tokens) | Speed |
|-------|---------------------|-------|
| Mixtral 8x7b | $0.24 / $0.24 | ⚡⚡ |
| Llama 3.1 70b | $0.59 / $0.79 | ⚡ |
| Llama 3.1 8b | $0.02 / $0.02 | ⚡⚡⚡ |

**Typical Cost Per Recipe Generation**:
- Average recipe request: ~1,000 tokens input + 800 tokens output
- Cost: ~$0.0005 per request (roughly 0.05¢)
- 100 recipe generations: ~$0.05 per month

**Free Tier**: Groq offers a generous free tier (up to 8,000 requests/day)

### Rate Limiting

Groq enforces rate limits:
- **Free Tier**: 30 requests per minute per API key
- **Paid Tier**: Higher limits with paid plans

The app handles rate limits gracefully with the fallback system.

### API Key Best Practices

- ✅ Keep your key private (never share it)
- ✅ Store in environment variables only
- ✅ Rotate keys if accidentally exposed
- ❌ Never commit `.env.local` to version control
- ❌ Don't use keys in client-side code (they're accessed server-side in Vercel)

### Monitoring API Usage

On Groq's console:
1. Log in to https://console.groq.com
2. Go to "API Keys" section
3. View usage statistics
4. Monitor rate limit usage
5. Adjust usage if needed

---

## 🌐 Browser Compatibility

### Tested & Supported

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Full Support |
| Firefox | Latest | ✅ Full Support |
| Safari | Latest | ✅ Full Support |
| Edge | Latest | ✅ Full Support |
| Mobile Chrome | Latest | ✅ Full Support |
| Mobile Safari | Latest | ✅ Full Support |

### Minimum Requirements

- ES6+ JavaScript support
- CSS Grid & Flexbox support
- Fetch API support
- React 18+ compatible browser

### Known Issues

- Internet Explorer: Not supported (use modern browser)
- Very old phones (pre-2018): May have performance issues
- Slow internet (<1 Mbps): Slower recipe generation

---

## ❌ Known Limitations

### What This App CAN'T Do

1. **It's Not a Doctor**
   - App doesn't replace pediatric consultation
   - Always consult your pediatrician before introducing foods
   - Not for diagnosing allergies or medical conditions

2. **Limited Ingredient Database**
   - Works best with common ingredients
   - May struggle with exotic/specialty items
   - Requires proper ingredient names

3. **No Real Nutrition Analysis**
   - Calorie estimates are approximate
   - Doesn't calculate exact macronutrients
   - Use certified nutrition apps for detailed analysis

4. **API Dependent**
   - Requires internet connection to work
   - Relies on Groq API availability
   - Offline mode not available

5. **Model Limitations**
   - AI may occasionally suggest unusual combinations
   - Recipe quality depends on ingredient input
   - Sometimes needs refinement before cooking

### Workarounds

- Always validate recipes with your pediatrician
- Use precise ingredient names
- Test new foods carefully with your baby
- Use trusted nutrition apps for detailed analysis
- Keep internet connection active
- Report issues for continuous improvement

---

## ❓ FAQ

### General Questions

**Q: Is this app safe for my baby?**
A: The app includes safety validation based on age-specific guidelines, but it's not a substitute for medical advice. Always consult your pediatrician before introducing new foods. The app validates common choking hazards and allergens but you're responsible for supervising your baby.

**Q: What age range does this work for?**
A: The app is designed for babies 6 months to 6+ years old. You can enter any age in months, and the app will apply appropriate safety rules.

**Q: Can I use this app offline?**
A: No, the app requires an internet connection because it uses Groq's API to generate recipes. Offline functionality is planned for future versions.

**Q: How long does recipe generation take?**
A: Typically 10-30 seconds depending on:
- Your internet connection speed
- Groq API current load
- Which model is being used
- Number of ingredients

### Setup Questions

**Q: Where do I get a Groq API key?**
A: Visit https://console.groq.com, create a free account, and generate an API key in the API Keys section. Takes about 2 minutes.

**Q: Do I need to pay for a Groq API key?**
A: Groq offers a generous free tier (30 requests/minute). You only pay if you exceed the free tier limits. Most hobby users stay well within free limits.

**Q: Can I deploy this myself?**
A: Yes! Vercel, Netlify, and other platforms work great. Just add environment variables to your host platform.

**Q: What if I accidentally commit my API key to GitHub?**
A: Immediately:
1. Go to https://console.groq.com
2. Regenerate your API key
3. Update your Vercel environment variables
4. Remove the key from your git history
5. Add `.env.local` to `.gitignore`

### Technical Questions

**Q: Why does the app need three model options?**
A: The fallback system ensures reliability. If one model is slow or has rate limits, it automatically tries another. This keeps your app always working.

**Q: Can I change which models are used?**
A: Absolutely! In Vercel, update the `NEXT_PUBLIC_PRIMARY_MODEL`, `NEXT_PUBLIC_BACKUP_MODEL_1`, and `NEXT_PUBLIC_BACKUP_MODEL_2` environment variables. Takes 1 minute, no code changes needed.

**Q: What happens if all three models fail?**
A: The app shows a user-friendly error message and suggests troubleshooting steps. You can retry or try again later.

**Q: Is my data stored anywhere?**
A: No. The app only sends your ingredients to Groq to generate recipes. Nothing is stored on our servers or databases. Your data is completely private.

### Allergen Questions

**Q: Why does the app ask about allergens?**
A: To make you aware of potential allergens before cooking. Introducing allergens is important but should be done carefully with pediatrician guidance.

**Q: What if my baby has allergies not listed?**
A: The app detects the 8 most common allergens. For other allergies, review ingredient lists carefully or modify the allergen list in the code (see Customization section).

**Q: Can I skip the allergen warning?**
A: No, but that's intentional! The app requires you to acknowledge that you've consulted with your pediatrician. This is a safety feature.

### Troubleshooting Questions

**Q: I'm getting an "API Key Error" - what do I do?**
A: Check that:
1. Your API key is correct at https://console.groq.com
2. `.env.local` file exists and has the correct key
3. For Vercel: Environment variables are set in Vercel dashboard AND you've redeployed
4. For local: Restart your dev server after changing `.env.local`

**Q: Recipes look weird or don't make sense**
A: Try:
1. Use simpler, more common ingredients
2. Add 1-2 more ingredients for context
3. Refresh and try again
4. The AI sometimes needs specific ingredient names to work best

**Q: App is very slow generating recipes**
A: This could be because:
1. First request is slower (model warm-up)
2. Your internet connection is slow
3. Groq API is under heavy load
4. Try again in a minute or try a faster model

---

## 🚨 Troubleshooting

### "API Key Error" or "401 Unauthorized"

**Problem**: Your Groq API key is invalid, expired, or not configured.

**Symptoms**:
- Red error box saying "401 Unauthorized"
- Recipe generation doesn't start
- Console shows authentication errors

**Solutions** (try in order):
1. Verify API key at https://console.groq.com (is it still valid?)
2. Copy-paste key again (typos happen!)
3. Check `.env.local` file has correct variable name
4. **For Vercel users**: 
   - Add key to Settings → Environment Variables
   - Click "Redeploy" on your project
   - Wait 2-3 minutes for deployment to complete
5. **For local development**:
   - Restart dev server: `Ctrl+C` then `npm run dev`
   - Clear browser cache (Ctrl+Shift+Delete)

---

### "Model Not Found" Error

**Problem**: The AI model specified isn't available or doesn't exist.

**Symptoms**:
- Error about model not found
- Recipe generation fails completely
- All three fallback models fail

**Solutions**:
1. Check model names are spelled correctly
2. Verify models exist on Groq API:
   - `mixtral-8x7b-32768`
   - `llama-3.1-70b-versatile`
   - `llama-3.1-8b-instant`
3. Check Groq API docs for latest model names
4. Try updating to latest model names in Vercel

---

### "No Recipes Generated" or Blank Results

**Problem**: The AI generated a response but it couldn't parse into recipes.

**Symptoms**:
- Page says generating recipes...
- Long wait then nothing appears
- Or error about parsing recipes

**Solutions**:
1. Check your ingredient list (too many special characters?)
2. Use simpler, more common ingredients
3. Add more ingredients (give AI more context)
4. Check browser console for detailed error (F12)
5. Try a different set of ingredients
6. Check Groq status at https://console.groq.com

---

### Slow Response Times / Timeouts

**Problem**: Recipe generation takes more than 60 seconds or times out.

**Symptoms**:
- Loading spinner spins forever
- Connection times out error
- App hangs

**Solutions** (in order):
1. Check internet connection speed (use speedtest.net)
2. Wait 1-2 minutes (first request can be slow)
3. Try again (Groq might be under heavy load)
4. Switch to faster model:
   - In Vercel: Change `NEXT_PUBLIC_PRIMARY_MODEL` to `llama-3.1-8b-instant`
   - Save changes and wait for redeploy
5. Reduce number of ingredients (simpler request)
6. Try at a different time

---

### Allergen Warning Doesn't Go Away

**Problem**: You clicked "Yes, Continue" but the allergen popup keeps showing.

**Symptoms**:
- Allergen modal keeps appearing
- Recipe generation won't start

**Solutions**:
1. Make sure you click "Yes, Continue" (not "No")
2. Clear browser cache and refresh
3. Try a different browser
4. If using Vercel, clear browser cache and hard refresh (Ctrl+F5)

---

### Deployed App Works Locally But Not on Vercel

**Problem**: App works great on `localhost:3000` but fails on `your-app.vercel.app`

**Symptoms**:
- Local works fine
- Vercel shows errors
- API Key error on Vercel only

**Solutions**:
1. Verify all environment variables are set in Vercel:
   - Settings → Environment Variables
   - Should see all 4 variables
2. Make sure variables are set for **all environments** (Production, Preview, Development)
3. Redeploy your app after setting variables
4. Wait 2-3 minutes for changes to take effect
5. Check Vercel deployment logs for specific errors
6. Hard refresh browser (Ctrl+Shift+R)

---

### "CORS Error" or "Blocked by Browser"

**Problem**: Browser blocks API calls to Groq (CORS error).

**Symptoms**:
- Console shows "CORS error"
- "Access-Control-Allow-Origin" error
- API requests blocked

**Solutions**:
1. This shouldn't happen with Vercel/Next.js setup
2. Check that code calls Groq API (shouldn't be client-side)
3. If self-hosted, ensure proper CORS headers
4. Contact support with error details

---

## 🔐 Security & Privacy

### API Key Safety

#### ✅ DO's
- ✅ Store keys in `.env.local` (local development)
- ✅ Store keys in Vercel/host environment variables (production)
- ✅ Keep keys private and never share
- ✅ Rotate keys if accidentally exposed
- ✅ Use strong passwords for Groq account
- ✅ Enable 2FA on Groq account if available

#### ❌ DON'Ts
- ❌ Never commit `.env.local` to Git
- ❌ Never paste key in code
- ❌ Never share key in chat, email, or Slack
- ❌ Never use same key across multiple apps
- ❌ Never push key to public repositories
- ❌ Never leave key in comments or documentation

### Data Privacy

**What We Collect**: 
- Only what you send to Groq API (ingredients)

**What We Store**:
- Nothing! No databases, no logging, no tracking

**What Groq Stores** (see their privacy policy):
- Standard API logs (may vary by plan)
- Check https://www.groq.com/privacy for details

**Browser Data**:
- Recipes stored in browser memory (resets when you close browser)
- No LocalStorage, no IndexedDB, no cookies

### Best Practices

1. **Never expose keys publicly**
   - Use environment variables
   - Never in code or version control

2. **Rotate keys regularly**
   - Even if not exposed
   - At least yearly

3. **Monitor usage**
   - Check Groq dashboard regularly
   - Watch for unusual activity

4. **Use strong passwords**
   - For Groq account
   - For hosting platform accounts

5. **Keep software updated**
   - Update Node.js regularly
   - Keep dependencies current
   - Security patches important

---

## 🎨 Customization Guide

### Modifying Age Groups

Edit `UNSAFE_INGREDIENTS` in `app/page.tsx`:

```javascript
const UNSAFE_INGREDIENTS = {
  '6-11': [
    'honey', 'cow milk', 'salt', 'sugar',
    'whole nuts', 'popcorn', 'hard candy',
    'raw egg', 'raw meat', 'raw fish',
    'hot pepper', 'chili'
  ],
  '12-23': [
    'honey', 'whole nuts', 'popcorn',
    'hard candy', 'raw egg', 'raw meat',
    'raw fish', 'hot pepper', 'chili'
  ],
  // Add or modify age groups as needed
};
```

### Adding or Modifying Allergens

Edit `COMMON_ALLERGENS`:

```javascript
const COMMON_ALLERGENS = {
  'milk': ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
  'eggs': ['egg'],
  'sesame': ['sesame', 'tahini', 'hummus'],
  // Add new allergens
};
```

### Changing Spices

Edit `COMMON_SPICES`:

```javascript
const COMMON_SPICES = [
  'cinnamon', 'cumin', 'paprika', 'oregano',
  'cardamom', 'fennel', // Add new spices
];
```

### Changing UI Colors

Modify Tailwind classes in the JSX. For example:

```javascript
// Change primary button color
className="bg-orange-500"  // Change to bg-blue-500, bg-green-500, etc.
```

### Adjusting Recipe Quantity

Change in the AI prompt (line ~178):

```javascript
// Change from 10 to 15
Create 10 complete baby-food recipes...
// to
Create 15 complete baby-food recipes...
```

---

## 👨‍⚖️ Legal Disclaimer

**⚠️ Important**: This application provides recipe suggestions only and is NOT a substitute for professional medical advice.

### Your Responsibilities

Parents and caregivers are responsible for:

1. **Consulting healthcare providers**: Always discuss food introduction with your pediatrician
2. **Following food safety guidelines**: Proper preparation, storage, and handling
3. **Managing known allergies**: Inform yourself about your baby's allergies
4. **Supervising eating**: Always supervise your baby while eating
5. **Watching for reactions**: Monitor for allergic reactions or other issues
6. **Using common sense**: Trust your instincts as a parent

### What This App IS

✅ A recipe suggestion tool  
✅ A convenience helper for meal planning  
✅ An educational resource about ingredients  
✅ A starting point for recipes you can modify  

### What This App IS NOT

❌ A medical diagnostic tool  
❌ A substitute for pediatric advice  
❌ A guarantee of nutritional completeness  
❌ A replacement for food safety practices  
❌ Professional nutritional advice  

### Liability

Use of this app is at your own risk. The creators and contributors:
- Provide no warranty for recipe safety
- Are not liable for allergic reactions
- Are not liable for food poisoning
- Are not liable for any health issues

Always prioritize your baby's health and safety over any app recommendations.

---

## 🤝 Contributing

We welcome contributions from the community! Ways to contribute:

### Report Bugs
- Found an issue? Open a GitHub issue
- Describe the problem clearly
- Include screenshots if possible
- Specify your browser/OS

### Suggest Features
- Have an idea? Share it!
- Explain the use case
- How would it help users?
- Examples of similar features

### Improve Code
- Fork the repository
- Make your changes
- Write clear commit messages
- Submit a pull request

### Improve Documentation
- Found a typo? Fix it!
- Confusing section? Clarify it!
- Missing explanation? Add it!
- Better examples? Submit them!

### Enhance Safety
- Found a security issue? Email us privately
- Suggest safety improvements
- Help identify dangerous ingredients
- Improve allergen detection

---

## 📚 Resources

### Official Documentation
- **Groq Console**: https://console.groq.com
- **Groq API Docs**: https://console.groq.com/docs
- **Groq Status**: https://status.groq.com

### Development Tools
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev

### Parenting & Nutrition Resources
- **American Academy of Pediatrics**: https://www.aap.org
- **CDC Infant Nutrition**: https://www.cdc.gov
- **WebMD Baby Food Guide**: https://www.webmd.com
- **Healthline Baby Nutrition**: https://www.healthline.com

### Learning Resources
- **Next.js Tutorial**: https://nextjs.org/learn
- **React Tutorial**: https://react.dev/learn
- **JavaScript Guide**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Tailwind Tutorial**: https://tailwindcss.com/docs

---

## 📞 Support & Feedback

### Getting Help

1. **Check this README first** - Most questions answered here
2. **Check Troubleshooting section** - Common issues covered
3. **Check FAQ** - Quick answers to popular questions
4. **Review browser console** - Error messages help diagnose
5. **Restart your dev server** - Fixes many issues

### Providing Feedback

- 💬 Report bugs on GitHub
- 💡 Suggest features
- 👍 Share what works well
- 📝 Help improve documentation
- ⭐ Star the repository if you like it

### Important Reminder

**Always consult your pediatrician before introducing new foods to your baby.** This app is a helpful tool, but your doctor is the ultimate authority on your baby's nutrition and health.

---

## 📊 Quick Stats

- ⚡ Recipe generation time: 10-30 seconds
- 🥗 Recipes generated per request: 10
- 🌍 Regions supported: Worldwide (requires internet)
- 💻 Browser support: All modern browsers
- 📱 Mobile friendly: Yes, fully responsive
- 🔐 Data stored: None (completely private)
- 💰 Cost per recipe: ~$0.0005 (typically free tier)
- 🧠 AI models supported: 3+ (Mixtral, Llama 3.1)

---

## 🎉 Getting Started Next Steps

1. ✅ Complete the Quick Start section above
2. ✅ Add your Groq API key
3. ✅ Run the dev server
4. ✅ Generate your first recipe
5. ✅ Deploy to Vercel
6. ✅ Share with other parents!
7. ✅ Star this repository ⭐

---

## 📄 License

This project is open source and available under the **MIT License**. See LICENSE file for details.

---

**Made with ❤️ for parents and babies** 👶

**Last Updated**: October 2025  
**Version**: 1.0  
**Maintained by**: Newsha Peymani

---

**Happy cooking and safe eating!** 🥄👶
