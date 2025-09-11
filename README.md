# Personalized Career & Education Advisor 🎓✨

An AI-powered mentor that helps students and professionals **choose careers, identify skill gaps, and build personalized education roadmaps** with multi-AI integration and government data insights.

## 🚀 Features

### Core Features
✅ **Profile Builder** - Comprehensive education, skills, and interests assessment  
✅ **AI-Powered Career Matching** - Multi-provider AI recommendations  
✅ **Skill Gap Analysis** - Identify missing skills with priority ranking  
✅ **Personalized Roadmaps** - Step-by-step learning paths with timeline  
✅ **Resource Recommendations** - Curated courses from multiple platforms  
✅ **AI Chat Advisor** - Multi-provider conversational guidance  

### Enhanced Features
🔥 **Multi-AI Integration** - OpenAI, Gemini, Hugging Face, OpenRouter  
🏛️ **Government Data Integration** - Real-time employment data from data.gov.in  
🎯 **Job Market Insights** - Live demand trends and salary data  
💰 **Government Schemes** - Personalized scholarship and program recommendations  
📄 **Resume Analyzer** - AI-powered resume feedback and optimization  
🎤 **Voice Assistant** - Speech-to-text and text-to-speech capabilities  
🏆 **Gamification** - XP points, badges, and progress tracking  
🎯 **Interview Coach** - AI-generated practice questions with feedback  
🌐 **Multilingual Support** - Hindi, English, and regional languages  

## 🛠 Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **AI Providers:** OpenAI, Google Gemini, Hugging Face, OpenRouter
- **Data Sources:** data.gov.in APIs, employment statistics
- **State Management:** React Hooks + Local Storage
- **UI Components:** Custom components with shadcn/ui patterns
- **Voice:** Web Speech API (Speech Recognition & Synthesis)
- **Visualization:** Custom timeline components
- **Export:** HTML/PDF generation

## 🏗 Architecture

```
User Input → Multi-AI Processing → Government Data Integration → Personalized Output
     ↓              ↓                        ↓                        ↓
Profile Builder → Career Matching → Market Analysis → Roadmap Generation
     ↓              ↓                        ↓                        ↓
Voice Input → Resume Analysis → Scheme Matching → Interview Coaching
```

## 🤖 AI Provider Integration

### 1. OpenAI API
- **Use Case:** Conversational career counseling, resume analysis
- **Features:** Natural language processing, detailed recommendations
- **Fallback:** Gemini API

### 2. Google Gemini API  
- **Use Case:** Reasoning tasks, roadmap planning, aptitude analysis
- **Features:** Complex reasoning, timeline generation
- **Fallback:** OpenRouter

### 3. Hugging Face API
- **Use Case:** Skill classification, text embeddings, resume parsing
- **Features:** Specialized NLP models, sentiment analysis
- **Fallback:** OpenAI

### 4. OpenRouter API
- **Use Case:** Fallback for free/open-source models
- **Features:** Cost-effective AI responses
- **Models:** Mistral, Llama, Claude alternatives

## 🏛️ Government Data Integration

### data.gov.in APIs
- **Employment Statistics:** Job market trends, demand data
- **Education Data:** Skill development programs, success rates  
- **Scholarship Information:** Government schemes, eligibility criteria
- **Regional Data:** State-wise opportunities, local programs

### Real-time Insights
- Job demand trends (e.g., "AI engineers demand up 34% in 2025")
- Salary benchmarks by location and experience
- Government skill development initiatives
- Scholarship deadlines and application links

## 🎯 Unique Features

### 1. Voice Assistant
- **Speech-to-Text:** Voice commands for navigation
- **Text-to-Speech:** Audio feedback and guidance
- **Multilingual:** Support for Indian languages
- **Commands:** "Show recommendations", "Start interview practice"

### 2. Gamification System
- **XP Points:** Earn points for completing tasks
- **Badges:** Achievement system for milestones
- **Levels:** Progress tracking with visual indicators
- **Leaderboards:** Compare progress with peers

### 3. Resume Analyzer
- **AI Parsing:** Extract skills, experience, education
- **Feedback:** Strengths, weaknesses, improvement suggestions
- **Scoring:** Overall resume quality score
- **Optimization:** Tailored recommendations for target roles

### 4. Interview Coach
- **AI Questions:** Role-specific interview questions
- **Difficulty Levels:** Easy, medium, hard practice modes
- **Categories:** Technical, behavioral, situational questions
- **Feedback:** Expected answers and improvement tips

### 5. Government Schemes Finder
- **Personalized Matching:** Based on user profile and eligibility
- **Real-time Data:** Updated scheme information
- **Application Links:** Direct links to government portals
- **Deadline Tracking:** Important dates and reminders

## 📱 User Journey

1. **Landing Page** → Engaging introduction with feature highlights
2. **Onboarding Wizard** → Profile building + interest assessment  
3. **Enhanced Dashboard** → Multi-tab interface with all features
4. **Career Recommendations** → AI-powered matches with market data
5. **Learning Roadmap** → Interactive timeline with resources
6. **Government Schemes** → Personalized scholarship recommendations
7. **Resume Analysis** → Upload and get AI feedback
8. **Interview Practice** → Role-specific question practice
9. **Voice Interaction** → Hands-free navigation and guidance
10. **Progress Tracking** → Gamified learning journey

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- API keys for AI providers
- data.gov.in API access

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/career-advisor.git
cd career-advisor

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API keys to .env

# Start development server
npm run dev
```

### Environment Variables
```env
# AI Provider API Keys
OPENAI_API_KEY=your_openai_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
OPENROUTER_API_KEY=your_openrouter_api_key

# Government Data APIs
DATA_GOV_IN_API_KEY=your_data_gov_in_api_key

# Optional: External APIs
COURSERA_API_KEY=your_coursera_api_key
EDX_API_KEY=your_edx_api_key
```

## 🎯 Demo Script (5 minutes)

1. **Problem Introduction** (30s)
   - Career confusion among students and professionals
   - Lack of personalized guidance and market insights

2. **Solution Overview** (30s)
   - Multi-AI powered career advisor
   - Government data integration
   - Comprehensive feature set

3. **Live Demo** (3 minutes)
   - Quick onboarding flow
   - AI career recommendations with market data
   - Government schemes matching
   - Resume analysis with feedback
   - Voice assistant interaction
   - Gamification features

4. **Impact & Future** (1 minute)
   - Democratizing career guidance
   - Supporting government skill initiatives
   - Scaling to millions of users

## 🏆 Hackathon Highlights

### Innovation
- **Multi-AI Integration:** First career advisor using 4 AI providers
- **Government Data:** Real-time integration with official APIs
- **Voice Interface:** Hands-free career guidance
- **Gamification:** Making career planning engaging

### Technical Excellence
- **Robust Architecture:** Fallback systems for AI providers
- **Real-time Data:** Live job market and scheme information
- **Responsive Design:** Works across all devices
- **Performance:** Optimized loading and caching

### Social Impact
- **Accessibility:** Voice support for differently-abled users
- **Inclusivity:** Multilingual support for diverse users
- **Government Alignment:** Supporting national skill initiatives
- **Scalability:** Built to serve millions of users

## 🔮 Future Roadmap

### Phase 1 (Next 3 months)
- Real API integrations with all providers
- Advanced voice commands and responses
- Peer networking and mentorship features
- Mobile app development

### Phase 2 (6 months)
- AI-powered job matching with companies
- Virtual reality interview simulations
- Blockchain-based skill certifications
- Advanced analytics and insights

### Phase 3 (1 year)
- International expansion
- Corporate partnerships
- Advanced AI models training
- Government policy recommendations

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI, Google, Hugging Face, and OpenRouter for AI capabilities
- Government of India for open data initiatives
- React and TypeScript communities
- All contributors and testers

---

**Built with ❤️ for the future of career guidance in India**