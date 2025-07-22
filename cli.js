#!/usr/bin/env node

/**
 * JackTools - Translation Builder
 * Advanced JSON Translation Tool
 *
 * A powerful, interactive command-line tool for managing
 * JSON translation files with beautiful UI and smart features.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// === Enhanced Color Utilities ===
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgCyan: '\x1b[46m'
};

const emoji = {
    globe: '🌍',
    flag: '🏁',
    key: '🗝️',
    source: '📝',
    target: '🎯',
    arrow: '➤',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️',
    rocket: '🚀',
    sparkles: '✨',
    file: '📄',
    folder: '📁',
    save: '💾',
    search: '🔍',
    progress: '⏳',
    celebration: '🎉',
    books: '📚',
    translate: '🌐'
};

function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

function createBox(text, color = 'cyan') {
    const lines = text.split('\n');

    // Function to calculate visible length (excluding ANSI codes and accounting for emojis)
    function getVisibleLength(str) {
        // Remove ANSI escape sequences
        const withoutAnsi = str.replace(/\x1b\[[0-9;]*m/g, '');
        // Count emojis as 2 characters for width calculation (they often take more terminal space)
        const emojiCount = (withoutAnsi.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
        return withoutAnsi.length + emojiCount;
    }

    const maxVisibleLen = Math.max(...lines.map(l => getVisibleLength(l)));
    const minWidth = 64; // Increased minimum width
    const actualWidth = Math.max(maxVisibleLen + 8, minWidth); // 4 chars padding on each side
    const border = '─'.repeat(actualWidth);

    let box = colorize(`┌${border}┐`, color) + '\n';
    lines.forEach(line => {
        const visibleLen = getVisibleLength(line);
        const padding = ' '.repeat(Math.max(0, actualWidth - visibleLen - 4));
        box += colorize(`│  ${line}${padding}  │`, color) + '\n';
    });
    box += colorize(`└${border}┘`, color);
    return box;
}

function createProgressBar(current, total, width = 30) {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((current / total) * width);
    const empty = width - filled;

    const bar = colorize('█'.repeat(filled), 'green') +
        colorize('░'.repeat(empty), 'gray');

    return `[${bar}] ${colorize(`${percentage}%`, 'yellow')} (${current}/${total})`;
}

// === Enhanced Language Support ===
const languages = {
    // European
    en: {name: 'English', flag: '🇬🇧', family: 'Germanic'},
    ro: {name: 'Romanian', flag: '🇷🇴', family: 'Romance'},
    hu: {name: 'Hungarian', flag: '🇭🇺', family: 'Uralic'},
    fr: {name: 'French', flag: '🇫🇷', family: 'Romance'},
    de: {name: 'German', flag: '🇩🇪', family: 'Germanic'},
    es: {name: 'Spanish', flag: '🇪🇸', family: 'Romance'},
    it: {name: 'Italian', flag: '🇮🇹', family: 'Romance'},
    pt: {name: 'Portuguese', flag: '🇵🇹', family: 'Romance'},
    nl: {name: 'Dutch', flag: '🇳🇱', family: 'Germanic'},
    pl: {name: 'Polish', flag: '🇵🇱', family: 'Slavic'},
    cs: {name: 'Czech', flag: '🇨🇿', family: 'Slavic'},
    sk: {name: 'Slovak', flag: '🇸🇰', family: 'Slavic'},

    // Asian
    zh: {name: 'Chinese', flag: '🇨🇳', family: 'Sino-Tibetan'},
    ja: {name: 'Japanese', flag: '🇯🇵', family: 'Japonic'},
    ko: {name: 'Korean', flag: '🇰🇷', family: 'Koreanic'},
    hi: {name: 'Hindi', flag: '🇮🇳', family: 'Indo-European'},
    ar: {name: 'Arabic', flag: '🇸🇦', family: 'Semitic'},
    th: {name: 'Thai', flag: '🇹🇭', family: 'Tai-Kadai'},
    vi: {name: 'Vietnamese', flag: '🇻🇳', family: 'Austroasiatic'},

    // Others
    ru: {name: 'Russian', flag: '🇷🇺', family: 'Slavic'},
    tr: {name: 'Turkish', flag: '🇹🇷', family: 'Turkic'},
    sv: {name: 'Swedish', flag: '🇸🇪', family: 'Germanic'},
    no: {name: 'Norwegian', flag: '🇳🇴', family: 'Germanic'},
    da: {name: 'Danish', flag: '🇩🇰', family: 'Germanic'}
};

// === Enhanced Utilities ===
function flatten(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(acc, flatten(value, fullKey));
        } else {
            acc[fullKey] = value;
        }
        return acc;
    }, {});
}

function unflatten(obj) {
    const result = {};
    for (const flatKey in obj) {
        const keys = flatKey.split('.');
        keys.reduce((acc, key, idx) => {
            if (idx === keys.length - 1) {
                acc[key] = obj[flatKey];
            } else {
                acc[key] = acc[key] || {};
            }
            return acc[key];
        }, result);
    }
    return result;
}

function findTranslationFiles(dir) {
    try {
        const files = fs.readdirSync(dir);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const langCode = path.basename(file, '.json').toLowerCase();
                const langInfo = languages[langCode];
                return {
                    path: path.join(dir, file),
                    code: langCode,
                    name: langInfo ? langInfo.name : 'Unknown',
                    flag: langInfo ? langInfo.flag : '🏳️',
                    exists: true
                };
            });
    } catch {
        return [];
    }
}

function getLanguageStats(flatObj) {
    const keys = Object.keys(flatObj);
    const totalChars = Object.values(flatObj).join('').length;
    const avgLength = Math.round(totalChars / keys.length);

    return {keys: keys.length, chars: totalChars, avgLength};
}

// === Enhanced Interface ===
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function prompt(question) {
    return new Promise(resolve => rl.question(question, answer => resolve(answer.trim())));
}

function clearScreen() {
    console.clear();
}

function printHeader() {
    const header = `
${emoji.translate} JACKTOOLS - TRANSLATION BUILDER ${emoji.sparkles}
Advanced JSON Translation Tool
    `;
    console.log(createBox(header, 'cyan'));
}

function showAvailableLanguages(availableLangs = []) {
    if (availableLangs.length === 0) {
        console.log(colorize('\n📁 No existing translation files found in directory', 'gray'));
        return;
    }

    console.log(colorize('\n📁 Available translation files:', 'bright'));

    // Sort by language code for consistent display
    const sortedLangs = [...availableLangs].sort((a, b) => a.code.localeCompare(b.code));

    // Display in a clean, compact format
    const langDisplay = sortedLangs
        .map(lang => `${lang.flag} ${colorize(lang.code, 'cyan')} (${lang.name})`)
        .join('  •  ');

    console.log(`   ${langDisplay}`);
    console.log(colorize('\n💡 Enter any ISO language code (en, fr, de, es, etc.)', 'dim'));
}

async function selectLanguage(prompt_text, excludeCode = null) {
    while (true) {
        const input = (await prompt(`\n${prompt_text}`)).toLowerCase();

        if (languages[input] && input !== excludeCode) {
            return {code: input, ...languages[input]};
        }

        // Fuzzy matching by name
        const nameMatches = Object.entries(languages)
            .filter(([code, info]) =>
                code !== excludeCode &&
                info.name.toLowerCase().includes(input)
            );

        if (nameMatches.length === 1) {
            const [code, info] = nameMatches[0];
            console.log(colorize(`   Matched: ${info.flag} ${code} (${info.name})`, 'green'));
            return {code, ...info};
        }

        if (nameMatches.length > 1) {
            console.log(colorize('Multiple matches found:', 'yellow'));
            nameMatches.forEach(([code, info]) => {
                console.log(`   ${info.flag} ${colorize(code, 'cyan')} - ${info.name}`);
            });
            console.log(colorize('Please be more specific with the language code.', 'yellow'));
            continue;
        }

        console.log(colorize(`❌ Language "${input}" not found. Please use ISO language codes (e.g., en, fr, de, es).`, 'red'));
    }
}

async function selectSourceFile() {
    while (true) {
        const inputPath = await prompt(`\n${emoji.file} Enter path to source file (or directory to scan): `);
        const resolvedPath = path.resolve(inputPath);

        try {
            const stats = fs.statSync(resolvedPath);

            if (stats.isDirectory()) {
                const files = findTranslationFiles(resolvedPath);
                if (files.length === 0) {
                    console.log(colorize('❌ No JSON translation files found in directory.', 'red'));
                    continue;
                }

                console.log(colorize(`\n📁 Found ${files.length} translation files:`, 'green'));
                files.forEach((file, idx) => {
                    console.log(`  ${idx + 1}. ${file.flag} ${file.name} (${file.code}.json)`);
                });

                const choice = await prompt('\nEnter file number: ');
                const fileIndex = parseInt(choice) - 1;

                if (fileIndex >= 0 && fileIndex < files.length) {
                    return files[fileIndex];
                } else {
                    console.log(colorize('❌ Invalid file number.', 'red'));

                }
            } else {
                const content = fs.readFileSync(resolvedPath, 'utf-8');
                const data = JSON.parse(content);
                const fileName = path.basename(resolvedPath);
                const langCode = fileName.split('.')[0].toLowerCase();
                const langInfo = languages[langCode];

                return {
                    path: resolvedPath,
                    code: langCode,
                    name: langInfo ? langInfo.name : 'Unknown',
                    flag: langInfo ? langInfo.flag : '🏳️',
                    data
                };
            }
        } catch (err) {
            console.log(colorize('❌ Invalid path or JSON format. Please try again.', 'red'));
        }
    }
}

async function showTranslationStats(source, target, keysToTranslate) {
    const sourceStats = getLanguageStats(source);
    const targetStats = getLanguageStats(target);

    const statsText = `
Translation Overview:
${emoji.source} Source: ${sourceStats.keys} keys, ${sourceStats.chars} chars (avg: ${sourceStats.avgLength})
${emoji.target} Target: ${targetStats.keys} keys, ${targetStats.chars} chars (avg: ${targetStats.avgLength || 0})
${emoji.progress} Remaining: ${keysToTranslate.length} keys to translate
    `;

    console.log(createBox(statsText, 'yellow'));

    if (keysToTranslate.length === 0) {
        console.log(colorize(`\n${emoji.celebration} All translations complete! Nothing to do.`, 'green'));
        return false;
    }

    const proceed = await prompt(`\n${emoji.rocket} Ready to start translating? (y/n): `);
    return proceed.toLowerCase() === 'y' || proceed.toLowerCase() === 'yes';
}

function displayTranslationContext(key, sourceText, current, total, sourceLang, targetLang) {
    console.log('\n' + '═'.repeat(80));
    console.log(createProgressBar(current, total));

    // Show full flattened key path
    console.log(`${emoji.key} Full Key: ${colorize(key, 'cyan')}`);
    console.log(`${sourceLang.flag} ${colorize(sourceLang.name, 'green')}: ${colorize(sourceText, 'white')}`);
    console.log(`${targetLang.flag} ${colorize(targetLang.name, 'yellow')}: `);

    // Always show command hints
    console.log(colorize('─'.repeat(60), 'dim'));
    console.log(colorize('💡 Commands: Enter=skip | :q=quit | :s=save | :stats=progress', 'dim'));
    console.log(colorize('─'.repeat(60), 'dim'));
}

async function translateInteractively(sourceFlat, targetFlat, sourceLang, targetLang, keysToTranslate, targetFilePath) {
    let current = 0;
    let unsavedChanges = 0;
    const AUTOSAVE_INTERVAL = 10;

    for (const key of keysToTranslate) {
        const sourceText = sourceFlat[key];
        current++;

        clearScreen();
        printHeader();
        displayTranslationContext(key, sourceText, current, keysToTranslate.length, sourceLang, targetLang);

        const answer = await prompt(`${colorize('➤', 'cyan')} `);

        if (answer === ':q') {
            console.log(colorize(`\n${emoji.warning} Translation interrupted by user.`, 'yellow'));
            break;
        }

        if (answer === ':s') {
            saveTranslations(targetFlat, targetFilePath);
            unsavedChanges = 0;
            console.log(colorize(`\n${emoji.save} Translations saved!`, 'green'));
            await prompt('Press Enter to continue...');
            current--; // Don't advance
            continue;
        }

        if (answer === ':stats') {
            const completed = Object.keys(targetFlat).length;
            const total = Object.keys(sourceFlat).length;
            const percentage = Math.round((completed / total) * 100);

            console.log(createBox(`
Translation Progress:
Completed: ${completed}/${total} (${percentage}%)
Current session: ${unsavedChanges} unsaved changes
Remaining in session: ${keysToTranslate.length - current + 1}
            `, 'blue'));
            await prompt('\nPress Enter to continue...');
            current--; // Don't advance
            continue;
        }

        if (answer !== '') {
            targetFlat[key] = answer;
            unsavedChanges++;

            // Auto-save
            if (unsavedChanges >= AUTOSAVE_INTERVAL) {
                saveTranslations(targetFlat, targetFilePath);
                console.log(colorize(`${emoji.save} Auto-saved progress`, 'green'));
                unsavedChanges = 0;
                setTimeout(() => {
                }, 800); // Brief pause to show save message
            }
        }
    }

    // Final save
    if (unsavedChanges > 0) {
        saveTranslations(targetFlat, targetFilePath);
    }

    return current;
}

function saveTranslations(translatedFlat, targetFilePath) {
    const nested = unflatten(translatedFlat);
    fs.writeFileSync(targetFilePath, JSON.stringify(nested, null, 2), 'utf-8');
}

function printCompletion(completed, total, targetFilePath, targetLang) {
    const percentage = Math.round((completed / total) * 100);

    const completionText = `
${emoji.celebration} Translation Session Complete! ${emoji.celebration}

Translated: ${completed}/${total} entries (${percentage}%)
Saved to: ${path.basename(targetFilePath)}
Language: ${targetLang.flag} ${targetLang.name}
    `;

    console.log(createBox(completionText, 'green'));
    console.log(colorize(`\n${emoji.sparkles} Thank you for using JackTools Translation Builder! ${emoji.sparkles}`, 'bright'));
}

// === Main Application ===
(async function main() {
    try {
        clearScreen();
        printHeader();

        console.log(colorize('Welcome to JackTools Translation Builder - the advanced JSON translation tool!', 'bright'));

        // Step 1: Select source file
        const sourceFile = await selectSourceFile();
        let sourceData;

        if (sourceFile.data) {
            sourceData = sourceFile.data;
        } else {
            const content = fs.readFileSync(sourceFile.path, 'utf-8');
            sourceData = JSON.parse(content);
        }

        const flatSource = flatten(sourceData);
        const dir = path.dirname(sourceFile.path);

        // Step 2: Show available languages (simplified)
        const availableFiles = findTranslationFiles(dir);
        showAvailableLanguages(availableFiles);

        console.log(colorize(`\n${emoji.source} Selected source: ${sourceFile.flag} ${sourceFile.name} (${sourceFile.code})`, 'green'));

        // Step 3: Select target language (simplified prompt)
        const targetLang = await selectLanguage(
            `${emoji.target} Enter target language code (e.g., en, fr, de): `,
            sourceFile.code
        );

        // Step 4: Load or create target file
        const targetFilePath = path.join(dir, `${targetLang.code}.json`);
        let translatedFlat = {};

        try {
            const targetData = JSON.parse(fs.readFileSync(targetFilePath, 'utf-8'));
            translatedFlat = flatten(targetData);
            console.log(colorize(`${emoji.success} Loaded existing ${targetLang.name} translations`, 'green'));
        } catch {
            console.log(colorize(`${emoji.info} Creating new ${targetLang.name} translation file`, 'blue'));
        }

        // Step 5: Calculate work to be done
        const allKeys = Object.keys(flatSource);
        const keysToTranslate = allKeys.filter(key => !translatedFlat[key]);

        // Step 6: Show stats and confirm
        const shouldProceed = await showTranslationStats(flatSource, translatedFlat, keysToTranslate);
        if (!shouldProceed) {
            console.log(colorize('Translation cancelled by user.', 'yellow'));
            return;
        }

        // Step 7: Interactive translation
        if (keysToTranslate.length > 0) {
            const completed = await translateInteractively(
                flatSource,
                translatedFlat,
                sourceFile,
                targetLang,
                keysToTranslate,
                targetFilePath
            );

            printCompletion(completed, keysToTranslate.length, targetFilePath, targetLang);
        }

    } catch (error) {
        console.error(colorize(`${emoji.error} Fatal error: ${error.message}`, 'red'));
    } finally {
        rl.close();
    }
})();