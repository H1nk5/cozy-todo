const STORAGE_KEYS = {
  LOGIN: 'todo_app_login',
  TODOS: 'todo_app_todos',
  TRASH: 'todo_app_trash'
}

const DEFAULT_TODOS = [
  {
    id: Date.now(),
    text: '读完《小王子》第三章',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 1,
    text: '给阳台的绿萝浇水',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 2,
    text: '做一份温暖的早餐',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 3,
    text: '整理书桌，保持心情清爽',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: Date.now() + 4,
    text: '听一首喜欢的歌放松一下',
    completed: true,
    createdAt: new Date().toISOString()
  }
]

export function getLoginState() {
  const data = localStorage.getItem(STORAGE_KEYS.LOGIN)
  return data ? JSON.parse(data) : null
}

export function setLoginState(account) {
  localStorage.setItem(STORAGE_KEYS.LOGIN, JSON.stringify({ account, loggedIn: true }))
}

export function clearLoginState() {
  localStorage.removeItem(STORAGE_KEYS.LOGIN)
}

export function getTodos() {
  const data = localStorage.getItem(STORAGE_KEYS.TODOS)
  if (!data) {
    localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(DEFAULT_TODOS))
    return DEFAULT_TODOS
  }
  return JSON.parse(data)
}

export function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos))
}

export function getTrash() {
  const data = localStorage.getItem(STORAGE_KEYS.TRASH)
  return data ? JSON.parse(data) : []
}

export function saveTrash(trash) {
  localStorage.setItem(STORAGE_KEYS.TRASH, JSON.stringify(trash))
}
