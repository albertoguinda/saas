# Recursos Visuales

Breves enlaces y ejemplos para animaciones y diagramas.

## AnimatedIcons.co

```astro
---
import IconPlayer from 'react-useanimations';
---
<IconPlayer animation="loading" size={56} />
```

## Lightweight Charts

```tsx
import { createChart } from "lightweight-charts";

useEffect(() => {
  const chart = createChart(document.getElementById("chart")!);
  chart.addLineSeries().setData([{ time: 1, value: 2 }]);
}, []);
```

## Diagramas de Software

```tsx
import Mermaid from "react-mermaid2";

<Mermaid chart={`graph LR;A-->B;B-->C;C-->A;`} />;
```

## metaexplorer.co

SEO audit integrado con snippet de generación de metas.

```ts
import { generateMeta } from "metaexplorer";
const meta = generateMeta({ title: "SaaS" });
```

## Material 3 Expressive

```tsx
import { ThemeProvider } from "@material/material-3";

<ThemeProvider theme="expressive">...</ThemeProvider>;
```

## Efecto 3D CSS

```css
.card {
  transform: rotateY(var(--rotate));
  transition: transform 0.3s;
}
```

## Inputmode móvil

```html
<input type="tel" inputmode="numeric" />
```

## Alias @ en imports

```ts
import { Button } from "@components/Button";
```
