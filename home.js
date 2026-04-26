<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Digital Watch</title>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: black;
      color: cyan;
      font-family: 'Courier New', monospace;
    }
    #clock {
      font-size: 60px;
      padding: 20px 40px;
      border: 3px solid cyan;
      border-radius: 15px;
      box-shadow: 0 0 20px cyan;
    }
  </style>
</head>
<body>
  <div id="clock"></div>

  <script>
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();

      // Add leading zeros if needed
      hours = (hours < 10 ? "0" : "") + hours;
      minutes = (minutes < 10 ? "0" : "") + minutes;
      seconds = (seconds < 10 ? "0" : "") + seconds;

      const timeString = ${hours}:${minutes}:${seconds};
      document.getElementById("clock").textContent = timeString;
    }

    // Update every second
    setInterval(updateClock, 1000);
    updateClock(); // run immediately
  </script>
</body>
</html>