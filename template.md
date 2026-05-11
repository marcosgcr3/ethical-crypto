# Plantilla Maestra de HTML para Artículos (Ethical Crypto)

Esta plantilla detalla los fragmentos (snippets) de código HTML exactos que deben usarse para maquetar el interior de los artículos en el panel de administración. Se basa en el sistema de diseño "Serious Light Mode".

## 1. Cita Inicial de Impacto
Se coloca al principio del artículo para establecer el tono.

```html
<p class="font-bold text-black text-xl border-l-4 border-black pl-6 my-10 italic">
    "La frase o cita impactante sobre el mercado o tecnología va aquí."
</p>
```

## 2. Tarjeta de Key Takeaways (Resumen de Inteligencia)
Va justo después de la cita inicial. Utiliza un diseño de cuadrícula limpia.

```html
<!-- INTEL KEY TAKEAWAYS CARD -->
<div class="bg-zinc-50 border border-zinc-200 p-8 rounded-2xl mb-12 shadow-sm">
    <h3 class="font-bold text-lg text-black mb-6 uppercase tracking-widest flex items-center">
        <svg class="w-6 h-6 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        Key Intelligence Takeaways
    </h3>
    <ul class="list-none space-y-5 text-sm text-black/80 m-0 p-0">
        <li class="flex items-start">
            <span class="text-black mr-3 font-black shrink-0">01.</span> 
            <div>
                <strong>Punto Clave:</strong> Análisis de la métrica o tendencia.
            </div>
        </li>
        <li class="flex items-start">
            <span class="text-black mr-3 font-black shrink-0">02.</span> 
            <div>
                <strong>Punto Clave:</strong> Consecuencia directa para el inversor/usuario.
            </div>
        </li>
    </ul>
</div>
```

## 3. Alertas "Intelligence Pro-Tip"
Para destacar datos técnicos, consejos de seguridad o "alpha" en medio del contenido.

```html
<!-- ACTIONABLE PRO-TIP ALERT -->
<div class="bg-zinc-100 border-l-4 border-black p-8 rounded-r-xl my-12">
    <div class="flex items-center mb-3">
        <svg class="w-6 h-6 text-black mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
        <h4 class="font-black text-black uppercase tracking-widest text-xs">Intelligence Hub Pro-Tip</h4>
    </div>
    <p class="text-[15px] text-black/70 m-0 leading-relaxed font-medium">
        Contenido técnico o consejo estratégico de aplicación inmediata.
    </p>
</div>
```

## 4. Tarjetas de Análisis Profundo (Masivas)
Para desglosar protocolos, activos o conceptos complejos de forma estructurada.

```html
<div class="space-y-10 my-12">
    <!-- ANALYSIS CARD -->
    <div class="bg-white border border-zinc-200 p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all duration-300">
        <div class="font-extrabold text-2xl text-black mb-6 flex items-center">
            <div class="bg-black text-white w-10 h-10 rounded-full flex justify-center items-center mr-4 text-xs font-black shrink-0" style="min-width: 40px; min-height: 40px;">01</div> 
            <h3 class="uppercase tracking-tighter m-0">TÍTULO DEL ANÁLISIS</h3>
        </div>
        
        <!-- Comparativa de Riesgo/Beneficio -->
        <div class="bg-zinc-50 border border-zinc-100 p-4 rounded-xl mb-4 flex justify-between items-center">
            <span class="text-[10px] uppercase font-black text-black/40">Riesgo Detectado:</span>
            <span class="text-xs font-bold text-red-500 uppercase">Alta Volatilidad</span>
        </div>
        <div class="bg-black/5 border border-black/10 p-4 rounded-xl mb-8 flex justify-between items-center">
            <span class="text-[10px] uppercase font-black text-black/60">Potencial de Retorno:</span>
            <span class="text-xs font-black text-black uppercase">Asimétrico Positivo</span>
        </div>

        <p class="text-black/60 leading-relaxed m-0 mb-6 font-medium">Descripción detallada del activo o protocolo en cuestión.</p>
        <p class="text-black/60 leading-relaxed m-0 font-medium">Análisis secundario sobre la escalabilidad o seguridad.</p>
    </div>
</div>
```

## 5. Tablas de Datos de Protocolo
Para comparar métricas on-chain, TVL, fees o especificaciones técnicas.

```html
<div class="overflow-x-auto my-12">
    <table class="min-w-full border border-zinc-200 bg-white rounded-xl overflow-hidden shadow-sm text-sm">
        <thead class="bg-black text-white">
            <tr>
                <th class="px-6 py-4 text-left font-black uppercase tracking-widest text-[10px]">Métrica</th>
                <th class="px-6 py-4 text-left font-black uppercase tracking-widest text-[10px]">Valor Actual</th>
                <th class="px-6 py-4 text-left font-black uppercase tracking-widest text-[10px]">Tendencia</th>
            </tr>
        </thead>
        <tbody class="divide-y divide-zinc-100">
            <tr>
                <td class="px-6 py-4 font-bold text-black uppercase text-xs">Total Value Locked</td>
                <td class="px-6 py-4 text-black/70 font-medium">$1.2B</td>
                <td class="px-6 py-4 text-green-600 font-bold">+12.4%</td>
            </tr>
        </tbody>
    </table>
</div>
```

## 6. Acordeón de FAQ (Hub de Dudas)
Para resolver preguntas comunes sobre el tema tratado.

```html
<div class="space-y-4 my-12">
    <details class="group border border-zinc-200 rounded-2xl overflow-hidden bg-white">
        <summary class="flex items-center justify-between p-6 cursor-pointer font-black uppercase tracking-tighter text-sm list-none">
            ¿Es este protocolo seguro para el largo plazo?
            <span class="transition-transform group-open:rotate-180 opacity-30">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"/></svg>
            </span>
        </summary>
        <div class="p-6 pt-0 text-black/60 text-sm font-medium leading-relaxed border-t border-zinc-50 bg-zinc-50/30">
            Análisis detallado de la auditoría y la gobernanza del protocolo.
        </div>
    </details>
</div>
```


