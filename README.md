# Modern To-Do List Application

A feature-rich to-do list application built with vanilla JavaScript, featuring local storage persistence, priority levels, due dates, and a beautiful dark/light theme.

## 🌟 Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with text input
- ✅ **Edit Tasks** - Modify existing tasks
- ✅ **Delete Tasks** - Remove tasks with confirmation
- ✅ **Mark Complete** - Check off completed tasks
- ✅ **Priority Levels** - Low, Medium, High priority options
- ✅ **Due Dates** - Set and track task deadlines
- ✅ **Local Storage** - Tasks persist between sessions

### Filtering & Search
- 🔍 **Search** - Find tasks by text content
- 📂 **Filter by Status** - View All, Active, or Completed tasks
- 🎯 **Filter by Priority** - View only high-priority tasks

### User Interface
- 🎨 **Dark/Light Theme** - Toggle between themes with preference persistence
- 📊 **Task Statistics** - View total, completed, and pending task counts
- 🎯 **Smart Date Display** - Shows "Today", "Tomorrow", or formatted date
- ⚠️ **Overdue Indicators** - Visual indicators for overdue tasks
- 🎬 **Smooth Animations** - Polished transitions and effects
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices

## 📁 Project Structure

```
todo-list-app/
├── index.html      # HTML structure
├── style.css       # Styling and animations
├── script.js       # Application logic
└── README.md       # Documentation
```

## 🚀 Quick Start

1. **Clone or Download** the repository
2. **Open** `index.html` in a modern web browser
3. **Start** adding your tasks!

No installation or server setup required - it's a purely client-side application.

## 📖 How to Use

### Adding a Task
1. Type your task in the input field
2. Select a priority level (Low, Medium, High)
3. Optionally select a due date
4. Click the **+** button or press **Enter**

### Managing Tasks
- **Complete**: Click the checkbox next to a task
- **Edit**: Click the edit icon and modify in the input field
- **Delete**: Click the delete icon and confirm the deletion

### Filtering Tasks
- Click filter buttons to view:
  - **All** - All tasks
  - **Active** - Incomplete tasks
  - **Completed** - Finished tasks
  - **High Priority** - High priority tasks

### Searching
- Use the search box to find tasks by keyword
- Results filter in real-time as you type

### Theme
- Click the moon/sun icon to toggle dark/light mode
- Your preference is automatically saved

## 💾 Data Persistence

All tasks are automatically saved to your browser's **Local Storage**. This means:
- Your tasks persist even after closing the browser
- No account or internet connection required
- Data is stored locally on your device

## 🎨 Customization

### Colors
Edit the CSS variables at the top of `style.css`:
```css
:root {
    --primary: #4285f4;        /* Main color */
    --success: #34a853;        /* Success/Low priority */
    --warning: #fbbc04;        /* Warning/Medium priority */
    --danger: #ea4335;         /* Danger/High priority */
    /* ... more colors */
}
```

### Fonts
Modify the font-family in the `body` rule:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

## 🔧 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 📝 Technical Details

### JavaScript Architecture
- **Class-based Design**: TodoApp class encapsulates all functionality
- **Event Delegation**: Efficient event handling
- **Local Storage API**: Persistent data storage
- **DOM Manipulation**: Pure vanilla JavaScript (no frameworks)

### CSS Features
- **CSS Variables**: Easy customization and theming
- **Grid & Flexbox**: Responsive layouts
- **CSS Animations**: Smooth transitions
- **Media Queries**: Mobile-first responsive design

## 🎯 Features Explained

### Task Object Structure
```javascript
{
    id: 1234567890,              // Unique identifier
    text: "Buy groceries",       // Task description
    priority: "high",            // Priority level
    dueDate: "2024-12-25",       // Due date (optional)
    completed: false,            // Completion status
    createdAt: "ISO 8601 date"   // Creation timestamp
}
```

### Local Storage Keys
- `todos` - Array of task objects
- `theme` - Current theme preference (light/dark)

## 🚀 Future Enhancements

Potential features to add:
- Task categories/tags
- Recurring tasks
- Time estimates
- Task notes/descriptions
- Export/Import functionality
- Cloud sync capability
- Drag-and-drop reordering
- Keyboard shortcuts

## 📄 License

Free to use for personal and commercial projects.

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

**Made with ❤️ by Sohail Ahmad**
