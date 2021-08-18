import Clock from './Clock';


const useClock = (config = {}) => {
  console.log('config', config);

  const load = () => {
    const clock = new Clock(config);
    clock.createCanvas();
  };

  window.onload = () => {
    load();
  };
};

export default useClock;
