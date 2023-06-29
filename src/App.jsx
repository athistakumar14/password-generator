import { useEffect, useRef, useState } from 'react';
import './App.css';
const upper_case = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const number = '0123456789';
const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

function App() {
  const cpyRef = useRef(null);
  const strenthRef = useRef(null);
  const [state, setState] = useState({
    range: 8,
    password_range: '*#(@jdsnijsj',
    max_range: 20,
    is_copied: false,
    is_upper_case: false,
    is_lower_case: false,
    is_numbers: false,
    is_symbols: false,
  });
  const {
    range,
    password_range,
    max_range,
    is_copied,
    is_upper_case,
    is_lower_case,
    is_numbers,
    is_symbols,
  } = state;

  const handleCharactorRange = (e) => {
    setState({ ...state, ['range']: parseInt(e.target.value) });
  };
  const handlePassword = () => {
    let randomSyntax = '',
      password = '';
    if (is_upper_case) randomSyntax = randomSyntax.concat(upper_case);
    if (is_lower_case) randomSyntax = randomSyntax.concat(lowerCase);
    if (is_numbers) randomSyntax = randomSyntax.concat(number);
    if (is_symbols) randomSyntax = randomSyntax.concat(symbols);
    if (!is_upper_case && !is_lower_case && !is_numbers && !is_symbols)
      randomSyntax = Math.random().toString(36).slice(2, 10);
    for (let i = 0; i < range; i++) {
      const randomIndex = Math.floor(Math.random() * randomSyntax.length);
      password += randomSyntax[randomIndex];
    }
    setState({ ...state, ['is_copied']: false, ['password_range']: password });
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(password_range)
      .then(() => {
        setState({ ...state, ['is_copied']: true });
      })
      .catch((err) => console.log(err, 'rrr'));
  };

  useEffect(() => {
    handlePasswordStrength();
  }, [range]);

  const handleCheckBox = (e) => {
    const { name, checked } = e.target;
    setState({ ...state, [name]: checked });
  };

  const handlePasswordStrength = () => {
    const calc = (range * 100) / max_range;
    if (calc <= 40) {
      if (strenthRef.current) strenthRef.current.style.color = 'red';
      return 'weak';
    } else if (calc > 40 && calc <= 60) {
      if (strenthRef.current) strenthRef.current.style.color = 'green';
      return 'good';
    } else if (calc > 60) {
      if (strenthRef.current) strenthRef.current.style.color = 'yellow';
      return 'very strong';
    }
  };

  return (
    <div className="pg__container">
      <div className="pg__output">
        <div className="password__text" ref={cpyRef}>
          {password_range}
        </div>
        <button onClick={handleCopy} className="btn">
          {is_copied ? 'copied' : 'copy'}
        </button>
      </div>
      {/* character range */}
      <div className="pg__range__container">
        <div className="pg__char__length">
          <div className="range__text">Character length</div>
          <div className="range__count">{range}</div>
        </div>
        <input
          type="range"
          value={range}
          max={max_range}
          onChange={handleCharactorRange}
        />
      </div>
      {/* password customization */}
      <div className="password__option">
        <div className="input__radio__btn">
          <input
            name="is_upper_case"
            type="checkbox"
            value={is_upper_case}
            onChange={handleCheckBox}
          />
          <label>Include Uppercase</label>
        </div>
        <div className="input__radio__btn">
          <input
            name="is_lower_case"
            type="checkbox"
            value={is_lower_case}
            onChange={handleCheckBox}
          />
          <label>Include Lowercase</label>
        </div>
        <div className="input__radio__btn">
          <input
            name="is_numbers"
            type="checkbox"
            value={is_numbers}
            onChange={handleCheckBox}
          />
          <label>Include Numbers</label>
        </div>
        <div className="input__radio__btn">
          <input
            name="is_symbols"
            type="checkbox"
            value={is_symbols}
            onChange={handleCheckBox}
          />
          <label>Include symbols</label>
        </div>
      </div>
      {/* strength */}
      <div className="pg__strength">
        <div className="strength__text">Strength:</div>
        <div className="strength__level" ref={strenthRef}>
          {handlePasswordStrength()}
        </div>
      </div>
      <button onClick={handlePassword} className="btn" disabled={!range}>
        GENERATE PASSWORD
      </button>
    </div>
  );
}

export default App;
