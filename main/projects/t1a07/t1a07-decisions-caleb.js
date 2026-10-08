document.addEventListener('DOMContentLoaded', () => {
    initDecisions()
})

function initDecisions() {
    const runBtn = document.getElementById('runBtn')
    const scoreInput = document.getElementById('scoreInput')
    runBtn.addEventListener('click', evaluateDecisions)
    scoreInput.addEventListener('input', evaluateDecisions)
    evaluateDecisions()
}

function setVal(v) {
    document.getElementById('scoreInput').value = v
    evaluateDecisions()
}

function evaluateDecisions() {
    let score = Number(document.getElementById('scoreInput').value) || 0
    let ifOut = document.getElementById('ifOut')
    let switchOut = document.getElementById('switchOut')
    let nestedOut = document.getElementById('nestedOut')
    let question = document.getElementById('question')

    let ifResult = ''
    if (score >= 90) {
        ifResult = 'Grade: A - Excellent'
    } else if (score >= 80) {
        ifResult = 'Grade: B - Good'
    } else if (score >= 70) {
        ifResult = 'Grade: C - Average'
    } else if (score >= 60) {
        ifResult = 'Grade: D - Passing'
    } else {
        ifResult = 'Grade: F - Failing'
    }
    ifOut.textContent = ifResult

    let switchResult = ''
    switch (true) {
        case (score === 100):
            switchResult = 'Switch: Perfect Score'
            break
        case (score >= 75):
            switchResult = 'Switch: Upper Bracket'
            break
        case (score >= 50):
            switchResult = 'Switch: Mid Bracket'
            break
        default:
            switchResult = 'Switch: Lower Bracket'
            break
    }
    switchOut.textContent = switchResult

    let nestedResult = ''
    if (score >= 50) {
        if (score % 2 === 0) {
            nestedResult = 'Nested: Passing Even'
        } else {
            nestedResult = 'Nested: Passing Odd'
        }
    } else {
        if (score === 0) {
            nestedResult = 'Nested: Absolute Zero'
        } else {
            nestedResult = 'Nested: Failing Score'
        }
    }
    nestedOut.textContent = nestedResult

    question.textContent = `Evaluated score value: ${score}`
    recordHistory(score, ifResult)
}

function recordHistory(val, res) {
    const historyList = document.getElementById('history-list')
    const placeholder = historyList.querySelector('.history-placeholder')
    if (placeholder) {
        placeholder.remove()
    }
    const newLi = document.createElement('li')
    newLi.textContent = `Score: ${val} | ${res}`
    newLi.style.backgroundColor = val >= 70 ? 'var(--prim-color)' : 'var(--surf-color)'
    historyList.prepend(newLi)
}