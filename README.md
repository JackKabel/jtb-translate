# 🌍 JackToolBox - Translate

> **Advanced JSON Translation Tool** - A powerful, interactive command-line application for managing multilingual JSON files with style and efficiency.

![Version](https://img.shields.io/npm/v/jacktoolbox-translate)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node.js-14%2B-brightgreen.svg)
![npm](https://img.shields.io/npm/dt/jacktoolbox-translate)


[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-%23FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/antal.abel)

## ✨ Features

### 🎨 **Beautiful Terminal Interface**
- **Rich colors and emojis** for enhanced visual experience
- **Progress bars** showing real-time completion status
- **Boxed displays** for important information and statistics
- **Language flags** for easy identification
- **Clear screen functionality** for distraction-free translation

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

### Method 1: NPM Installation (Recommended)
```bash
npm install -g jacktoolbox-translate
```

Then run anywhere with:
```bash
jtb-translate
```

### Method 2: Local Installation
1. Clone or download the repository
2. Install locally:
   ```bash
   npm install
   npm link
   ```
3. Run with: `jtb-translate`

### Method 3: Direct Execution
```bash
node cli.js
```

## 📖 How to Use

### 1. **Starting the Application**
```bash
jtb-translate
```

The application displays a beautiful welcome screen.

### 2. **Select Source File**
You have two options:

**Option A: Direct File Path**
```
📄 Enter path to source file (or directory to scan): ./locales/en.json
```

**Option B: Directory Scanning**
```
📄 Enter path to source file (or directory to scan): ./locales/
```
The tool will scan the directory and show all available translation files:
```
📁 Found 3 translation files:
  1. 🇬🇧 English (en.json)
  2. 🇫🇷 French (fr.json)
  3. 🇩🇪 German (de.json)
```

### 3. **Choose Target Language**
The application shows available translation files and prompts for a language code:
```
📁 Available translation files:
   🇬🇧 en (English)  •  🇫🇷 fr (French)  •  🇩🇪 de (German)

💡 Enter any ISO language code (en, fr, de, es, etc.)

🎯 Enter target language code (e.g., en, fr, de): ro
```

The tool supports fuzzy matching - you can enter partial language names or codes.

### 4. **Review Translation Overview**
```
┌────────────────────────────────────────────────────────────────┐
│  Translation Overview:                                         │
│  📝 Source: 145 keys, 2340 chars (avg: 16)                     │
│  🎯 Target: 89 keys, 1567 chars (avg: 18)                      │
│  ⏳ Remaining: 56 keys to translate                            │
└────────────────────────────────────────────────────────────────┘

🚀 Ready to start translating? (y/n): y
```

### 5. **Interactive Translation**
The main translation interface shows:

```
════════════════════════════════════════════════════════════════════════════════
[██████████████████████░░░░░░░░░] 67% (38/56)
🗝️ Full Key: navigation.menu.items.dashboard.title
🇬🇧 English: Dashboard Overview
🇷🇴 Romanian: 
────────────────────────────────────────────────────────────────
💡 Commands: Enter=skip | :q=quit | :s=save | :stats=progress
────────────────────────────────────────────────────────────────
➤ 
```

### 6. **Translation Commands**
- **Type your translation** and press Enter to save
- **Press Enter alone** to skip current translation
- **Type `:q`** to quit and save progress
- **Type `:s`** to manually save progress
- **Type `:stats`** to view detailed statistics

### 7. **Statistics View**
Type `:stats` during translation to see:
```
┌────────────────────────────────────────────────────────────────┐
│  Translation Progress:                                         │
│  Completed: 89/145 (61%)                                       │
│  Current session: 7 unsaved changes                            │
│  Remaining in session: 18                                      │
└────────────────────────────────────────────────────────────────┘
```

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
- **Progress Bars** - Visual completion tracking
- **Emoji Integration** - Enhanced visual appeal

#### 3. **State Management**
- **In-memory translation cache** for performance
- **Auto-save mechanism** (every 10 translations)
- **Progress tracking** across sessions
- **Resume capability** for interrupted sessions

#### 4. **Language Detection & Matching**
```javascript
const languages = {
    en: { name: 'English', flag: '🇬🇧', family: 'Germanic' },
    ro: { name: 'Romanian', flag: '🇷🇴', family: 'Romance' }
    // ... 25+ languages with family groupings
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
Same nested structure as input, preserving the original JSON hierarchy.

### **Error Handling & Validation**
- **JSON parsing validation** with user-friendly error messages
- **File system error handling** for missing files/permissions
- **Language code validation** with fuzzy matching fallback
- **Graceful interruption handling** (Ctrl+C protection)

### **Performance Features**
- **Lazy loading** of translation files
- **Efficient flattening/unflattening algorithms**
- **Memory-conscious processing** for large JSON files
- **Batched auto-save** to minimize file I/O

## 📊 Usage Examples

### **Small Project** (50-100 keys)
Perfect for small applications, landing pages, or simple websites.

### **Medium Project** (500-1000 keys)
Ideal for web applications with comprehensive UI text and user messages.

### **Large Project** (2000+ keys)
Excellent for enterprise applications with complex nested translation structures.

## 🎯 Use Cases

### **Frontend Development**
- React/Vue/Angular i18n files
- Next.js internationalization
- Static site generators

### **Backend Development**
- API response messages
- Email templates
- Error message translations

### **Mobile & Desktop**
- React Native apps
- Electron applications
- Progressive Web Apps (PWAs)

## 🔧 Customization Options

### **Adding New Languages**
Edit the `languages` object in `cli.js`:
```javascript
const languages = {
    // Add your language here
    'xx': { name: 'Your Language', flag: '🏳️', family: 'Language Family' }
};
```

### **Adjusting Auto-save Frequency**
```javascript
const AUTOSAVE_INTERVAL = 10; // Change to your preference (number of translations)
```

### **Modifying Colors**
```javascript
const colors = {
    // Customize the color scheme
    primary: '\x1b[36m',    // Cyan
    success: '\x1b[32m',    // Green
    warning: '\x1b[33m',    // Yellow
};
```

## 📁 Project Structure
```
jacktoolbox-translate/
├── cli.js          # Main application file
├── package.json    # NPM package configuration
├── README.md       # Documentation
└── LICENSE         # MIT license file
```

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add more languages** to the language database
2. **Improve the visual interface** with better layouts and colors
3. **Add new features** like batch processing or export options
4. **Fix bugs** and improve error handling
5. **Write documentation** and usage examples

### Development Setup
```bash
git clone https://github.com/JackKabel/jtb-translate.git
cd jtb-translate
npm install
node cli.js  # Test locally
```

## 🐛 Troubleshooting

### Common Issues

**"File not found" error:**
- Check that the file path is correct
- Ensure the file has .json extension
- Verify read permissions

**"Invalid JSON" error:**
- Validate your JSON syntax
- Check for trailing commas or missing quotes
- Use a JSON validator online

**Terminal display issues:**
- Ensure your terminal supports Unicode characters
- Try a modern terminal (Windows Terminal, iTerm2, etc.)

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details.

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Repository**: https://github.com/JackKabel/jtb-translate.git
- **NPM Package**: jacktoolbox-translate

## 🙏 Acknowledgments

- **Unicode Consortium** - For emoji and character standards
- **Node.js Community** - For excellent documentation and tools
- **Contributors** - Thank you for making this tool better!

## 💖 Support the Project
[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/antal.abel)

---

**JackToolBox - Translate**

Making internationalization beautiful, one translation at a time! 🌍✨