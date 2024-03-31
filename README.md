# CMPE 280 Hackathon, March 2024

## Macroeconomic Researcher Dashboard

**Overview**
The Macroeconomic Researcher Dashboard is a cutting-edge platform designed to enhance the understanding and analysis of global food security and nutrition dynamics. With a focus on macroeconomic indicators and their impact on food security, this dashboard provides researchers and policymakers with timely, accurate, and actionable insights. Utilizing a blend of time series visualization and natural language interaction, the platform offers a comprehensive tool for analyzing trends, making predictions, and deriving solutions to some of the world's most pressing issues.

**Features**

_Country Selector:_ Focus on key countries including China, India, and the USA, with the capability to extend to more regions.

_Time Series Visualization:_ Dynamic graphs with customizable X-axis (Year) and Y-axis (USD Value or Percentage), enabling the exploration of various macroeconomic indicators over time.

_Data Interaction:_
_Year Selection:_ Users can select specific years to view data points in the time series.
_Drag and Drop:_ Enhance graphs by dragging and dropping indicators, facilitating comparative analysis.
_Annotation Support:_ Add notes directly on graphs to highlight trends, anomalies, or insights.

_Natural Language Interaction:_ Engage with data through natural language prompts, allowing for intuitive queries and analyses.

_Dual Mode Support:_ Operates in both network mode (REST Deployment) and local mode, with a local SQL Database for offline analysis.

## Technical Stack

**Frontend: React (Vite)**

Utilizes the latest React features for building a highly interactive and responsive user interface.
Vite as the build tool for fast development and optimized builds.

**Backend: Node.js**
Robust backend architecture to manage data processing, API requests, and serve the frontend application.

## Getting Started

`git clone git@github.com:dst2609/Hackathon.git`

`cd Macroeconomic-Researcher/api`

`npm install`

`npm start` [Backend is up and running]

`cd ../macroeconomic-ui`

`npm install`

`npm run dev` [Frontend is up and running at http://localhost:5173/]

---

_For `.env` file and API key, please contact Devarsh Thaker - devarsht@gmail.com_

---

### Authors

- Devarsh Thaker
- Yashvi Desai
- Priyanka Shah
- Piyush Gade
