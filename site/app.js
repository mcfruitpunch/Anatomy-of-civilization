(async function () {
  const names = ['sources', 'events', 'entities', 'relationships', 'cases', 'systems'];
  const D = {};
  await Promise.all(names.map(async (n) => { D[n] = await (await fetch('data/' + n + '.json')).json(); }));
  const byId = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
  const src = byId(D.sources), ent = byId(D.entities), cs = byId(D.cases);
  const $ = (id) => document.getElementById(id);
  const el = (tag, props, ...kids) => {
    const e = document.createElement(tag);
    Object.assign(e, props || {});
    kids.flat().forEach((k) => e.append(k));
    return e;
  };
  const srcLinks = (ids) => el('span', {}, ' [', ids.map((id, i) => {
    const s = src[id];
    return [i ? ', ' : '', el('a', { href: '#src-' + id, title: s.title }, s.author.split(' ').pop() + ' ' + s.year)];
  }), ']');
  const tag = (t) => el('span', { className: 'tag' }, t);

  const caseSel = $('case-filter');
  D.cases.forEach((c) => caseSel.append(el('option', { value: c.id, textContent: c.title })));

  function render() {
    const q = $('search').value.toLowerCase(), cf = caseSel.value;
    const match = (...t) => !q || t.join(' ').toLowerCase().includes(q);

    $('timeline-list').replaceChildren(...D.events
      .filter((e) => (!cf || e.case === cf) && match(e.title, e.summary))
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((e) => el('li', { id: e.id }, el('strong', { textContent: e.date.slice(0, 4) + ' — ' + e.title }), tag(e.status),
        el('br'), e.summary, srcLinks(e.sources))));

    const caseEnts = cf ? new Set(cs[cf].entities) : null;
    const rels = D.relationships.filter((r) => (!caseEnts || caseEnts.has(r.from) || caseEnts.has(r.to)) &&
      match(ent[r.from].name, ent[r.to].name, r.type, r.note));
    $('network-list').replaceChildren(...rels.map((r) => el('li', {},
      ent[r.from].name + ' → ' + r.type.replace(/_/g, ' ') + ' → ' + ent[r.to].name + '. ' + r.note, srcLinks(r.sources))));
    drawGraph(rels);

    $('case-list').replaceChildren(...D.cases.filter((c) => (!cf || c.id === cf) && match(c.title, c.summary)).map((c) =>
      el('article', { className: 'card', id: 'case-' + c.id },
        el('h3', { textContent: c.title + ' (' + c.period + ')' }), el('p', { textContent: c.summary }),
        el('p', {}, el('strong', { textContent: 'Decision-making: ' }), c.decision_making),
        el('h4', { textContent: 'Competing interpretations' }),
        el('ul', {}, c.interpretations.map((i) => el('li', {}, el('strong', { textContent: i.label }), tag(i.status), ': ' + i.claim, srcLinks(i.sources)))),
        el('p', {}, el('strong', { textContent: 'Consequences: ' }), c.consequences),
        el('h4', { textContent: 'Open questions' }), el('ul', {}, c.open_questions.map((o) => el('li', { textContent: o }))))));

    $('system-list').replaceChildren(...D.systems.filter((s) => (!cf || s.cases.includes(cf)) && match(s.title, s.description)).map((s) =>
      el('div', { className: 'card' }, el('h3', { textContent: s.title }), tag(s.status), el('p', { textContent: s.description }),
        el('p', {}, 'Cases: ', s.cases.map((c) => cs[c].title).join(', '), srcLinks(s.sources)))));

    $('source-list').replaceChildren(...D.sources.filter((s) => match(s.title, s.author)).map((s) =>
      el('li', { id: 'src-' + s.id }, tag(s.type), ' ', s.url ? el('a', { href: s.url, textContent: s.title }) : s.title,
        ' — ' + s.author + ' (' + s.year + ')')));
  }

  function drawGraph(rels) {
    const svg = $('graph'), NS = 'http://www.w3.org/2000/svg';
    svg.replaceChildren();
    const ids = [...new Set(rels.flatMap((r) => [r.from, r.to]))];
    const pos = {};
    ids.forEach((id, i) => {
      const a = (2 * Math.PI * i) / ids.length;
      pos[id] = [400 + 300 * Math.cos(a), 260 + 210 * Math.sin(a)];
    });
    const mk = (t, attrs, text) => {
      const n = document.createElementNS(NS, t);
      Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
      if (text) n.textContent = text;
      svg.append(n);
    };
    rels.forEach((r) => mk('line', { x1: pos[r.from][0], y1: pos[r.from][1], x2: pos[r.to][0], y2: pos[r.to][1], stroke: '#999' }));
    const colors = { person: '#0b5394', corporation: '#8a6d3b', government: '#38761d' };
    ids.forEach((id) => {
      mk('circle', { cx: pos[id][0], cy: pos[id][1], r: 7, fill: colors[ent[id].type] || '#555' });
      mk('text', { x: pos[id][0] + 10, y: pos[id][1] + 4 }, ent[id].name);
    });
  }

  $('search').addEventListener('input', render);
  caseSel.addEventListener('change', render);
  render();
})();
