(async function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const collectionNames = ['sources', 'events', 'entities', 'relationships', 'cases', 'systems', 'dominoes', 'financial_flows', 'ownership_overlap', 'comparisons'];
  const D = {};
  const make = (tag, props = {}, ...contents) => {
    const node = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (key.startsWith('aria-') || key === 'role') node.setAttribute(key, value);
      else node[key] = value;
    });
    contents.flat(Infinity).forEach(content => {
      if (content !== null && content !== undefined) node.append(content);
    });
    return node;
  };
  const pill = (name, klass = '') => make('span', { className: 'pill ' + klass }, name);
  const readableType = type => (type || 'unknown').replace(/_/g, ' ');
  const clean = value => String(value || '').toLocaleLowerCase();
  const empty = text => make('p', { className: 'empty' }, text);
  const dateYear = date => parseInt(date.slice(0, 4), 10);
  const sourceLink = id => {
    const source = sourcesById[id];
    if (!source) return make('span', { className: 'pill pending' }, 'Unresolved source: ' + id);
    const text = (source.author || 'Source').split(' ').pop() + (source.year ? ' ' + source.year : '');
    if (source.url && /^https:\/\//.test(source.url)) {
      return make('a', {
        href: source.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        title: source.title + (source.locator ? ' — ' + source.locator : '')
      }, text + ' ↗');
    }
    return make('a', { href: '#src-' + id, title: source.title }, text + ' (catalogue)');
  };
  const sourceLinks = ids => {
    const links = make('span', { className: 'source-links' });
    (ids || []).forEach(id => links.append(sourceLink(id)));
    return links;
  };
  const citations = ids => make('div', { className: 'small quiet' }, 'Sources: ', sourceLinks(ids));
  const statusPill = record => pill(record.status || 'unclassified',
    record.status === 'documented' ? 'documented' : 'pending');
  const reviewPill = record => pill(
    record.verification === 'reviewed' ? 'source-reviewed' : 'review pending',
    record.verification === 'reviewed' ? '' : 'pending'
  );
  const typeCategory = rel => {
    if (['sibling_of', 'parent_of', 'married_to'].includes(rel.type)) return 'family';
    if (['employed_by', 'led', 'directed', 'appointed'].includes(rel.type)) return 'office';
    return 'institutional';
  };
  const sameCase = (rel, caseId) => !caseId || (
    casesById[caseId].entities.includes(rel.from) &&
    casesById[caseId].entities.includes(rel.to)
  );
  const isDocumented = rel => rel.status === 'documented' && rel.verification === 'reviewed';
  const state = { focusId: '', eventId: '', query: '', caseId: '', relType: 'all', reviewedOnly: true, yearFrom: 1600, yearTo: 2026 };
  let sourcesById, entitiesById, casesById, eventsById;

  try {
    await Promise.all(collectionNames.map(async name => {
      const response = await fetch('data/' + name + '.json');
      if (!response.ok) throw new Error('HTTP ' + response.status + ' for ' + name);
      D[name] = await response.json();
    }));
  } catch (err) {
    $('load-status').textContent = 'Research data could not be loaded. Open the site using a web server.';
    $('load-status').className = 'error';
    $('event-detail').replaceChildren(make('p', { className: 'error' }, 'Could not open research records.'));
    console.error(err);
    return;
  }
  sourcesById = Object.fromEntries(D.sources.map(s => [s.id, s]));
  entitiesById = Object.fromEntries(D.entities.map(e => [e.id, e]));
  eventsById = Object.fromEntries(D.events.map(e => [e.id, e]));
  casesById = Object.fromEntries(D.cases.map(c => [c.id, c]));
  const sortedEntities = [...D.entities].sort((a, b) => a.name.localeCompare(b.name));
  const caseSelect = $('case-filter'), entitySelect = $('entity-filter');
  D.cases.forEach(c => caseSelect.append(make('option', { value: c.id, textContent: c.title })));
  sortedEntities.forEach(e => entitySelect.append(make('option', { value: e.id, textContent: e.name })));
  $('stats').replaceChildren(
    ...[['Events', D.events.length], ['Entities', D.entities.length], ['Connections', D.relationships.length], ['Sources', D.sources.length], ['Investigations', D.cases.length], ['Dominoes', D.dominoes.length], ['Financial records', D.financial_flows.length], ['Ownership studies', D.ownership_overlap.length], ['Cross-border comparisons', D.comparisons.length]]
      .map(([name, count]) => make('span', {}, make('strong', {}, String(count)), name))
  );
  $('load-status').textContent = 'Research dataset loaded · Source review is ongoing';
  const matches = (...values) => !state.query || values.some(value => clean(value).includes(state.query));

  function caseEventIds() {
    if (!state.caseId) return null;
    return new Set(casesById[state.caseId].events);
  }
  function caseHasEntity(id) {
    return !state.caseId || casesById[state.caseId].entities.includes(id);
  }
  function selectEntity(id, navigate = false) {
    if (!entitiesById[id]) return;
    if (!caseHasEntity(id)) {
      const containing = D.cases.find(c => c.entities.includes(id));
      state.caseId = containing ? containing.id : '';
      caseSelect.value = state.caseId;
    }
    state.focusId = id;
    entitySelect.value = id;
    renderNetwork();
    if (navigate) $('network').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function actorButton(id) {
    const item = entitiesById[id];
    if (!item) return make('span', {}, 'Unknown actor');
    const b = make('button', { type: 'button', className: 'inline-button' }, item.name);
    b.addEventListener('click', () => selectEntity(id, true));
    return b;
  }

  function displayEvent(event) {
    if (!event) return $('event-detail').replaceChildren(empty('Select an event to inspect its evidence.'));
    const actorIds = event.entities || [];
    $('event-detail').replaceChildren(
      make('p', { className: 'eyebrow' }, 'SELECTED HISTORICAL EVENT'),
      make('h3', {}, event.title),
      make('p', { className: 'meta' }, event.date + ' · ' + casesById[event.case].title),
      make('div', {}, statusPill(event), reviewPill(event)),
      make('p', {}, event.summary),
      citations(event.sources),
      make('h4', {}, 'Linked actors and institutions'),
      actorIds.length ? make('div', {}, actorIds.map(actorButton)) : empty('Event-level actors have not yet been linked.')
    );
  }
  function renderTimeline() {
    const from = state.yearFrom, to = state.yearTo;
    const acceptedCases = caseEventIds();
    const found = D.events.filter(e => (!acceptedCases || acceptedCases.has(e.id)) &&
      matches(e.title, e.summary, ...(e.entities || []).map(id => entitiesById[id]?.name || '')) &&
      Number.isFinite(from) && Number.isFinite(to) && dateYear(e.date) >= from && dateYear(e.date) <= to)
      .sort((a, b) => a.date.localeCompare(b.date));
    $('timeline-count').textContent = found.length + ' events';
    const rows = found.map(event => {
      const btn = make('button', { type: 'button', 'aria-pressed': String(state.eventId === event.id) },
        make('span', { className: 'timeline-date' }, event.date),
        make('span', { className: 'timeline-body' },
          make('span', { className: 'timeline-title' }, event.title),
          make('span', { className: 'timeline-summary' }, event.summary),
          statusPill(event), reviewPill(event)
        )
      );
      btn.addEventListener('click', () => {
        state.eventId = event.id;
        renderTimeline();
        displayEvent(event);
      });
      return make('li', { id: event.id }, btn);
    });
    $('timeline-list').replaceChildren(...(rows.length ? rows : [make('li', {}, empty('No events match these filters.'))]));
    if (state.eventId && found.some(e => e.id === state.eventId)) displayEvent(eventsById[state.eventId]);
    else {
      state.eventId = '';
      displayEvent(null);
    }
  }


  function goToEvent(id) {
    const event = eventsById[id];
    if (!event) return;
    state.eventId = id;
    state.caseId = event.case;
    caseSelect.value = event.case;
    state.query = '';
    $('search').value = '';
    const year = dateYear(event.date);
    if (state.yearFrom > year || !Number.isFinite(state.yearFrom)) {
      state.yearFrom = year;
      $('year-from').value = year;
    }
    if (state.yearTo < year || !Number.isFinite(state.yearTo)) {
      state.yearTo = year;
      $('year-to').value = year;
    }
    render();
    $('timeline').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  function renderDominoes() {
    const caseEvents = state.caseId ? new Set(casesById[state.caseId].events) : null;
    const list = D.dominoes.filter(d => (!caseEvents || caseEvents.has(d.from) || caseEvents.has(d.to)) &&
      matches(d.mechanism, d.claim, eventsById[d.from]?.title, eventsById[d.to]?.title));
    $('domino-count').textContent = list.length + ' connections';
    $('domino-list').replaceChildren(...(list.length ? list.map(d => {
      const previous = eventsById[d.from], next = eventsById[d.to];
      const from = make('button', { type: 'button', className: 'domino-event' },
        make('span', { className: 'domino-year' }, previous.date),
        make('strong', {}, previous.title));
      const to = make('button', { type: 'button', className: 'domino-event' },
        make('span', { className: 'domino-year' }, next.date),
        make('strong', {}, next.title));
      from.addEventListener('click', () => goToEvent(previous.id));
      to.addEventListener('click', () => goToEvent(next.id));
      return make('li', { className: 'domino-card' },
        make('div', { className: 'domino-events' }, from,
          make('span', { className: 'domino-arrow', 'aria-hidden': 'true' }, '→'), to),
        make('p', {}, pill(d.mechanism), statusPill(d), reviewPill(d)),
        make('p', {}, d.claim),
        citations(d.sources));
    }) : [make('li', {}, empty('No event-to-event connections match these filters.'))]));
  }

  function shownRelationships() {
    return D.relationships.filter(rel =>
      sameCase(rel, state.caseId) &&
      (state.relType === 'all' || typeCategory(rel) === state.relType) &&
      (!state.reviewedOnly || isDocumented(rel)) &&
      (!state.focusId || rel.from === state.focusId || rel.to === state.focusId) &&
      matches(entitiesById[rel.from]?.name, entitiesById[rel.to]?.name, rel.type, rel.note)
    );
  }
  function renderEntityDetail(visibleRels) {
    const box = $('entity-detail'), entity = entitiesById[state.focusId];
    if (!entity) {
      box.replaceChildren(
        make('p', { className: 'eyebrow' }, 'ENTITY INSPECTOR'),
        make('h3', {}, 'Explore one connection at a time'),
        make('p', { className: 'quiet' }, 'Choose a person, company, or institution from the graph, or use the focus dropdown.'),
        make('p', { className: 'small' }, 'The family-only filter displays kinship without implying shared intentions or joint actions.')
      );
      return;
    }
    const related = visibleRels.filter(rel => rel.from === entity.id || rel.to === entity.id);
    const links = related.map(rel => {
      const otherId = rel.from === entity.id ? rel.to : rel.from;
      return make('li', {},
        actorButton(otherId), pill(readableType(rel.type), typeCategory(rel) === 'family' ? 'family' : ''),
        statusPill(rel), make('p', {}, rel.note), citations(rel.sources));
    });
    box.replaceChildren(
      make('p', { className: 'eyebrow' }, 'ENTITY INSPECTOR'),
      make('h3', {}, entity.name),
      make('p', { className: 'meta' }, readableType(entity.type) + (entity.years ? ' · ' + entity.years : '')),
      make('p', {}, entity.description), citations(entity.sources),
      make('h4', {}, 'Connections within current filters'),
      links.length ? make('ul', {}, links) : empty('No connections match these filters.')
    );
  }
  function drawNetwork(visibleRels) {
    const svg = $('graph');
    svg.replaceChildren();
    const NS = 'http://www.w3.org/2000/svg';
    const svgNode = (tag, attributes = {}, label = null) => {
      const node = document.createElementNS(NS, tag);
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, String(value)));
      if (label !== null) node.textContent = label;
      return node;
    };
    const ids = [...new Set(visibleRels.flatMap(r => [r.from, r.to]))].sort((a, b) =>
      entitiesById[a].name.localeCompare(entitiesById[b].name));
    if (!ids.length) {
      svg.append(svgNode('text', { x: 480, y: 260, 'text-anchor': 'middle', class: 'node-caption' }, 'No source-reviewed relationships match this view.'));
      return;
    }
    const positions = {};
    const polar = (nodes, x, y, r) => nodes.forEach((id, i) => {
      const angle = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
      positions[id] = [x + r * Math.cos(angle), y + r * Math.sin(angle)];
    });
    if (state.focusId && ids.includes(state.focusId)) {
      positions[state.focusId] = [480, 260];
      polar(ids.filter(id => id !== state.focusId), 480, 260, 175);
    } else polar(ids, 480, 260, 192);
    visibleRels.forEach(rel => {
      const a = positions[rel.from], b = positions[rel.to];
      if (!a || !b) return;
      const confirmed = isDocumented(rel);
      const line = svgNode('line', {
        x1: a[0], y1: a[1], x2: b[0], y2: b[1],
        stroke: confirmed ? '#799895' : '#af8f6a',
        'stroke-width': confirmed ? 2.1 : 1.7,
        'stroke-dasharray': confirmed ? 'none' : '7 5'
      });
      const label = svgNode('title', {}, entitiesById[rel.from].name + ' — ' + readableType(rel.type) + ' — ' + entitiesById[rel.to].name);
      line.append(label);
      svg.append(line);
    });
    const fill = { person: '#347da3', corporation: '#b98b47', government: '#54846b' };
    ids.forEach(id => {
      const entity = entitiesById[id], p = positions[id];
      const group = svgNode('g', { class: 'graph-node', role: 'button', tabindex: '0', 'aria-label': 'Inspect ' + entity.name });
      const circle = svgNode('circle', { cx: p[0], cy: p[1], r: state.focusId === id ? 13 : 10, class: 'node-circle', fill: fill[entity.type] || '#6d8190' });
      const shortName = entity.name.length > 22 ? entity.name.slice(0, 20) + '…' : entity.name;
      const label = svgNode('text', {
        x: p[0] + (p[0] > 765 ? -16 : 16), y: p[1] + 4,
        'text-anchor': p[0] > 765 ? 'end' : 'start', class: 'node-label'
      }, shortName);
      group.append(circle, label, svgNode('title', {}, entity.name));
      group.addEventListener('click', () => selectEntity(id));
      group.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectEntity(id); }
      });
      svg.append(group);
    });
  }
  function renderNetwork() {
    const rels = shownRelationships();
    $('network-count').textContent = rels.length + ' relationships';
    $('relationship-count').textContent = '(' + rels.length + ')';
    $('network-list').replaceChildren(...(rels.length ? rels.map(rel => {
      const item = make('li', {}, actorButton(rel.from), ' → ' + readableType(rel.type) + ' → ', actorButton(rel.to),
        statusPill(rel), reviewPill(rel),
        make('div', { className: 'small' }, rel.note), citations(rel.sources));
      return item;
    }) : [make('li', {}, empty('No connections match. Clear focus or change filters.'))]));
    drawNetwork(rels);
    renderEntityDetail(rels);
  }

  function renderCases() {
    const list = D.cases.filter(c => (!state.caseId || c.id === state.caseId) &&
      matches(c.title, c.summary, c.decision_making, ...(c.entities || []).map(id => entitiesById[id]?.name)));
    $('case-list').replaceChildren(...(list.length ? list.map(c => make('article', { className: 'card', id: 'case-' + c.id },
      make('p', { className: 'eyebrow' }, c.period),
      make('h3', {}, c.title),
      make('p', {}, c.summary), citations(c.summary_sources),
      make('h4', {}, 'Decision-making'), make('p', {}, c.decision_making), citations(c.decision_sources),
      make('h4', {}, 'Competing interpretations'),
      make('ul', {}, (c.interpretations || []).map(i => make('li', {}, pill(i.status, 'pending'), make('strong', {}, i.label + ': '), i.claim, citations(i.sources)))),
      make('h4', {}, 'Consequences'), make('p', {}, c.consequences), citations(c.consequences_sources),
      make('h4', {}, 'Explore actors'),
      make('div', {}, c.entities.map(actorButton)),
      make('h4', {}, 'Open questions'),
      make('ul', {}, c.open_questions.map(q => make('li', {}, q)))
    )) : [empty('No investigations match the search.')]));
  }
  function renderSystems() {
    const list = D.systems.filter(s => (!state.caseId || s.cases.includes(state.caseId)) && matches(s.title, s.description));
    $('system-list').replaceChildren(...(list.length ? list.map(s => make('article', { className: 'card' },
      make('h3', {}, s.title), statusPill(s),
      make('p', {}, s.description),
      make('p', { className: 'quiet small' }, 'Investigations: ' + s.cases.map(id => casesById[id].title).join(', ')),
      citations(s.sources)
    )) : [empty('No system patterns match.')]));
  }
  function renderFinance() {
    const list = D.financial_flows.filter(f => (!state.caseId || f.case === state.caseId) &&
      matches(f.title, f.description, entitiesById[f.from]?.name,
        ...(f.to || []).map(id => entitiesById[id]?.name), f.flow_state, f.kind));
    $('finance-count').textContent = list.length + ' records';
    const valueLabel = record => record.flow_state === 'authorized_no_transfer' ? 'Transfer NOT executed' : record.flow_state === 'policy_target_not_cash_flow' ? (record.value.toLocaleString('en-GB') + ' French livres · proposed refinancing target, not paid') : record.value === null ? 'Amount not stated' :
      record.unit === 'GBP' ? ('£' + record.value.toLocaleString('en-GB') + ' historical') :
      record.unit === 'percent_of_sales' ? (record.value + '% of sales, conditional') :
      (record.value + ' ' + record.unit);
    $('finance-list').replaceChildren(...(list.length ? list.map(f => make('article',
      { className: 'card money-card' },
      make('p', { className: 'eyebrow' }, f.date + ' · ' + readableType(f.kind)),
      make('h3', {}, f.title),
      make('p', {}, pill(valueLabel(f), f.flow_state === 'documented_historical_loan' ? 'documented' : 'pending')),
      make('p', { className: 'money-flow' }, actorButton(f.from), ' → ', f.to.map(actorButton)),
      make('p', { className: 'small' }, make('strong', {}, 'Evidence status: '), readableType(f.flow_state)),
      make('p', {}, f.description),
      citations(f.sources)
    )) : [empty('No financial traces match this search or case. These records currently focus on the 1773 Company case.')]));
  }


  function renderOwnership() {
    const knownCases = new Set(['engraftment1721', 'publicdebt1720']);
    const visible = D.ownership_overlap.filter(record =>
      (!state.caseId || knownCases.has(state.caseId)) &&
      matches(String(record.year), record.measurement, record.methods,
        ...(record.company_ids || []).map(id => entitiesById[id]?.name)));
    $('ownership-count').textContent = visible.length + ' historical estimates';
    $('ownership-list').replaceChildren(...(visible.length ? visible.map(record =>
      make('article', { className: 'card' },
        make('p', { className: 'eyebrow' }, record.year + ' · PUBLISHED LEDGER STUDY'),
        make('h3', {}, 'Approximately ' + record.matched_accounts_approx.toLocaleString('en-GB') + ' overlapping accounts'),
        make('p', {}, record.company_ids.map(actorButton)),
        make('p', {}, record.measurement),
        pill('Named individuals NOT verified', 'pending'),
        make('p', { className: 'small quiet' }, record.methods),
        citations(record.sources)
      )) : [empty('Ownership account comparisons are available in the 1719–1721 research case.')]));
  }

  function renderComparisons() {
    const accepted = D.comparisons.filter(c =>
      (!state.caseId || c.france_case === state.caseId || c.britain_case === state.caseId) &&
      matches(c.dimension,c.france,c.britain,c.interpretation));
    $('comparison-count').textContent = accepted.length + ' comparisons';
    const makeSide = (country, text, id) => {
      const focus = make('button', { type: 'button', className:'inline-button' }, 'Explore '+country+' case ↗');
      focus.addEventListener('click', () => {
        state.caseId = id;
        caseSelect.value = id;
        state.query = '';
        $('search').value = '';
        render();
        $('cases').scrollIntoView({behavior:'smooth',block:'start'});
      });
      return make('div', {className:'comparison-side'},
        make('p',{className:'eyebrow'},country),
        make('p',{},text),
        focus);
    };
    $('comparison-list').replaceChildren(...(accepted.length ? accepted.map(c =>
      make('article',{className:'card comparison-card'},
        make('h3',{},c.dimension),
        make('div',{className:'comparison-grid'},
          makeSide('France',c.france,c.france_case),
          makeSide('Britain',c.britain,c.britain_case)),
        make('p',{},pill(c.epistemic_status,'pending'),c.interpretation),
        citations(c.sources)
      )) : [empty('The current comparison records concern the French and British 1720 financial systems.')]));
  }

  function renderSources() {
    const list = D.sources.filter(s => matches(s.title, s.author, s.locator));
    $('source-list').replaceChildren(...(list.length ? list.map(s => make('li', { id: 'src-' + s.id },
      pill(s.type.replace(/_/g, ' ')), pill(s.reviewed ? 'link & locator reviewed' : 'bibliography pending', s.reviewed ? 'documented' : 'pending'),
      make('div', {}, (s.url && /^https:\/\//.test(s.url))
        ? make('a', { href: s.url, rel: 'noopener noreferrer', target: '_blank' }, s.title + ' ↗')
        : make('strong', {}, s.title)),
      make('div', { className: 'small quiet' }, s.author + (s.year ? ' (' + s.year + ')' : '')),
      s.locator ? make('p', { className: 'source-locator' }, 'Locator: ' + s.locator) : empty('Exact passage not yet reviewed.')
    )) : [make('li', {}, empty('No sources match the search.'))]));
  }
  function render() { renderTimeline(); renderDominoes(); renderFinance(); renderOwnership(); renderComparisons(); renderNetwork(); renderCases(); renderSystems(); renderSources(); }
  function updateFilters() {
    state.query = clean($('search').value.trim());
    state.caseId = caseSelect.value;
    state.yearFrom = $('year-from').value === '' ? NaN : Number($('year-from').value);
    state.yearTo = $('year-to').value === '' ? NaN : Number($('year-to').value);
    state.relType = $('rel-filter').value;
    state.reviewedOnly = $('verified-only').checked;
    if (state.focusId && !caseHasEntity(state.focusId)) {
      state.focusId = '';
      entitySelect.value = '';
    }
    render();
  }
  $('search').addEventListener('input', updateFilters);
  caseSelect.addEventListener('change', updateFilters);
  $('year-from').addEventListener('change', updateFilters);
  $('year-to').addEventListener('change', updateFilters);
  $('rel-filter').addEventListener('change', updateFilters);
  $('verified-only').addEventListener('change', updateFilters);
  entitySelect.addEventListener('change', () => {
    state.focusId = entitySelect.value;
    if (state.focusId && !caseHasEntity(state.focusId)) {
      const matchCase = D.cases.find(c => c.entities.includes(state.focusId));
      state.caseId = matchCase ? matchCase.id : '';
      caseSelect.value = state.caseId;
      render();
    } else renderNetwork();
  });
  $('clear-focus').addEventListener('click', () => {
    state.focusId = '';
    entitySelect.value = '';
    renderNetwork();
  });
  render();
})();
