# Carriers Route Finder

## What modules/components would you create? How would the information flow between components?

A good idea is to create a component that serves as a main container that will implement internal components. The internal components will contain the data input with the user's action button and the data will travel in a single flow to the child components that contain the google map and the carriers table.


## Overview
A React-based web application that helps users find the best routes between cities and displays available carriers. The application integrates with Google Maps API for route visualization and location autocomplete.

## Features
- City-to-city route search
- Google Maps integration with autocomplete for city selection
- Display of top 3 fastest routes
- List of available carriers for selected routes
- Interactive map visualization

## Tech Stack
- React.js
- Google Maps API
- Google Directions Service

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm, yarn or pnpm
- Google Maps API key

### Setup
1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm run dev` to start the development server

### Environment Variables
- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key
- `VITE_API_URL`: The URL of the API

### Result
![image](https://github.com/user-attachments/assets/a678bc94-7f43-4e69-b71f-1c901ac8615f)

