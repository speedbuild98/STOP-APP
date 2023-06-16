
const Streak = () => {

  const radialProgressStyle: React.CSSProperties = {
    "--value": "70",
    "--size": "13rem",
    "--thickness": "6px",
  };

  return (
    <div
    className="radial-progress mt-[40px] flex flex-col items-center justify-start text-primary"
    style={radialProgressStyle}
  >
    <h1 className="mt-10 text-2xl font-black underline underline-offset-4">STREAK</h1>
    <p className="text-4xl font-black text-white">6</p>
    <p>DAYS</p>
    <p className="font-black text-white text-xl">
      2<span className="font-light text-primary text-xs">Hrs</span> 47
      <span className="font-light text-primary text-xs">Mins</span> 2
      <span className="font-light text-primary text-xs">Secs</span>
    </p>
    <p className="uppercase text-light text-xs mt-1">of sobriety</p>
  </div>
  )
}

export default Streak