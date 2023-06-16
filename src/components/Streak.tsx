import { api } from "~/utils/api";
import React, { useState, useEffect, useCallback } from 'react';

const Streak = () => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { data: addiction, refetch: refetchAddiction } = api.addiction.getUserAddiction.useQuery();

  useEffect(() => {
    // Función para calcular el tiempo transcurrido
    const calculateTimeElapsed = () => {
      if (addiction && addiction.lastTime) {
        const lastTime = new Date(addiction.lastTime);
        const currentTime = new Date();

        const difference = currentTime.getTime() - lastTime.getTime();
        const elapsedSeconds = Math.floor(difference / 1000);

        setTimeElapsed(elapsedSeconds);
      }
    };

    // Calcular el tiempo transcurrido inicialmente
    calculateTimeElapsed();

    // Configurar un temporizador para actualizar el tiempo transcurrido cada segundo
    const timer = setInterval(calculateTimeElapsed, 1000);

    // Limpiar el temporizador cuando el componente se desmonta
    return () => clearInterval(timer);
  }, [addiction]);

  // Calcular los días, horas, minutos y segundos a partir del tiempo transcurrido
  const days = Math.floor(timeElapsed / (24 * 60 * 60));
  const hours = Math.floor((timeElapsed % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeElapsed % (60 * 60)) / 60);
  const seconds = timeElapsed % 60;

  // Configurar la mutación para establecer el mejor registro
  const setBest = api.addiction.setBest.useMutation({
    onSuccess: () => {
      void refetchAddiction();
    },
  });

  // Verificar si el número de días supera al mejor registro actual
  useEffect(() => {
    if (days > addiction?.best) {
      handleSetBest();
    }
  }, [days, addiction]);

  // Función para establecer el nuevo mejor registro
  const handleSetBest = useCallback(() => {
    setBest.mutate({
      best: days,
    });
    console.log("best", days);
  }, [days, setBest]);


  // Calcular el valor de progreso al revés
  const secondsInDay = 24 * 60 * 60;
  const remaining = secondsInDay - (timeElapsed % secondsInDay);
  const progressValue = ((remaining / secondsInDay) * 100).toFixed(2); 


  // Estilo CSS para el componente de progreso radial
  const radialProgressStyle: React.CSSProperties = {
    "--value": `${100 - progressValue}`, 
    "--size": "13rem",
    "--thickness": "6px",
  };

  return (
    <div className="radial-progress outline-[2px] -outline-offset-2 outline outline-primary mt-[40px] flex flex-col items-center justify-start text-primary" style={radialProgressStyle}>
      <h1 className="mt-10 text-2xl font-black underline underline-offset-4">STREAK</h1>
      <p className="text-5xl font-black text-white">{days}</p>
      <p>DÍAS</p>
      <p className="font-black text-white text-md">
        {hours}<span className="font-light text-primary text-xs mr-2">{hours>1 ? "Hrs" : "Hr"}</span>
        {minutes}<span className="font-light text-primary text-xs mr-2">{minutes>1 ? "Mins" : "Min"}</span>
        {seconds}<span className="font-light text-primary text-xs">{seconds>1 ? "Segs" : "Seg"}</span>
      </p>
      <p className="uppercase text-light text-xs mt-1">of sobriety</p>
    </div>
  );
};

export default Streak;
