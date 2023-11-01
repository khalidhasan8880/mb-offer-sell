import useAuth from "../hooks/useAuth";


const LanguageToggleButton = () => {

const {language, setLanguage} = useAuth()
  const toggleLanguage = () => {
    setLanguage(language === 'BN' ? 'EN' : 'BN');
  };

  return (
    <button    
      onClick={toggleLanguage}
    >
      {language}
    </button>
  );
};

export default LanguageToggleButton;
