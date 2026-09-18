const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const cache = new Map();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const users = [
  { id: 1, uid: 'E20454', name: 'Lovleen Kaur', address: { city: 'Rupnagar', country: 'India' } },
  { id: 2, uid: 'E20455', name: 'Amit Sharma', address: { city: 'Delhi', country: 'India' } },
  { id: 3, uid: 'E20456', name: 'Priya Singh', address: { city: 'Mumbai', country: 'India' } },
  { id: 4, uid: 'E20457', name: 'Rahul Kumar', address: { city: 'Chandigarh', country: 'India' } },
  { id: 5, uid: '24BAI70236', name: 'Sam Fawaz Hadi AL-Basara', address: { city: 'Bengaluru', country: 'India' } }
];

const cloneUser = (user) => ({
  ...user,
  address: user.address ? { ...user.address } : null
});

const cloneUsers = (items) => items.map(cloneUser);

const getUsersNormal = () => {
  const start = Date.now();
  const records = users.map((user) => {
    const address = user.address ? { ...user.address } : null;
    return { ...user, address };
  });

  return {
    records: cloneUsers(records),
    queryCount: 1 + users.length,
    elapsed: Date.now() - start
  };
};

const getUsersOptimized = () => {
  const start = Date.now();
  const records = cloneUsers(users);

  return {
    records,
    queryCount: 1,
    elapsed: Date.now() - start
  };
};

const getUsersCached = () => {
  if (cache.has('allUsers')) {
    const cached = cache.get('allUsers');
    return {
      records: cached.records,
      queryCount: 0,
      elapsed: 8,
      cacheHit: true
    };
  }

  const data = getUsersOptimized();
  cache.set('allUsers', {
    records: data.records,
    queryCount: data.queryCount,
    generatedAt: new Date().toISOString()
  });

  return {
    records: data.records,
    queryCount: data.queryCount,
    elapsed: data.elapsed,
    cacheHit: false
  };
};

const getUsersNative = () => {
  const start = Date.now();
  const records = users.map((user) => [
    user.id,
    user.uid,
    user.name,
    user.address?.city ?? '-',
    user.address?.country ?? '-'
  ]);

  return {
    records,
    queryCount: 1,
    elapsed: Date.now() - start
  };
};

const getSortedUsers = (sortBy) => {
  const records = [...users].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.id - b.id;
  });

  return { records: cloneUsers(records), queryCount: 1, elapsed: 15 };
};

const buildPayload = (mode, result, cacheHit = false) => {
  const artificialDelay = mode === 'normal' ? 180 : mode === 'optimized' ? 60 : mode === 'cached' ? 10 : 45;
  const responseTime = Math.max(12, result.elapsed + artificialDelay);

  return {
    mode,
    cacheHit,
    responseTime,
    queryCount: result.queryCount,
    rows: result.records.length,
    generatedAt: new Date().toISOString(),
    records: result.records
  };
};

app.get('/api/users', (req, res) => {
  const data = getUsersCached();
  return res.json(buildPayload('cached', data, data.cacheHit));
});

app.get('/api/users/normal', (req, res) => {
  const data = getUsersNormal();
  return res.json(buildPayload('normal', data, false));
});

app.get('/api/users/optimized', (req, res) => {
  const data = getUsersOptimized();
  return res.json(buildPayload('optimized', data, false));
});

app.get('/api/users/cached', (req, res) => {
  const data = getUsersCached();
  return res.json(buildPayload('cached', data, data.cacheHit));
});

app.get('/api/users/native', (req, res) => {
  const data = getUsersNative();
  return res.json(buildPayload('native', data, false));
});

app.get('/api/users/sort/id', (req, res) => {
  const data = getSortedUsers('id');
  return res.json(buildPayload('sort-id', data, false));
});

app.get('/api/users/sort/name', (req, res) => {
  const data = getSortedUsers('name');
  return res.json(buildPayload('sort-name', data, false));
});

app.post('/api/users', (req, res) => {
  const { uid, name, city, country } = req.body || {};

  if (!uid || !name || !city || !country) {
    return res.status(400).json({ message: 'UID, name, city and country are required.' });
  }

  const nextId = users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;
  const user = {
    id: nextId,
    uid,
    name,
    address: { city, country }
  };

  users.push(user);
  cache.clear();

  return res.status(201).json({
    message: 'User created successfully.',
    user: cloneUser(user)
  });
});

app.delete('/api/users/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found.' });
  }

  users.splice(index, 1);
  cache.clear();

  return res.status(200).json({ message: 'User deleted successfully.' });
});

app.post('/api/cache/clear', (req, res) => {
  cache.clear();
  return res.json({ cleared: true });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Experiment 6.2 running at http://localhost:${PORT}`);
});
