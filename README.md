# React + Vite

Esta plantilla proporciona una configuración mínima para que React funcione en Vite con HMR y algunas reglas de ESLint.

Actualmente, hay dos complementos oficiales disponibles:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) utiliza [Babel](https://babeljs.io/) para Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) utiliza [SWC](https://swc.rs/) para Fast Refresh.

## Dependencias Instaladas

Este proyecto incluye las siguientes dependencias adicionales:

- [echarts](https://echarts.apache.org/en/index.html): Biblioteca de gráficos y visualización interactiva.
- [echarts-for-react](https://github.com/hustcc/echarts-for-react): Componente React para integrar ECharts fácilmente.
- [react-router-dom](https://reactrouter.com/): Enrutamiento declarativo para aplicaciones React.
- [axios](https://axios-http.com/): Cliente HTTP basado en promesas para el navegador y Node.js.
- [classnames](https://github.com/JedWatson/classnames): Utilidad para unir classNames condicionalmente.
- [tailwindcss](https://tailwindcss.com/): Utilidad de clases para estilos rápidos y responsivos (usada en los componentes).
- [eslint](https://eslint.org/): Linter para código JavaScript/React.
- [vite](https://vitejs.dev/): Bundler y servidor de desarrollo ultrarrápido.

## Funcionalidades y componentes implementados

- **KPIs animados**: Indicadores clave con animación de conteo para mostrar totales y montos de transacciones.
- **Gráficos dinámicos**: Uso de ECharts para mostrar gráficos de barras apiladas y líneas, con leyendas personalizadas y colores de marca.
- **Tablas y listas**: Visualización de datos agrupados y ordenados por comercio, estado y adquirente.
- **Carga de datos asíncrona**: Integración con API mediante Axios y hooks de React.
- **Animaciones de conteo**: Efectos visuales para mejorar la experiencia de usuario en los KPIs y gráficos.
- **Soporte para múltiples marcas**: Visualización y filtrado por tipo de tarjeta (Visa, Mastercard, Amex, etc).
- **Componentes reutilizables**: Estructura modular para KPIs, tablas, gráficos y filtros.
- **Manejo de errores y estados de carga**: Mensajes claros y animaciones durante la carga de datos.

## Ampliando la configuración de ESLint

Si estás desarrollando una aplicación de producción, recomendamos usar TypeScript y habilitar reglas de lint conscientes de tipos. Consulta la [plantilla de TS](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) para integrar TypeScript y [`typescript-eslint`](https://typescript-eslint.io) en tu proyecto.

---

If you are developing a production application, we recommend using TypeScript and enabling type-aware linting rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) into your project.

## Additional Dependencies

This project also includes the [highcharts](https://www.highcharts.com/) library, which was the primary reason for using [echarts](https://echarts.apache.org/en/index.html) due to its free commercial use license under Apache 2.0. Highcharts is a widely used and powerful charting library that provides a variety of visualization options.