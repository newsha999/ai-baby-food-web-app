# 👶 Baby-Led Weaning Recipe Generator

A modern, AI-powered React application that generates safe, age-appropriate baby-led weaning (BLW) recipes using Groq's high-performance language models. This app combines cutting-edge AI with pediatric nutrition expertise to help parents confidently introduce solid foods to their babies.

---

## 🎯 Overview

The Baby-Led Weaning Recipe Generator uses artificial intelligence to create customized recipes based on available ingredients, the child's age, and desired servings. It intelligently validates ingredient safety, detects potential allergens, and provides step-by-step cooking instructions with interactive progress tracking.

### Key Features

- **AI-Powered Recipe Generation**: Uses advanced language models (Mixtral, Llama 3.1) to generate diverse, creative recipes
- **Age-Appropriate Safety Validation**: Automatically checks ingredients against age-specific safety guidelines (6+ months to 6+ years)
- **Allergen Detection & Warnings**: Identifies common allergens in ingredients and prompts for user acknowledgment before proceeding
- **Dynamic Fallback System**: Automatically switches between multiple AI models if the primary option becomes unavailable
- **Interactive Cooking Mode**: Step-by-step instructions with completion tracking and timer estimations
- **Spice Detection**: Identifies and highlights common spices in recipes for awareness
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Real-time Feedback**: Validates inputs and provides helpful error messages

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn** package manager
- **Groq API Key** (free tier available at https://console.groq.com)
- **Vercel Account** (for deployment, optional for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd recipe-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create environment variables**
   
   Create a `.env.local` file in the root directory:
   ```
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
   NEXT_PUBLIC_PRIMARY_MODEL=mixtral-8x7b-32768
   NEXT_PUBLIC_BACKUP_MODEL_1=llama-3.1-70b-versatile
   NEXT_PUBLIC_BACKUP_MODEL_2=llama-3.1-8b-instant
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:3000` and start generating recipes!

---

## 📋 Environment Variables

Configure your application by setting these environment variables. All variables use the `NEXT_PUBLIC_` prefix because they're accessed from the browser.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_GROQ_API_KEY` | ✅ Yes | None | Your Groq API key for AI model access. Get it at https://console.groq.com |
| `NEXT_PUBLIC_PRIMARY_MODEL` | ❌ Optional | `mixtral-8x7b-32768` | Primary AI model for recipe generation (fastest & balanced) |
| `NEXT_PUBLIC_BACKUP_MODEL_1` | ❌ Optional | `llama-3.1-70b-versatile` | First fallback model if primary is unavailable (highest quality) |
| `NEXT_PUBLIC_BACKUP_MODEL_2` | ❌ Optional | `llama-3.1-8b-instant` | Second fallback model for reliability (fastest but less capable) |

### Available Groq Models

These are the models available through Groq's API:

- **mixtral-8x7b-32768** (Recommended Primary)
  - Excellent balance of speed and quality
  - Ideal for creative recipe generation
  - ~32K token context window

- **llama-3.1-70b-versatile** (Recommended Backup 1)
  - Highest quality outputs
  - Better instruction following
  - Slower than Mixtral but very reliable

- **llama-3.1-8b-instant** (Recommended Backup 2)
  - Fastest option
  - Good for simple tasks
  - Best for fallback/emergency use

---

## 🔧 Configuration in Vercel

### Step-by-Step Setup

1. **Connect your repository to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository

2. **Add Environment Variables**
   - In the Vercel dashboard, go to **Settings** → **Environment Variables**
   - Add each variable below for all environments (Production, Preview, Development)

3. **Required Variables**
   ```
   NEXT_PUBLIC_GROQ_API_KEY = your_groq_api_key
   NEXT_PUBLIC_PRIMARY_MODEL = mixtral-8x7b-32768
   NEXT_PUBLIC_BACKUP_MODEL_1 = llama-3.1-70b-versatile
   NEXT_PUBLIC_BACKUP_MODEL_2 = llama-3.1-8b-instant
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application
   - Your app will be live in seconds!

### Updating Models Without Redeploying

One of the key features of this setup is the ability to change AI models directly in Vercel without touching code:

1. Go to **Settings** → **Environment Variables** in your Vercel project
2. Update the model names (e.g., swap `NEXT_PUBLIC_PRIMARY_MODEL`)
3. **Save changes** - Vercel automatically rebuilds with new models
4. Your app uses the updated models on next load

This allows you to experiment with different models or switch providers without code changes!

---

## 🎨 How It Works

### User Flow

```
1. Enter Ingredients
   ↓
2. Select Child's Age
   ↓
3. Choose Serving Size
   ↓
4. Validate Safety
   ├─ Check for unsafe ingredients ✓
   └─ Detect allergens ⚠️
   ↓
5. Acknowledge Allergens (if any)
   ↓
6. Generate Recipes (via AI)
   ├─ Try Primary Model (Mixtral)
   ├─ Fallback to Backup Model 1 (Llama 70B)
   └─ Fallback to Backup Model 2 (Llama 8B)
   ↓
7. Browse Generated Recipes
   ↓
8. Start Cooking
   ├─ View step-by-step instructions
   ├─ Track completed steps
   └─ See total prep/cook time
```

### Safety Features

**Age-Based Ingredient Validation**
- 6-11 months: Strictest restrictions (no honey, nuts, choking hazards)
- 12-23 months: Relaxed restrictions, still cautious
- 24-35 months: Further relaxation
- 36-71 months: Minor restrictions mainly on raw foods
- 72+ months: Focus on raw eggs, meat, fish only

**Allergen Detection**
- Automatically identifies 8 common allergens:
  - Milk, Eggs, Peanuts, Tree Nuts, Soy, Wheat, Fish, Shellfish
- Requires explicit user acknowledgment before proceeding
- Shows which ingredients contain detected allergens

**Model Fallback Protection**
- If the primary model fails, automatically tries backup models
- Ensures reliability even if one model becomes unavailable
- Console logs show which model is being attempted
- Graceful error handling with user-friendly messages

---

## 📱 Features in Detail

### Recipe Generation

The AI creates 10 unique recipes per request that:
- Use **only** ingredients from your provided list (no substitutions)
- Combine 2-4 ingredients per recipe for variety
- Vary cooking methods (finger foods, mashed, shaped, baked)
- Include specific measurements for your serving size
- Provide prep and cook times
- Estimate calorie content
- Highlight detected spices

### Interactive Cooking Mode

Once you select a recipe:
- **Step-by-step instructions** for each cooking step
- **Visual progress tracking** - mark steps complete as you cook
- **Total time estimates** - prep, cook, and total time
- **Ingredient amounts** adjusted for your serving size
- **Spice alerts** - know exactly which spices are in the recipe
- **Back/Next navigation** - move between steps easily

### Ingredient Spice Detection

The app identifies 19 common spices:
- Cinnamon, Cumin, Paprika, Oregano, Basil, Thyme, Rosemary
- Garlic powder, Onion powder, Black pepper, Turmeric, Ginger
- Nutmeg, Vanilla, Parsley, Dill, Sage, Mint, Cilantro

Spices are highlighted when detected to inform parents about flavor profiles.

---

## 🛠️ Technical Architecture

### Tech Stack

- **Frontend**: React 18+ with Next.js
- **Styling**: Tailwind CSS with responsive design
- **AI Integration**: Groq API with OpenAI-compatible endpoints
- **Icons**: Lucide React for beautiful UI icons
- **State Management**: React Hooks (useState)
- **Deployment**: Vercel

### Component Structure

```
RecipeGenerator (Main Component)
├── State Management
│   ├── Ingredients input
│   ├── Age and servings
│   ├── Recipe list and selection
│   ├── Cooking step tracking
│   ├── Loading and error states
│   └── Allergen acknowledgment
├── Validation Functions
│   ├── Age group mapping
│   ├── Ingredient safety checking
│   └── Allergen detection
├── AI Integration
│   ├── Model fallback chain
│   ├── Groq API calls
│   └── Response parsing
└── UI Sections
    ├── Input form
    ├── Allergen warning modal
    ├── Recipe grid
    └── Cooking instruction viewer
```

### API Integration

The app communicates with Groq's API endpoint:
```
POST https://api.groq.com/openai/v1/chat/completions
```

It uses an OpenAI-compatible format for easy model switching.

---

## ⚙️ AI Model Fallback System

The recipe generator includes intelligent fallback protection:

1. **Primary Model Attempt**: Tries the `NEXT_PUBLIC_PRIMARY_MODEL` first
2. **Automatic Fallback**: If primary fails, automatically tries `NEXT_PUBLIC_BACKUP_MODEL_1`
3. **Second Fallback**: If backup 1 fails, tries `NEXT_PUBLIC_BACKUP_MODEL_2`
4. **Error Handling**: If all models fail, displays a helpful error message
5. **Console Logging**: Each attempt is logged so you can see which model was used

This system ensures your app stays running even if:
- A model becomes temporarily unavailable
- Groq has rate limits on a specific model
- You want to A/B test different models

---

## 🔐 Security Considerations

### API Key Safety

- ✅ Use `NEXT_PUBLIC_` prefix only for non-sensitive configuration
- ❌ **NEVER** commit `.env.local` to version control
- ✅ Always use Vercel's secure environment variable storage for production
- ✅ Rotate your Groq API key if accidentally exposed

### Data Privacy

- Recipe generation happens client-side
- Ingredient data is sent to Groq's API (not stored locally)
- No user data is persisted or tracked
- Always supervise children during cooking

---

## 🚨 Troubleshooting

### "API Key Error" or "401 Unauthorized"

**Problem**: Your Groq API key is invalid or not configured.

**Solution**:
1. Verify your API key at https://console.groq.com
2. Check that `NEXT_PUBLIC_GROQ_API_KEY` is set correctly
3. For Vercel: Ensure you added it to Environment Variables AND redeployed
4. Locally: Restart the dev server after updating `.env.local`

### "Model Not Found" Error

**Problem**: The specified model isn't available or the name is incorrect.

**Solution**:
1. Verify model names match Groq's available models
2. Check `NEXT_PUBLIC_PRIMARY_MODEL` and backup models are spelled correctly
3. All three fallback models should be available on Groq
4. Check Groq's API documentation for current model list

### "No Recipes Generated"

**Problem**: The AI failed to generate recipes for your ingredients.

**Solution**:
1. Try with simpler ingredients (fewer special characters)
2. Enter at least 3-4 ingredients for better results
3. Check browser console for error messages
4. Verify the model is working with a simpler prompt first
5. Check Groq's status page for any outages

### Slow Response Times

**Problem**: Recipe generation is taking too long.

**Solution**:
1. The first request might be slower (model warm-up)
2. Try switching to a faster model via Vercel environment variables
3. Use `llama-3.1-8b-instant` for faster responses
4. Check your internet connection
5. Reduce the number of ingredients to simplify the prompt

---

## 📚 Resource Links

- **Groq Console**: https://console.groq.com
- **Groq API Documentation**: https://console.groq.com/docs
- **Vercel Dashboard**: https://vercel.com
- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## 📖 Baby-Led Weaning Information

### What is BLW?

Baby-led weaning is an approach to introducing solid foods where babies self-feed with age-appropriate foods rather than being spoon-fed purees. Babies develop motor skills and independence while learning to regulate their own food intake.

### Age Guidelines

- **6-11 months**: Introduction phase, soft foods only
- **12-23 months**: Expanding variety, some texture tolerance
- **24+ months**: Most foods acceptable with safety precautions

### Important Safety Tips

1. **Always supervise** during eating
2. **Introduce one new food at a time** and wait 3-5 days
3. **Watch for allergic reactions** (rashes, vomiting, difficulty breathing)
4. **Avoid choking hazards** (hard candy, whole nuts, raw carrots)
5. **Consult your pediatrician** before introducing allergens or if you have concerns
6. **Cut foods appropriately** for your child's age and chewing ability

---

## ⚖️ Legal Disclaimer

This application provides **recipe suggestions only** and is not a substitute for professional medical advice. Always consult your pediatrician regarding your child's dietary needs, allergies, and introduction of new foods. Parents are responsible for:

- Consulting with healthcare providers
- Following food safety guidelines
- Supervising children during meals
- Assessing individual child's readiness for foods
- Managing known allergies and sensitivities

---

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs or issues
- Suggest new features
- Improve documentation
- Enhance safety features
- Add more ingredient validations

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙋 Support

For issues, questions, or suggestions:

1. Check this README and troubleshooting section first
2. Review Groq's API documentation
3. Check browser console for error messages
4. Verify environment variables are correctly set
5. Restart your development server

---

**Made with ❤️ for parents and babies** 👶

Happy cooking and safe weaning! 🥄
