# Financial Analytics Dashboard (FAB)

A modern, comprehensive financial intelligence platform that provides analytics, monitoring, and AI-assisted insights for financial data management and decision-making.

![Financial Dashboard](src/assets/ftf/logo.svg)

## 🚀 Features

- **Financial Analytics**: Comprehensive financial data visualization with revenue tracking, DSO analysis, and financial pie charts
- **AI-Powered Assistance**: Financial Analyst Pilot provides AI-driven insights and analysis
- **Client Management**: Track client profiles, spending patterns, and risk levels
- **Time-Based Analysis**: Explore financial data across different time periods
- **SOPs & Policies**: Manage and access standard operating procedures and financial policies
- **Data Management**: Integrate with ERP systems, APIs, and shared drives
- **Communications Tracking**: Monitor emails, texts, and messaging for financial communications
- **Advanced Query System**: Submit queries with text, audio recording, and file attachment capabilities
- **Expert Agent Assistance**: AI-powered prompt guidance for better query formulation

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **UI Components**: Custom components built on Radix UI primitives with shadcn/ui styling
- **Routing**: React Router for navigation
- **State Management**: React hooks and context API
- **Styling**: Tailwind CSS with custom theming
- **Charts & Visualizations**: Recharts, ECharts, Tremor
- **Build Tool**: Vite
- **Audio Processing**: Web Speech API with react-media-recorder

## 📊 Architecture

The application follows a component-based architecture with the following structure:

- **Pages**: Main route components for different sections of the application
- **Components**: Reusable UI components organized by feature area
- **Data**: Mock data and data utilities
- **Hooks**: Custom React hooks for shared functionality
- **Lib**: Utility functions and services
- **Config**: Application configuration
- **Assets**: Images and other static assets

## 🏗️ Project Structure

```
src/
├── assets/            # Static assets and images
├── components/        # UI components
│   ├── communications/  # Communication-related components
│   ├── compliance/      # Compliance-related components
│   ├── data-management/ # Data management components
│   ├── financial/       # Financial analysis components
│   ├── ui/              # Core UI components
├── config/            # Application configuration
├── data/              # Mock data and data models
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and services
├── pages/             # Page components for routing
├── types/             # TypeScript type definitions
```

## 📦 Key Dependencies

- **React Ecosystem**:
  - `react`: ^18.3.1
  - `react-dom`: ^18.3.1
  - `react-router-dom`: ^6.27.0

- **UI Components**:
  - `@radix-ui/*`: Various UI primitives
  - `@shadcn/ui`: ^0.0.4
  - `lucide-react`: ^0.454.0 (Icon library)

- **Data Visualization**:
  - `recharts`: ^2.13.3
  - `echarts`: ^5.5.1
  - `echarts-for-react`: ^3.0.2
  - `@tremor/react`: ^3.18.3

- **Styling**:
  - `tailwindcss`: ^3.4.14
  - `tailwind-merge`: ^2.6.0
  - `tailwindcss-animate`: ^1.0.7
  - `class-variance-authority`: ^0.7.1

- **Audio & Media**:
  - `react-media-recorder`: ^1.7.1 (For audio recording)

- **Utilities**:
  - `date-fns`: ^4.1.0
  - `framer-motion`: ^11.15.0
  - `sonner`: ^1.7.0 (Toast notifications)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FAB.git
   cd FAB
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🔐 Authentication

The application includes a simple authentication system. For development purposes, use:

- **Email**: admin@ftf.ai
- **Password**: admin123

## 🧠 AI Features

### Financial Analyst Pilot

The Financial Analyst Pilot is an AI-powered assistant that helps with:

- Analyzing financial data
- Processing market trends
- Evaluating performance metrics
- Calculating financial ratios
- Reviewing budget variances
- Generating financial insights

### Query System with Expert Agent

The Query Request system allows users to:

1. Type queries directly
2. Record audio for transcription-based queries
3. Attach files for context
4. Get AI assistance in crafting effective prompts

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)
