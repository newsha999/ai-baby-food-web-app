'use client'

import React, { useState } from 'react';
import { Utensils, Loader2, AlertCircle, ChefHat, Clock, Users, Flame, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const UNSAFE_INGREDIENTS = {
  '6-11': ['honey', 'cow milk', 'salt', 'sugar', 'whole nuts', 'popcorn', 'hard candy', 'raw egg', 'raw meat', 'raw fish', 'hot pepper', 'chili'],
  '12-23': ['honey', 'whole nuts', 'popcorn', 'hard candy', 'raw egg', 'raw meat', 'raw fish', 'hot pepper', 'chili'],
  '24-35': ['whole nuts', 'popcorn', 'hard candy', 'raw egg', 'raw meat', 'raw fish', 'hot pepper', 'chili'],
  '36-71': ['raw egg', 'raw meat', 'raw fish', 'whole nuts'],
  '72+': ['raw egg', 'raw meat', 'raw fish']
};

const COMMON_ALLERGENS = {
  'milk': ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
  'eggs': ['egg'],
  'peanuts': ['peanut'],
  'tree nuts': ['almond', 'cashew', 'walnut', 'pecan'],
  'soy': ['soy', 'tofu'],
  'wheat': ['wheat', 'bread', 'pasta', 'flour'],
  'fish': ['fish', 'salmon', 'tuna'],
  'shellfish': ['shrimp', 'crab', 'lobster']
};

const COMMON_SPICES = [
  'cinnamon', 'cumin', 'paprika', 'oregano', 'basil', 'thyme', 'rosemary',
  'garlic powder', 'onion powder', 'black pepper', 'turmeric', 'ginger',
  'nutmeg', 'vanilla', 'parsley', 'dill', 'sage', 'mint', 'cilantro'
];

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [ageMonths, setAgeMonths] = useState(12);
  const [servings, setServings] = useState(2);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [allergenWarnings, setAllergenWarnings] = useState([]);
  const [showAllergenPrompt, setShowAllergenPrompt] = useState(false);
  const [acknowledgedAllergens, setAcknowledgedAllergens] = useState([]);

  const getAgeGroup = (months) => {
    if (months < 12) return '6-11';
    if (months < 24) return '12-23';
    if (months < 36) return '24-35';
    if (months < 72) return '36-71';
    return '72+';
  };

  const getAgeLabel = (months) => {
    if (months < 12) return `${months} months`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years}y ${remainingMonths}m`;
  };

  const validateIngredients = (ingredientList) => {
    const errors = [];
    const unsafeItems = [];
    const ageGroup = getAgeGroup(ageMonths);
    const unsafeList = UNSAFE_INGREDIENTS[ageGroup] || [];
    
    for (const ing of ingredientList) {
      const ingLower = ing.toLowerCase().trim();
      for (const unsafe of unsafeList) {
        const regex = new RegExp(`\\b${unsafe}\\b`, 'i');
        if (regex.test(ingLower)) {
          unsafeItems.push({ ingredient: ing, reason: unsafe });
          break;
        }
      }
    }
    
    if (unsafeItems.length > 0) {
      const itemList = unsafeItems.map(item => `"${item.ingredient}" (contains ${item.reason})`).join(', ');
      errors.push(`The following ingredients are not safe for ${getAgeLabel(ageMonths)} old children: ${itemList}`);
    }
    
    return errors;
  };

  const detectAllergens = (ingredientList) => {
    const found = [];
    for (const ing of ingredientList) {
      const ingLower = ing.toLowerCase();
      for (const [allergen, items] of Object.entries(COMMON_ALLERGENS)) {
        if (items.some(item => ingLower.includes(item))) {
          if (!found.includes(allergen)) {
            found.push(allergen);
          }
        }
      }
    }
    return found;
  };

  const identifySpices = (ingredientList) => {
    const foundSpices = [];
    const ingredientsLower = ingredientList.map(i => i.toLowerCase());
    for (const spice of COMMON_SPICES) {
      if (ingredientsLower.some(ing => ing.includes(spice))) {
        foundSpices.push(spice);
      }
    }
    return foundSpices;
  };

  const generateRecipes = async () => {
    setError('');
    setRecipes([]);
    setSelectedRecipe(null);
    
    const ingredientList = ingredients.split(',').map(i => i.trim()).filter(i => i);
    
    if (ingredientList.length === 0) {
      setError('Please enter at least one ingredient');
      return;
    }
    
    const validationErrors = validateIngredients(ingredientList);
    if (validationErrors.length > 0) {
      setError(validationErrors.join('. '));
      return;
    }
    
    const allergens = detectAllergens(ingredientList);
    
    if (allergens.length > 0 && acknowledgedAllergens.length === 0) {
      setAllergenWarnings(allergens);
      setShowAllergenPrompt(true);
      return;
    }
    
    continueWithRecipeGeneration(ingredientList, allergens);
  };

  const continueWithRecipeGeneration = async (ingredientList, allergens) => {
    setShowAllergenPrompt(false);
    setLoading(true);
    
    try {
      const spices = identifySpices(ingredientList);
      const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY || 'YOUR_GROQ_API_KEY';
      
      let aiRecipes = null;
      
      if (GROQ_API_KEY !== 'YOUR_GROQ_API_KEY') {
        try {
          const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${GROQ_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: 'moonshotai/kimi-k2-instruct',
              messages: [{
                role: 'system',
                content: 'You are a pediatric nutrition expert specializing in baby-led weaning (BLW). You create safe, age-appropriate recipes.'
              }, {
                role: 'user',
                content: `Create 10 complete baby-led weaning recipes for a ${getAgeLabel(ageMonths)} old child.

Available ingredients: ${ingredientList.join(', ')}
Number of servings: ${servings}

CRITICAL REQUIREMENTS:
1. Use ONLY ingredients from the list above - no substitutions or additions
2. Each recipe should use 2-4 different ingredients (not all in every recipe)
3. Make recipes safe and age-appropriate for ${getAgeLabel(ageMonths)}
4. Vary the cooking methods (finger foods, mashed, shaped foods like patties/balls, baked goods, etc.)
5. Create DIVERSE recipes - different combinations and cooking styles
6. Provide specific measurements adjusted for ${servings} serving${servings > 1 ? 's' : ''}
7. Include 4-6 detailed step-by-step instructions per recipe

Return ONLY valid JSON (no markdown formatting):
{
  "recipes": [
    {
      "name": "Creative BLW recipe name under 5 words",
      "description": "One sentence about the recipe",
      "ingredients": [
        {
          "item": "ingredient name from list",
          "amount": "specific amount like 1 cup or 4 oz",
          "preparation": "how to prepare it (diced, mashed, etc)"
        }
      ],
      "prepTime": 10,
      "cookTime": 20,
      "totalTime": 30,
      "servings": ${servings},
      "calories": 180,
      "instructions": [
        {
          "step": 1,
          "title": "Brief step title",
          "instruction": "Detailed instruction with cooking method, temperature, and specifics for ${getAgeLabel(ageMonths)}",
          "timeEstimate": "5 minutes",
          "safeTip": "Safety or technique tip specific to babies/toddlers"
        }
      ],
      "nutrition": "Brief nutrition benefit statement",
      "texture": "Description of final texture (soft strips, mashed, patty, etc)"
    }
  ]
}`
              }],
              temperature: 0.7,
              max_tokens: 8000
            })
          });
          
          const data = await response.json();
          
          if (data.error) {
            throw new Error(data.error.message || 'API Error');
          }
          
          const aiResponse = data.choices[0].message.content.trim();
          
          // Remove markdown code blocks if present
          let cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
          
          // Extract JSON object
          const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            aiRecipes = JSON.parse(jsonMatch[0]);
            console.log('✅ AI Generated Recipes:', aiRecipes);
          } else {
            throw new Error('Could not parse AI response as JSON');
          }
          
        } catch (error) {
          console.error('❌ AI Error:', error);
          aiRecipes = null;
        }
      }
      
      // Build final recipes array
      let finalRecipes;
      
      if (aiRecipes && aiRecipes.recipes && aiRecipes.recipes.length > 0) {
        // Use AI-generated recipes
        finalRecipes = aiRecipes.recipes.map((recipe, idx) => ({
          id: idx + 1,
          name: recipe.name,
          description: recipe.description || '',
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          totalTime: recipe.totalTime || (recipe.prepTime + recipe.cookTime),
          servings: servings,
          calories: recipe.calories,
          ageAppropriate: getAgeLabel(ageMonths),
          ingredients: recipe.ingredients.map(ing => ({
            item: ing.item,
            amount: ing.amount,
            notes: ing.preparation || '',
            isSpice: COMMON_SPICES.some(s => ing.item.toLowerCase().includes(s))
          })),
          spices: recipe.ingredients
            .filter(ing => COMMON_SPICES.some(s => ing.item.toLowerCase().includes(s)))
            .map(ing => ing.item),
          instructions: recipe.instructions.map(inst => ({
            step: inst.step,
            title: inst.title,
            instruction: inst.instruction,
            time: inst.timeEstimate,
            tips: inst.safeTip
          })),
          nutrition: recipe.nutrition || 'Nutritious and age-appropriate',
          texture: recipe.texture || 'Baby-friendly texture'
        }));
      } else {
        // Fallback demo recipes if AI fails - generate 10 variations
        const recipeTemplates = [
          { name: 'Bites', prep: 5, cook: 15, cal: 180 },
          { name: 'Fingers', prep: 8, cook: 12, cal: 160 },
          { name: 'Patties', prep: 10, cook: 18, cal: 200 },
          { name: 'Mash', prep: 5, cook: 20, cal: 150 },
          { name: 'Balls', prep: 12, cook: 15, cal: 190 },
          { name: 'Strips', prep: 5, cook: 10, cal: 140 },
          { name: 'Bowl', prep: 8, cook: 22, cal: 210 },
          { name: 'Medley', prep: 10, cook: 15, cal: 175 },
          { name: 'Mix', prep: 6, cook: 18, cal: 165 },
          { name: 'Blend', prep: 5, cook: 12, cal: 155 }
        ];

        finalRecipes = recipeTemplates.map((template, idx) => ({
          id: idx + 1,
          name: `${ingredientList[idx % ingredientList.length]?.charAt(0).toUpperCase() + ingredientList[idx % ingredientList.length]?.slice(1)} Baby ${template.name}`,
          description: 'Simple nutritious meal for little ones',
          prepTime: template.prep,
          cookTime: template.cook,
          totalTime: template.prep + template.cook,
          servings: servings,
          calories: template.cal,
          ageAppropriate: getAgeLabel(ageMonths),
          ingredients: ingredientList.slice(0, Math.min(2, ingredientList.length)).map((ing, i) => ({
            item: ing,
            amount: i === 0 ? '1 cup' : '1/2 cup',
            notes: 'prepared as needed',
            isSpice: COMMON_SPICES.some(s => ing.toLowerCase().includes(s))
          })),
          spices: spices.slice(0, 1),
          instructions: [
            {
              step: 1,
              title: 'Prepare Ingredients',
              instruction: `Wash and prepare your ingredients. Cut into age-appropriate sizes.`,
              time: '5 minutes',
              tips: 'Always supervise feeding'
            },
            {
              step: 2,
              title: 'Cook',
              instruction: 'Cook until soft and tender.',
              time: `${template.cook} minutes`,
              tips: 'Test temperature before serving'
            }
          ],
          nutrition: 'Nutritious meal for growing babies',
          texture: 'Soft and safe'
        }));
      }
      
      setRecipes(finalRecipes);
      setAllergenWarnings(allergens);
      
    } catch (err) {
      setError('Failed to generate recipes. Please try again.');
      console.error('Generation Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAllergenAcknowledgment = (proceed) => {
    if (proceed) {
      setAcknowledgedAllergens(allergenWarnings);
      const ingredientList = ingredients.split(',').map(i => i.trim()).filter(i => i);
      continueWithRecipeGeneration(ingredientList, allergenWarnings);
    } else {
      setShowAllergenPrompt(false);
      setAllergenWarnings([]);
    }
  };

  const generateMoreRecipes = () => {
    const ingredientList = ingredients.split(',').map(i => i.trim()).filter(i => i);
    continueWithRecipeGeneration(ingredientList, allergenWarnings);
  };

  const selectRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const nextStep = () => {
    if (currentStep < selectedRecipe.instructions.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const backToRecipes = () => {
    setSelectedRecipe(null);
    setCurrentStep(0);
    setCompletedSteps([]);
  };

  const markStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
  };

  // Step-by-step cooking view
  if (selectedRecipe) {
    const currentInstruction = selectedRecipe.instructions[currentStep];
    const progress = ((currentStep + 1) / selectedRecipe.instructions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <button
            onClick={backToRecipes}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to recipes</span>
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{selectedRecipe.name}</h1>
              <p className="text-white text-sm mb-3">{selectedRecipe.description}</p>
              <div className="flex gap-4 text-white text-sm">
                <span>👶 {selectedRecipe.ageAppropriate}</span>
                <span>⏱️ {selectedRecipe.totalTime} min</span>
                <span>🔥 {selectedRecipe.calories} cal</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="px-6 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Step {currentStep + 1} of {selectedRecipe.instructions.length}
                </span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Ingredients sidebar */}
            <div className="px-6 pb-4">
              <details className="bg-blue-50 rounded-lg p-4">
                <summary className="font-semibold text-blue-900 cursor-pointer">
                  📋 View All Ingredients
                </summary>
                <ul className="mt-3 space-y-2">
                  {selectedRecipe.ingredients.map((ing, i) => {
                    const containsAllergen = allergenWarnings.some(allergen => 
                      COMMON_ALLERGENS[allergen]?.some(item => ing.item.toLowerCase().includes(item))
                    );
                    
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className={ing.isSpice ? "text-purple-500 font-bold" : "text-blue-500 font-bold"}>
                          {ing.isSpice ? "🌿" : "•"}
                        </span>
                        <span className="text-gray-700 flex-1">
                          <strong>{ing.amount}</strong> {ing.item} {ing.notes && `(${ing.notes})`}
                          {ing.isSpice && <span className="ml-2 text-purple-600 text-xs font-semibold">SPICE</span>}
                          {containsAllergen && (
                            <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold border border-yellow-300">
                              ⚠️ ALLERGEN
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>

            {/* Current step */}
            <div className="px-6 pb-8">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-orange-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {currentStep + 1}
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">{currentInstruction.title}</h2>
                    </div>
                    <span className="inline-block px-3 py-1 bg-white rounded-full text-sm text-gray-600">
                      ⏱️ {currentInstruction.time}
                    </span>
                  </div>
                  <button
                    onClick={markStepComplete}
                    className={`p-2 rounded-full transition-all ${
                      completedSteps.includes(currentStep)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-green-100'
                    }`}
                  >
                    <Check className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-lg text-gray-800 mb-4 leading-relaxed">
                  {currentInstruction.instruction}
                </p>

                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="text-sm text-gray-700">
                    <strong className="text-orange-600">💡 Tip:</strong> {currentInstruction.tips}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === selectedRecipe.instructions.length - 1}
                className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {currentStep === selectedRecipe.instructions.length - 1 ? 'Finished! 🎉' : 'Next Step'}
                {currentStep !== selectedRecipe.instructions.length - 1 && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>

            {/* Completed message */}
            {currentStep === selectedRecipe.instructions.length - 1 && completedSteps.includes(currentStep) && (
              <div className="mx-6 mb-6 bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
                <h3 className="text-2xl font-bold text-green-800 mb-2">🎉 Recipe Complete!</h3>
                <p className="text-green-700 mb-4">
                  Great job! Your {selectedRecipe.name} is ready to serve.
                </p>
                <button
                  onClick={backToRecipes}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  Make Another Recipe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main recipe list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-orange-500" />
            <h1 className="text-4xl font-bold text-gray-800">The Ultimate Baby Food Recipe Generator</h1>
          </div>
          <p className="text-gray-600 text-lg">AI-powered recipes for babies and children - completely customized!</p>
          <div className="mt-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg inline-block">
            <p className="text-sm text-blue-800">✨ 100% AI Generated • Step-by-step cooking recipes for ages 6mo-12yr </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800 font-semibold">
              🤖 <strong>Powered by AI:</strong> Get 10 unique recipe ideas! Each recipe uses different combinations from your ingredients list.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              What ingredients do you have?
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="The more ingredients, better the recipes!"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-400 text-gray-700 text-lg"
              rows="3"
            />
            <p className="text-sm text-gray-500 mt-2">Separate with commas • Include spices!</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Child's age: {getAgeLabel(ageMonths)}
            </label>
            <input
              type="range"
              min="6"
              max="144"
              value={ageMonths}
              onChange={(e) => setAgeMonths(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6 months</span>
              <span>12 years</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              How many servings?
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setServings(Math.max(1, servings - 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-3xl font-bold text-orange-600">{servings}</span>
                <span className="text-sm text-gray-600 ml-2">serving{servings !== 1 ? 's' : ''}</span>
              </div>
              <button
                onClick={() => setServings(Math.min(10, servings + 1))}
                className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold text-gray-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={generateRecipes}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-md"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                AI is creating recipes...
              </>
            ) : (
              <>
                <Utensils className="w-6 h-6" />
                Generate Recipes with AI
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-800 mb-2">⚠️ Safety Alert</p>
                <p className="text-red-700 mb-3">{error}</p>
                <div className="bg-red-100 rounded-lg p-3 mt-2">
                  <p className="text-sm text-red-800 font-semibold mb-1">Safe alternatives:</p>
                  <ul className="text-sm text-red-700 space-y-1">
                    {ageMonths < 12 && (
                      <>
                        <li>• Use mashed banana instead of honey</li>
                        <li>• Try breast milk or formula instead of cow's milk</li>
                        <li>• Use nut butters (thin) instead of whole nuts</li>
                      </>
                    )}
                    {ageMonths >= 12 && ageMonths < 24 && (
                      <>
                        <li>• Cook eggs thoroughly (no runny yolks)</li>
                        <li>• Grind nuts instead of whole pieces</li>
                        <li>• Use mild spices instead of hot peppers</li>
                      </>
                    )}
                    {ageMonths >= 24 && (
                      <>
                        <li>• Cook all proteins thoroughly</li>
                        <li>• Avoid choking hazards</li>
                        <li>• Introduce new foods one at a time</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Allergen Acknowledgment Prompt */}
        {showAllergenPrompt && (
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 mb-6 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-yellow-900 mb-2">⚠️ Allergen Warning</h3>
                <p className="text-yellow-800 mb-3">
                  Common allergens detected:
                </p>
                <div className="bg-white rounded-lg p-4 mb-4">
                  <ul className="space-y-2">
                    {allergenWarnings.map((allergen, idx) => {
                      const ingredientList = ingredients.split(',').map(i => i.trim());
                      const matchingIngredients = ingredientList.filter(ing => {
                        const ingLower = ing.toLowerCase();
                        return COMMON_ALLERGENS[allergen]?.some(item => ingLower.includes(item));
                      });
                      
                      return (
                        <li key={idx} className="text-yellow-900">
                          <div className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></span>
                            <div>
                              <strong className="capitalize">{allergen}</strong>
                              <span className="text-sm text-yellow-700 ml-2">
                                (in: {matchingIngredients.join(', ')})
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="bg-yellow-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    <strong>Safety Information:</strong><br/>
                    • Introduce allergens one at a time<br/>
                    • Wait 3-5 days between new foods<br/>
                    • Watch for allergic reactions<br/>
                    • Consult pediatrician first
                  </p>
                </div>
                <p className="text-yellow-800 font-semibold mb-4">
                  Has your child been tested for these ingredients?
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleAllergenAcknowledgment(false)}
                className="flex-1 py-3 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                No, Go Back
              </button>
              <button
                onClick={() => handleAllergenAcknowledgment(true)}
                className="flex-1 py-3 px-6 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-all"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        )}

        {/* Allergen acknowledged badge */}
        {allergenWarnings.length > 0 && acknowledgedAllergens.length > 0 && !showAllergenPrompt && (
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
            <p className="font-semibold text-green-800 mb-2">✅ Allergens Acknowledged</p>
            <p className="text-green-700 text-sm">
              Confirmed safe: <strong>{acknowledgedAllergens.join(', ')}</strong>
            </p>
          </div>
        )}

        {/* Recipe list */}
        {recipes.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">AI-Generated Recipes</h2>
                <p className="text-sm text-gray-600 mt-1">Showing {recipes.length} unique recipe ideas</p>
              </div>
              <button
                onClick={generateMoreRecipes}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-4 h-4" />
                    Generate New Ideas
                  </>
                )}
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recipes.map((recipe) => {
                const currentIngredientList = ingredients.split(',').map(i => i.trim()).filter(i => i);
                
                return (
                  <div key={recipe.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border-2 border-gray-100">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{recipe.name}</h3>
                          {recipe.description && (
                            <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                          )}
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold whitespace-nowrap ml-2">
                          {recipe.ageAppropriate}
                        </span>
                      </div>
                      
                      {allergenWarnings.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-2">
                          {allergenWarnings.map((allergen, idx) => (
                            <span key={idx} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold border border-yellow-300">
                              ⚠️ Contains {allergen}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{recipe.totalTime}min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span>~{recipe.calories} cal</span>
                        </div>
                      </div>

                      {recipe.spices.length > 0 && (
                        <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                          <p className="text-sm text-purple-800">
                            <strong>🌿 Spices:</strong> {recipe.spices.join(', ')}
                          </p>
                        </div>
                      )}

                      <div className="mb-4 bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600 mb-1 font-semibold">
                          Uses {recipe.ingredients.length} ingredient{recipe.ingredients.length > 1 ? 's' : ''}:
                        </p>
                        <p className="text-sm text-gray-700">
                          {recipe.ingredients.map(ing => ing.item).join(', ')}
                        </p>
                      </div>

                      {recipe.texture && (
                        <p className="text-sm text-gray-600 mb-4 italic">
                          <strong>Texture:</strong> {recipe.texture}
                        </p>
                      )}

                      <button
                        onClick={() => selectRecipe(recipe)}
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                      >
                        Start Cooking
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            ⚠️ <strong>Important:</strong> Always supervise children. Introduce new foods one at a time.
          </p>
          <p className="text-xs text-gray-500">
            This app provides recipe suggestions only—not medical advice. Consult your pediatrician for dietary needs.
          </p>
        </div>
      </div>
    </div>
  );
}