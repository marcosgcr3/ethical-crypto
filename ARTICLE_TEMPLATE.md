# Plantilla Maestra de HTML para Artículos (Biohacking Ético)

Esta plantilla detalla los fragmentos (snippets) de código HTML exactos que de-ben usarse para maquetar el interior de los artículos en el panel de administración. El redactor (la IA) debe seguir esta estructura siempre.

## 1. Cita Inicial Gigante
Se coloca al principio del artículo antes de la tarjeta SEO.

```html
<p class="font-bold text-bioblue text-xl border-l-4 border-bioblue pl-6 my-10 italic">
    "La frase o cita impactante va aquí."
</p>
```

## 2. Tarjeta de Key Takeaways (Resumen SEO)
Va justo después de la cita inicial. **IMPORTANTE:** Usa `<div>` envolviendo el texto dentro del `<li>` y `shrink-0` en el número para que Tailwind Typography (`prose`) no rompa el diseño grid/flex.

```html
<!-- SEO KEY TAKEAWAYS CARD -->
<div class="bg-gradient-to-br from-white to-gray-50 border border-gray-200 p-8 rounded-2xl mb-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
    <h3 class="font-heading text-lg font-bold text-slate mb-4 uppercase tracking-widest flex items-center">
        <svg class="w-6 h-6 text-bioblue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Key Takeaways
    </h3>
    <ul class="list-none space-y-5 text-sm text-slate opacity-90 m-0">
        <li class="flex items-start">
            <span class="text-bioblue mr-3 font-bold shrink-0">1.</span> 
            <div>
                <strong>Punto 1:</strong> Explicación.
            </div>
        </li>
        <li class="flex items-start">
            <span class="text-bioblue mr-3 font-bold shrink-0">2.</span> 
            <div>
                <strong>Punto 2:</strong> Explicación.
            </div>
        </li>
    </ul>
</div>
```

## 3. Alertas "Biohacker Pro-Tip"
Para destacar técnicas concretas de 2026 en medio de párrafos densos.

```html
<!-- ACTIONABLE PRO-TIP ALERT -->
<div class="bg-blue-50 border-l-4 border-bioblue p-8 rounded-r-xl my-12">
    <div class="flex items-center mb-3">
        <svg class="w-6 h-6 text-bioblue mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
        <h4 class="font-bold text-bioblue uppercase tracking-widest text-sm">Biohacker Pro-Tip: Título</h3>
    </div>
    <p class="text-[15px] opacity-90 text-slate m-0 leading-relaxed">
        Contenido del tip aplicable de inmediato.
    </p>
</div>
```

## 4. Tarjetas Masivas Comparativas o de Hábitos
Se aplican en la sección principal donde se explican los puntos de forma extensa (por ejemplo, los 5 biomarcadores o los suplementos).
**IMPORTANTE:** Usa `min-width: 40px` y envuelve el título `<h3>` y el círculo numérico dentro de un `<div>` flexbox para que `prose` no aplaste el círculo.

```html
<div class="space-y-10 my-12">
    <!-- HABIT CARD 1 (MASSIVE) -->
    <div class="bg-white border text-md border-gray-100 p-10 rounded-[32px] shadow-sm hover:shadow-lg transition-all duration-300">
        <div class="font-heading font-extrabold text-2xl text-slate mb-4 flex items-center">
            <div class="bg-bioblue text-white w-10 h-10 rounded-full flex justify-center items-center mr-4 text-sm shrink-0 shadow-md" style="min-width: 40px; min-height: 40px;">1</div> 
            <h3>TÍTULO DE LA SECCIÓN</h3>
        </div>
        
        <!-- OPcional: Tablita de datos -->
        <div class="bg-gray-50 border border-gray-100 p-4 rounded-xl mb-6 flex justify-between items-center">
            <span class="text-xs uppercase font-bold text-slate opacity-60">Dato Malo:</span>
            <span class="text-sm font-bold text-red-500 line-through">Error</span>
        </div>
        <div class="bg-bioblue/10 border border-bioblue/20 p-4 rounded-xl mb-8 flex justify-between items-center">
            <span class="text-xs uppercase font-bold text-bioblue">Dato Bueno Optimo:</span>
            <span class="text-sm font-bold text-bioblue">Éxito total</span>
        </div>

        <p class="opacity-80 leading-relaxed m-0 mb-6">Párrafo extenso 1.</p>
        <p class="opacity-80 leading-relaxed m-0">Párrafo extenso 2.</p>
    </div>
</div>
```

## 6. Tablas de Datos Profesionales
Se usan para comparar variables metabólicas, estudios o protocolos de suplementación.

```html
<div class="overflow-x-auto my-8">
    <table class="min-w-full border border-gray-200 bg-white rounded-xl overflow-hidden shadow-sm text-sm">
        <thead class="bg-bioblue text-white">
            <tr>
                <th class="px-6 py-4 text-left font-semibold uppercase tracking-wider">Variable</th>
                <th class="px-6 py-4 text-left font-semibold uppercase tracking-wider">Impacto</th>
                <th class="px-6 py-4 text-left font-semibold uppercase tracking-wider">Consecuencia</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr>
                <td class="px-6 py-4 font-medium text-slate">Nombre Variable</td>
                <td class="px-6 py-4 text-slate/80">Descripción del impacto</td>
                <td class="px-6 py-4 text-slate/80">Resultado sistémico</td>
            </tr>
        </tbody>
    </table>
</div>
```

## 7. Referencias Clínicas al final del Post
Always add 3-5 Pubmed links at the bottom.

```html
<h3 class="font-bold text-lg mt-14 mb-4 border-b-2 border-gray-100 pb-2">Peer-Reviewed Clinical Validations & Extended Deeper Reading:</h3>
<ol class="list-decimal pl-5 text-[14px] opacity-80 space-y-5">
    <li><strong>El Titulo del Estudio:</strong> Autores (Año). "Título del paper". <em>Revista</em>. Sumario muy técnico de una pequeña frase. <a href="ENLACE_PUBMED" class="text-bioblue underline hover:opacity-80 transition-opacity" target="_blank">Leer el estudio Clínico</a></li>
</ol>
```
