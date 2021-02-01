import React, { useState } from 'react';
import classNames from 'classnames';
import logo from '../assets/logo.png';

import type { Date } from '../App';
import type { Meal } from '../App';

import '../styles/FixedHeader.scss';
import '../my-icons/my-icons.css';

const FixedHeader = () => {
  const [date, setDate] = useState<Date>('today');
  const [meal, setMeal] = useState<Meal>('BR');

  return (
    <div className="FixedHeader">
      <div className="logo-container">
        <div className="real-logo-container">
          <img className="left-logo" src={logo} />
          <div>
            <p className="siksha-title">식 샤</p>
            <p className="siksha-subtitle">서울대학교 식단 알리미</p>
          </div>
        </div>
      </div>
      <div className="time-card-container">
        <div className="time-card">
          <div className="date-container">
            <button 
              className={classNames("time-button", { "focused-time": date === 'today' })}
              onClick={() => setDate('today')}
            >
              2021. 02. 01
            </button>
            <button 
              className={classNames("time-button", { "focused-time": date === 'tomorrow' })}
              onClick={() => setDate('tomorrow')}
            >
              2021. 02. 02
            </button>
          </div>
          <div className="meal-container">
            <button 
              className={classNames("time-button meal-button", { "focused-time": meal === 'BR' })}
              onClick={() => setMeal('BR')}
            >
              <i className="my-icon my-icon-noun_sunrise_333233_000000 breakfast-icon"></i>
              아침
            </button>
            <button 
              className={classNames("time-button meal-button", { "focused-time": meal === 'LU' })}
              onClick={() => setMeal('LU')}
            >
              <i className="my-icon my-icon-noun_Morning_1015359_000000 lunch-icon"></i>
              점심
            </button>
            <button 
              className={classNames("time-button meal-button", { "focused-time": meal === 'DN' })}
              onClick={() => setMeal('DN')}
            >
              <i className="my-icon my-icon-noun_Moon_600919_000000 dinner-icon"></i>
              저녁
            </button>
          </div>
        </div>
      </div>
      <div className="gradient-header" />
      <div className="gray-header" />
    </div>
  );
};

export default FixedHeader;