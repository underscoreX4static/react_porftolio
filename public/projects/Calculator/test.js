// test.js
window.initializeCounter = (root) => {
    const counterElement = root.getElementById("counter");
    const button = root.getElementById("increment-btn");
  
    let count = 0;
  
    button.addEventListener("click", () => {
      count++;
      console.log('clic ')
      counterElement.textContent = `Count: ${count}`;
    });
  };