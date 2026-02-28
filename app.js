const state = {
  xp: 120,
  level: 3,
  streak: 9,
};

const tasks = [
  { id: 1, title: 'Ship API pagination for client project', priority: 'high', project: 'Client Revamp', time: '10:00', done: false },
  { id: 2, title: 'Review side-hustle landing page draft', priority: 'medium', project: 'SaaS Microstartup', time: '14:00', done: false },
  { id: 3, title: 'Gym session (Upper body)', priority: 'low', project: null, time: '18:30', done: false },
  { id: 4, title: 'Read 20 pages of System Design', priority: 'low', project: null, time: null, done: false },
  { id: 5, title: 'Update resume bullets for distributed systems role', priority: 'medium', project: 'Career Growth', time: null, done: false },
];

const habits = [
  { id: 1, name: 'Morning planning (10 min)', cadence: 'Daily', streak: 4, doneToday: false },
  { id: 2, name: 'Workout', cadence: '3x weekly', streak: 2, doneToday: false },
  { id: 3, name: 'Read for growth (20 min)', cadence: 'Daily', streak: 6, doneToday: false },
  { id: 4, name: 'Budget review', cadence: 'Weekly', streak: 3, doneToday: false },
];

const events = [
  { time: '09:30', text: 'Standup - Core Team' },
  { time: '12:00', text: '1:1 with mentor' },
  { time: '15:00', text: 'Demo prep with product lead' },
  { time: '19:30', text: 'Family check-in call' },
];

const notes = [
  'Research: plugin host architecture in React.',
  'Reading queue: Designing Data-Intensive Applications, ch.4.',
  'Idea: Focus mode plugin with Pomodoro + blockers.',
];

const interests = [
  'AI agents + workflow automation',
  'Open-source developer tooling',
  'Personal finance and investing basics',
  'Trail running + health analytics',
];

const careerSkills = [
  { name: 'System Design', level: 'Intermediate', next: '2 architecture mock sessions this week' },
  { name: 'TypeScript', level: 'Advanced', next: 'Ship typed plugin contracts in demo core' },
  { name: 'Cloud (AWS)', level: 'Intermediate', next: 'Complete HA architecture lab' },
  { name: 'Communication', level: 'Developing', next: 'Send concise weekly product updates' },
];

const careerDocuments = [
  { name: 'Resume (2026 master)', status: 'Updated this week', location: 'Docs/Career/resume-2026.pdf' },
  { name: 'Portfolio case studies', status: '2/3 complete', location: 'Notion/Career/Portfolio' },
  { name: 'Cover letter template', status: 'Ready', location: 'Docs/Career/cover-letter-template.md' },
  { name: 'Interview question bank', status: 'Growing list', location: 'Drive/Career/interview-bank' },
];

const plugins = [
  { id: 'calendar-sync', name: 'Calendar Sync', zone: 'dashboard', enabled: true },
  { id: 'fitness-tracker', name: 'Fitness Tracker', zone: 'dashboard', enabled: true },
  { id: 'finance-lite', name: 'Finance Lite', zone: 'sidebar', enabled: false },
  { id: 'research-assistant', name: 'Research Assistant', zone: 'assistant', enabled: true },
];

function xpToNextLevel() {
  return 200 - (state.xp % 200);
}

function maybeLevelUp() {
  const derived = Math.floor(state.xp / 200) + 1;
  state.level = Math.max(state.level, derived);
}

function renderSummary() {
  const summaryData = [
    { label: 'Player Level', value: `Lv ${state.level}`, player: true },
    { label: 'XP', value: `${state.xp} XP` },
    { label: 'XP to Next Level', value: `${xpToNextLevel()} XP` },
    { label: 'Completion Streak', value: `${state.streak} days` },
    { label: 'Tasks Complete', value: `${tasks.filter((task) => task.done).length}/${tasks.length}` },
  ];

  const grid = document.getElementById('summaryGrid');
  grid.innerHTML = '';

  summaryData.forEach((item) => {
    const card = document.createElement('article');
    card.className = `summary-card card${item.player ? ' player' : ''}`;
    card.innerHTML = `<div class="label">${item.label}</div><div class="value">${item.value}</div>`;
    grid.appendChild(card);
  });
}

function renderTaskRows(source, listId, rewardText) {
  const list = document.getElementById(listId);
  list.innerHTML = '';

  source.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-row';
    const project = task.project || 'No project';
    li.innerHTML = `
      ${task.time ? `<div class="time-col">${task.time}</div>` : ''}
      <div>
        ${task.title}
        <span class="badge p-${task.priority}">${task.priority}</span>
        <span class="pill">${project}</span>
      </div>
      <button class="action-btn ${task.done ? 'done' : ''}" data-task-id="${task.id}">${task.done ? 'Done' : rewardText}</button>
    `;
    list.appendChild(li);
  });

  list.querySelectorAll('button[data-task-id]').forEach((button) => {
    button.addEventListener('click', () => completeTask(Number(button.dataset.taskId)));
  });
}

function renderHourlyTasks() {
  const timed = tasks.filter((task) => task.time).sort((a, b) => a.time.localeCompare(b.time));
  renderTaskRows(timed, 'hourlyTaskList', 'Complete +20XP');
}

function renderUnscheduledTasks() {
  const unscheduled = tasks.filter((task) => !task.time);
  renderTaskRows(unscheduled, 'unscheduledTaskList', 'Complete +15XP');
}

function renderHabits() {
  const host = document.getElementById('habitList');
  host.innerHTML = '';

  habits.forEach((habit) => {
    const row = document.createElement('div');
    row.className = 'habit-row';
    const progressPercent = Math.min(100, habit.streak * 10);

    row.innerHTML = `
      <div>
        <strong>${habit.name}</strong>
        <div><small>${habit.cadence} · streak ${habit.streak}</small></div>
        <div class="progress-track"><div class="progress-fill" style="width:${progressPercent}%"></div></div>
      </div>
      <button class="action-btn ${habit.doneToday ? 'done' : ''}" data-habit-id="${habit.id}">${habit.doneToday ? 'Checked-in' : 'Check-in +10XP'}</button>
    `;
    host.appendChild(row);
  });

  host.querySelectorAll('button[data-habit-id]').forEach((button) => {
    button.addEventListener('click', () => checkInHabit(Number(button.dataset.habitId)));
  });
}

function renderAchievements() {
  const list = document.getElementById('achievementList');
  list.innerHTML = '';

  const achievements = [
    `${tasks.filter((task) => task.done).length} tasks completed today`,
    `${habits.filter((habit) => habit.doneToday).length} habits checked in`,
    state.streak >= 7 ? '🔥 Momentum badge unlocked (7+ day streak)' : 'Reach 7-day streak to unlock Momentum badge',
    state.level >= 4 ? '🏆 Level 4 unlocked: Operator class' : 'Reach Level 4 to unlock Operator class',
  ];

  achievements.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

function renderSimpleList(items, id, formatter) {
  const list = document.getElementById(id);
  list.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = formatter(item);
    list.appendChild(li);
  });
}

function renderDataSurfaces() {
  renderSimpleList(events, 'calendarList', (event) => `${event.time} — ${event.text}`);
  renderSimpleList(notes, 'notesList', (note) => note);
  renderSimpleList(interests, 'interestList', (interest) => interest);
  renderSimpleList(careerSkills, 'skillsList', (skill) => `<strong>${skill.name}</strong> — ${skill.level}<br /><small>Next: ${skill.next}</small>`);
  renderSimpleList(careerDocuments, 'documentsList', (doc) => `<strong>${doc.name}</strong> · ${doc.status}<br /><small>${doc.location}</small>`);
}

function renderPlugins() {
  const host = document.getElementById('pluginList');
  host.innerHTML = '';

  plugins.forEach((plugin) => {
    const row = document.createElement('div');
    row.className = 'plugin-item';
    row.innerHTML = `
      <div>
        <strong>${plugin.name}</strong><br />
        <small>ID: ${plugin.id} · zone: ${plugin.zone}</small>
      </div>
      <button class="action-btn">${plugin.enabled ? 'Disable' : 'Enable'}</button>
    `;

    row.querySelector('button').addEventListener('click', () => {
      plugin.enabled = !plugin.enabled;
      renderPlugins();
      pushAiMessage('ai', `${plugin.name} plugin ${plugin.enabled ? 'enabled' : 'disabled'}. Hook registry refreshed.`);
    });

    host.appendChild(row);
  });
}

function completeTask(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task || task.done) return;

  task.done = true;
  state.xp += task.time ? 20 : 15;
  state.streak += 1;
  maybeLevelUp();

  pushAiMessage('ai', `Mission complete: "${task.title}". XP is now ${state.xp}.`);
  renderAll();
}

function checkInHabit(habitId) {
  const habit = habits.find((item) => item.id === habitId);
  if (!habit || habit.doneToday) return;

  habit.doneToday = true;
  habit.streak += 1;
  state.xp += 10;
  maybeLevelUp();

  pushAiMessage('ai', `Habit check-in recorded: ${habit.name}. Streak is now ${habit.streak}.`);
  renderAll();
}

function pushAiMessage(type, text) {
  const box = document.getElementById('messages');
  const msg = document.createElement('div');
  msg.className = `msg ${type}`;
  msg.textContent = text;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

function setupAiDemo() {
  const panel = document.getElementById('aiPanel');
  document.getElementById('aiFab').addEventListener('click', () => panel.classList.toggle('hidden'));
  document.getElementById('closeAi').addEventListener('click', () => panel.classList.add('hidden'));

  document.getElementById('sendPrompt').addEventListener('click', () => {
    const input = document.getElementById('promptInput');
    const prompt = input.value.trim();
    if (!prompt) return;

    pushAiMessage('user', prompt);
    input.value = '';

    const response = 'Breath OS recommendation: execute scheduled missions first, check in 2 habits, then finish unscheduled career tasks before 20:00 EAT.';
    setTimeout(() => pushAiMessage('ai', response), 350);
  });

  pushAiMessage('ai', 'Breath OS online. I can coordinate your missions, habits, and growth blocks.');
}

function setTimezone() {
  const formatter = new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Nairobi',
  });
  document.getElementById('timezoneText').textContent = `Timezone: Africa/Nairobi · ${formatter.format(new Date())}`;
}

function setupThemeToggle() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    toggle.textContent = next === 'dark' ? 'Switch to Light' : 'Switch to Dark';
  });
}

function renderAll() {
  renderSummary();
  renderHourlyTasks();
  renderUnscheduledTasks();
  renderHabits();
  renderAchievements();
  renderDataSurfaces();
  renderPlugins();
}

renderAll();
setupAiDemo();
setTimezone();
setupThemeToggle();
