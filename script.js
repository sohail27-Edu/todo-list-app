// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.editingId = null;
        this.deletingId = null;
        this.isDarkMode = localStorage.getItem('theme') === 'dark';
        
        this.init();
    }

    init() {
        // Load tasks from localStorage
        this.loadTasks();
        
        // Set theme
        this.setTheme(this.isDarkMode);
        
        // Bind events
        this.bindEvents();
        
        // Render initial state
        this.render();
    }

    bindEvents() {
        // Add task
        document.getElementById('addBtn').addEventListener('click', () => this.addTask());
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.closest('.filter-btn').classList.add('active');
                this.currentFilter = e.target.closest('.filter-btn').dataset.filter;
                this.render();
            });
        });

        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.render();
        });

        // Theme toggle
        document.getElementById('themeBtn').addEventListener('click', () => {
            this.isDarkMode = !this.isDarkMode;
            this.setTheme(this.isDarkMode);
        });

        // Modal
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeDeleteModal();
        });
        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.confirmDelete();
        });
    }

    addTask() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('prioritySelect').value;
        const dueDate = document.getElementById('dueDateInput').value;
        const text = input.value.trim();

        if (!text) {
            this.showToast('Please enter a task', 'error');
            return;
        }

        const task = {
            id: Date.now(),
            text,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        
        // Clear inputs
        input.value = '';
        document.getElementById('prioritySelect').value = 'medium';
        document.getElementById('dueDateInput').value = '';
        
        this.showToast('Task added successfully', 'success');
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    deleteTask(id) {
        this.deletingId = id;
        this.openDeleteModal();
    }

    confirmDelete() {
        this.tasks = this.tasks.filter(t => t.id !== this.deletingId);
        this.saveTasks();
        this.render();
        this.closeDeleteModal();
        this.showToast('Task deleted', 'success');
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            document.getElementById('taskInput').value = task.text;
            document.getElementById('prioritySelect').value = task.priority;
            document.getElementById('dueDateInput').value = task.dueDate || '';
            this.editingId = id;
            document.getElementById('taskInput').focus();
        }
    }

    saveTasks() {
        localStorage.setItem('todos', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const stored = localStorage.getItem('todos');
        this.tasks = stored ? JSON.parse(stored) : [];
    }

    getFilteredTasks() {
        let filtered = [...this.tasks];

        // Apply filter
        if (this.currentFilter === 'active') {
            filtered = filtered.filter(t => !t.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(t => t.completed);
        } else if (this.currentFilter === 'high') {
            filtered = filtered.filter(t => t.priority === 'high');
        }

        // Apply search
        if (this.searchTerm) {
            filtered = filtered.filter(t => t.text.toLowerCase().includes(this.searchTerm));
        }

        return filtered;
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        document.getElementById('totalCount').textContent = total;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingCount').textContent = pending;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    isOverdue(dateString) {
        if (!dateString) return false;
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    }

    render() {
        const filtered = this.getFilteredTasks();
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');

        this.updateStats();

        if (filtered.length === 0) {
            tasksList.style.display = 'none';
            emptyState.style.display = 'flex';
            return;
        }

        tasksList.style.display = 'flex';
        emptyState.style.display = 'none';

        tasksList.innerHTML = filtered.map(task => this.createTaskElement(task)).join('');

        // Bind task-specific events
        filtered.forEach(task => {
            const checkbox = document.querySelector(`input[data-id="${task.id}"]`);
            if (checkbox) {
                checkbox.addEventListener('change', () => this.toggleTask(task.id));
            }

            const deleteBtn = document.querySelector(`button[data-delete="${task.id}"]`);
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => this.deleteTask(task.id));
            }

            const editBtn = document.querySelector(`button[data-edit="${task.id}"]`);
            if (editBtn) {
                editBtn.addEventListener('click', () => this.editTask(task.id));
            }
        });
    }

    createTaskElement(task) {
        const isOverdue = this.isOverdue(task.dueDate);
        const formattedDate = this.formatDate(task.dueDate);

        return `
            <div class="task-item ${task.completed ? 'completed' : ''} ${task.priority}-priority">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    data-id="${task.id}"
                    ${task.completed ? 'checked' : ''}
                >
                <div class="task-content">
                    <div class="task-text">${this.escapeHtml(task.text)}</div>
                    <div class="task-meta">
                        <span class="priority-badge ${task.priority}">${task.priority}</span>
                        ${task.dueDate ? `<span class="task-meta-item ${isOverdue ? 'overdue' : ''}">
                            <i class="fas fa-calendar"></i>
                            ${formattedDate}
                        </span>` : ''}
                    </div>
                </div>
                <div class="task-actions">
                    <button class="task-btn edit-btn" data-edit="${task.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete-btn" data-delete="${task.id}" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    openDeleteModal() {
        document.getElementById('deleteModal').classList.add('active');
    }

    closeDeleteModal() {
        document.getElementById('deleteModal').classList.remove('active');
        this.deletingId = null;
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    setTheme(isDark) {
        const html = document.documentElement;
        const btn = document.getElementById('themeBtn');
        
        if (isDark) {
            html.setAttribute('data-theme', 'dark');
            btn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
            btn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
