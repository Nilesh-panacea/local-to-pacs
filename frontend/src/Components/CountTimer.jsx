import React, { useState, useEffect } from 'react';

function CountdownTimer() {
  const [count, setCount] = useState(10); // Initial countdown value

  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount(prevCount => prevCount - 1); // Decrease the count by 1 every second
      }, 1000); // 1000 milliseconds = 1 second

      return () => clearInterval(timerId); // Cleanup the interval on unmount or count change
    }
  }, [count]); // Effect depends on the 'count' state

  return (
    <div>
      <h1>Countdown: {count}</h1>
      {count === 0 && <h2>Time's up!</h2>}
    </div>
  );
}

export default CountdownTimer;
