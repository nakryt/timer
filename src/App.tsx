import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { interval, Observable, Subscription } from "rxjs";

function App() {
  const [seconds, setSeconds] = useState<number>(0);
  const [subscriber, setSubscriber] = useState<Subscription>();
  const [startClick, setStartClick] = useState<number>(0);

  const observableRef = useRef<Observable<number> | null>(null);

  useEffect(() => {
    observableRef.current = interval(1000);
  }, []);

  const startHandler = () => {
    if (subscriber) return;
    const sub = observableRef.current?.subscribe(() =>
      setSeconds((prev) => prev + 1000)
    );
    setSubscriber(sub);
  };

  const displayClickHandler = () => {
    if (Date.now() - startClick < 300) {
      subscriber?.unsubscribe();
      setSubscriber(undefined);
    } else setStartClick(Date.now());
  };

  return (
    <div className="app">
      <p className="display" onClick={displayClickHandler}>
        {new Date(seconds).toISOString().slice(11, 19)}
      </p>
      <div className="buttons-wrapper">
        <button onClick={startHandler}>Start</button>
        <button
          onClick={() => {
            setSeconds(0);
            subscriber?.unsubscribe();
            setSubscriber(undefined);
          }}
        >
          Stop
        </button>
        <button onClick={() => setSeconds(0)}>Reset</button>
      </div>
    </div>
  );
}

export default App;
