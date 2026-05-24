(function () {
  var PALETTE = [
    { name: 'Yellow',         accent: '#F5C518', dark: '#d4a800', text: '#0A1628' },
    { name: 'Electric Orange',accent: '#F97316', dark: '#ea6c0b', text: '#0A1628' },
    { name: 'Copper',         accent: '#C2792D', dark: '#a5631f', text: '#0A1628' },
    { name: 'Signal Red',     accent: '#E53E3E', dark: '#c53030', text: '#FFFFFF' },
    { name: 'Emerald',        accent: '#10B981', dark: '#059669', text: '#0A1628' },
    { name: 'Sky Blue',       accent: '#38BDF8', dark: '#0ea5e9', text: '#0A1628' },
  ];

  var STORED = localStorage.getItem('be_accent');
  var current = PALETTE.find(function (p) { return p.accent === STORED; }) || PALETTE[0];

  function apply(swatch) {
    document.documentElement.style.setProperty('--yellow',      swatch.accent);
    document.documentElement.style.setProperty('--yellow-dark', swatch.dark);
    localStorage.setItem('be_accent', swatch.accent);
    current = swatch;
    render();
  }

  function render() {
    var panel = document.getElementById('be-color-picker');
    if (!panel) return;
    panel.querySelectorAll('.be-swatch').forEach(function (el) {
      var active = el.dataset.accent === current.accent;
      el.style.outline      = active ? '3px solid #fff' : '2px solid rgba(255,255,255,0.25)';
      el.style.outlineOffset = active ? '2px' : '1px';
      el.title = el.dataset.name + (active ? ' (current)' : '');
    });
  }

  function build() {
    var panel = document.createElement('div');
    panel.id = 'be-color-picker';
    Object.assign(panel.style, {
      position:     'fixed',
      bottom:       '20px',
      right:        '20px',
      background:   'rgba(10,22,40,0.97)',
      border:       '1px solid rgba(255,255,255,0.15)',
      borderRadius: '12px',
      padding:      '12px 14px',
      zIndex:       '99999',
      fontFamily:   'Inter, sans-serif',
      boxShadow:    '0 8px 32px rgba(0,0,0,0.45)',
      minWidth:     '190px',
    });

    var label = document.createElement('p');
    label.textContent = 'Accent Color';
    Object.assign(label.style, {
      margin:       '0 0 10px',
      fontSize:     '11px',
      fontWeight:   '600',
      letterSpacing:'0.08em',
      textTransform:'uppercase',
      color:        'rgba(255,255,255,0.55)',
    });
    panel.appendChild(label);

    var grid = document.createElement('div');
    Object.assign(grid.style, {
      display:             'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap:                 '8px',
    });

    PALETTE.forEach(function (swatch) {
      var btn = document.createElement('button');
      btn.className = 'be-swatch';
      btn.dataset.accent = swatch.accent;
      btn.dataset.name   = swatch.name;
      Object.assign(btn.style, {
        width:        '44px',
        height:       '44px',
        borderRadius: '8px',
        background:   swatch.accent,
        border:       'none',
        cursor:       'pointer',
        transition:   'transform 0.15s ease',
        display:      'flex',
        alignItems:   'center',
        justifyContent:'center',
        fontSize:     '9px',
        fontWeight:   '700',
        color:        swatch.text,
        lineHeight:   '1.1',
        textAlign:    'center',
        padding:      '2px',
      });
      btn.textContent = swatch.name;
      btn.addEventListener('mouseover', function () { btn.style.transform = 'scale(1.12)'; });
      btn.addEventListener('mouseout',  function () { btn.style.transform = 'scale(1)'; });
      btn.addEventListener('click',     function () { apply(swatch); });
      grid.appendChild(btn);
    });

    panel.appendChild(grid);

    var note = document.createElement('p');
    note.textContent = 'Click a color to preview';
    Object.assign(note.style, {
      margin:     '10px 0 0',
      fontSize:   '10px',
      color:      'rgba(255,255,255,0.35)',
      textAlign:  'center',
    });
    panel.appendChild(note);

    document.body.appendChild(panel);
    apply(current);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
