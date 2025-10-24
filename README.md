# 👶 # 🍳 AI Recipe Generator

An intelligent React application that generates customized recipes based on available ingredients and the diner's age. This app uses Groq's high-performance language models to create diverse, personalized recipes tailored to different age groups and dietary needs.

---

## 🎯 Overview

The AI Recipe Generator uses advanced artificial intelligence to create recipes based on your available ingredients, age specifications, and desired servings. It intelligently validates ingredient appropriateness, detects potential allergens, and provides step-by-step cooking instructions with interactive progress tracking.

### Key Features

- **AI-Powered Recipe Generation**: Uses advanced language models (Mixtral, Llama 3.1) to generate diverse, creative recipes
- **Age-Based Customization**: Tailors recipes and safety considerations based on the age you specify
- **Ingredient Safety Validation**: Checks ingredients against age-specific safety guidelines
- **Allergen Detection & Warnings**: Identifies common allergens in ingredients and prompts for user acknowledgment
- **Dynamic Fallback System**: Automatically switches between multiple AI models if the primary option becomes unavailable
- **Interactive Cooking Mode**: Step-by-step instructions with completion tracking and timer estimations
- **Spice Detection**: Identifies and highlights common spices in recipes
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
2. Specify Age
   ↓
3. Choose Serving Size
   ↓
4. Validate Ingredients
   ├─ Check for unsafe items ✓
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

The app includes pre-configured age groups with specific safety restrictions:
- **6-11 months**: Strictest restrictions (choking hazards, hard foods)
- **12-23 months**: Relaxed restrictions, still cautious
- **24-35 months**: Further relaxation for certain foods
- **36-71 months**: Minor restrictions on raw foods
- **72+ months**: Focus on raw proteins only

You can easily customize these age groups and restrictions in the `UNSAFE_INGREDIENTS` constant.

**Allergen Detection**

The app identifies 8 common allergens:
- Milk, Eggs, Peanuts, Tree Nuts, Soy, Wheat, Fish, Shellfish

Features include:
- Automatic detection in ingredients
- User acknowledgment required before proceeding
- Shows which ingredients contain detected allergens
- Educational information about allergen introduction

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
- Vary cooking methods for diverse preparation styles
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

Spices are highlighted when detected to inform about flavor profiles.

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
│   ├── Age selection
│   ├── Servings quantity
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
- Ingredient data is sent to Groq's API for processing
- No user data is persisted or tracked
- Users are responsible for food safety practices

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

## 🎯 Customization

### Modifying Age Groups and Safety Rules

Edit the `UNSAFE_INGREDIENTS` object to customize age-based restrictions:

```javascript
const UNSAFE_INGREDIENTS = {
  '6-11': ['honey', 'whole nuts', ...],
  '12-23': ['whole nuts', ...],
  // Add or modify age groups as needed
};
```

### Adding or Changing Allergens

Update the `COMMON_ALLERGENS` object to include different allergens:

```javascript
const COMMON_ALLERGENS = {
  'milk': ['milk', 'cheese', ...],
  'sesame': ['sesame', 'tahini', ...],
  // Add new allergen groups
};
```

### Adding More Spices

Extend the `COMMON_SPICES` array with additional spices to detect:

```javascript
const COMMON_SPICES = [
  'cinnamon', 'cumin', 'cardamom', ...
];
```

---

## 📚 Resource Links

- **Groq Console**: https://console.groq.com
- **Groq API Documentation**: https://console.groq.com/docs
- **Vercel Dashboard**: https://vercel.com
- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

---

## ⚖️ Legal Disclaimer

This application provides **recipe suggestions only** and is not a substitute for professional advice. Users are responsible for:

- Verifying food safety and nutritional content
- Following proper food preparation guidelines
- Managing known allergies and dietary restrictions
- Consulting appropriate professionals for dietary concerns

---

## 🤝 Contributing

We welcome contributions! Please feel free to:
- Report bugs or issues
- Suggest new features
- Improve documentation
- Enhance safety features
- Add more ingredient validations
- Optimize AI prompts

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
