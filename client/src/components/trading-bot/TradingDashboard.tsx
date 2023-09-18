import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

import { fadeSmallUpVariant } from '@/utils/animations';
import { TradingProps } from '@/types/props';

declare global {
  interface Window {
    TradingView: any;
  }
}

let tvScriptLoadingPromise: Promise<Event>;

const TradingDashboard = (props: TradingProps) => {
  const { list, value, setter } = props;

  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<Event>((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById('tradingview-widget') && 'TradingView' in window) {
        new window.TradingView.widget({
          autosize: true,
          symbol: value[1],
          interval: '1',
          timezone: 'America/New_York',
          theme: 'dark',
          style: '1',
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: false,
          backgroundColor: "#2D2D2D",
          save_image: false,
          container_id: 'tradingview-widget',
        });
      }
    }
  }, [value]);

  useEffect(() => {

  }, []);

  return (
    <motion.div
      initial="hide"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeSmallUpVariant(0.5)}
      className='m-1 bg-[#2D2D2D] rounded-lg overflow-hidden'
    >
      <div className='flex p-4'>
        {
          list.map((coin: string[], index: number) => (
            <button
              key={index}
              onClick={() => setter(coin)}
              className={`${coin[0] === value[0] && 'text-primary'} text-xs md:text-base mx-3 transition-all hover:font-bold`}
            >{coin[0]}</button>
          ))
        }
      </div>

      <div className='tradingview-widget-container'>
        <div id='tradingview-widget' className='h-96' />
      </div>
    </motion.div>
  );
};

export default TradingDashboard;