function TemplateEngine(tpl, data) {
    const re = /{{([^}}]+)}}/g;
    let code = 'var r=[];';
    let cursor = 0, match;

    const add = function(line, js) {
        js ? code += 'r.push(' + line + ');' :
             code += 'r.push("' + line.replace(/"/g, '\\\\"') + '");';
    }

    while(match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index));
        add(match[1], true);
        cursor = match.index + match[0].length;
    }

    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function(Object.keys(data), code)
            .apply(data, Object.values(data));
}

export default TemplateEngine;