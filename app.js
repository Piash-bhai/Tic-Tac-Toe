
let currentplayer = "X"
let arr = Array(9).fill(null)

const winCombos = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

function checkwinner() {
  for (const combo of winCombos) {
    const [a,b,c] = combo
    if (arr[a] != null && arr[a] == arr[b] && arr[b] == arr[c]) {
      showResult('winner', currentplayer, combo)
      return true
    }
  }
  if (!arr.some(e => e == null)) {
    showResult('draw', null, [])
    return true
  }
  return false
}

function handleclick(el) {
  const id = Number(el.id)
  if (arr[id] != null) return

  arr[id] = currentplayer
  el.innerText = currentplayer
  el.classList.add('taken', currentplayer === 'X' ? 'x-mark' : 'o-mark', 'pop')
  el.removeEventListener('click', handleclick)

  el.addEventListener('animationend', () => el.classList.remove('pop'), { once: true })

  if (!checkwinner()) {
    currentplayer = currentplayer === "X" ? "O" : "X"
    updateTurnUI()
  }
}

/* ── UI helpers ── */
const scores = { X: 0, O: 0, D: 0 }

function updateTurnUI() {
  const label = document.getElementById('turn-label')
  const dot   = document.getElementById('turn-dot')
  label.textContent = currentplayer
  if (currentplayer === 'X') {
    label.style.color = 'var(--x-color)'
    dot.style.background = 'var(--x-color)'
    dot.style.boxShadow = '0 0 8px var(--x-color)'
  } else {
    label.style.color = 'var(--o-color)'
    dot.style.background = 'var(--o-color)'
    dot.style.boxShadow = '0 0 8px var(--o-color)'
  }
}

function showResult(type, player, combo) {
  combo.forEach(i => document.getElementById(String(i)).classList.add('win-cell'))

  const overlay = document.getElementById('overlay')
  const emoji   = document.getElementById('result-emoji')
  const title   = document.getElementById('result-title')
  const name    = document.getElementById('result-name')

  if (type === 'winner') {
    emoji.textContent = player === 'X' ? '⚡' : '✨'
    title.textContent = 'Winner'
    name.textContent  = `Player ${player}`
    name.className    = `result-name ${player === 'X' ? 'x-win' : 'o-win'}`
    scores[player]++
    document.getElementById(`score-${player.toLowerCase()}`).textContent = scores[player]
  } else {
    emoji.textContent = '🤝'
    title.textContent = "It's a"
    name.textContent  = 'DRAW'
    name.className    = 'result-name draw'
    scores.D++
    document.getElementById('score-d').textContent = scores.D
  }

  overlay.classList.add('show')
}

function resetBoard() {
  currentplayer = 'X'
  arr = Array(9).fill(null)
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = ''
    cell.className = 'cell'
    cell.setAttribute('onclick', 'handleclick(this)')
  })
  document.getElementById('overlay').classList.remove('show')
  updateTurnUI()
}


updateTurnUI()
