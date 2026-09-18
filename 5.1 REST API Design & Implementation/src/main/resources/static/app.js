const state = { posts: [], schedules: [] };
const $ = (selector) => document.querySelector(selector);

async function request(url, options = {}) {
    const response = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
        const message = payload.errors?.join(' | ') || payload.message || 'Something went wrong.';
        throw new Error(message);
    }
    return payload.data;
}

function formatDate(value) {
    if (!value) return 'Unscheduled';
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

function escapeHtml(value = '') {
    return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[character]));
}

function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('visible'), 3200);
}

function renderMetrics() {
    $('#post-count').textContent = state.posts.length;
    $('#scheduled-count').textContent = state.posts.filter((post) => post.status === 'SCHEDULED').length;
    $('#pending-count').textContent = state.schedules.filter((schedule) => schedule.status === 'PENDING').length;
}

function renderPosts() {
    const list = $('#posts-list');
    if (!state.posts.length) {
        list.innerHTML = '<div class="empty-state"><strong>Your content library is empty</strong>Create your first post to begin planning.</div>';
        return;
    }
    list.innerHTML = state.posts.map((post) => `<article class="post-row">
        <div><h3 class="post-title">${escapeHtml(post.title)}</h3><p class="post-excerpt">${escapeHtml(post.content)}</p><div class="post-meta"><span>By ${escapeHtml(post.author)}</span><span>Updated ${formatDate(post.updatedAt)}</span><span class="tag ${post.status === 'DRAFT' ? 'draft' : ''}">${post.status}</span></div></div>
        <div class="row-actions"><button class="text-button" data-action="edit-post" data-id="${post.id}" type="button">Edit</button><button class="text-button" data-action="delete-post" data-id="${post.id}" type="button">Delete</button></div>
    </article>`).join('');
}

function renderSchedules() {
    const list = $('#schedules-list');
    if (!state.schedules.length) {
        list.innerHTML = '<div class="empty-state"><strong>No schedules yet</strong>Schedule a post from the content form.</div>';
        return;
    }
    list.innerHTML = state.schedules.map((schedule) => {
        const post = state.posts.find((item) => item.id === schedule.postId);
        return `<article class="schedule-row"><div><strong class="schedule-post">${escapeHtml(post?.title || `Post #${schedule.postId}`)}</strong><span class="schedule-id">Schedule #${schedule.id}</span></div><span class="schedule-date">${formatDate(schedule.scheduledTime)}</span><select class="status-select" data-action="status" data-id="${schedule.id}" aria-label="Schedule status"><option ${schedule.status === 'PENDING' ? 'selected' : ''}>PENDING</option><option ${schedule.status === 'PUBLISHED' ? 'selected' : ''}>PUBLISHED</option><option ${schedule.status === 'CANCELLED' ? 'selected' : ''}>CANCELLED</option></select><button class="text-button delete-schedule" data-action="delete-schedule" data-id="${schedule.id}" type="button">Remove</button></article>`;
    }).join('');
}

function resetForm() {
    $('#post-form').reset();
    $('#post-id').value = '';
    $('#post-form-title').textContent = 'Create a post';
    $('#post-submit-button').innerHTML = 'Create post <span>→</span>';
    $('#cancel-edit-button').classList.add('hidden');
    $('#form-feedback').textContent = '';
    $('#form-feedback').classList.remove('success');
}

function editPost(post) {
    $('#post-id').value = post.id;
    $('#post-title').value = post.title;
    $('#post-author').value = post.author;
    $('#post-content').value = post.content;
    $('#post-scheduled-at').value = post.scheduledAt ? post.scheduledAt.slice(0, 16) : '';
    $('#post-form-title').textContent = 'Edit post';
    $('#post-submit-button').innerHTML = 'Save changes <span>→</span>';
    $('#cancel-edit-button').classList.remove('hidden');
    $('#post-form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function loadData() {
    try {
        const [posts, schedules] = await Promise.all([request('/api/posts'), request('/api/schedules')]);
        state.posts = posts || [];
        state.schedules = schedules || [];
        renderMetrics(); renderPosts(); renderSchedules();
    } catch (error) {
        showToast(error.message);
        $('#posts-list').innerHTML = '<div class="empty-state"><strong>Could not load workspace</strong>Check that the Spring Boot server is running.</div>';
    }
}

$('#post-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = $('#post-id').value;
    const body = { title: $('#post-title').value.trim(), author: $('#post-author').value.trim(), content: $('#post-content').value.trim(), scheduledAt: $('#post-scheduled-at').value ? $('#post-scheduled-at').value : null };
    try {
        await request(id ? `/api/posts/${id}` : '/api/posts', { method: id ? 'PUT' : 'POST', body: JSON.stringify(body) });
        resetForm();
        showToast(id ? 'Post updated successfully.' : 'Post created successfully.');
        await loadData();
    } catch (error) { $('#form-feedback').textContent = error.message; }
});

$('#new-post-button').addEventListener('click', () => { resetForm(); $('#post-form-panel').scrollIntoView({ behavior: 'smooth', block: 'start' }); $('#post-title').focus(); });
$('#cancel-edit-button').addEventListener('click', resetForm);

$('#posts-list').addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const post = state.posts.find((item) => item.id === Number(button.dataset.id));
    if (button.dataset.action === 'edit-post') editPost(post);
    if (button.dataset.action === 'delete-post' && window.confirm(`Delete “${post.title}” and its schedules?`)) {
        try { await request(`/api/posts/${post.id}`, { method: 'DELETE' }); showToast('Post and linked schedules deleted.'); await loadData(); } catch (error) { showToast(error.message); }
    }
});

$('#schedules-list').addEventListener('change', async (event) => {
    if (event.target.dataset.action !== 'status') return;
    try { await request(`/api/schedules/${event.target.dataset.id}/status?value=${event.target.value}`, { method: 'PATCH' }); showToast('Schedule status updated.'); await loadData(); } catch (error) { showToast(error.message); }
});

$('#schedules-list').addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action="delete-schedule"]');
    if (!button) return;
    try { await request(`/api/schedules/${button.dataset.id}`, { method: 'DELETE' }); showToast('Schedule removed.'); await loadData(); } catch (error) { showToast(error.message); }
});

loadData();
