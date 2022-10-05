// CSS para toda la aplicación
import "../styles/style.css";

// Codigo aqui estará presente en todas las páginas
const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default App;
