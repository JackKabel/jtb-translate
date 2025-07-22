# 🌍 JackTools - Translation Builder

> **Advanced JSON Translation Tool** - A powerful, interactive command-line application for managing multilingual JSON files with style and efficiency.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node.js-14%2B-brightgreen.svg)

## ✨ Features

### 🎨 **Beautiful Terminal Interface**
- **Rich colors and emojis** for enhanced visual experience
- **Progress bars** showing real-time completion status
- **Boxed displays** for important information and statistics
- **Language flags** and family groupings for easy identification
- **Clear screen functionality** for distraction-free translation

### 🌍 **Extensive Language Support**
Support for **25+ languages** across multiple language families:

**European Languages:**
- 🇬🇧 English, 🇷🇴 Romanian, 🇭🇺 Hungarian, 🇫🇷 French, 🇩🇪 German
- 🇪🇸 Spanish, 🇮🇹 Italian, 🇵🇹 Portuguese, 🇳🇱 Dutch, 🇵🇱 Polish
- 🇨🇿 Czech, 🇸🇰 Slovak, 🇷🇺 Russian, 🇹🇷 Turkish, 🇸🇪 Swedish
- 🇳🇴 Norwegian, 🇩🇰 Danish

**Asian Languages:**
- 🇨🇳 Chinese, 🇯🇵 Japanese, 🇰🇷 Korean, 🇮🇳 Hindi
- 🇸🇦 Arabic, 🇹🇭 Thai, 🇻🇳 Vietnamese

### 🚀 **Smart Features**
- **Auto-save** every 10 translations to prevent data loss
- **Directory scanning** to automatically find translation files
- **Fuzzy language matching** for easy language selection
- **Translation statistics** and progress tracking
- **Resume capability** - continue where you left off
- **Full key path display** showing complete nested structure

### 💡 **Interactive Commands**
- **Enter** - Skip current translation
- **:q** - Quit and save progress
- **:s** - Manual save
- **:stats** - Show detailed progress statistics

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 14+ installed on your system

### Quick Start

1. **Save the script** as `cli.js`
2. **Make it executable** (Unix/Linux/Mac):
   ```bash
   chmod +x cli.js
   ```
3. **Run the tool**:
   ```bash
   node cli.js
   ```

### Alternative Installation
Create an npm script in your `package.json`:
```json
{
  "scripts": {
    "translate": "node cli.js"
  }
}
```

Then run with: `npm run translate`

## 📖 How to Use

### 1. **Starting the Application**
```bash
node cli.js
```

The application will display a beautiful welcome screen with the JackTools branding.

### 2. **Select Source File**
You have two options:

**Option A: Direct File Path**
```
📄 Enter path to source file: ./locales/en.json
```

**Option B: Directory Scanning**
```
📄 Enter path to source file: ./locales/
```
The tool will scan the directory and show all available translation files:
```
📁 Found 3 translation files:
  1. 🇬🇧 English (en.json)
  2. 🇫🇷 French (fr.json)
  3. 🇩🇪 German (de.json)
```

### 3. **Choose Target Language**
The application displays languages organized by family:
```
🌍 Available Languages by Family:

▼ Romance
   ● 🇷🇴 ro - Romanian
   ○ 🇫🇷 fr - French
   ○ 🇪🇸 es - Spanish

▼ Germanic
   ● 🇬🇧 en - English
   ○ 🇩🇪 de - German
```

Enter the language code: `ro` (for Romanian)

### 4. **Review Translation Overview**
```
┌─────────────────────────────────┐
│  Translation Overview:          │
│  📝 Source: 145 keys, 2,340 chars │
│  🎯 Target: 89 keys, 1,567 chars  │
│  ⏳ Remaining: 56 keys to translate │
└─────────────────────────────────┐
```

### 5. **Interactive Translation**
The main translation interface shows:

```
════════════════════════════════════════════════════════════
[████████████░░░░░░░░░░░░░░░░░░] 67% (38/56)

🗝️ Full Key: navigation.menu.items.dashboard.title
🇬🇧 English: Dashboard Overview
🇷🇴 Romanian: 
────────────────────────────────────────────────────────────
💡 Commands: Enter=skip | :q=quit | :s=save | :stats=progress
────────────────────────────────────────────────────────────
➤ 
```

### 6. **Translation Commands**
- **Type your translation** and press Enter
- **Press Enter alone** to skip
- **Type `:q`** to quit and save
- **Type `:s`** to manually save progress
- **Type `:stats`** to view detailed statistics

## 🏗️ Technical Architecture

### **Core Technologies**
- **Node.js** - Runtime environment
- **Readline** - Interactive command-line interface
- **File System (fs)** - JSON file manipulation
- **Path** - Cross-platform file path handling

### **Key Components**

#### 1. **Flattening System**
```javascript
// Converts nested JSON to flat key-value pairs
{
  "user": {
    "profile": {
      "name": "John"
    }
  }
}
// Becomes: { "user.profile.name": "John" }
```

#### 2. **Visual System**
- **ANSI Color Codes** - Rich terminal colors
- **Unicode Characters** - Boxes, progress bars, emojis
- **Dynamic Layout** - Responsive to terminal width

#### 3. **State Management**
- **In-memory translation cache** for performance
- **Auto-save mechanism** preventing data loss
- **Progress tracking** across sessions

#### 4. **Language Detection**
```javascript
const languages = {
    en: { name: 'English', flag: '🇬🇧', family: 'Germanic' },
    ro: { name: 'Romanian', flag: '🇷🇴', family: 'Romance' }
    // ... 25+ languages
};
```

### **File Structure Processing**

#### Input Format
```json
{
  "navigation": {
    "menu": {
      "home": "Home",
      "about": "About Us"
    }
  },
  "buttons": {
    "save": "Save",
    "cancel": "Cancel"
  }
}
```

#### Flattened Processing
```javascript
{
  "navigation.menu.home": "Home",
  "navigation.menu.about": "About Us",
  "buttons.save": "Save",
  "buttons.cancel": "Cancel"
}
```

#### Output Format
Same nested structure as input, but with translated values.

### **Error Handling & Validation**
- **JSON parsing validation** with helpful error messages
- **File system error handling** for missing files/permissions
- **Language code validation** with fuzzy matching
- **Graceful degradation** for partial translations

### **Performance Optimizations**
- **Lazy loading** of translation files
- **Efficient flattening algorithm** for large JSON files
- **Memory-conscious processing** for thousands of keys
- **Minimal file I/O** with batched saves

## 📊 Usage Examples

### **Small Project** (50-100 keys)
Perfect for small applications or websites with basic internationalization needs.

### **Medium Project** (500-1000 keys)
Ideal for web applications with comprehensive UI text and messages.

### **Large Project** (2000+ keys)
Excellent for enterprise applications with complex nested structures.

## 🎯 Use Cases

### **Web Development**
- React/Vue/Angular applications
- Express.js backend messages
- Static site generators (Gatsby, Next.js)

### **Mobile Development**
- React Native applications
- Electron desktop apps
- Progressive Web Apps (PWAs)

### **Content Management**
- CMS internationalization
- Documentation translation
- API response messages

## 🔧 Customization Options

### **Adding New Languages**
```javascript
const languages = {
    // Add your language here
    'xx': { name: 'Your Language', flag: '🏳️', family: 'Language Family' }
};
```

### **Adjusting Auto-save Frequency**
```javascript
const AUTOSAVE_INTERVAL = 10; // Change to your preference
```

### **Modifying Visual Theme**
```javascript
const colors = {
    // Customize colors
    primary: '\x1b[36m',    // Cyan
    success: '\x1b[32m',    // Green
    warning: '\x1b[33m',    // Yellow
};
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Add more languages** to the language database
2. **Improve visual design** with better colors and layouts
3. **Add new features** like batch processing or AI integration
4. **Fix bugs** and improve error handling
5. **Write tests** for better code reliability

## 📝 License

MIT License - feel free to use this tool in your personal and commercial projects.

## 🙏 Acknowledgments

- **Unicode Consortium** - For emoji and character standards
- **Node.js Community** - For excellent documentation and tools
- **International developers** - For inspiration on multilingual challenges

---

**JackTools - Translation Builder** - Making internationalization beautiful, one translation at a time! 🌍✨