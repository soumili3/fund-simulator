# SIP Edu – Interactive Mutual Fund Learning & SIP Simulator

A professional, educational web application focused on investor awareness and concept clarity.

## 🚀 Features

- **Interactive SIP Simulator**: Real-time growth projection with compounding and inflation adjustments.
- **Educational Content**: Beginner-friendly explanations of Mutual Funds, SIP, Compounding, and Inflation.
- **Fund Category Comparison**: Visual comparison of Equity, Hybrid, and Debt funds based on risk-return profiles.
- **Modern Dark Theme**: Clean, professional UI with responsive design and smooth animations.
- **Concept Clarity**: Focuses on visual learning rather than just final numbers.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📁 Project Structure

- `src/components/`: Shared UI components (Navbar, Footer).
- `src/pages/`: Main application pages (Simulator, How It Works, Fund Categories).
- `src/utils/`: Calculation logic and formatting utilities.
- `src/hooks/`: Custom React hooks (if any).

## 📈 Calculation Logic

The SIP simulator uses the standard future value formula for monthly compounding:
`FV = P * [((1 + i)^n - 1) / i] * (1 + i)`
where:
- `P` = Monthly investment
- `i` = Monthly interest rate (Annual rate / 12)
- `n` = Total number of months

Inflation adjustment is calculated using the real value formula:
`Real Value = Nominal Value / (1 + inflationRate)^years`

## ⚖️ Disclaimers

This tool is for educational purposes only and does not provide financial advice. Mutual fund investments are subject to market risks.
