# Forzeit Marketing Dashboard

A modern, responsive Vue 3 dashboard for visualizing Forzeit's key marketing metrics and live user activity. Built with simplicity and performance in mind, this dashboard provides real-time insights into visitor traffic, revenue growth, and user engagement.

## Quick Start

### Prerequisites

- Node.js 18, 20, etc
- pnpm (personally recommended), npm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd forzeit-dashboard

2. Install deps:
    `pnpm install`

3. Start the development server:
    `pnpm dev`

4. Navigate to the URL in your browser:
    `http://localhost:5173`

## About the Project 

The Forzeit Marketing Dashboard is a frontend-only visualization tool designed to present key business metrics from Forzeit's 2023 performance data. It transforms raw Excel data into actionable insights through an intuitive, modern interface. 
Purpose 

This dashboard serves as a centralized view for: 

    Monitoring visitor traffic trends  
    Tracking revenue growth (MRR/ARR)  
    Analyzing conversion rates  
    Observing real-time user activity  
    Identifying growth patterns and opportunities
     

Key Metrics Displayed 

    Total Monthly Recurring Revenue (MRR): £1,253  
    Annual Recurring Revenue (ARR): £15,036  
    Total Trial Signups: 376 (year total)  
    Conversion Rate: 7.6% (December 2023)
     

### Current Behavior 
Dashboard Features 
1. Static Metrics Display 

The dashboard loads with pre-configured 2023 data showing: 

    Monthly visitor counts ranging from 148 (January) to 1,175 (December)
    Trial signup progression throughout the year
    MRR growth from £14 to £366 monthly additions
    Conversion rate improvements from 0.68% to 7.6%
     

2. Live Activity Simulation 

Every 5 seconds, the dashboard updates three live metrics: 

    Active Users (Last 5 seconds): Randomly generates between 10–60 active users  
    Users Active (Last 24 hours): Simulates 500–1,500 daily active users  
    Cards Created (Last 24 hours): Shows 100–600 cards created
     

3. Visual Analytics 

Two interactive charts powered by Chart.js: 

    Visitor Overview (Bar Chart): Monthly visitor traffic visualization  
    Revenue Growth (Line Chart): MRR progression over 12 months
     

4. Responsive Design 

Mobile-first approach with breakpoints at: 

    Mobile: < 768px – single column layout  
    Tablet: 768px - 1024px – 2-column grid  
    Desktop: > 1024px – 4-column metrics, 2-column charts
     

### Design Patterns 
Component Architecture 

    Composition API: All components use Vue 3's Composition API with <script setup>  
    Single Responsibility: Each component has one clear purpose  
    Props-based Communication: Data flows down through props
     

Styling Approach 

    Utility-first CSS: Tailwind classes for rapid development  
    Component Classes: Reusable styles in components.css
     

State Management 

    Local State: Simple ref / reactive for component state  
    Computed Properties: Derived values calculated on-demand  
    No External Store: Project simplicity maintained without Vuex/Pinia
     

### Data Update Behavior
Mock Data 

The dashboard uses static 2023 data from mockData.ts: 

    12 months of visitor data  
    Trial signup counts  
    Revenue metrics (MRR/ARR)  
    Conversion rates
     

Live Simulation 

The generateLiveStats() function creates realistic variations: 

    Active Now: Random between 10–60  
    Last 24 Hours: Random between 500–1,500  
    Cards Created: Random between 100–600
     

## Testing

### Test Suite

The application includes comprehensive unit tests for the main App component behavior using Vitest and Vue Test Utils.

**Run tests:**
```bash
pnpm test
# or
npm run test