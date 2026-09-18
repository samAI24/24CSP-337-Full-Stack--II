const API_URL = 'http://localhost:3000/api/users';
const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');
const status = document.getElementById('status');

const setStatus = (message, type = 'success') => {
  status.textContent = message;
  status.className = `status-message ${type}`;
};

const renderRow = (entry, type) => {
  let id = '';
  let uid = '';
  let name = '';
  let city = '-';
  let country = '-';

  if (type === 'native') {
    [id, uid, name, city, country] = entry;
  } else {
    id = entry.id;
    uid = entry.uid;
    name = entry.name;
    if (entry.address) {
      city = entry.address.city;
      country = entry.address.country;
    }
  }

  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${id}</td>
    <td>${uid}</td>
    <td>${name}</td>
    <td>${city}</td>
    <td>${country}</td>
    <td><button class="delete-btn" data-id="${id}">Delete</button></td>
  `;

  return row;
};

const displayUsers = (records, type = 'cached') => {
  userTableBody.innerHTML = '';

  if (!records || records.length === 0) {
    userTableBody.innerHTML = '<tr><td colspan="6" class="empty-state">No users found.</td></tr>';
    return;
  }

  records.forEach((entry) => {
    userTableBody.appendChild(renderRow(entry, type));
  });

  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const userId = Number(button.dataset.id);
      const confirmed = window.confirm('Are you sure you want to delete this user?');

      if (!confirmed) {
        return;
      }

      try {
        const response = await fetch(`${API_URL}/${userId}`, { method: 'DELETE' });
        if (!response.ok) {
          throw new Error('Delete failed');
        }
        setStatus('User deleted successfully.', 'success');
        await loadUsers('cached');
      } catch (error) {
        setStatus('Unable to delete user.', 'error');
      }
    });
  });
};

async function loadUsers(type = 'cached') {
  const modeMap = {
    normal: '/normal',
    optimized: '/optimized',
    cached: '/cached',
    native: '/native',
    'sort-id': '/sort/id',
    'sort-name': '/sort/name'
  };

  const endpoint = modeMap[type] || '/cached';
  const start = performance.now();

  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Request failed');
    }

    const payload = await response.json();
    const elapsed = Math.round(performance.now() - start);
    const records = Array.isArray(payload.records) ? payload.records : [];

    document.getElementById('heroTime').textContent = `${payload.responseTime ?? elapsed} ms`;
    document.getElementById('queryCount').textContent = payload.queryCount ?? 0;
    document.getElementById('lastUpdated').textContent = `Last run: ${new Date(payload.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    displayUsers(records, type);
    const info = payload.cacheHit ? ' · Cache hit' : '';
    setStatus(`Response time: ${payload.responseTime ?? elapsed} ms${info}`, 'success');
  } catch (error) {
    setStatus('Unable to connect to backend.', 'error');
  }
}

document.querySelectorAll('.mode-btn').forEach((button) => {
  button.addEventListener('click', () => loadUsers(button.dataset.mode));
});

userForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const payload = {
    uid: document.getElementById('uid').value.trim(),
    name: document.getElementById('name').value.trim(),
    city: document.getElementById('city').value.trim(),
    country: document.getElementById('country').value.trim()
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error('Unable to add user');
    }

    userForm.reset();
    setStatus('User added successfully.', 'success');
    await loadUsers('cached');
  } catch (error) {
    setStatus('Unable to add user.', 'error');
  }
});

document.getElementById('clearCache').addEventListener('click', async () => {
  try {
    await fetch('http://localhost:3000/api/cache/clear', { method: 'POST' });
    setStatus('Cache cleared successfully.', 'success');
    await loadUsers('cached');
  } catch (error) {
    setStatus('Unable to clear cache.', 'error');
  }
});

loadUsers('cached');
