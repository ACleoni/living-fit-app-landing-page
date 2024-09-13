function showOverlay() {
  document.getElementById('overlay').style.display = 'block';
}

function hideOverlay() {
  document.getElementById('overlay').style.display = 'none';
}

function setErrorMessage(message) {
  document.getElementById('dangerAlert').textContent = message
  document.getElementById('dangerAlert').style.display = 'block';
  document.getElementById('dangerAlert').style.zIndex = 10000
  setTimeout(() => {
    document.getElementById('dangerAlert').style.display = 'none';
  }, 5000)
}

export {
  showOverlay,
  hideOverlay,
  setErrorMessage
}