/*

MIT License

Copyright (c) 2025 JustStudio. <https://juststudio.is-a.dev/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

const codeInput = document.getElementById('codeInput');
const output = document.getElementById('output');

const languageClasses = {
    'js': 'javascript',
    'ts': 'typescript',
    'c': 'c',
    'c++': 'cpp',
    'c#': 'csharp',
    'css': 'css',
    'go': 'go',
    'html': 'html',
    'java': 'java',
    'json': 'json',
    'lua': 'lua',
    'luau_roblox': 'luau',
    'python': 'python',
    'text': 'plain'
};

const syntaxHighlighting = {
    'javascript': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'yellow',
        'comment': 'gray'
    },
    'typescript': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'yellow',
        'comment': 'gray'
    },
    'java': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'python': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'c': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'cpp': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'csharp': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'go': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'html': {
        'tag': 'blue',
        'attribute': 'orange',
        'value': 'green',
        'punctuation': 'red',
        'default': 'white',
        'comment': 'gray'
    },
    'css': {
        'selector': 'blue',
        'property': 'orange',
        'value': 'green',
        'punctuation': 'red',
        'default': 'white',
        'comment': 'gray'
    },
    'json': {
        'string': 'green',
        'punctuation': 'red',
        'default': 'white',
        'comment': 'gray'
    },
    'lua': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    },
    'luau': {
        'function': 'blue',
        'string': 'green',
        'parameter': 'orange',
        'punctuation': 'red',
        'default': 'white',
        'keyword': 'purple',
        'comment': 'gray'
    }
};

function highlightCode(code, lang) {
    const tokens = code.split(/(\s+|;|{|}|,|\(|\)|\n)/);
    const highlightedCode = tokens.map(token => {
        if (token.match(/\/\/.*|\/\*[\s\S]*?\*\//)) return `<span style="color:${syntaxHighlighting[lang].comment}">${token}</span>`;
        if (lang === 'javascript' || lang === 'typescript') {
            if (token.match(/function/)) return `<span style="color:${syntaxHighlighting[lang].function}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(/^(const|let|var|if|else|for|while|return)$/)) return `<span style="color:${syntaxHighlighting[lang].keyword}">${token}</span>`;
            if (token.match(/^[\w]+$/) && !token.match(/^(const|let|var|function|if|else|for|while|return)$/)) {
                return `<span style="color:${syntaxHighlighting[lang].parameter}">${token}</span>`;
            }
        } else if (lang === 'java' || lang === 'python' || lang === 'c' || lang === 'cpp' || lang === 'csharp' || lang === 'go' || lang === 'lua' || lang === 'luau') {
            if (token.match(/function/)) return `<span style="color:${syntaxHighlighting[lang].function}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(/^(public|private|protected|static|void|int|if|else|for|while|return)$/)) return `<span style="color:${syntaxHighlighting[lang].keyword}">${token}</span>`;
            if (token.match(/^[\w]+$/) && !token.match(/^(public|private|protected|static|void|int|function|if|else|for|while|return)$/)) {
                return `<span style="color:${syntaxHighlighting[lang].parameter}">${token}</span>`;
            }
        } else if (lang === 'html') {
            if (token.match(/<\w+/)) return `<span style="color:${syntaxHighlighting[lang].tag}">${token}</span>`;
            if (token.match(/(\w+)=/) && !token.match(/<\w+/)) return `<span style="color:${syntaxHighlighting[lang].attribute}">${token}</span>`;
            if (token.match(/'[^']*'|"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].value}">${token}</span>`;
        } else if (lang === 'css') {
            if (token.match(/^[^{]+(?=\s*{)/)) return `<span style="color:${syntaxHighlighting[lang].selector}">${token}</span>`;
            if (token.match(/:\s*[^;]+/) && !token.match(/^[^{]+(?=\s*{)/)) return `<span style="color:${syntaxHighlighting[lang].property}">${token}</span>`;
            if (token.match(/;|{|}/)) return `<span style="color:${syntaxHighlighting[lang].punctuation}">${token}</span>`;
        } else if (lang === 'json') {
            if (token.match(/"[^"]*"/)) return `<span style="color:${syntaxHighlighting[lang].string}">${token}</span>`;
            if (token.match(/[{}:,]/)) return `<span style="color:${syntaxHighlighting[lang].punctuation}">${token}</span>`;
        }
        if (token.match(/[;{}(),]/)) return `<span style="color:${syntaxHighlighting[lang].punctuation}">${token}</span>`;
        if (token === '\n') return `<br>`;
        return `<span style="color:${syntaxHighlighting[lang].default}">${token}</span>`;
    }).join('');
    return highlightedCode;
}

codeInput.addEventListener('input', () => {
    const code = codeInput.value.replace(/[^a-zA-Z0-9]/g, (char) => `&#${char.charCodeAt(0)};`);
    const langClass = Array.from(codeInput.classList).find(cls => languageClasses[cls]);
    const lang = langClass ? languageClasses[langClass] : 'text';
    let outputText;
    if (lang !== 'text') {
        const highlighted = highlightCode(code, lang);
        outputText = highlighted;
    } else {
       outputText = code;
    }
    output.innerHTML = outputText.replaceAll('\n', '<br>');
});
