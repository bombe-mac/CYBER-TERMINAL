# 🕹️ Retro-Cyber Terminal Website  

A retro-cyber styled website inspired by 1990s terminal aesthetics.  
The project features neon color schemes, glitch effects, ASCII art, and an interactive terminal interface that hides a **secret key challenge** based on geolocation.  

--- 

### ✨ Features
- Neon cyberpunk-inspired design with **matrix-style rain (numbers)**
- ASCII art intro message: `"Welcome to the Matrix"`
- Terminal-style UI for user interactions
- **Hidden secret key challenge** with hints scattered across the UI
- Interactive popup cards that appear on hover
- Typing animations & glitch effects

###🛠️ Technology Stack
-Vite + React.js – Fast build system and component-driven UI
-Tailwind CSS – Utility-first styling with neon/glitch effects
-Navigator Geolocation API – For generating the secret key

## ⚙️ Installation & Setup  

1. **Clone the repo**
   ```bash
   git clone (https://github.com/bombe-mac/CYBER-TERMINAL)
   cd retro-cyber

2. Install dependencies
```bash
   npm install
```
3.. Run locally
```bash
npm run dev
```

## 🔑 Secret Key Challenge  

<details>
<summary>🕵️ Spoiler: How the secret key works</summary>

The secret key is **unique for every user** because it is generated from their **current geolocation**.  

1. Using the **Navigator Geolocation API**, the website fetches the user's `latitude` and `longitude`.  

2. **Tip:** Users can also get their latitude and longitude by running the following code in the browser console:  
   ```js
   navigator.geolocation.getCurrentPosition(
     (position) => {
       console.log("Latitude:", position.coords.latitude);
       console.log("Longitude:", position.coords.longitude);
     },
     (error) => {
       console.error("Error getting location:", error);
     }
   );
The decimal values of both latitude and longitude are removed.

The processed latitude and longitude values are then concatenated into a single integer.

Example:
Latitude  = 28.6139391 → 286139391  
Longitude = 77.2090212 → 772090212  
SecretKey = "286139391772090212"
Users must enter this key into the terminal using the format:

```bash
checkkey <secretKey>
```
If correct, the system verifies and confirms success ✅
</details>

## 🎥 Demonstration Video

![video](https://drive.google.com/file/d/11luRgyNphaiqtKcFMD2uSZUA_zv1XOUz/view?usp=drive_link)
